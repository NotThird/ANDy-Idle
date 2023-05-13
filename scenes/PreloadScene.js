
export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    // Add loading text
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    // Add progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 15, 320, 30);

    this.load.on("progress", (value) => {
        console.log(`Load progress: ${value * 100}%`); // Log the progress
        progressBar.clear();
        progressBar.fillStyle(0xffffff, 1);
        progressBar.fillRect(width / 2 - 150, height / 2 - 10, 300 * value, 20);
      });
      
      this.load.on("complete", () => {
        console.log('Loading complete'); // Log when the loading is complete
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
      });
    // Load your assets here
    this.load.spritesheet(
      "character",
      "../assets/animations/PrototypeHero.png",
      {
        frameWidth: 100,
        frameHeight: 80,
      }
    );
    this.load.spritesheet(
      "trees",
      "../assets/images/map/forest_ [resources].png",
      {
        frameWidth: 18,
        frameHeight: 48,
      }
    );
    this.load.spritesheet("tilesheet", "../assets/images/map/forest_.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("tiles", "../assets/images/map/background.png");
    this.load.spritesheet(
      "enemyMove",
      "../assets/images/enemies/Bat/noBKG_BatFlight_strip.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet(
      "enemyAttack",
      "../assets/images/enemies/Bat/noBKG_BatAttack_strip.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
    this.load.spritesheet(
      "enemyDie",
      "../assets/images/enemies/Bat/noBKG_BatDeath_strip.png",
      {
        frameWidth: 64,
        frameHeight: 64,
      }
    );
  }

  create() {
    // Transition to your main game scene here
    this.scene.start("MainScene");
  }
}
