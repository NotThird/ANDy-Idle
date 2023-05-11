export function createMovement(scene) {
    // Create the cursors object
    return scene.input.keyboard.addKeys("W,A,S,D,Q,SHIFT"); // Capturing specific keys
  }
  
  export function updateMovement(player, keys, isAttacking, isRunning) {
    let isMoving = false;
    let speed = isRunning ? 200 : 100; // Different speed for running and walking
    let xDir = 0;
    let yDir = 0;
  
    if (keys.A.isDown) {
      xDir = -1;
      isMoving = true;
      player.flipX = true;
    } else if (keys.D.isDown) {
      xDir = 1
      isMoving = true;
      player.flipX = false;
    }
  
    if (keys.W.isDown) {
      yDir = -1;
      isMoving = true;
    } else if (keys.S.isDown) {
      yDir = 1;
      isMoving = true;
    }
  
    // Move the player sprite
    player.setVelocityX(xDir * speed);
    player.setVelocityY(yDir * speed);
  
    return isMoving;
  }
  