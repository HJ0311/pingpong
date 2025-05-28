import { Scene } from '@babylonjs/core';
import { createGameObjects as createObjects } from '../objects/createGameObjects';

export async function createGameObjects(scene: Scene) {
  return await createObjects(scene);
}
