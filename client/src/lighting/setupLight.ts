import { HemisphericLight, Scene, Vector3, Color3 } from '@babylonjs/core';

export function setupLight(scene: Scene) {
  const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  light.intensity = 1.2;
  light.diffuse = new Color3(1, 1, 1);
  light.groundColor = new Color3(0.5, 0.5, 0.5);
}
