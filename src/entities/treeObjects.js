export class TreeObjects {
    constructor(scene) {
      this.scene = scene;
      this.objects = [];
      this.treeSpritesheet = "trees";
      this.treeFrames = [2, 6]; // list of frame indices to randomly choose from
      this.baseOffsetY = 10; // offset for the tree object base
      this.colliderOffsetY = 30; // offset for the collider
      this.spawnDistance = 500; // distance between spawns
      this.spawnDelay = 1000; // time between spawns (in milliseconds)
      this.lastSpawnTime = 0; // time of last spawn
    }
  
    create() {
      // Load the tree spritesheet
      this.scene.load.spritesheet(this.treeSpritesheet, "../assets/images/map/forest_[resources].png", {
        frameWidth: 32,
        frameHeight: 32,
      });
    }
  
    update(player) {
      const currentTime = Date.now();
      if (currentTime - this.lastSpawnTime > this.spawnDelay) {
        if (this.objects.length === 0 || player.x - this.objects[this.objects.length - 1].x > this.spawnDistance) {
          this.spawnTree(player);
          this.lastSpawnTime = currentTime;
        }
      }
    }
  
    spawnTree(player) {
        const x = player.x + Phaser.Math.Between(800, 1000); // random offset to x-coordinate
        const y = 400; // y position of the tree
        const frameIndex = Phaser.Math.RND.pick(this.treeFrames);
        const tree = this.scene.add.image(x, y + this.baseOffsetY, this.treeSpritesheet, frameIndex);
        tree.setScale(2); // Increase the size of the tree
        this.objects.push(tree);
      }
      
  }
  