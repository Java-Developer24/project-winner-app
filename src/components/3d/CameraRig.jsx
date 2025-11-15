'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Cinematic camera choreography
 * Animates camera through different positions based on reveal stage
 */
export default function CameraRig({ stage = 'intro' }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 2, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Define camera positions for each stage
  const stages = {
    intro: {
      position: [0, 2, 10],
      lookAt: [0, 0, 0],
      fov: 50,
    },
    assembly: {
      position: [3, 1, 6],
      lookAt: [0, 0, 0],
      fov: 45,
    },
    reveal: {
      position: [0, 0.5, 5],
      lookAt: [0, 0.5, 0],
      fov: 40,
    },
    celebrate: {
      position: [0, 1, 7],
      lookAt: [0, 0, 0],
      fov: 50,
    },
  };

  useFrame((state, delta) => {
    if (!camera) return;

    const stageData = stages[stage] || stages.intro;
    const time = state.clock.elapsedTime;

    // Smooth lerp to target position
    targetPosition.current.set(...stageData.position);
    camera.position.lerp(targetPosition.current, delta * 2);

    // Smooth lerp to look at target
    targetLookAt.current.set(...stageData.lookAt);
    
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(-1);
    currentLookAt.add(camera.position);
    
    currentLookAt.lerp(targetLookAt.current, delta * 2);
    camera.lookAt(currentLookAt);

    // Smooth FOV transition
    const targetFov = stageData.fov;
    camera.fov = THREE.MathUtils.lerp(
      camera.fov,
      targetFov,
      delta * 2
    );
    camera.updateProjectionMatrix();

    // Add subtle camera shake during assembly
    if (stage === 'assembly') {
      camera.position.x += Math.sin(time * 10) * 0.02;
      camera.position.y += Math.cos(time * 10) * 0.02;
    }

    // Slow circular movement during celebrate
    if (stage === 'celebrate') {
      const radius = 0.5;
      camera.position.x += Math.sin(time * 0.5) * radius * delta;
      camera.position.z += Math.cos(time * 0.5) * radius * delta;
    }
  });

  return null;
}