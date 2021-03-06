
var canvas; 
var canvasContext;
var ballX = 50; 
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;

const WINNING_SCORE = 3;

var player1Score = 0;
var player2Score = 0;

var showingWinScreen = false;


function calculateMousePosition(evt){ //evt = event
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt){
        if(showingWinScreen){
            showingWinScreen = false;
        }
}


window.onload = function(){
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var framesPerSecond = 30;
    setInterval(function(){drawEverything(); moveEverything()},1000/framesPerSecond); //Creates an anonymous function to stop parameters breaking interval.
    
    canvas.addEventListener("mousedown", handleMouseClick);



    canvas.addEventListener("mousemove",
    function(evt){
        var mousePos = calculateMousePosition(evt);
        paddle1Y = mousePos.y -(PADDLE_HEIGHT/2);
    });
    
}


function ballReset(){
    if(player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE){
         
            showingWinScreen = true;
        }
    ballSpeedX=-ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
        if(paddle2YCenter< ballY-35){
            paddle2Y +=6;
        }else if(paddle2YCenter > ballY+35){
            paddle2Y -= 6;
        }
}





function moveEverything(){
    if(showingWinScreen){
        return;
    }
    computerMovement();
    ballX += ballSpeedX; 
    ballY += ballSpeedY; 
    if(ballX > canvas.width){if(ballY > paddle2Y &&
        ballY < paddle2Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else{
        player1Score++; //must be before ballReset();
        ballReset();
        
    }
    }
    if(ballX < 0){
       if(ballY > paddle1Y &&
        ballY < paddle1Y+PADDLE_HEIGHT){
            ballSpeedX = -ballSpeedX
            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        }else{
        player2Score++; //must be before ballReset();
        ballReset();
       
    }
}
    if(ballY > canvas.height){
        ballSpeedY=-ballSpeedY;
    }
    if(ballY < 0){
        ballSpeedY=-ballSpeedY;
    }
}

function drawEverything(){
   
 

    //Controls the background color of the game.
    colorRect(0,0, canvas.width,canvas.height, "black");

    if(showingWinScreen){
        canvasContext.fillStyle = "white";
        
        if(player1Score >= WINNING_SCORE){
            canvasContext.fillText("Player wins",350,500);
        }else if(player2Score >= WINNING_SCORE){ 
            canvasContext.fillText("Computer wins",350,500);
        }
        canvasContext.fillText("Click to continue!",200,500);
        return;
    }
    //Controls the attributes of the left players paddle.
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, "white");
    //right paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, "white");
    //Contols the attributes of the ball.
    colorCircle(ballX, ballY, 10, "white");
        
 

    canvasContext.fillText(player1Score, 100,100);
    canvasContext.fillText(player2Score, canvas.width-100,100);
    
}

function colorCircle(centerx, centerY, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerx,centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorRect(leftX, topY, width, height, color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX, topY, width, height);
}

