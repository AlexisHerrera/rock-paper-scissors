function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

function computerPlay() {
    let playOptions = ["Rock", "Paper","Scissors"];
    let randomPlay = playOptions[Math.floor(Math.random()*playOptions.length)];
    
    return randomPlay;
}

function playWinsTo(playerSelection, computerSelection) {
    let winsWithRock = playerSelection === "Rock" && computerSelection == "Scissors";
    let winsWithPaper = playerSelection === "Paper" && computerSelection == "Rock";
    let winsWithScissors = playerSelection === "Scissors" && computerSelection == "Paper";
    return winsWithRock || winsWithPaper || winsWithScissors;
}

function playLosesTo(playerSelection, computerSelection) {
    return playWinsTo(computerSelection, playerSelection);
}

function playRound(playerSelection, computerSelection) {  
    let parsedPlayerSelection = capitalize(playerSelection);
    let parsedComputerSelection = capitalize(computerSelection);

    // TODO: Uncouple UI from logic
    // TODO: Fix duplicated code: result + log + display + increment value
    // TODO: mixed logic when rounds reach 5
    incrementValue('rounds');
    if (playWinsTo(parsedPlayerSelection, parsedComputerSelection)) {
        // Player wins
        const result = `You win! ${parsedPlayerSelection} beats ${parsedComputerSelection}`
        console.log(result);
        displayResult(result)
        incrementValue('wins');
        endGameIfFinished();
        return "Win";
    }
    if (playLosesTo(parsedPlayerSelection, parsedComputerSelection)) {
        // Player lose
        const result = `You Lose! ${parsedComputerSelection} beats ${parsedPlayerSelection}`
        console.log(result);
        displayResult(result);
        incrementValue('loses');
        endGameIfFinished();
        return "Lose";
    }
    const result = `It's a tie! You played ${parsedPlayerSelection}`
    console.log(result);
    displayResult(result)
    incrementValue('ties');
    endGameIfFinished();
    return "Tie";
    
}

function game() {
    let roundsWon = 0;
    let roundsLost = 0;
    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt("Choose rock, paper or scissors and write it:");
        let computerSelection = computerPlay();
        let resultRound = playRound(playerSelection, computerSelection);
        if (resultRound === "Win") {
            roundsWon++;
        }
        if (resultRound === "Lose") {
            roundsLost++;
        }
    }
    if (roundsWon > roundsLost) {
        console.log("Congratulations, you won the game!");
    }
    else if (roundsWon < roundsLost) {
        console.log("Good luck next time!, you lost the game")
    } 
    else {
        console.log("It's a tie!");
    }
    console.log(`Wins: ${roundsWon}, Loses: ${roundsLost}`);
}

// UI

// Links buttons to a move 
document.querySelector('.moves').childNodes.forEach(move => {
    move.addEventListener('click', function() {
        playRound(move.id, computerPlay());
    })
});

function endGameIfFinished() {
    var rounds = parseInt(document.getElementById("rounds").textContent);
    if (rounds < 5)  return;
    var roundsWon = parseInt(document.getElementById("wins").textContent);
    var roundsLost = parseInt(document.getElementById("loses").textContent);

    if (roundsWon > roundsLost) {
        document.querySelector('html').innerText = "Congratulations, you won the game!";
        console.log("Congratulations, you won the game!");
    }
    else if (roundsWon < roundsLost) {
        document.querySelector('html').innerText = "Good luck next time!, you lost the game";
        console.log("Good luck next time!, you lost the game")
    } 
    else {
        document.querySelector('html').innerText = "It's a tie!";
        console.log("It's a tie!");
    }
}

function displayResult(result) {
    document.getElementById("result").textContent = result;
}

function incrementValue(valueId) {
    var actual_value = parseInt(document.getElementById(valueId).textContent);
    document.getElementById(valueId).textContent = actual_value + 1 ;
}

