const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
// Add a rectangle at (10, 10) with size 100x100 pixels


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "green";
// Add a rectangle at (10, 10) with size 100x100 pixels
ctx.fillRect(10, 10, 100, 100);

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(canvas, evt);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(mousePos.x, mousePos.y, 10, 10);
}, false);
```
