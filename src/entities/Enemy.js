// Enemy.js

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, player) {
    super(scene, x, y, 'enemyMove', 0);
    this.scene = scene;
    this.player = player;
    this.health = 100;
    this.speed = 50;
    this.target = this.player;
  
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  
    this.body.setSize(this.width, this.height);
    this.body.setOffset(0, 0);
    
    this.anims.play('enemyMoving', true);

    // Create health bar
    this.healthBar = this.scene.add.graphics();
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(this.x - this.displayWidth / 2, this.y - this.displayHeight / 2 - 10, this.displayWidth, 5);
    this.scene.events.on('update', this.updateHealthBar, this);
  }
  
  update() {
    if (this.target) {
        this.scene.physics.moveToObject(this, this.target, this.speed);
    }
  
    let distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (distance < 100) {
      this.anims.play('enemyAttacking', true);
    } else {
      this.anims.play('enemyMoving', true);
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(`Enemy took ${damage} damage, remaining health: ${this.health}`);
    this.emit('healthchange', this.health);
  
    if (this.health <= 0) {
      this.anims.play('enemyDying', true);
      this.on('animationcomplete', () => {
        this.destroy();
        this.healthBar.destroy(); // Destroy the health bar when the enemy is destroyed
      });
    }
  }
  
  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0x00ff00);
    this.healthBar.fillRect(this.x - this.displayWidth / 2, this.y - this.displayHeight / 2 - 10, this.displayWidth * (this.health / 100), 5);
  }
}