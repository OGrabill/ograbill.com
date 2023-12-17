const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
// Add a rectangle at (10, 10) with size 100x100 pixels

while (true) {

    ctx.rect(mouseX,mouseY,40,40);
    ctx.fillRect(10, 10, 100, 100);
}
