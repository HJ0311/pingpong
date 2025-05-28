import './index.css';
import { createGameScene } from './game/engine';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const { engine, scene } = createGameScene(canvas);

engine.runRenderLoop(() => {
  scene.render();
});
