// EnemySpawner.js
import Enemy from './Enemy.js';

export default class EnemySpawner {
  constructor(scene, player, enemyKey = 'enemy', spawnInterval = 2000) {
    this.scene = scene;
    this.player = player;
    this.enemyKey = enemyKey;
    this.spawnInterval = spawnInterval;
    this.enemies = this.scene.physics.add.group();
    this.spawnTimer = this.scene.time.addEvent({
      delay: this.spawnInterval,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    });
  }

  spawnEnemy() {
    const x = Phaser.Math.Between(0, this.scene.game.config.width);
    const y = Phaser.Math.Between(0, this.scene.game.config.height);
  
    let enemy = new Enemy(this.scene, x, y, this.player);  
    this.enemies.add(enemy);
  }
  
  update() {
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
      enemy.update();
    }, this);
  }
}

