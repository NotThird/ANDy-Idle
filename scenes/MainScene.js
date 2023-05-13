import { createMovement, updateMovement } from "../src/systems/characterMovement.js";
import {
  createAnimations,
  updateAnimations,
} from "../src/systems/characterAnimations.js";
import { createCamera, updateCamera } from "../src/systems/Camera.js";
import { Map } from "../src/game/Map.js";
import { TreeObjects } from "../src/entities/treeObjects.js";
import Chunk from "../src/systems/Chunk.js";
import EnemySpawner from "../src/entities/EnemySpawner.js";
import { setupColliders } from "../src/systems/colliders.js";
import PlayerManager from "../src/entities/playerManager.js";
import HealthBar from "../src/entities/HealthBar.js";
import Player from "../src/entities/Player.js";
import Enemy from "../src/entities/Enemy.js";
import Inventory from "../src/systems/Inventory.js";
import Leveling from "../src/systems/Leveling.js";
import PauseScene from "../scenes/PauseScene.js";

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

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  create() {
    this.chunks = [];
    const chunkSize = 5 * 32;

    for (let i = 0; i < 10; i++) {
      const chunk = new Chunk(this, i * chunkSize, 0, chunkSize, chunkSize, [
        "2",
        "4",
        "5",
      ]);
      this.chunks.push(chunk);
    }

    player = new Player(this, 100, 300, "character", 0, "Player1", 1, 0);
    this.physics.add.existing(player);
    player.setOrigin(0.5);
    player.hitbox = this.physics.add.sprite(player.x, player.y);
    player.hitbox.body.setSize(100, 80);
    player.hitbox.visible = false;

    enemySpawner = new EnemySpawner(this, player);

   

    createAnimations(this);
    keys = createMovement(this);
    createCamera(this, player);

    const cameraWidth = this.sys.game.config.width / 2;
    const spawnDistance = 500;
    treeObjects = new TreeObjects(this);
    treeObjects.spawnDistance = spawnDistance;
    treeObjects.create();

    player.inventory = new Inventory();
    player.leveling = new Leveling();

    setupColliders(this, player, enemySpawner, treeObjects);

    const healthBarGraphics = this.add.graphics();

    console.log('MainScene:', this);
    console.log('MainScene.physics:', this.physics);
    console.log('MainScene.physics.add:', this.physics.add);
    
    playerManager = new PlayerManager(player, this, enemySpawner.enemies);

    playerHealthBar = new HealthBar(
      this,
      player.x - 50,
      player.y - 50,
      100,
      10,
      player.health,
      0x00ff00,
      0x000000
    );

    enemyHealthBars = enemySpawner.enemies.getChildren().map((enemy) => {
      const healthBar = new HealthBar(
        this,
        enemy.x - 50,
        enemy.y - 50,
        100,
        10,
        enemy.health,
        0xff0000,
        0x000000
      );
      enemy.on("healthchange", (health) => {
        healthBar.setHealth(health);
      });
      return healthBar;
    });
      const escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      escKey.on('down', () => {
          this.scene.pause();
          this.scene.launch('PauseScene');
      });
  }


  update() {
    console.log(player.hitbox.width, player.hitbox.height);
    enemySpawner.update();
    playerManager.update();
    player.hitbox.x = player.x;
    player.hitbox.y = player.y;

    this.updatePlayer();
    updateCamera(this, player);

    this.chunks.forEach((chunk) => chunk.update(player));

    if (treeObjects) {
      treeObjects.update(player);
    }

    this.updateHealthBar(player, playerHealthBar);

    enemyHealthBars.forEach((healthBar, index) => {
      const enemy = enemySpawner.enemies.getChildren()[index];
      this.updateHealthBar(enemy, healthBar);
    });

    if (player.hasGainedExperience) {
      player.leveling.gainExp(player.experienceGained);
      player.hasGainedExperience = false;
    }
  }

  updatePlayer() {
    if (Phaser.Input.Keyboard.JustDown(keys.SHIFT)) {
      isRunning = !isRunning;
    }

    const isMoving = updateMovement(player, keys, isRunning);
    isAttacking = updateAnimations(
      player,
      keys,
      isMoving,
      isAttacking,
      isRunning
    );
  }

  updateHealthBar(entity, healthBar) {
    healthBar.x = entity.x - entity.displayWidth / 2;
    healthBar.y = entity.y - entity.displayHeight / 2 - 10;

    const healthRatio = entity.health / entity.maxHealth;
    healthBar.setSize(entity.displayWidth * healthRatio, healthBar.height);
  }
}

export default MainScene;
