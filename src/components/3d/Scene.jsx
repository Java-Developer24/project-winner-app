'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import TicketAssembler from './TicketAssembler';
import PrizePedestal from './PrizePedestal';
import CameraRig from './CameraRig';
import ConfettiGPU from './ConfettiGPU';

/**
 * Main 3D scene orchestrator
 * Manages lighting, camera, and stage transitions
 */
function SceneContent({ stage, assemblyProgress, prize, onAssemblyComplete, showConfetti }) {
  return (
    <>
      {/* Camera choreography */}
      <CameraRig stage={stage} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#764ba2" />
      <pointLight position={[5, 3, 5]} intensity={0.5} color="#f093fb" />
      
      {/* Environment for reflections */}
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>

      {/* Ticket assembly animation */}
      {(stage === 'intro' || stage === 'assembly') && (
        <TicketAssembler 
          progress={assemblyProgress} 
          onComplete={onAssemblyComplete}
        />
      )}

      {/* Prize pedestal */}
      {(stage === 'reveal' || stage === 'celebrate') && (
        <PrizePedestal 
          prize={prize} 
          visible={true}
          scale={1}
        />
      )}

      {/* Confetti particles */}
      {showConfetti && (
        <ConfettiGPU count={200} active={showConfetti} />
      )}
    </>
  );
}

export default function Scene({ stage, assemblyProgress, prize, onAssemblyComplete, showConfetti = false }) {
  // Cap pixel ratio for performance
  const pixelRatio = typeof window !== 'undefined' 
    ? Math.min(window.devicePixelRatio, 2) 
    : 1;

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={pixelRatio}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <SceneContent 
          stage={stage}
          assemblyProgress={assemblyProgress}
          prize={prize}
          onAssemblyComplete={onAssemblyComplete}
          showConfetti={showConfetti}
        />
      </Suspense>
    </Canvas>
  );
}