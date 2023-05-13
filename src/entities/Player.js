import BaseEntity from "./baseEntity.js";
import Inventory from "../systems/Inventory.js";
import Leveling from "../systems/Leveling.js";

export default class Player extends BaseEntity {
  constructor(scene, x, y, texture, frame, name, level, gearScore) {
    super(scene, x, y, texture, frame, name, level, gearScore);
    this.inventory = new Inventory();
    this.leveling = new Leveling();

    // Override baseStats
    this.baseStats = {
      health: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
      attackPower: { base: 50, levelMultiplier: 5, gearMultiplier: 1.5 },
      defensePoints: { base: 30, levelMultiplier: 3, gearMultiplier: 1 },
      accuracy: { base: 150, levelMultiplier: 15, gearMultiplier: 3 },
      evasion: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
      castingSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
      attackSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
      criticalHitRate: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
      moveSpeed: { base: 5, levelMultiplier: 0.5, gearMultiplier: 0.1 },
      raceDamage: { base: 10, levelMultiplier: 1, gearMultiplier: 0.5 },
      breath: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
      strength: { base: 100, levelMultiplier: 10, gearMultiplier: 2 },
      // Add other stats as needed
    };

    // Set default level and gearScore
    this.level = 1; // Change this to the desired level value
    this.gearScore = 1; // Change this to the desired gearScore value
  }

  // Player specific method
  gainExp(amount) {
    this.leveling.gainExp(amount);
  }

  takeDamage(damage) {
    super.takeDamage(damage);
    if (this.health <= 0) {
      this.health = 0;
      this.die();
    }
  }

  die() {
    console.log(`${this.name} has died.`);
    // Define what should happen when the player dies
  }

  // Overrides BaseEntity's updateStats to recalculate player's stats
  updateStats() {
    super.updateStats(); // Call the base class method first to update baseStats

    // Update player-specific stats
    const baseStats = this.getBaseStats();

    // Update player stats with fixed level and gearScore values
    for (const stat in baseStats) {
      this[stat] = this.calculateStats(
        baseStats[stat].base,
        baseStats[stat].levelMultiplier,
        baseStats[stat].gearMultiplier
      );
    }
  }

  // Retrieve player's stats
  getStats() {
    const stats = {};
    for (const stat in this.baseStats) {
      stats[stat] = this[stat];
    }
    return stats;
  }

  // Calculate stats based on base, levelMultiplier, and gearMultiplier
  calculateStats(base, levelMultiplier, gearMultiplier) {
    return base + (this.level - 1) * levelMultiplier + this.gearScore * gearMultiplier;
  }
}
