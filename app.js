const gameBoard = document.getElementById('gameboard');
const context = gameBoard.getContext('2d');
const score = document.getElementById('ScoreVal');

const width = gameBoard.width;
const height = gameBoard.height;
const unit =20;
let foodX;
let foodY;
let xVel = 20;
let yVel = 0;
let scoreInc = 0;
let active = true;
let started = false;

let snake =[
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0},
]
window.addEventListener('keydown',keyPress)
startGame();

function startGame(){
    context.fillStyle = "#fff";
    // fillRect(Xaxis,Yaxis,width,height)
    context.fillRect(0,0,width,height);
    createFood();
    displayFood();
    drawSnake();
}
function clearBoard(){
    context.fillStyle = "#fff";
    context.fillRect(0,0,width,height);
}
function createFood(){
    foodX = Math.floor(Math.random()*width/unit)*unit;
    foodY = Math.floor(Math.random()*height/unit)*unit;
}
function displayFood(){
    context.fillStyle='#00ff7f';
    context.fillRect(foodX,foodY,unit,unit)
}
function drawSnake(){
    context.fillStyle = "#b22222";
    context.strokeStyle = "#fff";
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x,snakePart.y,unit,unit);
        context.strokeRect(snakePart.x,snakePart.y,unit,unit);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xVel,y:snake[0].y+yVel}
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        scoreInc++;
        score.textContent = scoreInc;
        createFood();

    }
    else{
        snake.pop();
    }
}

function nextTick(){
    if(active){
        setTimeout(() => {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    }, 200);
    }
    else{
        clearBoard();
        context.font = "bold 50px serif";
        context.fillStyle = "#006400";
        context.textAlign = "center";
        context.fillText("Game Over !!",width/2,height/2)
    }
}
function keyPress(event){
    if(!started){
        started = true;
        nextTick();
    }
    const left =37;
    const up =38;
    const right =39;
    const down =40; 
    switch(true){
        case(event.keyCode==left && xVel!=unit):
            xVel=-unit;
            yVel=0;
            break;
        case(event.keyCode==right && xVel!=-unit):
            xVel=unit; 
            yVel=0;
            break;
        case(event.keyCode==up && yVel!=unit):
            xVel=0;
            yVel=-unit;
            break;
        case(event.keyCode==down && yVel!=-unit):
            xVel=0;
            yVel=unit;
            break;
    }
}
function checkGameOver(){
    if(true){
        if(snake[0].x<0 || snake[0].x>=width || snake[0].y<0 || snake[0].y>=height){
            // if(
            //     snake.forEach()
            // ){
                active = false;
            // }
        }
    }
}

