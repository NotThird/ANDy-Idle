// colliders.js
export function setupColliders(scene, player, enemySpawner, treeObjects) {
    scene.physics.add.collider(player, enemySpawner.enemies, playerEnemyCollision, null, scene);
    scene.physics.add.collider(player, treeObjects.trees, playerTreeCollision, null, scene);
    scene.physics.add.collider(enemySpawner.enemies, treeObjects.trees, enemyTreeCollision, null, scene);
  }
  
// Handle collision between player and enemy
function playerEnemyCollision(player, enemy) {
    // For example, decrease player's health
    player.health -= enemy.damage;
    if (player.health <= 0) {
      // Player dies
      console.log("Player is dead!");
      // You could emit an event here or call some kind of game over function.
    }
    // For player
player.body.setSize(50, 40);

// For enemies
enemy.body.setSize(4, 4);
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
    console.log("Enemy hit a tree!");
  }