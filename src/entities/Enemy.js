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

    this.anims.play('enemyMoving', true);
  }
  update() {
    if (this.target) {
        this.scene.physics.moveToObject(this, this.target, this.speed);  // change this.sprite to this
      }
    // Change animation based on distance to player
    let distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);
    if (distance < 100) { // adjust as needed
      this.anims.play('enemyAttacking', true);
    } else {
      this.anims.play('enemyMoving', true);
    }
    // Assuming 'player' is defined and 'scene' is the current scene
  }

  takeDamage(damage) {
    this.health -= damage;

    if (this.health <= 0) {
      this.anims.play('enemyDying', true);
      this.on('animationcomplete', this.destroy, this);
    }
  }
}
