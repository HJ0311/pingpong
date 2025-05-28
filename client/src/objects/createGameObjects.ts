import {
  MeshBuilder,
  Mesh,
  Scene,
  StandardMaterial,
  Color3,
  Vector3
} from '@babylonjs/core';
import '@babylonjs/loaders';
import { SceneLoader } from '@babylonjs/core/Loading/sceneLoader';

export type GameObjects = {
  table: Mesh;
  ball: Mesh;
  player1: Mesh;
  player2: Mesh;
  player1Box: Mesh;
  player2Box: Mesh;
};

export async function createGameObjects(scene: Scene): Promise<GameObjects> {
  // 탁구대
  const table = MeshBuilder.CreateBox('table', {
    width: 6,
    height: 0.2,
    depth: 12,
  }, scene);
  const tableMaterial = new StandardMaterial('tableMat', scene);
  tableMaterial.diffuseColor = new Color3(1, 1, 1);
  table.material = tableMaterial;
  table.position.y = -0.1;

  // 유리 네트
  const net = MeshBuilder.CreateBox('net', {
    width: 6,
    height: 0.5,
    depth: 0.05,
  }, scene);
  const netMaterial = new StandardMaterial('netMat', scene);
  netMaterial.diffuseColor = new Color3(0.8, 0.9, 1);
  netMaterial.alpha = 0.4;
  netMaterial.specularColor = new Color3(1, 1, 1);
  net.material = netMaterial;
  net.position.y = 0.25;
  net.position.z = 0;

  // 공
  const { meshes: bulletMeshes } = await SceneLoader.ImportMeshAsync(
    '',
    '/assets/',
    'bullet.glb',
    scene
  );
  const ball = bulletMeshes[0] as Mesh;
  ball.name = 'ball';
  ball.position = new Vector3(0, 0.25, 0);
  ball.scaling = new Vector3(1, 0.5, 1);

  // player1
  const { meshes: player1Meshes } = await SceneLoader.ImportMeshAsync(
    '',
    '/assets/',
    'Pistol.glb',
    scene
  );
  const player1 = player1Meshes[0] as Mesh;
  player1.name = 'player1';
  player1.position = new Vector3(2.5, 0, 7);
  player1.scaling = new Vector3(5, 5, 5);

  // player2
  const player2 = player1.clone('player2')!;
  player2.position = new Vector3(2.5, 0, -7);
  player2.rotation = new Vector3(0, Math.PI, 0);

  // player1 충돌 박스
  const player1Box = MeshBuilder.CreateBox('player1Box', {
    width: 0.3,
    height: 0.2,
    depth: 0.05,
  }, scene);
  player1Box.isVisible = true;
  player1Box.parent = player1;
  player1Box.position = new Vector3(0.58, 0.1, 0);

  const player2Box = player1Box.clone('player2Box');
  player2Box.parent = player2;
  player2Box.position = new Vector3(0.58, 0.1, 0); 

  return {
    table,
    ball,
    player1,
    player2,
    player1Box,
    player2Box,
  };
}
