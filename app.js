let input = document.querySelector("input");
let nameButton = document.querySelector("#submit");
let playerName = document.querySelector("#name");
let message = document.querySelector("#message");
let play = document.querySelector("#play");
let grid = document.querySelector("#grid");

play.addEventListener("click", function() {
    play.style.visibility = "hidden";
    play.style.display = "none";
    message.style.visibility = "hidden";
    message.style.display = "none";
    for(let i = 0; i<255; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
});


nameButton.addEventListener("click", function(){
    playerName.innerText = input.value;
    input.style.visibility = "hidden";
    input.style.display = "none";
    nameButton.style.visibility = "hidden";
    nameButton.style.display = "none";
});