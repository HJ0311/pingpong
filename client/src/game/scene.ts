import {
  MeshBuilder,
  Mesh,
  Scene,
  StandardMaterial,
  Color3,
  Vector3,
} from '@babylonjs/core';
import '@babylonjs/loaders'; // glb 로더 필수
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';



export type GameObjects = {
  table: Mesh;
  ball: Mesh;
  player1: Mesh;
  player2: Mesh;
};

export async function createGameObjects(scene: Scene): Promise<GameObjects> {
  // 탁구대
  const table = MeshBuilder.CreateBox('table', {
    width: 6,
    height: 0.2,
    depth: 12,
  }, scene);
  const tableMaterial = new StandardMaterial('tableMat', scene);
  tableMaterial.diffuseColor = new Color3(0.2, 0.6, 0.2);
  table.material = tableMaterial;
  table.position.y = -0.1;

  // 공
  const { meshes: bulletMeshes } = await SceneLoader.ImportMeshAsync(
    '',           // namePrefix
    '/assets/',   // 경로 (public/assets/bullet.glb)
    'bullet.glb', // 파일명
    scene
  );
  const ball = bulletMeshes.find(mesh => mesh.name !== '__root__') as Mesh;
  ball.name = 'ball';
  ball.scaling = new Vector3(1, 0.5, 1); // 크기 조절
  ball.position = new Vector3(0, 0.25, 0);    // 초기 위치 설정;

  // player1 모델 로딩
  const { meshes: player1Meshes } = await SceneLoader.ImportMeshAsync(
    '',           // namePrefix
    '/assets/',   // 경로 (public/models 폴더)
    'Pistol.glb', // 파일명
    scene
  );
  const player1 = player1Meshes[0] as Mesh;
  player1.name = 'player1';
  player1.position = new Vector3(2.5, 0, 5.5);
  player1.scaling = new Vector3(5, 5, 5); // 필요 시 크기 조절

  // player2는 clone
  const player2 = player1.clone('player2')!;
  player2.position = new Vector3(2.5, 0, -5.5);
  player2.rotation = new Vector3(0, Math.PI, 0); // 반대 방향

  return {
    table,
    ball,
    player1,
    player2,
  };
}
