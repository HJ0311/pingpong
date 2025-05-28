import { Mesh, Scene, Vector3 } from '@babylonjs/core';

export function setupBallMovement(
  ball: Mesh,
  scene: Scene,
  player1Box: Mesh,
  player2Box: Mesh
) {
  let velocity = new Vector3(0.05, 0, 0.1); // 초기 속도
  const maxZ = 8;

  scene.onBeforeRenderObservable.add(() => {
    ball.position.addInPlace(velocity);

    // 벽 반사
    if (ball.position.x > 3 || ball.position.x < -3) {
      velocity.x *= -1;
    }

    // player1 반사
    if (ball.intersectsMesh(player1Box, false) && velocity.z > 0) {
      const normal = new Vector3(0, 0, -1); // player1 박스 기준 surface normal
      velocity = Vector3.Reflect(velocity, normal);
    }

    // player2 반사
    if (ball.intersectsMesh(player2Box, false) && velocity.z < 0) {
      const normal = new Vector3(0, 0, 1); // player2 박스 기준 surface normal
      velocity = Vector3.Reflect(velocity, normal);
    }

    // 골인
    if (ball.position.z > maxZ) {
      console.log('🎯 Player 2 Wins!');
      scene.onBeforeRenderObservable.clear();
    }
    if (ball.position.z < -maxZ) {
      console.log('🎯 Player 1 Wins!');
      scene.onBeforeRenderObservable.clear();
    }
  });
}
