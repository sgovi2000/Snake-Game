// declearing constant and variables
let snakeVelocity = {x: 0, y: 0};
const gameSound = new Audio('music.mp3');
const feedSound = new Audio('food.mp3');
const snakeMoveSound = new Audio('move.mp3');
const gameOverSound = new Audio('gameover.mp3');
let score = 0;
let speed = 10;
let lastPaintTime=0;
let snakebody=[
    {x: 13, y: 15}
];

food={x: 10, y: 5};


function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
        lastPaintTime= ctime;
    gameEngine();
}

function isCollide(snake){
    //If snake bump int itself
    for (let i = 1; i < snakebody.length; i++) {
        if (snake[i].x===snake[0].x && snake[i].y===snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0) {
        return true;
    }
    
    return false;
}

function gameEngine(){
    // updating the snakebody and food
    if(isCollide(snakebody)){
        gameOverSound.play();
        gameSound.pause();
        snakeVelocity={x: 0, y:0};
        alert("GAME OVER! Press any key to play again!");
        snakebody=[{x:13,y:15}];
        gameSound.play();
        score = 0;
        scoreBox.innerHTML="Score: " + score;
    }

    // after eating the food increase the score and regenerate the food
    if(snakebody[0].x===food.x && snakebody[0].y===food.y){
        feedSound.play();
        score += 1;
        if(score>highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "High Score: " + highScoreVal;
        }
        scoreBox.innerHTML="Score: " + score;
        snakebody.unshift({x: snakebody[0].x + snakeVelocity.x, y: snakebody[0].y + snakeVelocity.y});
        let a=2;
        let b=16;
        food = {x: Math.round(a+(b-a)*Math.random()), y:  Math.round(a+(b-a)*Math.random())};
    }
    // moving the snake

    for (let i = snakebody.length-2; i>=0; i--) {
        //const element = array[i];
        snakebody[i+1] = {...snakebody[i]};
        
    }
    snakebody[0].x += snakeVelocity.x;
    snakebody[0].y += snakeVelocity.y;

    // display the snake

    board.innerHTML = "";
    snakebody.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // display the food
    
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}

// main logic

let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal))
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}

gameSound.play();
window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    // Game Starts!
    snakeVelocity = {x: 0, y: 1};
    snakeMoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
        default:
            break;
    }
});

