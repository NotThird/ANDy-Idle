import BaseEntity from "./baseEntity.js";

export default class Player extends BaseEntity {
  constructor(scene, x, y, texture, frame, name, level, gearScore) {
    super(scene, x, y, texture, frame, name, level, gearScore);
    this.exp = 0;
    this.expToLevelUp = this.level * 100;
  }

  // Player specific method
  gainExp(amount) {
    this.exp += amount;
    if (this.exp >= this.expToLevelUp) {
      this.levelUp();
    }
  }

  levelUp() {
    this.exp -= this.expToLevelUp;
    this.level += 1;  // use setter for level
    this.expToLevelUp = this.level * 100;
    this.updateStats();  // Recalculate stats based on new level
    console.log(`Level Up! New level: ${this.level}`);  // use getter for level
  }

  takeDamage(damage) {
    super.takeDamage(damage);
    if (this.health <= 0) {
      this.health = 0;
      this.die();  // define die() method
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
