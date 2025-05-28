import { createGameScene } from './core/engine';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

createGameScene(canvas).then(({ engine, scene }) => {
  engine.runRenderLoop(() => {
    scene.render();
  });
});
