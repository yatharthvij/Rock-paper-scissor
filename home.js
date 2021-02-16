function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numToChoice(randToRpsInt());
    console.log("computer choice: " + botChoice);

    results = decideWinner(humanChoice, botChoice); //[1,0] -> human won, bot lost
    console.log(results);
    
    message = finalMessage(results); //you won
    console.log(message);

    rpsFrontEnd(yourChoice.id, botChoice, message);
}

//Math.floor(Math.random() *3);

function randToRpsInt() {
    return Math.floor(Math.random() *3);
}

function numToChoice(number) {
    return ["rock","paper","scissors"][number];
}

function decideWinner(yourChoice,botChoice) {
    var rpsDatabase = {
        "rock": {"scissors": 1, "rock": 0.5, "paper": 0},
        "paper": {"scissors": 0, "rock": 1, "paper": 0.5},
        "scissors": {"scissors": 0.5, "rock": 0, "paper": 1}
    };

    var yourScore = rpsDatabase[yourChoice][botChoice];
    var botScore = rpsDatabase[botChoice][yourChoice];
    return [yourScore,botScore];
}

function finalMessage([yourScore,botScore]) {
    if (yourScore === 0) {
        return {"message": "You Lost!","color":"red"};
    } else if (yourScore === 0.5) {
        return {"message": "You Tied!","color":"yellow"};
    } else {
        return {"message": "You Won!","color":"green"};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imageDatabase = {
        "rock": document.getElementById("rock").src,
        "paper": document.getElementById("paper").src,
        "scissors": document.getElementById("scissors").src
    };

    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var humanDiv = document.createElement("div");
    var botDiv = document.createElement("div");
    var messageDiv = document.createElement("div");

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1);'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage["color"] + "; font-size: 60px; padding: 30px;'>" + finalMessage["message"] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1);'>";
    document.getElementById("flex-box-rps-div").appendChild(humanDiv);
    document.getElementById("flex-box-rps-div").appendChild(messageDiv);
    document.getElementById("flex-box-rps-div").appendChild(botDiv);
}