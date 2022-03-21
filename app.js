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

    if (playWinsTo(parsedPlayerSelection, parsedComputerSelection)) {
        // Player wins
        console.log(`You win! ${parsedPlayerSelection} beats ${parsedComputerSelection}`);
        return "Win";
    }
    if (playLosesTo(parsedPlayerSelection, parsedComputerSelection)) {
        // Player lose
        console.log(`You Lose! ${parsedComputerSelection} beats ${parsedPlayerSelection}`);
        return "Lose";
    }
    console.log(`It's a tie! You played ${parsedPlayerSelection}`);
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