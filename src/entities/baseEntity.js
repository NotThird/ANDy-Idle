export default class BaseEntity extends Phaser.Physics.Arcade.Sprite {
  /**
   * The name of the entity.
   * @type {string}
   */
  name;

  /**
   * The level of the entity.
   * @type {number}
   */
  level;

  /**
   * The gear score of the entity.
   * @type {number}
   */
  gearScore;

  /**
   * The base stats of the entity.
   * @type {{
      health: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      attackPower: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      defensePoints: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      accuracy: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      evasion: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      castingSpeed: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      attackSpeed: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      criticalHitRate: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      moveSpeed: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      raceDamage: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      breath: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
      strength: {
        base: number;
        levelMultiplier: number;
        gearMultiplier: number;
      };
    }}
   */
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

  /**
   * The maximum health of the entity.
   * @type {number}
   */
  maxHealth;

  /**
   * The current health of the entity.
   * @type {number}
   */
  health;

  /**
   * The current animation state of the entity.
   * @type {string}
   */
  animationState = "idle";

  /**
   * The callback function to be called when the animation completes.
   * @type {function}
   */
  onAnimationComplete = null;

  constructor(scene, x, y, texture, frame, name, level, gearScore) {
    super(scene, x, y, texture, frame);
  
    this.name = name;
    this.level = level;
    this.gearScore = gearScore;
  
    // Calculate the base stats of the entity.
    for (let stat in this.baseStats) {
      this[stat] = this.calculateStats(
        this.baseStats[stat].base,
        this.level * this.baseStats[stat].levelMultiplier,
        this.gearScore * this.baseStats[stat].gearMultiplier
      );
    }
  
    this.maxHealth = this.calculateStats(this.health * 1.2, 0, 0);
    this.animationState = "idle"; // Initial animation state
  
    // Create animations for the entity.
    this.createAnimations();
    this.onAnimationComplete = null; // Callback function when animation completes
  
    // Enable physics for the entity.
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
        this.level * this.baseStats[stat].levelMultiplier,
        this.gearScore * this.baseStats[stat].gearMultiplier
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
    this.updateStats();
  }
  }
  