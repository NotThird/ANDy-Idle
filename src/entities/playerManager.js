import MainScene from "../../scenes/MainScene.js";
import {
  createMovement,
  updateMovement,
} from "../systems/characterMovement.js";
import Player from "./Player.js";

export default class PlayerManager {
  constructor(player, scene, enemies) {
    console.log("PlayerManager: Constructor called");
    this.player = player;
    this.scene = scene;
    this.input = this.scene.input;

    this.enemies = enemies;
    this.keyQ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.keys = createMovement(scene); // Import createMovement function
    this.player.attackDamage = 100;

    // Create attackCollider
    console.log("PlayerManager.scene.physics:", this.scene.physics);
    this.player.attackCollider = this.scene.physics.add.sprite(
      this.player.x,
      this.player.y,
      null
    );

    console.log(this.scene); // Should log a Phaser.Scene object
    console.log(this.scene.physics); // Should log a Phaser.Physics object
    console.log(this.scene.physics.add); // Should log an object with Phaser physics methods

    this.player.attackCollider.setSize(
      this.player.width * 2,
      this.player.height * 2
    );
    this.player.attackCollider.visible = false;

    // Create health bar
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  attack() {
    if (
      Phaser.Input.Keyboard.JustDown(this.keyQ) &&
      !this.isAttacking &&
      !this.attackCooldown
    ) {
      this.isAttacking = true;
      this.attackCooldown = true;
      this.scene.time.delayedCall(500, () => {
        this.isAttacking = false;
      });
      this.scene.time.delayedCall(1000, () => {
        this.attackCooldown = false;
      });

      const attackRange = 50; // Adjust as needed

      // Loop through all enemies and check if they are within attack range
      this.enemies.getChildren().forEach((enemy) => {
        const distance = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          enemy.x,
          enemy.y
        );
        if (distance <= attackRange) {
          enemy.takeDamage(this.player.attackDamage);
        }
      });
    }
  }
  damageEnemy(enemy) {
    console.log("PlayerManager: damageEnemy method called");
    enemy.health -= this.player.attackDamage;
    if (enemy.health <= 0) {
      enemy.disableBody(true, true);
    }
  }

  update() {
    // Update attackCollider position to follow the player
    this.player.attackCollider.setPosition(this.player.x, this.player.y);

    if (Phaser.Input.Keyboard.JustDown(this.keys.Q)) {
      console.log("PlayerManager: Q key pressed in update method");
      this.attack();
    }
    this.isAttacking = Phaser.Input.Keyboard.JustDown(this.keys.Q);
    this.isRunning = this.keys.SHIFT.isDown;

    const isMoving = updateMovement(
      this.player,
      this.keys,
      this.isAttacking,
      this.isRunning
    );
    const playerHealth = this.player.health; // Access player's health using the health property

    // Update health bar position
    this.healthBar.x = this.player.x - this.healthBar.width / 2;
    this.healthBar.y = this.player.y - this.player.height / 2 - 10;

    // Update health bar
    this.updateHealthBar();
  }

  updateHealthBar() {
    const healthBarWidth = 100;
    const healthBarHeight = 10;
    const { x, y } = this.player;

    const barX = x - healthBarWidth / 2;
    const barY = y - this.player.height / 2 - 20; // Adjust the Y position to fit the health bar above the player

    this.healthBar.clear();
    this.healthBar.fillStyle(0xff0000);
    this.healthBar.fillRect(barX, barY, healthBarWidth, healthBarHeight);
    this.healthBar.fillStyle(0x00ff00);
    const remainingHealth =
      (this.player.health / this.player.maxHealth) * healthBarWidth; // Access player's health directly
    this.healthBar.fillRect(barX, barY, remainingHealth, healthBarHeight);
  }
}
