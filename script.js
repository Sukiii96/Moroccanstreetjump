// 🎮 Get Canvas & Context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 800;
canvas.height = 300;

// 🎭 Load Character & Obstacles Sprites
const playerImg = new Image();
playerImg.src = "assets/moroccan-runner.png"; // Djellaba + fez + belgha

const tajineImg = new Image();
tajineImg.src = "assets/tajine.png";

const chebakiaImg = new Image();
chebakiaImg.src = "assets/chebakia.png";

const hariraImg = new Image();
hariraImg.src = "assets/harira.png";

const datesImg = new Image();
datesImg.src = "assets/dates.png";

// 🎭 Character Object
let player = {
    x: 50,
    y: 200,
    width: 50,
    height: 70,
    velocityY: 0,
    jumping: false
};

// 🎭 Obstacles
let obstacles = [];
let gameSpeed = 5;
let gravity = 0.5;
let score = 0;
let gameOver = false;

// 🏃‍♂️ Jumping Mechanic
document.addEventListener("keydown", function(event) {
    if ((event.code === "Space" || event.key === "ArrowUp") && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

// 📱 Mobile Tap Support
document.addEventListener("touchstart", function() {
    if (!player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

// 🔄 Game Update
function update() {
    if (gameOver) return;

    // Apply gravity
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Stop player at ground level
    if (player.y >= 200) {
        player.y = 200;
        player.jumping = false;
    }

    // Move obstacles
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;

        // Collision detection
        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            gameOver = true;
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    }

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x > -50);

    // Increase score
    score++;
}

// 🍽️ Spawn Moroccan Food Obstacles
function spawnObstacle() {
    let type = Math.floor(Math.random() * 4);
    let obstacle = { x: canvas.width, y: 230, width: 40, height: 40 };

    if (type === 0) obstacle.img = tajineImg;
    else if (type === 1) obstacle.img = chebakiaImg;
    else if (type === 2) obstacle.img = hariraImg;
    else obstacle.img = datesImg;

    obstacles.push(obstacle);
}

// 🎨 Draw Everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Character
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

    // Draw Obstacles
    obstacles.forEach(obstacle => {
        ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw Score
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// 🕹️ Game Loop
function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

// 🚀 Start Game
setInterval(spawnObstacle, 2000); // New obstacle every 2 sec
gameLoop();
