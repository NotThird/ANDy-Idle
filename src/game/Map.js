export class Map {
    constructor(scene, key, width, height) {
      this.scene = scene;
      this.width = width;
      this.height = height;
  
      // Create a tiled sprite for the map
      this.sprite = this.scene.add.tileSprite(0, 0, width, height, key);
  
      // Set the sprite to repeat infinitely
      this.sprite.tileScaleX = this.scene.cameras.main.width / this.sprite.width;
      this.sprite.tileScaleY = this.scene.cameras.main.height / this.sprite.height;
    }
  
    update(player) {
      // Move the map based on the player's position
      const x = player.x % this.width;
      const y = player.y % this.height;
  
      this.sprite.tilePositionX = -x;
      this.sprite.tilePositionY = -y;
    }
  }
  