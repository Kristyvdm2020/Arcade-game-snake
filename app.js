let snakeName = document.querySelector("h1");
let input = document.querySelector("input");
let nameButton = document.querySelector("#submit");
let playerInfo = document.querySelector("#playerInfo");
let playerName = document.querySelector("#name");
let message = document.querySelector("#message");
let play = document.querySelector("#play");
let table = document.querySelector("table");

function getApple() {
    let appleX = Math.floor(Math.random()*18);
    let appleY = Math.floor(Math.random()*18);
    console.log(appleX, appleY)
    //here is where we color the apple
    let row = table.children[appleY];
    let cell = row.children[appleX];
    cell.classList.add("apple");
    return [appleX, appleY]
}

let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
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
    let arr = gameState.snake.body;
    let tail = arr[0]; 
    table.children[tail[1]].children[tail[0]].classList.remove("snake");
    let head = arr[arr.length-1]
    let newHead = [head[0] + gameState.snake.nextDirection[0], head[1]+gameState.snake.nextDirection[1]];
    arr.push(newHead);
    arr.shift();
    return gameState.wallCheck();
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
    
    for (let j = 0; j < 18; j++) {
        let row = document.createElement("tr");
        for (let i = 0; i < 18; i++) {
            let td = document.createElement("td");
            td.id = i + "-" + j;
            row.appendChild(td);
        }
        table.appendChild(row);
    
    }

    let appleLoc = getApple();
    gameState.apple = appleLoc;
    getSnake();
    gameState.playing = true;
    
    
    setInterval(function(){
        moveSnake();
        getSnake();
    }, 150);

    
});

//Here is where we need to find the event listener for this
table.addEventListener("keydown", function() {
    console.log("hello world");
});