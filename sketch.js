let circleAngle = 0;
// useful constants
const w = window.innerWidth;
const h = window.innerHeight;
// how close knives can be before a game over
const knifeAngle = 360 / (200 * Math.PI / 20) - 4;
// time between shots, in milliseconds
const cooldown = 5;

let knifeDistance = 120;

// y-positions of all knives moving towards face (one not thrown is fake)
let shotKnives = [];
// angles relative to rotating face of all knives stuck on face
let connectedKnives = [];

let knifeSpeed = 10;

let dead = 0;

let pressed = false;
let lastShot = Number.NEGATIVE_INFINITY;

function setup() {
    createCanvas(w, h);
    frameRate(60);
}

function drawKnife(x, y) {
    translate(x, y);
    fill(0);
    rect(-10, -10, 20, 20);
    translate(-x, -y);
}

function keyPressed() {
    if (pressed) return;
    pressed = true;
    const time = millis();
    if (keyCode === 32 && time - lastShot > cooldown && dead === 0) {
        shotKnives.push(knifeDistance);
        lastShot = time;
    }
    if (keyCode === 32 && dead === 1) {
        connectedKnives.length = 0;
        dead = 0;
    }
}

function keyReleased() {
    pressed = false;
}

function mouseClicked() {
    const time = millis();
    if (time - lastShot > cooldown && dead === 0) {
        shotKnives.push(knifeDistance);
        lastShot = time;
    }
    if (dead === 1) {
        connectedKnives.length = 0;
        dead = 0;
    }
}

function draw() {
    background(255);
    translate(w / 2, h / 2);
    rotate(radians(circleAngle));
    fill(255, 255, 0);
    ellipse(0, 0, 200, 200);

    noFill();
    stroke(0);
    strokeWeight(2);
    arc(0, 0, 150, 100, 0, PI);

    fill(0);
    ellipse(50, 0, 10, 10);
    ellipse(-47, 0, 10, 10);

    for (const angle of connectedKnives) {
        rotate(radians(angle));
        drawKnife(54, 0);
        rotate(radians(-angle));
    }

    rotate(radians(-circleAngle));

    fill(0);
    textSize(60);
    text("Score: "+connectedKnives.length, -110, -200);
    
    // Make circle rotate if not dead
    if (dead === 0) {
        circleAngle += 3;
        circleAngle %= 360;
    }
    
    // Render each knife
    let newShotKnives = [];
    for (let y of shotKnives) {
        drawKnife(0, y);
        y -= knifeSpeed;
        if (y < 54) {
            const angle = (90 - circleAngle + 360) % 360;
            for (const existingAngle of connectedKnives) {
                if (
                    Math.abs(angle - existingAngle) < knifeAngle
                    || Math.abs(angle - existingAngle) > 360 - knifeAngle
                ) {
                    dead = 1;
                }
            }
            if (dead === 0) {
                connectedKnives.push(angle);
            }
        } else {
            newShotKnives.push(y);
        }
    }
    shotKnives = newShotKnives;

    if (dead === 0) {
        drawKnife(0, knifeDistance);
    }

    if (dead === 1) {
        text("womp womp", -150, -160);
    }
}


const canvas = document.getElementById("mycanvas");
const processingInstance = new Processing(canvas, programCode);
