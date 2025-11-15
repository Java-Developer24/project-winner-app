import { useState, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * Lazy load GLTF/GLB models with DRACO compression
 * Only loads when triggered, with progress tracking
 * @param {string} url - Path to GLB file
 * @param {boolean} autoLoad - Whether to load immediately or wait for trigger
 */
export function useGLTFLazy(url, autoLoad = false) {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const loaderRef = useRef(null);
  const dracoRef = useRef(null);

  // Initialize loaders
  useEffect(() => {
    if (!loaderRef.current) {
      loaderRef.current = new GLTFLoader();
      
      // Setup DRACO decoder for compression
      dracoRef.current = new DRACOLoader();
      dracoRef.current.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
      dracoRef.current.setDecoderConfig({ type: 'js' });
      loaderRef.current.setDRACOLoader(dracoRef.current);
    }

    return () => {
      // Cleanup
      if (dracoRef.current) {
        dracoRef.current.dispose();
      }
    };
  }, []);

  // Load model function
  const load = () => {
    if (!url || loading || model) return;

    setLoading(true);
    setError(null);
    setProgress(0);

    loaderRef.current.load(
      url,
      (gltf) => {
        setModel(gltf);
        setLoading(false);
        setProgress(100);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percentComplete = (xhr.loaded / xhr.total) * 100;
          setProgress(percentComplete);
        }
      },
      (err) => {
        console.error('Error loading GLTF:', err);
        setError(err);
        setLoading(false);
      }
    );
  };

  // Auto-load if enabled
  useEffect(() => {
    if (autoLoad && url) {
      load();
    }
  }, [autoLoad, url]);

  // Dispose model
  const dispose = () => {
    if (model) {
      // Traverse and dispose geometries and materials
      model.scene.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      setModel(null);
    }
  };

  return {
    model,
    loading,
    progress,
    error,
    load,
    dispose,
  };
}
