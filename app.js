const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 70;

let ballX = canvas.width / 2;
let ballY = canvas.height - 20;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;
let rightPressed = false;
let leftPressed = false;
let interval = 0;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#202020";
    ctx.fill();
    ctx.closePath();

    // Collision with walls
    if (ballX + dx < ballRadius || ballX + dx > canvas.width - ballRadius) {
        dx = -dx;
    }

    if (ballY + dy < ballRadius) {
        dy = -dy;
    } else if (ballY + dy > canvas.height - ballRadius) {
        // Collision with paddle
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            dy = -dy;
        } else { // Game restarts
            console.log("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    console.log("ball x =", ballX, "ball y =", ballY);
    console.log("paddle x =", paddleX, "paddle y =", paddleY);

    // My solution
    // if (rightPressed && paddleX < canvas.width - paddleWidth) {
    //     paddleX += 5;
    //     console.log("Postion Paddle: ", paddleX)
    // } else if (leftPressed && paddleX > 0) {
    //     paddleX -= 5;
    //     console.log("Postion Paddle: ", paddleX)
    // }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 5, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 5, 0);
    }

    ballX += dx;
    ballY += dy;
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

interval = setInterval(draw, 10);