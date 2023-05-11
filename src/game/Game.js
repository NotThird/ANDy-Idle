import { createMovement, updateMovement } from './characterMovement.js';
import { createAnimations, updateAnimations } from './characterAnimations.js';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
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

function preload() {
  this.load.spritesheet("character", "animations/PrototypeHero.png", {
    frameWidth: 100,
    frameHeight: 80,
  });
}

function create() {
  // Create the player sprite
  player = this.physics.add.sprite(100, 300, "character", 0);
  player.setOrigin(0.5);

  // Create the animations
  createAnimations(this);

  // Create the cursors object
  keys = createMovement(this);
}

function update() {
  // Handle running state
  if (Phaser.Input.Keyboard.JustDown(keys.SHIFT)) {
    isRunning = !isRunning; // Toggle running state
  }

  let isMoving = updateMovement(player, keys, isAttacking, isRunning);

  isAttacking = updateAnimations(player, keys, isMoving, isAttacking, isRunning);
}
