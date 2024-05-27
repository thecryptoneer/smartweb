import tunnel from "tunnel-rat";
import * as T from "three";

export const webgl = tunnel();

export const getXYFromMouse = (event: MouseEvent) => {
  return {
    x: (event.clientX / window.innerWidth) * 2 - 1,
    y: -(event.clientY / window.innerHeight) * 2,
  };
}

export const getMouseFromXY = (x: number, y: number) => {
  return {
    x: (x + 1) / 2 * window.innerWidth,
    y: -y / 2 * window.innerHeight,
  };
}

// Function to calculate the visible height at a given depth from the perspective camera
export const visibleHeightAtZDepth = (depth: number, camera: T.PerspectiveCamera) => {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) depth -= cameraOffset;
  else depth += cameraOffset;

  const vFOV = (camera.fov * Math.PI) / 180;
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
};

// Function to calculate the visible width at a given depth from the perspective camera
export const visibleWidthAtZDepth = (depth: number, camera: T.PerspectiveCamera) => {
  const height = visibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
};
