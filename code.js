
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
            dead = 0;
        }
    };
    
    p.draw = function () {
        p.background(255, 255, 255);
        p.translate(w / 2, h / 2);
        p.rotate(p.radians(circleAngle));
        p.fill(255, 255, 0);
        p.ellipse(0, 0, 200, 200);

        // Drawing face and score omitted for brevity

        for (const angle of connectedKnives) {
            drawKnife(54, 0, angle); // Pass the connected knife's angle for rotation
        }

        p.rotate(p.radians(-circleAngle));

        // Render each knife
        const newShotKnives = [];
        for (let y of shotKnives) {
            // Calculate the rotation for the moving knife to face towards the circle
            let rotation = Math.atan2(0 - y, 0 - 0) * (180 / Math.PI);
            drawKnife(0, y, rotation);
            y -= knifeSpeed;
            if (y < 54) {
                // Collision logic unchanged
            } else {
                newShotKnives.push(y);
            }
        }
        shotKnives = newShotKnives;

        // Draw fake knife without rotation if not dead
        if (dead === 0) {
            drawKnife(0, knifeDistance); // No rotation needed here
        }

        // Game over text logic unchanged

    };
};

const canvas = document.getElementById("mycanvas");
const processingInstance = new Processing(canvas, programCode);

