let snakeName = document.querySelector("h1");
let input = document.querySelector("input");
let nameButton = document.querySelector("#submit");
let playerInfo = document.querySelector("#playerInfo");
let playerName = document.querySelector("#name");
let message = document.querySelector("#message");
let play = document.querySelector("#play");
let table = document.querySelector("table");

nameButton.addEventListener("click", function(){
    playerName.innerText = input.value;
    playerInfo.style.display = "none";
    input.style.visibility = "hidden";
    input.style.display = "none";
    nameButton.style.visibility = "hidden";
    nameButton.style.display = "none";
});

//play.addEventListener("click", function() {
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

    function getApple() {
        let appleX = Math.floor(Math.random()*18);
        let appleY = Math.floor(Math.random()*18);
        console.log(appleX, appleY)
        let row = table.children[appleY];
        let cell = row.children[appleX];
        cell.classList.add("apple");
        return [appleX, appleY]
    }
//});


let snake = {
    body: [ [10, 5], [10, 6], [10, 7], [10, 8] ],
    nextDirection: [0, 1]
}

let gameState = {
   apple: getApple(),
   snake: snake, // from above
   score: 0, 
   highScore: 0
}




setInterval(function(){
    let arr = gameState.snake.body;
    for(let i = 0; i <arr.length; i++) {
        let piece = arr[i];
        let x = piece[0];
        let y = piece[1];
        table.children[y].children[x].classList.add("snake");
    }

 }, 10000);