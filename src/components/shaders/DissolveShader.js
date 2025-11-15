/**
 * Custom dissolve shader for ticket shard assembly effect
 * Creates a magical dissolve/assemble transition with edge glow
 */

export const DissolveShader = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uColor: { value: [0.4, 0.2, 0.6] },
    uGlowColor: { value: [1.0, 0.5, 1.0] },
    uDissolveTexture: { value: null },
  },
  
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    uniform float uProgress;
    uniform float uTime;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normal;
      
      // Add subtle wave displacement during assembly
      vec3 pos = position;
      float wave = sin(position.x * 3.0 + uTime * 2.0) * 0.05 * (1.0 - uProgress);
      pos.y += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    
    uniform float uProgress;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    
    void main() {
      // Create noise pattern for dissolve
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      float dissolve = smoothstep(noise - 0.1, noise + 0.1, uProgress);
      
      // Edge glow effect
      float edgeGlow = smoothstep(0.0, 0.2, abs(dissolve - 0.5) * 2.0);
      vec3 glow = uGlowColor * edgeGlow * (1.0 - uProgress);
      
      // Fresnel rim lighting
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 3.0);
      
      // Combine colors
      vec3 finalColor = mix(
        uColor + glow + fresnel * 0.3,
        uColor * 1.5,
        uProgress
      );
      
      // Fade in opacity during assembly
      float alpha = dissolve;
      
      if (alpha < 0.01) discard;
      
      gl_FragColor = vec4(finalColor, alpha);
    }
  `,
};
