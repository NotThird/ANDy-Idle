import BaseEntity from "./baseEntity.js";
import Inventory from "../systems/Inventory.js";
import Leveling from "../systems/Leveling.js";

export default class Player extends BaseEntity {
  constructor(scene, x, y, texture, frame, name, level, gearScore) {
    super(scene, x, y, texture, frame, name, level, gearScore);
    this.inventory = new Inventory();
    this.leveling = new Leveling();
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
    const baseStats = this.getBaseStats();
    for (let stat in baseStats) {
      this[stat] = this.calculateStats(
        baseStats[stat].base,
        baseStats[stat].levelMultiplier,
        baseStats[stat].gearMultiplier
      );
    }
    this.maxHealth = this.calculateStats(this.health * 1.2, 0, 0);
  }
}
