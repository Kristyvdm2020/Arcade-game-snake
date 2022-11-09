let snakeName = document.querySelector("h1");
let input = document.querySelector("input");
let nameButton = document.querySelector("#submit");
let playerInfo = document.querySelector("#playerInfo");
let playerName = document.querySelector("#name");
let message = document.querySelector("#message");
let play = document.querySelector("#play");
let table = document.querySelector("table");
let score = document.querySelector("#score");
let highScore = document.querySelector("#highScore");


function getApple() {
    let appleX = Math.floor(Math.random()*18);
    let appleY = Math.floor(Math.random()*18);
    //here is where we color the apple
    let row = table.children[appleY];
    let cell = row.children[appleX];
    cell.classList.add("apple");
    let arr = [appleX, appleY];
    return arr;
}

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0]
}

let gameState = {
    playing: false,
    apple: 0,
    snake: snake, // from above
    score: 0, 
    highScore: 0,
    wallCheck: function() { //checking if collision with wall has happened
        let arr = gameState.snake.body;
        for (let i = 0; i < arr.length; i++) {
            let coordinates = arr[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if(x > 17 || y > 17) {
                this.playing = false;
                return "Wall!";
            } 
            if(x < 0 || y  < 0) {
                this.playing = false;
                return "Wall!";
            } 
        }
        return "keep on moving";
    }, 
    appleCheck: function () { //checking if apple is the same as head
        let arr = this.snake.body;
        let head = arr[arr.length-1];
        if(this.apple[0] === head[0] && this.apple[1] === head[1]) {
            table.children[this.apple[1]].children[this.apple[0]].classList.remove("apple");
            gameState.score++;
            this.apple = getApple();
            return true;
        }
        return false;
    }, 
    biteCheck: function(){ //checking if the snake bites itself
        let arr = gameState.snake.body;
        let head = arr[arr.length-1];
        for (let i = arr.length-2; i > 0; i--) {
            let coordinates = arr[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if(head[0] === x && head[1] === y) {
                this.playing = false;
                return "Bite!";
            }
        }
        return "keep on moving";
    }
}

//Prints out the snake on the grid
function getSnake() {
    if(gameState.playing === false) {
        return;
    }
    let arr = gameState.snake.body;
    for(let i = 0; i <arr.length; i++) {
        let piece = arr[i];
        let x = piece[0];
        let y = piece[1];
        table.children[y].children[x].classList.add("snake");
    }
}

//Moves the snake in the desired next direction
function moveSnake() {
    if (gameState.playing === false) {
        return;
    }
    if(gameState.biteCheck() !== "Bite!"){
        let arr = gameState.snake.body;
        let head = arr[arr.length-1]
        let newHead = [head[0] + gameState.snake.nextDirection[0], head[1]+gameState.snake.nextDirection[1]];
        arr.push(newHead);
        if(gameState.appleCheck() === false) {
            let tail = arr[0]; 
            table.children[tail[1]].children[tail[0]].classList.remove("snake");
            arr.shift();
        }
    }
    gameState.wallCheck();
    return;
}


//Displays Player Name at the Top
nameButton.addEventListener("click", function(){
    playerName.innerText = input.value;
    playerInfo.style.display = "none";
    input.style.visibility = "hidden";
    input.style.display = "none";
    nameButton.style.visibility = "hidden";
    nameButton.style.display = "none";
});


//Starts the game on clicking play
play.addEventListener("click", function() {
    play.style.visibility = "hidden";
    play.style.display = "none";
    message.style.visibility = "hidden";
    message.style.display = "none";
    snakeName.style.visibility = "hidden";
    snakeName.style.display = "none";
    gameState.playing = true;

    for (let j = 0; j < 18; j++) {
        let row = document.createElement("tr");
        for (let i = 0; i < 18; i++) {
            let td = document.createElement("td");
            td.id = i + "-" + j;
            row.appendChild(td);
        }
        table.appendChild(row);
    
    }
    
    gameState.apple = getApple();
    getSnake();
    gameState.score = 0;
    
    
    setInterval(function(){
        if(gameState.playing !== false) {
            moveSnake();
            getSnake();
            score.innerText = "Score " + gameState.score;
        } else {
            if(gameState.playing === false) {
                play.style.visibility = "visible";
                play.style.display = "initial";
                message.style.visibility = "visible";
                message.style.display = "initial";
                message.innerText = "Play Again, " + input.value + "?";
                snakeName.style.visibility = "visible";
                snakeName.style.display = "initial";
                while (table.hasChildNodes()) {
                    table.removeChild(table.firstChild);
                }

                if(gameState.highScore <= gameState.score) {
                    gameState.highScore = gameState.score;
                    highScore.innerText = "High Score " + gameState.highScore;
                }
            }
        }
    }, 250);

    
});

//Here is where we need to find the event listener for this
document.addEventListener("keydown", function(ev) {
    let pressedKey = ev.code;
    if(pressedKey === "ArrowUp") {
        gameState.snake.nextDirection = [0, -1];
    } 
    if (pressedKey === "ArrowDown") {
        gameState.snake.nextDirection = [0, 1];
    }
    if (pressedKey === "ArrowRight") {
        gameState.snake.nextDirection = [1, 0];
    }
    if (pressedKey === "ArrowLeft") {
        gameState.snake.nextDirection = [-1, 0];
    }
});
