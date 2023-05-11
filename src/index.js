import { createMovement, updateMovement } from "./systems/characterMovement.js";
import {
  createAnimations,
  updateAnimations,
} from "./systems/characterAnimations.js";
import { createCamera, updateCamera } from "./systems/Camera.js";
import { Map } from "./game/Map.js";
import { TreeObjects } from "./entities/treeObjects.js";
import Chunk from "./systems/Chunk.js";
import EnemySpawner from "./entities/EnemySpawner.js";

var config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 1000,
  physics: {
    default: "arcade",
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var player;
var cursors;
var keys;
var isAttacking = false;
var isRunning = false;
var camera;
var treeObjects;
var enemySpawner;

function preload() {
  this.load.spritesheet("character", "../assets/animations/PrototypeHero.png", {
    frameWidth: 100,
    frameHeight: 80,
  });
  this.load.spritesheet("trees", "../assets/images/map/forest_ [resources].png", {
    frameWidth: 18,
    frameHeight: 48,
  });
  this.load.spritesheet("tilesheet", "../assets/images/map/forest_.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet("enemyMove", "../assets/images/enemies/Bat/noBKG_BatFlight_strip.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("enemyAttack", "../assets/images/enemies/Bat/noBKG_BatAttack_strip.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
  this.load.spritesheet("enemyDie", "../assets/images/enemies/Bat/noBKG_BatDeath_strip.png", {
    frameWidth: 64,
    frameHeight: 64,
  });
}

function create() {
  this.chunks = [];
  const chunkSize = 5 * 32;

  for (let i = 0; i < 10; i++) {
    const chunk = new Chunk(
        this,
        i * chunkSize,
        0,
        chunkSize,
        chunkSize,
        ["2", "4", "5"]
      );
    this.chunks.push(chunk);
  }

  player = this.physics.add.sprite(100, 300, "character", 0);
  player.setOrigin(0.5);
  player.hitbox = this.physics.add.sprite(player.x, player.y);
  player.hitbox.body.setSize(100, 80); 
  player.hitbox.visible = false; 

  createAnimations(this);
  keys = createMovement(this);
  createCamera(this, player);

  const cameraWidth = config.width / 2;
  const spawnDistance = 500;
  treeObjects = new TreeObjects(this);
  treeObjects.spawnDistance = spawnDistance;
  treeObjects.create();
 // Create the enemy spawner and pass the required parameters
 enemySpawner = new EnemySpawner(this, player);
}

function update() {
  player.hitbox.x = player.x;
  player.hitbox.y = player.y;

  updatePlayer();
  updateCamera(this, player);

  // Update chunks
  this.chunks.forEach(chunk => chunk.update(player));

  if (treeObjects) {
    treeObjects.update(player);
  }
  enemySpawner.update(); // Call the update method of enemy spawner
}

function updatePlayer() {
  if (Phaser.Input.Keyboard.JustDown(keys.SHIFT)) {
    isRunning = !isRunning; // Toggle running state
  }

  const isMoving = updateMovement(player, keys, isRunning);
  isAttacking = updateAnimations(
    player,
    keys,
    isMoving,
    isAttacking,
    isRunning
  ); // Use the returned isAttacking flag
  game.scene.start(); // Start the game scene
}
