export default class HealthBar extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, maxHealth, fillColor, borderColor) {
      super(scene, x, y);
  
      this.barWidth = width;
      this.barHeight = height;
      this.maxHealth = maxHealth;
      this.fillColor = fillColor;
      this.borderColor = borderColor;
  
      // Create the background bar
      this.backgroundBar = scene.add.rectangle(0, 0, width, height, borderColor);
      this.backgroundBar.setOrigin(0, 0);
      this.add(this.backgroundBar);
  
      // Create the health bar
      this.healthBar = scene.add.rectangle(0, 0, width, height, fillColor);
      this.healthBar.setOrigin(0, 0);
      this.healthBar.displayWidth = width; // Start with full width
      this.add(this.healthBar);
  
      // Add this container to the scene
      scene.add.existing(this);
    }
  
    setHealth(health) {
      // Update the width of the health bar based on the current health
      const newWidth = (health / this.maxHealth) * this.barWidth;
      this.healthBar.displayWidth = newWidth;
    }
  }
  