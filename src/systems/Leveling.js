export default class Leveling {
    constructor() {
      this.level = 1;
      this.exp = 0;
      this.expToNextLevel = this.calculateExpToNextLevel();
    }
  
    calculateExpToNextLevel() {
      // Formula to calculate the experience required for the next level
      return Math.floor(100 * Math.pow(this.level, 1.5));
    }
  
    gainExp(amount) {
      this.exp += amount;
      if (this.exp >= this.expToNextLevel) {
        this.levelUp();
      }
    }
  
    levelUp() {
      this.level++;
      this.exp -= this.expToNextLevel;
      this.expToNextLevel = this.calculateExpToNextLevel();
      console.log(`Level Up! You are now level ${this.level}`);
    }
  }
  