export function createCamera(scene, target) {
  // Create the camera
  scene.cameras.main.setBounds(0, 0, Infinity, Infinity);
  scene.cameras.main.setZoom(2);
  scene.cameras.main.startFollow(target, true, 0.1, 0.1); // add smooth feature with lerpX and lerpY values
  scene.cameras.main.setFollowOffset(0, 0);

 console.log(target); // add this line
}


  
  export function updateCamera(scene, target) {
    // Update the camera
    scene.cameras.main.setFollowOffset(0, 0);
  }