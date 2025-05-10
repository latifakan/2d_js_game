const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 10;

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#202020";
    ctx.fill();
    ctx.closePath();

    // Colision
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        dy = -dy;
    } 
    if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
        console.log("Postion Paddle: ", paddleX)
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
        console.log("Postion Paddle: ", paddleX)
    }
    x += dx;
    y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Arrow... is used for almost every browser, Explorer isn't using Arrow
// key holds information about the key pressed
function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        console.log("Right pressed")
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
        console.log("Left pressed")
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
        console.log("Right released")
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
        console.log("Left released")
    }
}

setInterval(draw, 10);