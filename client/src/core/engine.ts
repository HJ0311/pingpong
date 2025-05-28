import { Engine, Scene } from '@babylonjs/core';
import { setupCamera } from '../camera/setupCamera';
import { setupLight } from '../lighting/setupLight';
import { createGameObjects } from './scene';
import { setupBallMovement } from '../physics/setupBallMovement';
import { setupPlayerInput } from '../input/setupPlayerInput';

export async function createGameScene(canvas: HTMLCanvasElement) {
  const engine = new Engine(canvas, true);
  const scene = new Scene(engine);

  setupCamera(scene, canvas);
  setupLight(scene);

  const { player1, player2, player1Box, player2Box, ball } = await createGameObjects(scene);

  setupPlayerInput(player1, player2, scene);
  setupBallMovement(ball, scene, player1Box, player2Box);

  return { engine, scene };
}
