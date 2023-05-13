import PlayerManager from "../src/entities/playerManager.js";
import Player from "../src/entities/Player.js";
import Enemy from "../src/entities/Enemy.js";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("menuBackground", "../assets/images/map/background.png");
  }

  create() {
    // Add background image
    const background = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, "menuBackground");
    background.setScale(Math.max(this.cameras.main.width / background.width, this.cameras.main.height / background.height));

    // Create a player instance for testing
    const player = new Player(this, /* pass required parameters */);

    // Create UI panel
    const panelWidth = 600;
    const panelHeight = 400;
    const panelX = this.cameras.main.centerX;
    const panelY = this.cameras.main.centerY;
    const panel = this.add.rectangle(panelX, panelY, panelWidth, panelHeight, 0x999999);

    // Create UI for player stats
    const style = { font: "16px Arial", fill: "#000", align: "left" };
    const playerStats = player.getStats();
    let statText = "";
    for (let stat in playerStats) {
      statText += `${stat}: ${playerStats[stat]}\n`;
    }
    const statsText = this.add.text(panelX - panelWidth / 2 + 20, panelY - panelHeight / 2 + 20, statText, style);

    // Add start game button
    const buttonWidth = 200;
    const buttonHeight = 60;
    const buttonX = this.cameras.main.centerX - buttonWidth / 2;
    const buttonY = panelY + panelHeight / 2 + buttonHeight + 20;

    const startButton = this.add.rectangle(buttonX, buttonY, buttonWidth, buttonHeight, 0x336699).setInteractive();
    const startButtonText = this.add.text(buttonX, buttonY, "Start Game", {
      font: "24px Arial",
      fill: "#ffffff",
    });
    startButtonText.setOrigin(0.5);

    startButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });

    // Add settings button
    const settingsButton = this.add.rectangle(buttonX, buttonY + buttonHeight + 20, buttonWidth, buttonHeight, 0x336699).setInteractive();
    const settingsButtonText = this.add.text(buttonX, buttonY + buttonHeight + 20, "Settings", {
      font: "24px Arial",
      fill: "#ffffff",
    });
    settingsButtonText.setOrigin(0.5);

    settingsButton.on("pointerdown", () => {
      this.scene.start("SettingsScene");
    });
  }
}
