var snake;

var context;
var screenWidth;
var screenHeight;

function gameInitialize(){
    var canvas= document.getElementById("gameScreen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHieght= window.innerHeight;
    
    canvas.width= screenWidth;
    canvas.height= screenHeight;
}

function gameLoop(){
    
}

function gamedraw(){
    context.fillStyle = "rgb(222, 250, 250)";
    context.fillRect (0,0, screenWidth, screenHeight);
}