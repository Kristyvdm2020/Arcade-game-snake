//interacting with the DOM
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

//function to produce the apples
function getApple(str) {
    let bodyArr = gameState.snake.body;
    let match = true; 
    let appleX = 0;
    let appleY = 0;
    let color = "";
    //checking new apple position against snake body to ensure
    //no duplicate location of snake and apple
    if(str === "red") {
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
        color = "red";
    } else {
        let firstApple = gameState.firstApple;
        let firstX = firstApple[0];
        let firstY = firstApple[1];
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
            if(appleX === firstX && appleY === firstY) {
                count++;
                continue;
            }
            if(count === 0) {
                match = false;
            }
        } while (match === true);
        //picking other apple color
        let colorArr = gameState.appleColor;
        let pickAColor = Math.floor(Math.random()*colorArr.length);
        color = colorArr[pickAColor]; 
        gameState.currentRandApple = color;
    }
    
    //here is where we color the apple
    let row = table.children[appleY];
    let cell = row.children[appleX];
    cell.classList.add(color + "apple");
    let arr = [appleX, appleY];
    return arr;
}

//snake body and direction object
let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0],
    switchControls: false
}

//game state object and functions
let gameState = {
    playing: false,
    firstApple: 0,
    secondApple: 0,
    appleColor: ["blue", "green", "gold"],
    currentRandApple: "blue",
    snake: snake, // from above
    speed: 250, 
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
        if(this.firstApple[0] === head[0] && this.firstApple[1] === head[1]) {//red apples
            let color = "red";
            table.children[this.firstApple[1]].children[this.firstApple[0]].classList.remove(color + "apple");
            if(color === "red") {
                gameState.score++;
                gameState.speed = 250;
                snake.switchControls = false;
                this.firstApple = getApple("red");
            }
            return true;
        }
        if (this.secondApple[0] === head[0] && this.secondApple[1] === head[1]) {//random apples
            let color = this.currentRandApple;
            table.children[this.secondApple[1]].children[this.secondApple[0]].classList.remove(color + "apple");
            if(color === "blue") {
                gameState.score++;
                gameState.speed = 500;
                snake.switchControls = false;
            }
            if(color === "green") {
                gameState.score++;
                snake.switchControls = true;
            }
            if(color === "gold") {
                gameState.score++;
                gameState.speed = 150;
                snake.switchControls = false;
            }
            this.secondApple = getApple("rand");
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
    newGame: function() { //resets game for player
        this.playing = true;
        this.firstApple = 0; 
        this.secondApple = 0;
        this.snake.body = [ [10, 5], [10, 6], [10, 7], [10, 8] ];
        this.snake.nextDirection = [1, 0];
        this.snake.switchControls = false;
        this.speed = 250;
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
    gameState.firstApple = getApple("red");
    gameState.secondApple = getApple("rand");
    getSnake();
    
});


//setInterval declarations that change speed based on the color apple eaten
let normalInt = setInterval(function(){  //normal speed 
    if(gameState.playing !== false && gameState.speed === 250) {
        moveSnake();
        getSnake();
        score.innerText = "Score " + gameState.score;
    } 
}, 250);

let blueInt = setInterval(function(){ //slows down due to eating blue apple
    if(gameState.playing !== false && gameState.speed === 500) {
        moveSnake();
        getSnake();
        score.innerText = "Score " + gameState.score;
    } 
}, 500);

let goldInt = setInterval(function(){ //speeds up due to eating gold apple
    if(gameState.playing !== false && gameState.speed === 150) {
        moveSnake();
        getSnake();
        score.innerText = "Score " + gameState.score;
    } 
}, 150);


//Event listener for the arrow keys to move the snake
document.addEventListener("keydown", function(ev) {
    let pressedKey = ev.code;
    if(pressedKey === "ArrowUp") {
        if(snake.switchControls !== true) { //green apple switches controls
            gameState.snake.nextDirection = [0, -1];  
        } else {
            gameState.snake.nextDirection = [0, 1];
        }
    }
    if (pressedKey === "ArrowDown") {
        if(snake.switchControls !== true) { //green apple switches controls
            gameState.snake.nextDirection = [0, 1];  
        } else {
            gameState.snake.nextDirection = [0, -1];
        }
    }
    if (pressedKey === "ArrowRight") {
        if(snake.switchControls !== true) { //green apple switches controls
            gameState.snake.nextDirection = [1, 0];  
        } else {
            gameState.snake.nextDirection = [-1, 0];
        }
    }
    if (pressedKey === "ArrowLeft") {
        if(snake.switchControls !== true) { //green apple switches controls
            gameState.snake.nextDirection = [-1, 0];  
        } else {
            gameState.snake.nextDirection = [1, 0];
        }
    }
});
