let accX = 0.5; // Adjusted to provide a constant rotation speed
let accY = 0.75;
let spawn = 0;
let objects = []; // Array to store objects, can be rectangles or cubes

let opacity = 100; // Base opacity

let faceColors;

let noteSpeed = 50;

let lastSpawnTime = 0; // Track the time since the last spawn
let spawnDelay = 1000; // Initial delay in milliseconds, can be adjusted

// Define predeterminedLocations in the global scope
let predeterminedLocations = [];

function setup() {
  createCanvas(600, 600, WEBGL); // Set up canvas for 3D rendering
  frameRate(60); // Set the frame rate to 120 fps
  noCursor()
  // Adjust color function calls to include an alpha value for semi-transparency
  faceColors = [
    color(255, 0, 0, opacity),   // Color for rectangles/cubes
    color(0, 255, 0, opacity),
    color(0, 0, 255, opacity),
    color(255, 255, 0, opacity),
    color(255, 0, 255, opacity),
    color(0, 255, 255, opacity),
    color(255, 255, 255, opacity)
  ];

  predeterminedLocations = [
    {x: -windowWidth / 6, y: -windowHeight / 6, z: -5000},
    {x: 0, y: -windowHeight / 6, z: -5000},
    {x: windowWidth / 6, y: -windowHeight / 6, z: -5000},
    {x: -windowWidth / 6, y: 0, z: -5000},
    {x: 0, y: 0, z: -5000},
    {x: windowWidth / 6, y: 0, z: -5000},
    {x: -windowWidth / 6, y: windowHeight / 6, z: -5000},
    {x: 0, y: windowHeight / 6, z: -5000},
    {x: windowWidth / 6, y: windowHeight / 6, z: -5000}
  ];

  // Add initial spinning cubes
  objects.push({type: 'cube', x: 440, y: -550, z: -550, size: 131, angles: [221, 763], opacity, rotate: true, moveTowardsCamera: false});
  objects.push({type: 'cube', x: 0, y: -320, z: -200, size: 72, angles: [923, 251], opacity, rotate: true, moveTowardsCamera: false});
  objects.push({type: 'cube', x: -300, y: 400, z: -300, size: 106, angles: [245, 4], opacity, rotate: true, moveTowardsCamera: false});
  objects.push({type: 'cube', x: 300, y: 200, z: -200, size: 106, angles: [100, 320], opacity, rotate: true, moveTowardsCamera: false});
  
  

  
}

function drawCube(x, y, z, size, angles, opacity) {
  push();
  translate(x, y, z);
  rotateX(radians(angles[0]));
  rotateY(radians(angles[1]));
  // Apply colors to faces (optional, depending on your visual requirements)
  for (let i = 0; i < 6; i++) {
    fill(faceColors[0]);
    // Draw each face of the cube here
    // This is a placeholder; you'll need to use box() or a custom method to draw each face
  }
  box(size); // Using box to represent the cube
  pop();
}

function drawRectangle(x, y, z, w, h, d, angles, opacity) {
  push();
  translate(x, y, z);
  rotateX(radians(angles[0]));
  rotateY(radians(angles[1]));
  fill(faceColors[1]); // Use the first color for the rectangle
  box(w, h, d); // Draw a thin box for the rectangle
  pop();
}

function draw() {
  
  
  background(0); // Set background to black

  let mouseSquareSize = 40; // Size of the square
  let adjustedX = mouseX - width / 2;
  let adjustedY = mouseY - height / 2;

  if (spawn === 1 && millis() > lastSpawnTime + spawnDelay) {
    let location = predeterminedLocations[Math.floor(Math.random() * predeterminedLocations.length)];
    let angles = [180, 180];
    let w = windowWidth / 6.5;
    let h = windowHeight / 6.5;
    let d = 10;
    objects.push({
      type: 'rectangle',
      x: location.x, y: location.y, z: location.z,
      w: w, h: h, d: d,
      angles: angles,
      opacity: opacity,
      rotate: false,
      moveTowardsCamera: true
    });
    lastSpawnTime = millis(); // Update the time of the last spawn
    spawnDelay = random(150, 250); // DIFFICULTY
  }

  
  // Use a temporary array to hold non-collided objects
  let remainingObjects = [];

 objects.forEach(obj => {
  // Existing logic for moving and rotating objects
  if (obj.rotate) {
    obj.angles[0] += accX;
    obj.angles[1] += accY;
  }
  if (obj.moveTowardsCamera && obj.z < 800) {
    obj.z += noteSpeed;
  }

  let collided = false; // Assume no collision initially

  if (obj.type === 'cube') {
    drawCube(obj.x, obj.y, obj.z, obj.size, obj.angles, obj.opacity);
    // Keep the cube collision logic unchanged as cubes are not being deleted based on collisions
  } else if (obj.type === 'rectangle') {
    // Draw the rectangle
    drawRectangle(obj.x, obj.y, obj.z, obj.w, obj.h, obj.d, obj.angles, obj.opacity);
    // Update collision detection for rectangles to include a check for z == 0
    if (obj.z > 5 && Math.abs(obj.x - adjustedX) <= obj.w / 2 && Math.abs(obj.y - adjustedY) <= obj.h / 2) {
      collided = true; // Mark as collided if the cursor overlaps with the rectangle and its z value is good
    }
    
    if (obj.z > 800) {
      collided = true; // Mark as collided if its z value is 0
    }
  }

   
   
  if (!collided) {
    remainingObjects.push(obj); // Only keep objects that haven't collided
  }
   
  
  

   


   
});

// Update the objects array to only include non-collided objects
objects = remainingObjects;



  // Update the objects array to only include non-collided objects
  objects = remainingObjects;

  
  // Draw a flat square at the mouse cursor
  drawMouseSquare(adjustedX, adjustedY, mouseSquareSize);
}

function drawMouseSquare(adjustedX, adjustedY, size) {
  push();
  noStroke();
  fill(255); // Set square color
  translate(adjustedX, adjustedY, 0); // Move to mouse position in WEBGL coordinates
  rectMode(CENTER);
  rect(0, 0, size, size); // Draw the square
  pop();
}



function mouseClicked() {
  // Toggle spawn between 0 and 1
  spawn = spawn === 0 ? 1 : 0;
}
