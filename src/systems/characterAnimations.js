export function createAnimations(scene) {
    // Create the animations
    scene.anims.create({
      key: "walk",
      frames: scene.anims.generateFrameNumbers("character", { start: 112, end: 117  }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "run",
      frames: scene.anims.generateFrameNumbers("character", { start: 9, end: 16 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "idle",
      frames: scene.anims.generateFrameNumbers("character", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "attack",
      frames: scene.anims.generateFrameNumbers("character", { start: 25, end: 36 }),
      frameRate: 10,
    });
    scene.anims.create({
      key: "enemyMoving",
      frames: scene.anims.generateFrameNumbers("enemyMove", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "enemyAttacking",
      frames: scene.anims.generateFrameNumbers("enemyAttack", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    scene.anims.create({
      key: "enemyDying",
      frames: scene.anims.generateFrameNumbers("enemyDie", { start: 0, end: 3 }),
      frameRate: 10,
    });
  }
  
  
  export function updateAnimations(player, keys, isMoving, isAttacking, isRunning) {
    let animKey = isRunning ? "run" : "walk";
  
    if (keys.Q.isDown && !isAttacking) {
      isAttacking = true;
      player.anims.play("attack", true);
      player.once("animationcomplete", () => {
        player.anims.play("idle");
        isAttacking = false;
      });
    } else if (keys.Q.isUp && isAttacking && player.anims.currentAnim.key !== "attack") {
      isAttacking = false;
      player.anims.stop();
      player.anims.play("idle", true);
    }
  
    if (!isMoving && !isAttacking) {
      player.anims.play("idle", true);
    } else if (isMoving && !isAttacking) {
      player.anims.play(animKey, true);
    }
  
    return isAttacking;
  }
  