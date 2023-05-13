class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: "BootScene" });
    }
  
    create() {
      console.log("BootScene started");
      // Add code here to initialize your game
      this.scene.start("PreloadScene");
    }
  }
  
  export default BootScene;
  