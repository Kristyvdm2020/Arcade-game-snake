let snakeName = document.querySelector("h1");
let input = document.querySelector("input");
let nameButton = document.querySelector("#submit");
let playerInfo = document.querySelector("#playerInfo");
let playerName = document.querySelector("#name");
let message = document.querySelector("#message");
let play = document.querySelector("#play");
let rules = document.querySelector("#rules");
let table = document.querySelector("table");
let score = document.querySelector("#score");
let highScore = document.querySelector("#highScore");

//function to produce the apple
function getApple() {
    let bodyArr = gameState.snake.body;
    let match = true; 
    let appleX = 0;
    let appleY = 0;
    //checking new apple position against snake body to ensure
    //no duplicate location of snake and apple
    do{
        appleX = Math.floor(Math.random()*18);
        appleY = Math.floor(Math.random()*18);
        let count = 0;
        for (let i = 0; i < bodyArr.length; i++) {
            let coordinates = bodyArr[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if(appleX === x && appleY === y) {
                count++;
                continue;
            }
        } 
        if(count === 0) {
            match = false;
        }
    } while (match === true);
    //here is where we color the apple
    let row = table.children[appleY];
    let cell = row.children[appleX];
    let colorArr = gameState.appleColor;
    let pickAColor = Math.floor(Math.random()*colorArr.length);
    let color = colorArr[pickAColor]; 
    gameState.currentApple = color;
    cell.classList.add(color + "apple");
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
    appleColor: ["red", "blue", "green", "gold"],
    currentApple: "red",
    snake: snake, // from above
    score: 0, 
    highScore: 0,
    gameNumber: 0, 
    wallCheck: function() { //checking if collision with wall has happened
        let arr = gameState.snake.body;
        for (let i = 0; i < arr.length; i++) {
            let coordinates = arr[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if(x > 17 || y > 17) {
                this.playing = false;
                this.playAgain();
                return "Wall!";
            } 
            if(x < 0 || y  < 0) {
                this.playing = false;
                this.playAgain();
                return "Wall!";
            } 
        }
        return "keep on moving";
    }, 
    appleCheck: function () { //checking if apple is the same as head
        let arr = this.snake.body;
        let head = arr[arr.length-1];
        if(this.apple[0] === head[0] && this.apple[1] === head[1]) {
            let color = this.currentApple;
            table.children[this.apple[1]].children[this.apple[0]].classList.remove(color + "apple");
            if(color = "red") {
                gameState.score++;
            }
            // if(color = "blue") {
            //     gameState.score+=2;
            // }
            // if(color = "green") {
            //     gameState.score-=3;
            // }
            // if(color = "gold") {
            //     gameState.score+=10;
            // }
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
                this.playAgain();
                return "Bite!";
            }
        }
        return "keep on moving";
    }, 
    newGame: function() { //resets game for player to keep going
        this.playing = true;
        this.apple = 0; 
        this.snake.body = [ [10, 5], [10, 6], [10, 7], [10, 8] ];
        this.snake.nextDirection = [1, 0];
        this.score = 0;
    },
    playAgain: function() { //sets up page to ask for new game
        if(this.playing === false && this.gameNumber > 0) {
            play.style.visibility = "visible";
            play.style.display = "initial";
            message.style.visibility = "visible";
            message.style.display = "initial";
            message.innerText = "Play Again, " + input.value + "?";
            snakeName.style.visibility = "visible";
            snakeName.style.display = "initial";
            rules.style.visibility = "visible";
            rules.style.display = "initial";
            //deleting table
            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }
            if(gameState.highScore <= gameState.score) {
                gameState.highScore = gameState.score;
                highScore.innerText = "High Score " + gameState.highScore;
            }
        }

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
    play.style.visibility = "visible";
    play.style.display = "initial";
});


//Starts the game on clicking play
play.addEventListener("click", function() {
    play.style.visibility = "hidden";
    play.style.display = "none";
    message.style.visibility = "hidden";
    message.style.display = "none";
    snakeName.style.visibility = "hidden";
    snakeName.style.display = "none";
    rules.style.visibility = "hidden";
    rules.style.display = "none";
    gameState.playing = true;

    for (let j = 0; j < 18; j++) {
        let row = document.createElement("tr");
        for (let i = 0; i < 18; i++) {
            let td = document.createElement("td");
            row.appendChild(td);
        }
        table.appendChild(row);
    
    }

    gameState.newGame();
    score.innerText = "Score " + gameState.score;
    gameState.gameNumber++;
    gameState.apple = getApple();
    getSnake();
    
});

setInterval(function(){
    if(gameState.playing !== false) {
        moveSnake();
        getSnake();
        score.innerText = "Score " + gameState.score;
    } 
}, 250);//DON'T FORGET TO CHANGE THIS BEFORE PUBLISHING!!!!!


//Event listener for the arrow keys to move the snake
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
