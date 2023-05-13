import Combat from '../game/Combat.js';

export function setupColliders(scene, player, enemySpawner, treeObjects) {
  const combat = new Combat();

  scene.physics.add.overlap(player, enemySpawner.enemies, playerEnemyOverlap, null, scene);
  scene.physics.add.overlap(player, treeObjects.trees, playerTreeOverlap, null, scene);
  scene.physics.add.collider(enemySpawner.enemies, treeObjects.trees, enemyTreeCollision, null, scene);

  function playerEnemyOverlap(player, enemy) {
    if (player.isAttacking) {
      // Apply damage to the enemy
      combat.handleAttack(player, enemy, player.attackPower); // Pass attacker, defender, and damage
      if (enemy.health <= 0) {
        // Enemy dies
        console.log('Enemy is dead!');
        // You could emit an event or call a function here to handle the enemy's death.
      }
    } else {
      // Apply damage to the player
      combat.handleAttack(enemy, player, enemy.attackPower); // Pass attacker, defender, and damage
      if (player.health <= 0) {
        // Player dies
        console.log('Player is dead!');
        // You could emit an event here or call some kind of game over function.
      }
    }
  }

  function playerTreeOverlap(player, tree) {
    // For example, if you want the player to walk through trees without triggering a collision event
    // but still have a minor collision, you can adjust the player's hitbox size.
    const offset = 5; // Adjust this value to set the desired overlap
    player.body.setSize(player.width - offset, player.height - offset);
  }

  function enemyTreeCollision(enemy, tree) {
    // Handle collision between enemy and tree if needed
  }
}
