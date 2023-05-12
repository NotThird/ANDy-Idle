// colliders.js
export function setupColliders(scene, player, enemySpawner, treeObjects) {
    scene.physics.add.collider(player, enemySpawner.enemies, playerEnemyCollision, null, scene);
    scene.physics.add.collider(player, treeObjects.trees, playerTreeCollision, null, scene);
    scene.physics.add.collider(enemySpawner.enemies, treeObjects.trees, enemyTreeCollision, null, scene);
  }
  
  // Handle collision between player and enemy
  function playerEnemyCollision(player, enemy) {
    if (player.isAttacking) {
      // Apply damage to the enemy
      enemy.health -= player.attackDamage;
      if (enemy.health <= 0) {
        // Enemy dies
        console.log("Enemy is dead!");
        // You could emit an event or call a function here to handle the enemy's death.
      }
    } else {
      // Apply damage to the player
      player.health -= enemy.damage;
      if (player.health <= 0) {
        // Player dies
        console.log("Player is dead!");
        // You could emit an event here or call some kind of game over function.
      }
    }
    
    // Adjust player's collider size
    player.body.setSize(player.width, player.height);
    
    // Adjust enemy's collider size
    enemy.body.setSize(enemy.width, enemy.height);
  }
  
  // Handle collision between player and tree
  function playerTreeCollision(player, tree) {
    // For example, prevent player from walking through the tree
    // This will be automatically handled by the Phaser physics system if you set the tree to be immovable.
    // If you want something to happen when the player hits a tree, you could put that here. For example:
    console.log("Player hit a tree!");
  }
  
  // Handle collision between enemy and tree
  function enemyTreeCollision(enemy, tree) {
    // Again, the Phaser physics system will prevent the enemy from walking through the tree if it is immovable.
    // If you want something to happen when the enemy hits a tree, you could put that here. For example:
  }
  