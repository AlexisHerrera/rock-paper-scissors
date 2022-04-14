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

    // Logic is mixed with UI... JS things
    incrementValue('rounds');
    let result = '';
    if (playWinsTo(parsedPlayerSelection, parsedComputerSelection)) {
        result = `You win! ${parsedPlayerSelection} beats ${parsedComputerSelection}`
        incrementValue('wins');
    }
    else if (playLosesTo(parsedPlayerSelection, parsedComputerSelection)) {
        result = `You Lose! ${parsedComputerSelection} beats ${parsedPlayerSelection}`
        incrementValue('loses');
    } else {
        result = `It's a tie! You played ${parsedPlayerSelection}`
        incrementValue('ties');
    }
    displayResult(result)
    endGameIfFinished();
}

// Links buttons to a move 
document.querySelector('.moves').childNodes.forEach(move => {
    move.addEventListener('click', function() {
        playRound(move.id, computerPlay());
    })
});

function endGameIfFinished() {
    let roundsWon = parseInt(document.getElementById("wins").textContent);
    let roundsLost = parseInt(document.getElementById("loses").textContent);
    if (!(roundsWon === 5 || roundsLost === 5)) return;
    let message = "";
    if (roundsWon === 5) {
        message = "Congratulations, you won the game!";
    }
    if (roundsLost === 5) {
        message = "Good luck next time!, you lost the game";
    }
    popUpModalWithMessage(message);
}

function displayResult(result) {
    document.getElementById("result").textContent = result;
}

function incrementValue(valueId) {
    let actual_value = parseInt(document.getElementById(valueId).textContent);
    document.getElementById(valueId).textContent = actual_value + 1 ;
}

/* Modal */

function popUpModalWithMessage(message) {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    let finalMessage = document.getElementById("final-message");
    finalMessage.innerText = message;
}

// The oldest trick in the book
const reload = document.getElementById('reload');

reload.addEventListener('click', _ => {
    location.reload();
});