/*=============================================================================
 * Variables
 * ============================================================================
 */

var snake;
var snakeLenth;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameStartMenu;
var startButton;
var gameOverMenu;
var restartButton;
var playHUD;
var scoreboard;

/* ============================================================================
 * Executing Game Code
 * ============================================================================
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 1500 / 30);

/* ============================================================================
 * Game Functions
 * ============================================================================
 */

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    document.addEventListener("keydown", snakeMovement);
    context = canvas.getContext("2d");

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    gameStartMenu = document.getElementById("startMenu");
    centerMenuPosition(gameStartMenu);

    startButton = document.getElementById("startButton");
    startButton.addEventListener("click", gameRestart);

    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);

    restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", gameRestart);

    playHUD = document.getElementById("playHUD");
    scoreboard = document.getElementById("scoreBoard");

    setState("START MENU");
}

function gameLoop() {
    gameDraw();
    drawScoreboard();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "grey";
    context.fillRect(0, 0, screenWidth, screenHeight);
}

function gameRestart() {
    snakeInitialize();
    foodInitialize();
    hideMenu(gameOverMenu);
    hideMenu(gameStartMenu);
    setState("PLAY");
}

/* ============================================================================
 * Snake Functions
 * ============================================================================
 */

function snakeInitialize() {
    snake = [];
    snakeLength = 5;
    snakeSize = 25;
    snakeDirection = "down";

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });

    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
        context.strokeStyle = "white";
        context.strokeRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection == "up") {
        //up
        snakeHeadY--;
    }
    else if (snakeDirection == "down") {
        //down
        snakeHeadY++;
    }
    else if (snakeDirection == "right") {
        //right
        snakeHeadX++;
    }
    else if (snakeDirection == "left") {
        //left
        snakeHeadX--;
    }

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    checkSnakeCollisions(snakeHeadX, snakeHeadY);

    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}


function snakeMovement(event) {
    if (event.keyCode == '38' && snakeDirection != "down") {
        //up
        snakeDirection = "up";
    }
    else if (event.keyCode == '40' && snakeDirection != "up") {
        //down
        snakeDirection = "down";
    }
    else if (event.keyCode == '39' && snakeDirection != "left") {
        //right
        snakeDirection = "right";
    }
    else if (event.keyCode == '37' && snakeDirection != "right") {
        //left
        snakeDirection = "left";
    }

}
/* ============================================================================
 * Food Functions
 * ============================================================================
 */

function foodInitialize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodPosition();
}

function foodDraw() {
    context.fillStyle = "black";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);

}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * (screenWidth));
    var randomY = Math.floor(Math.random() * (screenHeight));

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}
// Sets the food to a randomly generated place on the screen

/* ============================================================================
 * Collision Handling
 * ============================================================================
 */

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
            x: 0,
            y: 0
        });
        snakeLength++;
        setFoodPosition();
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("GAME OVER");
    }
    if (snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("GAME OVER");
    }
}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {
    for (var index = 1; index < snake.length; index++) {
        if (snakeHeadX == snake[index].x && snakeHeadY == snake[index].y) {
            setState("GAME OVER");
            return;
        }
    }
}

/* ============================================================================
 * Game State Handling
 * ============================================================================
 */

function setState(state) {
    gameState = state;
    showMenu(state);
}

/* ============================================================================
 * Menu Functions
 * ============================================================================
 */

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function hideMenu(menu) {
    menu.style.visibility = "hidden";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
    else if (state == "PLAY") {
        displayMenu(playHUD);
    }
    if (state == "START MENU") {
        displayMenu(gameStartMenu);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) - (menu.offsetWidth / 2) + "px";
}

function drawScoreboard() {
    scoreboard.innerHTML = "Length| " + snakeLength;
}