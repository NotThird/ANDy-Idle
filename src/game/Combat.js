import Player from '../entities/Player.js';
import Enemy from '../entities/Enemy.js';

class Combat {
  constructor() {
    this.handleAttack = this.handleAttack.bind(this);
  }

  /**
   * Determines if the attacker is in range of the defender.
   * @param {Entity} attacker The attacker entity.
   * @param {Entity} defender The defender entity.
   * @param {number} range The attack range of the attacker.
   * @returns {boolean} Whether the attacker is in range of the defender.
   */
  isInRange(attacker, defender, range) {
    // Check if the attacker and defender are defined.
    if (!attacker || !defender) {
      console.error('Attacker or defender is undefined');
      return false;
    }

    // Check if the attacker and defender have an x property.
    if (typeof attacker.x === 'undefined' || typeof defender.x === 'undefined') {
      console.error('Attacker or defender does not have x property');
      return false;
    }

    // Calculate the distance between the attacker and defender.
    const distance = Phaser.Math.Distance.Between(attacker.x, attacker.y, defender.x, defender.y);

    // Return true if the distance is less than or equal to the attack range.
    return distance <= range;
  }

  /**
   * Handles an attack from the attacker to the defender.
   * @param {Entity} attacker The attacker entity.
   * @param {Entity} defender The defender entity.
   * @param {number} damage The amount of damage to deal.
   */
  handleAttack(attacker, defender, damage) {
    // Check if the attacker is a player or an enemy.
    if (attacker instanceof Player) {
      // Player attacking
      if (this.isInRange(attacker, defender, attacker.attackRange)) {
        defender.takeDamage(damage);
      }
    } else if (attacker instanceof Enemy) {
      // Enemy attacking
      if (this.isInRange(attacker, defender, attacker.attackRange)) {
        defender.takeDamage(damage);
      }
    } else {
      console.error('Invalid attacker type');
    }
  }
}

export default Combat;