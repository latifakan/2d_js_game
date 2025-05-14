const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const ballRadius = 10;
const paddleHeight = 10;
const paddleWidth = 70;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let ballX = canvas.width / 2;
let ballY = canvas.height - 20;
let dx = 2;
let dy = -2;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;
let rightPressed = false;
let leftPressed = false;
let playerScore = 0;
let playerLife = 3;


const bricks = [];
for (let column = 0; column < brickColumnCount; column++) {
    bricks[column] = [];
    for (let row = 0; row < brickRowCount; row++) {
        bricks[column][row] = {x: 0, y: 0, status: 1};
    }
}

function drawBricks() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            if (bricks[column][row].status === 1) {
                const brickX = column * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[column][row].x = brickX;
                bricks[column][row].y = brickY;

                ctx.beginPath();    
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#494949";
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLife();
    // console.log("ball x =", ballX, "ball y =", ballY);
    // console.log("paddle x =", paddleX);
    // console.log("bricks =", bricks);

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
        console.log("paddle x: ", paddleX)
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
        console.log("paddle x: ", paddleX)
    }

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
        } else {
            playerLife--;
            if(!playerLife) { // Game restarts
            alert("GAME OVER");
            document.location.reload();
            } else {
            ballX = canvas.width / 2;
            ballY = canvas.height - 30;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }


    ballX += dx;
    ballY += dy;

    requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

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

function mouseMoveHandler(e) {
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 + (paddleWidth / 2) && 
        relativeX < canvas.width - (paddleWidth / 2)) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            const brick = bricks[column][row];

            if (brick.status === 1) {
                if (ballX > brick.x && 
                    ballX < brick.x + brickWidth &&
                    ballY > brick.y &&
                    ballY < brick.y + brickHeight) {
                        brick.status = 0;
                        dy = -dy;
                        playerScore++;
                        if (playerScore === brickRowCount * brickColumnCount) {
                            alert(`- YOU WIN! - Score is: ${playerScore}`);
                            document.location.reload;
                        }
                    }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${playerScore}`, 3, 15);
}

function drawLife() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Your Lives: ${playerLife}`, canvas.width - 95, 15);
}

draw();