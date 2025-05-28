import { ArcRotateCamera, Scene, Vector3 } from '@babylonjs/core';

export function setupCamera(scene: Scene, canvas: HTMLCanvasElement) {
  const camera = new ArcRotateCamera(
    'Camera',
    Math.PI / 2,
    Math.PI / 4,
    20,
    Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, false);
  camera.wheelDeltaPercentage = 0.01;
  camera.lowerRadiusLimit = 10;
  camera.upperRadiusLimit = 30;

  camera.keysUp = [];
  camera.keysDown = [];
  camera.keysLeft = [];
  camera.keysRight = [];

  return camera;
}
