'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DissolveShader } from '../shaders/DissolveShader';

/**
 * Premium ticket shard assembly with shader dissolve effects
 * Features:
 * - DRACO compressed GLB loading (simulated with procedural geometry)
 * - Custom dissolve shader with noise threshold
 * - Per-shard spring animation with staggered timing
 * - Edge glow and fresnel rim lighting
 */
export default function TicketAssembler({ progress = 0, onComplete }) {
  const groupRef = useRef();
  const shardsRef = useRef([]);
  const hasCalledComplete = useRef(false);

  // Create ticket shards with unique transforms
  const shards = useMemo(() => {
    const shardCount = 12;
    const shardData = [];
    
    for (let i = 0; i < shardCount; i++) {
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 8;
      
      shardData.push({
        id: i,
        startPosition: [
          Math.cos(angle) * radius,
          Math.sin(angle) * radius * 0.5,
          (Math.random() - 0.5) * 4,
        ],
        startRotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        ],
        finalPosition: [
          (i % 4 - 1.5) * 0.7,
          (Math.floor(i / 4) - 1) * 0.6,
          0,
        ],
        size: [0.6, 0.5, 0.1],
      });
    }
    
    return shardData;
  }, []);

  // Create shader materials for each shard
  const materials = useMemo(() => {
    return shards.map(() => 
      new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(DissolveShader.uniforms),
        vertexShader: DissolveShader.vertexShader,
        fragmentShader: DissolveShader.fragmentShader,
        transparent: true,
        side: THREE.DoubleSide,
      })
    );
  }, [shards]);

  // Initialize shards array
  useEffect(() => {
    shardsRef.current = [];
    hasCalledComplete.current = false;
  }, []);

  // Update shader uniforms and positions
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    shardsRef.current.forEach((shard, i) => {
      if (!shard) return;
      
      const shardData = shards[i];
      const material = materials[i];
      
      // Staggered progress for each shard
      const shardProgress = Math.max(0, Math.min(1, (progress - i * 0.04) * 1.3));
      
      // Smooth spring easing
      const eased = 1 - Math.pow(1 - shardProgress, 4);
      
      // Update shader uniforms
      if (material && material.uniforms) {
        material.uniforms.uProgress.value = shardProgress;
        material.uniforms.uTime.value = time;
      }
      
      // Interpolate position with spring effect
      const spring = Math.sin(shardProgress * Math.PI) * 0.3;
      shard.position.x = THREE.MathUtils.lerp(
        shardData.startPosition[0],
        shardData.finalPosition[0],
        eased
      );
      shard.position.y = THREE.MathUtils.lerp(
        shardData.startPosition[1],
        shardData.finalPosition[1],
        eased
      ) + spring;
      shard.position.z = THREE.MathUtils.lerp(
        shardData.startPosition[2],
        shardData.finalPosition[2],
        eased
      );
      
      // Interpolate rotation
      shard.rotation.x = THREE.MathUtils.lerp(shardData.startRotation[0], 0, eased);
      shard.rotation.y = THREE.MathUtils.lerp(shardData.startRotation[1], 0, eased);
      shard.rotation.z = THREE.MathUtils.lerp(shardData.startRotation[2], 0, eased);
      
      // Add subtle floating animation when assembled
      if (progress > 0.85) {
        shard.position.y += Math.sin(time * 2 + i * 0.5) * 0.015;
        shard.rotation.z = Math.sin(time + i) * 0.05;
      }
    });
    
    // Notify completion (only once)
    if (progress >= 0.95 && !hasCalledComplete.current && onComplete) {
      hasCalledComplete.current = true;
      onComplete();
    }
  });

  // Cleanup materials on unmount
  useEffect(() => {
    return () => {
      materials.forEach(mat => mat.dispose());
    };
  }, [materials]);

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh
          key={shard.id}
          ref={(el) => {
            if (el && !shardsRef.current.includes(el)) {
              shardsRef.current[i] = el;
            }
          }}
          position={shard.startPosition}
          rotation={shard.startRotation}
          material={materials[i]}
        >
          <boxGeometry args={shard.size} />
        </mesh>
      ))}
    </group>
  );
}