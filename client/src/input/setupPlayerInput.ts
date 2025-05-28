import { Mesh, Scene } from '@babylonjs/core';

export function setupPlayerInput(player1: Mesh, player2: Mesh, scene: Scene) {
  const inputMap: Record<string, boolean> = {};

  window.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(e.key)) {
      e.preventDefault();
    }
    inputMap[e.key] = true;
  });

  window.addEventListener('keyup', (e) => {
    inputMap[e.key] = false;
  });

  scene.onBeforeRenderObservable.add(() => {
    const speed = 0.2;

    if (inputMap['ArrowLeft']) player1.position.x += speed;
    if (inputMap['ArrowRight']) player1.position.x -= speed;

    if (inputMap['a']) player2.position.x += speed;
    if (inputMap['d']) player2.position.x -= speed;

    const leftLimit = -1.5;
    const rightLimit = 7.0;

    player1.position.x = Math.max(leftLimit, Math.min(rightLimit, player1.position.x));
    player2.position.x = Math.max(leftLimit, Math.min(rightLimit, player2.position.x));
  });
}
