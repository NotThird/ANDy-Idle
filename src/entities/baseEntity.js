export default class BaseEntity extends Phaser.Physics.Arcade.Sprite {
    name;
    level;
    gearScore;
  baseStats = {
    health: { base: 80, levelMultiplier: 10, gearMultiplier: 2.5 },
    attackPower: { base: 30, levelMultiplier: 5, gearMultiplier: 1.5 },
    defensePoints: { base: 20, levelMultiplier: 3, gearMultiplier: 1 },
    accuracy: { base: 150, levelMultiplier: 15, gearMultiplier: 3 },
    evasion: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
    castingSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
    attackSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
    criticalHitRate: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
    moveSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
    raceDamage: { base: 10, levelMultiplier: 1, gearMultiplier: 0.5 },
    breath: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
    strength: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
  };

  constructor(scene, x, y, texture, frame, name, level, gearScore) {
    super(scene, x, y, texture, frame);
    this.scene = scene;
    this.name = name;
    this.level = level;
    this.gearScore = gearScore;

    // Generate stats based on base values
    for (let stat in this.baseStats) {
      this[stat] = this.calculateStats(
        this.baseStats[stat].base,
        this.baseStats[stat].levelMultiplier,
        this.baseStats[stat].gearMultiplier
      );
    }

    this.maxHealth = this.calculateStats(this.health * 1.2, 0, 0);
    this.animationState = "idle"; // Initial animation state

    this.createAnimations(); // Create animations for the entity
    this.onAnimationComplete = null; // Callback function when animation completes

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  calculateStats(base, levelMultiplier, gearMultiplier) {
    return Math.floor(
      base + this.level * levelMultiplier + this.gearScore * gearMultiplier
    );
  }

  createAnimations() {
    // Implement animation creation logic using Phaser's animation system
  }

  playAnimation(key) {
    if (key !== this.animationState) {
      this.animationState = key;
      this.anims.play(key, true);
    }
  }
  getBaseStats() {
    return this.baseStats;
  }

  update() {
    switch (this.animationState) {
      case "idle":
        // Handle idle state
        break;
      case "running":
        // Handle running state
        break;
      // ... repeat for other states
    }
  }
  updateStats() {
    for (let stat in this.baseStats) {
      this[stat] = this.calculateStats(
        this.baseStats[stat].base,
        this.baseStats[stat].levelMultiplier,
        this.baseStats[stat].gearMultiplier
      );
    }
    this.maxHealth = this.calculateStats(this.health * 1.2, 0, 0);
  }

  setAnimationCompleteCallback(callback) {
    this.onAnimationComplete = callback;
  }

  onAnimationCompleteHandler(animation, frame) {
    if (this.onAnimationComplete) {
      this.onAnimationComplete(animation, frame);
    }
  }

  takeDamage(damage) {
    this.health -= damage;
    console.log(
      `Entity took ${damage} damage, remaining health: ${this.health}`
    );
    this.emit("healthchange", this.health);

    if (this.health <= 0) {
      this.playAnimation("dying");
      this.on("animationcomplete", () => {
        this.destroy();
        this.healthBar.destroy(); // Destroy the health bar when the entity is destroyed
      });
    }
  }
  get level() {
    return this.level;
  }

  set level(newLevel) {
    this.level = newLevel;
  }

}
