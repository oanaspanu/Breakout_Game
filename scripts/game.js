window.onload = function () {

    // *** Canvas ***
    let canvas = document.getElementById(`breakOut`);
    let context = canvas.getContext(`2d`);

    // *** Background Image ***
    let backgroundImage = new Image();
    backgroundImage.src = "assets/images/landscape.jpg";

    // *** Start Button ***
    let btnStart = document.getElementById(`btnStart`);

    // *** Sounds ***
    const brickHitSound = new Audio('assets/sounds/brickHit.wav');
    const paddleHitSound = new Audio('assets/sounds/paddleHit.wav');
    const gameOverSound = new Audio('assets/sounds/gameOver.wav');
    const levelUpSound = new Audio('assets/sounds/levelUp.wav');

    // *** Modal Status ***  
    let modal = new bootstrap.Modal(document.getElementById('modalStatus'));
    function showModalStatus(title) {
        document.getElementById('modalStatusTitle').innerText = title;
        document.getElementById('modalStatusBody').innerText = `Your score is: ${score}.`;

        modal.show();
        requestAnimationFrame();
    }

    let btnRetry = document.getElementById('btnRetry');
    btnRetry.addEventListener('click', function () {
        document.location.reload();
    });


    // *** Brick Configuration ***
    class Brick {
        constructor(x, y, width, height, color, isIndestructible) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.isIndestructible = isIndestructible;
        }

        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
            context.strokeStyle = "black";
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    const bricks = [];
    const brickRowColors = ['#3D4675ff', '#3D4675ff', '#625A89ff', '#625A89ff', '#90719Bff', '#90719Bff'];
    const brickWidth = 50;
    const brickHeight = 20;
    const brickSpacing = 10;
    const numBricks = 15;
    let level = 1;

    function createBricks() {
        const totalWidth = (brickWidth * numBricks) + (brickSpacing * (numBricks - 1));
        const startX = (canvas.width - totalWidth) / 2;
        let startY = 200;


        for (let row = 0; row < 6; row++) {
            for (let i = 0; i < numBricks; i++) {
                const brickX = startX + (i * (brickWidth + brickSpacing));
                const brickY = startY;
                let brickColor = brickRowColors[row];
                let isIndestructible = false;
                if (level == 2 &&
                    ((row === 1 && (i === 1 || i === 10 || i === 7)) ||
                        (row === 3 && (i === 4 || i === 14)) ||
                        (row === 5 && (i === 12 || i === 3 || i === 8)))
                ){
                    isIndestructible = true;
                }
                const color = isIndestructible ? "#0E1C30ff" : brickColor;
                bricks.push(new Brick(brickX, brickY, brickWidth, brickHeight, color, isIndestructible));
            }
            startY -= brickHeight + brickSpacing;
        }
    }

    function drawBricks() {
        bricks.forEach((brick) => brick.draw());
    }


    // *** Paddle Configuration ***
    const paddle = {
        width: 100,
        height: 20,
        x: (canvas.width - 100) / 2,
        y: canvas.height - 70,
        dx: 10,
        color: '#C9A2BDff',
        borderColor: "black"
    };

    function drawPaddle() {
        context.fillStyle = paddle.color;
        context.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
        context.strokeStyle = paddle.borderColor;
        context.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
    }

    let rightPressed = false;
    let leftPressed = false;

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") rightPressed = true;
        else if (event.key === "ArrowLeft") leftPressed = true;
    });

    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowRight") rightPressed = false;
        else if (event.key === "ArrowLeft") leftPressed = false;
    });

    function movePaddle() {
        if (rightPressed && paddle.x + paddle.width < canvas.width) paddle.x += paddle.dx;
        else if (leftPressed && paddle.x > 0) paddle.x -= paddle.dx;
    }

    // *** Score ***
    let score = 0;
    function updateScoreDisplay() {
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.innerText = `Score: ${score}`;
    }


    // *** Ball Configuration ***
    const ball = {
        x: canvas.width / 2,
        y: canvas.height - 100,
        radius: 10,
        dx: 3,
        dy: -3,
        color: '#C9A2BDff',
        borderColor: "black"
    };

    function drawBall() {
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fillStyle = ball.color;
        context.fill();
        context.strokeStyle = ball.borderColor;
        context.stroke();
        context.closePath();
    }

    function resetBallAndPaddle() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 100;
        ball.dx = 5;
        ball.dy = -3;
        paddle.x = (canvas.width - paddle.width) / 2;
    }

    function moveBall() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx = -ball.dx;
        if (ball.y - ball.radius < 0) ball.dy = -ball.dy;

        if (
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
        ) {
            ball.dy = -ball.dy;
            paddleHitSound.play();
        }

        // *** Game over condition ***
        if (ball.y + ball.radius >= canvas.height) {
            gameOverSound.play();
            showModalStatus('Game Over! You lost!');
        }
        if (bricks.length == 0) {
            if (level == 1) {
                level = 2;
                levelUpSound.play();
                resetBallAndPaddle();
                createBricks();
                document.getElementById('levelDisplay').innerText = `Level: 2`;
            } else {
                levelUpSound.play();
                showModalStatus('Congratulations! You won!');
            }
        }
    }

    function checkBrickCollision() {
        bricks.forEach((brick, index) => {
            if (
                ball.x > brick.x &&
                ball.x < brick.x + brick.width &&
                ball.y - ball.radius < brick.y + brick.height &&
                ball.y + ball.radius > brick.y
            ) {
                ball.dy = -ball.dy;
                if (!brick.isIndestructible) {
                    brickHitSound.play();
                    bricks.splice(index, 1);
                    score++;
                }
            }
        });
    }

    // *** Game Update Loop ***
    function update() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        drawBricks();
        movePaddle();
        drawPaddle();
        moveBall();
        drawBall();
        checkBrickCollision();
        updateScoreDisplay();

        requestAnimationFrame(update);
    }

    backgroundImage.onload = () => {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        btnStart.addEventListener('click', () => {
            canvas.style.filter = "none";
            btnStart.style.display = "none";
            createBricks();
            update();
        });
    }
}