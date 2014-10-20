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

/* ============================================================================
 * Executing Game Code
 * ============================================================================
 */

gameInitialize();
snakeInitialize();
foodInitialize();
setInterval(gameLoop, 2500/30);

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
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "black";
    context.fillRect(0, 0, screenWidth, screenHeight);
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
    
    for(var index = snakeLength - 1; index >= 0; index--) {
        snake.push( {
            x: index,
            y: 0
        });
        
    }
}

function snakeDraw() {
    for(var index = 0; index < snake.length; index++){
        context.fillStyle = "blue";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    if (snakeDirection == "up"){
        //up
        snakeHeadY--;
    }
    else if (snakeDirection == "down"){
        //down
        snakeHeadY++;
    }
    else if (snakeDirection == "right"){
        //right
        snakeHeadX++;
    }
    else if (snakeDirection == "left"){
        //left
        snakeHeadX--;
    }
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    snake.unshift(snakeTail);
}


function snakeMovement(event) {
    if (event.keyCode == '38'){
        //up
        snakeDirection = "up";
    }
    else if (event.keyCode == '40'){
        //down
        snakeDirection = "down";
    }
    else if (event.keyCode == '39'){
        //right
        snakeDirection = "right";
    }
    else if (event.keyCode == '37'){
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
    context.fillStyle = "red";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
    
}

function setFoodPosition() {
    var randomX = Math.floor(Math.random() * (screenWidth));
    var randomY = Math.floor(Math.random() * (screenHeight));
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

