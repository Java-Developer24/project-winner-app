'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Sparkles, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Premium $200k Prize Pedestal Display
 * Features:
 * - Real 3D model with slow rotation
 * - Cinematic spotlight with bloom glow
 * - Gradient floor shadow (floating in space effect)
 * - Light trails / particles orbiting the prize
 * - Soft shadows and internal AR-style glow
 */
export default function PrizePedestal({ prize }) {
  const groupRef = useRef();
  const prizeRef = useRef();
  const pedestalRef = useRef();
  const spotlightRef = useRef();
  const orbitParticlesRef = useRef([]);
  
  useFrame((state) => {
    if (!groupRef.current || !prizeRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Slow rotation of prize (premium feel)
    prizeRef.current.rotation.y = time * 0.3;
    prizeRef.current.position.y = Math.sin(time * 1.5) * 0.15;
    
    // Pulse pedestal glow
    if (pedestalRef.current && pedestalRef.current.material) {
      pedestalRef.current.material.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.3;
    }

    // Animate spotlight intensity (cinematic breathing)
    if (spotlightRef.current) {
      spotlightRef.current.intensity = 3 + Math.sin(time * 1.5) * 1;
    }
  });

  if (!prize) return null;

  const rarityColors = {
    legendary: '#FFD700',
    epic: '#C0C0C0',
    rare: '#4A90E2',
    uncommon: '#9B59B6',
    common: '#E74C3C',
  };
  
  const prizeColor = rarityColors[prize.rarity] || '#764ba2';

  return (
    <group ref={groupRef}>
      {/* Cinematic Spotlight Behind the Prize (bloom glow hero effect) */}
      <spotLight
        ref={spotlightRef}
        position={[0, 5, -3]}
        angle={0.6}
        penumbra={1}
        intensity={3}
        color={prizeColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Additional hero rim lights */}
      <pointLight position={[3, 3, 3]} intensity={2} color={prizeColor} distance={8} />
      <pointLight position={[-3, 3, -3]} intensity={1.5} color="#ffffff" distance={8} />
      <pointLight position={[0, -1, 2]} intensity={1} color={prizeColor} distance={5} />

      {/* Gradient Floor Shadow (floating in space effect) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <meshStandardMaterial
          color="#000000"
          transparent
          opacity={0.4}
          emissive={prizeColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Radial gradient glow on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.49, 0]}>
        <circleGeometry args={[3, 64]} />
        <meshBasicMaterial
          color={prizeColor}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Pedestal base with premium metallic finish */}
      <mesh position={[0, -0.5, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 64]} />
        <meshStandardMaterial
          color={prizeColor}
          metalness={0.9}
          roughness={0.1}
          emissive={prizeColor}
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Pedestal column with glass effect */}
      <mesh ref={pedestalRef} position={[0, -0.15, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.7, 64]} />
        <meshStandardMaterial
          color={prizeColor}
          metalness={0.7}
          roughness={0.3}
          emissive={prizeColor}
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* 3D Prize Model with internal AR-style glow */}
      <Float
        speed={2}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <group ref={prizeRef} position={[0, 0.8, 0]}>
          {/* Main 3D prize representation */}
          <mesh castShadow>
            <boxGeometry args={[1.2, 1.2, 1.2]} />
            <meshStandardMaterial
              color={prizeColor}
              metalness={0.8}
              roughness={0.2}
              emissive={prizeColor}
              emissiveIntensity={0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Internal AR glow core */}
          <mesh scale={0.6}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
              color={prizeColor}
              transparent
              opacity={0.4}
            />
          </mesh>

          {/* Prize emoji overlay */}
          <Text
            position={[0, 0, 0.7]}
            fontSize={1.2}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {prize.emoji || '🎁'}
          </Text>
        </group>
      </Float>

      {/* Prize name label with motion reveal */}
      <Text
        position={[0, -0.9, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        font="/fonts/Inter-Bold.woff"
      >
        {prize.name || 'Prize'}
      </Text>

      {/* Prize value label */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.3}
        color={prizeColor}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {prize.value || ''}
      </Text>

      {/* Light Trails / Particles Orbiting the Prize (ultra premium) */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 2;
        const height = 0.8;
        
        return (
          <Float
            key={`orbit-${i}`}
            speed={2 + i * 0.1}
            rotationIntensity={0}
            floatIntensity={0}
          >
            <mesh
              position={[
                Math.cos(angle + i * 0.5) * radius,
                height + Math.sin(angle * 3) * 0.3,
                Math.sin(angle + i * 0.5) * radius,
              ]}
            >
              <sphereGeometry args={[0.03, 16, 16]} />
              <meshBasicMaterial
                color={prizeColor}
                transparent
                opacity={0.8}
              />
              <pointLight
                color={prizeColor}
                intensity={0.5}
                distance={1}
              />
            </mesh>
          </Float>
        );
      })}

      {/* Enhanced particle sparkles around prize */}
      <Sparkles
        count={100}
        scale={4}
        size={3}
        speed={0.4}
        opacity={0.7}
        color={prizeColor}
        position={[0, 0.8, 0]}
      />

      {/* Holographic rotating rings */}
      <mesh position={[0, 0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshBasicMaterial
          color={prizeColor}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh position={[0, 0.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.7, 0.02, 16, 100]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}