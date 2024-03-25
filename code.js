var programCode = function (p) {
    p.size(
        window.innerWidth,
        window.innerHeight,
        window.focus()
    );
    p.frameRate(60);
    let circleAngle = 0;
    
    // useful constants
    const w = window.innerWidth;
    const h = window.innerHeight;
    // how close knives can be before a game over
    const knifeAngle = 360 / (200 * Math.PI / 20) - 4;
    // time between shots, in milliseconds
    const cooldown = 5;

    var knifeDistance = 120;
    
    // y-positions of all knives moving towards face (one not thrown is fake)
    var shotKnives = [];
    // angles relative to rotating face of all knives stuck on face
    var connectedKnives = [];

    var knifeSpeed = 10;

    var knifeCuttof = 100;

    var dead = 0;

    knifeImage = p.loadImage('favicon-32x32.png');
    
    // Adjusted drawKnife function to include rotation
    var drawKnife = function (x, y, rotation = 0) {
        p.push(); // Use push and pop to isolate transformations
        p.translate(x, y);
        p.rotate(p.radians(rotation)); // Apply rotation
        p.imageMode(p.CENTER);
        p.image(knifeImage, 0, 0); // Draw at new origin after translation
        p.pop();
    };

    // Add new knife when key pressed
    let pressed = false;
    let lastShot = Number.NEGATIVE_INFINITY;
    p.keyPressed = function () {
        if (pressed) return;
        pressed = true;
        const time = p.millis();
        if (p.key.code === 32 && time - lastShot > cooldown && dead === 0) {
            shotKnives.push(knifeDistance);
            lastShot = time;
        }
        if (p.key.code === 32 && dead === 1) {
            connectedKnives.length = 0;
            shotKnives.length = 0; // Restart the game fully
            dead = 0;
        }
    };

    p.keyReleased = function () {
        pressed = false;
    };

    p.mouseClicked = function () {
        console.log("clicked");
        const time = p.millis();
        if (time - lastShot > cooldown && dead === 0) {
            shotKnives.push(knifeDistance);
            lastShot = time;
        }
        if (dead === 1) {
            connectedKnives.length = 0;
            shotKnives.length = 0; // Restart the game fully
            dead = 0;
        }
    };
    
    p.draw = function () {
        p.background(255, 255, 255);
        p.translate(w / 2, h / 2);
        p.rotate(p.radians(circleAngle));
        p.fill(255, 255, 0);
        p.ellipse(0, 0, 200, 200);

        p.noFill();
        p.stroke(0, 0, 0);
        p.strokeWeight(2);
        p.arc(0, 0, 150, 100, 0, Math.PI);

        p.fill(0, 0, 0);
        p.ellipse(50, 0, 10, 10);
        p.ellipse(-47, 0, 10, 10);

        for (const angle of connectedKnives) {
            drawKnife(54, 0, angle + 90); // Add 90 to adjust the knife's angle to be perpendicular to the circle
        }

        p.rotate(p.radians(-circleAngle));

        p.fill(0, 0, 0);

        p.textSize(60);
        p.text("Score: "+connectedKnives.length,-110,-200);
        
        // Make circle rotate if not dead
        if (dead === 0) {
        circleAngle += 3;
        circleAngle %= 360;
        }
        
        // Render each knife
        const newShotKnives = [];
        for (let y of shotKnives) {
            // Calculate the rotation for the moving knife to face towards the circle
            let rotation = Math.atan2(0 - y, 0 - 0) * (180 / Math.PI) + 90; // Adding 90 to align the knife's edge towards the circle
            drawKnife(0, y, rotation);
            y -= knifeSpeed;
            if (y < 54) {
                // When knife has hit
                console.log("Collision");
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

scss
Copy code
    // Draw fake knife if not dead
    if (dead === 0) {
        // For the fake knife, we simulate its rotation to face downwards as if it's being held ready to throw
        drawKnife(0, knifeDistance, -90); // Rotate to face downwards
    }

    if (dead === 1) {
        p.fill(0);
        p.textSize(32);
        p.text("Game Over", -100, -100);
        p.text("Click to restart", -150, -50);
    }
};
};

const canvas = document.getElementById("mycanvas");
const processingInstance = new Processing(canvas, programCode);


