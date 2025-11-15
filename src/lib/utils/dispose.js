/**
 * Three.js resource disposal utilities
 * Prevents memory leaks by properly disposing geometries, materials, and textures
 */

/**
 * Recursively dispose a Three.js object and its children
 * @param {Object3D} object - Three.js object to dispose
 */
export function disposeObject(object) {
  if (!object) return;

  // Traverse children first
  if (object.children) {
    object.children.forEach(child => disposeObject(child));
  }

  // Dispose geometry
  if (object.geometry) {
    object.geometry.dispose();
  }

  // Dispose material(s)
  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => disposeMaterial(material));
    } else {
      disposeMaterial(object.material);
    }
  }

  // Dispose textures
  if (object.texture) {
    object.texture.dispose();
  }

  // Remove from parent
  if (object.parent) {
    object.parent.remove(object);
  }
}

/**
 * Dispose a Three.js material and its textures
 * @param {Material} material - Three.js material
 */
export function disposeMaterial(material) {
  if (!material) return;

  // Dispose all texture properties
  const textureProps = [
    'map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap',
    'envMap', 'alphaMap', 'aoMap', 'displacementMap', 'emissiveMap',
    'gradientMap', 'metalnessMap', 'roughnessMap'
  ];

  textureProps.forEach(prop => {
    if (material[prop] && material[prop].dispose) {
      material[prop].dispose();
    }
  });

  material.dispose();
}

/**
 * Dispose a Three.js scene and all its contents
 * @param {Scene} scene - Three.js scene
 */
export function disposeScene(scene) {
  if (!scene) return;

  scene.traverse(object => {
    disposeObject(object);
  });

  scene.clear();
}
