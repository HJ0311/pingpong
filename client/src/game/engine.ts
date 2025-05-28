import {
  Engine,
  Scene,
  ArcRotateCamera,
  HemisphericLight,
  Vector3,
} from '@babylonjs/core';
import { createGameObjects } from './scene';

export function createGameScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  const camera = new ArcRotateCamera(
  'Camera',
  Math.PI / 2,
  Math.PI / 4,
  20,
  Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

camera.wheelDeltaPercentage = 0.01; // 또는 camera.wheelPrecision = 100;
camera.lowerRadiusLimit = 10;
camera.upperRadiusLimit = 30;

  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

  createGameObjects(scene);

  return { engine, scene };
}
