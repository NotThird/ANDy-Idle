
import PreloadScene from '../scenes/PreloadScene.js';
import MainScene from '../scenes/MainScene.js';
import PauseScene from '../scenes/PauseScene.js';
import MenuScene from '../scenes/MenuScene.js';

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 1000,
  physics: {
    default: "arcade",
  },
  scene: [PreloadScene, MainScene, PauseScene, MenuScene]
};

const game = new Phaser.Game(config);
