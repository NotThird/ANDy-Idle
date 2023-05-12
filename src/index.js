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
import { setupColliders } from "./systems/colliders.js";
import PlayerManager from "./entities/playerManager.js";
import HealthBar from './entities/HealthBar.js';
import Player from './entities/Player.js';
import Enemy from './entities/Enemy.js';

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
var cursors;
var keys;
var isAttacking = false;
var isRunning = false;
var camera;
var treeObjects;
var enemySpawner;
var playerManager;
let player;
let playerHealthBar;
let enemyHealthBars;

function preload() {
  this.load.spritesheet("character", "../assets/animations/PrototypeHero.png", {
    frameWidth: 100,
    frameHeight: 80,
  });
  this.load.spritesheet(
    "trees",
    "../assets/images/map/forest_ [resources].png",
    {
      frameWidth: 18,
      frameHeight: 48,
    }
  );
  this.load.spritesheet("tilesheet", "../assets/images/map/forest_.png", {
    frameWidth: 32,
    frameHeight: 32,
  });
  this.load.spritesheet(
    "enemyMove",
    "../assets/images/enemies/Bat/noBKG_BatFlight_strip.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  this.load.spritesheet(
    "enemyAttack",
    "../assets/images/enemies/Bat/noBKG_BatAttack_strip.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
  this.load.spritesheet(
    "enemyDie",
    "../assets/images/enemies/Bat/noBKG_BatDeath_strip.png",
    {
      frameWidth: 64,
      frameHeight: 64,
    }
  );
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

  // Create player instance
  player = new Player(this, 100, 300, "character", 0, "Player1", 1, 0);
  this.physics.add.existing(player);
  player.setOrigin(0.5);
  player.hitbox = this.physics.add.sprite(player.x, player.y);
  player.hitbox.body.setSize(100, 80);
  player.hitbox.visible = false;

  enemySpawner = new EnemySpawner(this, player);

  playerManager = new PlayerManager(player, this, enemySpawner.enemies);

  createAnimations(this);
  keys = createMovement(this);
  createCamera(this, player);

  const cameraWidth = config.width / 2;
  const spawnDistance = 500;
  treeObjects = new TreeObjects(this);
  treeObjects.spawnDistance = spawnDistance;
  treeObjects.create();

  // Setup colliders
  setupColliders(this, player, enemySpawner, treeObjects);

  // Create a graphics object for drawing health bars
  const healthBarGraphics = this.add.graphics();

 // Create a health bar for the player
  playerHealthBar = new HealthBar(this, player.x - 50, player.y - 50, 100, 10, player.health, 0x00ff00, 0x000000);

  // Create health bars for enemies
  enemyHealthBars = enemySpawner.enemies.getChildren().map((enemy) => {
    const healthBar = new HealthBar(this, enemy.x - 50, enemy.y - 50, 100, 10, enemy.health, 0xff0000, 0x000000);
    enemy.on("healthchange", (health) => {
      healthBar.setHealth(health);
    });
    return healthBar;
  });
}


function update(scene) {
  console.log(player.hitbox.width, player.hitbox.height); // Log the size of the hitbox
  enemySpawner.update(); // Call the update method of enemy spawner
  playerManager.update();
  player.hitbox.x = player.x;
  player.hitbox.y = player.y;

  updatePlayer();
  updateCamera(this, player);

  // Update chunks
  this.chunks.forEach((chunk) => chunk.update(player));

  if (treeObjects) {
    treeObjects.update(player);
  }
  // Update player's health bar
  updateHealthBar(player, playerHealthBar);

  // Update enemies' health bars
  enemyHealthBars.forEach((healthBar, index) => {
    const enemy = enemySpawner.enemies.getChildren()[index];
    updateHealthBar(enemy, healthBar);
  });
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
}


// Function to update the health bar position and size
function updateHealthBar(entity, healthBar) {
  // Set the position of the health bar above the entity
  healthBar.x = entity.x - entity.displayWidth / 2;
  healthBar.y = entity.y - entity.displayHeight / 2 - 10;

  // Set the width of the health bar based on the entity's health
  const healthRatio = entity.health / entity.maxHealth;
  healthBar.setSize(entity.displayWidth * healthRatio, healthBar.height);
}