export default class Chunk extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, tilesheetKeys) {
      super(scene, x, y);
  
      this.width = width;
      this.height = height;
      this.tilesheetKeys = tilesheetKeys;
  
      this.generate();
  
      scene.add.existing(this);
    }
  
    generate() {
      for (let y = 0; y < this.height; y += 32) {
        for (let x = 0; x < this.width; x += 32) {
          const tileKey = this.tilesheetKeys[Phaser.Math.Between(0, this.tilesheetKeys.length - [13, 15])];
          const tile = this.scene.add.tileSprite(x, y, 32, 32, tileKey);
          this.add(tile);
        }
      }
    }
}
