// these values are set at the beginning
// and then used throughout the game
let gameState = {
    players: 2,
    whoseTurn: 1,
    gameOver: false
}

// function that considers which player's turn it is and then
// changes the UI accordingly
function changePlayer() {
    // if the current player is player 1 at the end of a move
    if (gameState.whoseTurn === 1) {
        let playerTwoHealth = document.getElementById("playerTwoHealth");
        // converts the innerHTML from string to a number and stores it in a variable
        let playerTwoHealthNum = Number(playerTwoHealth.innerHTML);
        // reduces by 10
        playerTwoHealthNum -= 10;

        // checks if the player has reached 0 health
        if (playerTwoHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerTwoHealthNum = 0;
            playerTwoHealth.innerHTML = playerTwoHealthNum;
            // ends the game
            gameOver();
        } else {
            // resets the HTML to the new value
            playerTwoHealth.innerHTML = playerTwoHealthNum;
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 2;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    } else if (gameState.whoseTurn === 2) {
        let playerOneHealth = document.getElementById("playerOneHealth");
        // converts the innerHTML from string to a number and stores it in a variable
        let playerOneHealthNum = Number(playerOneHealth.innerHTML);
        // reduces by 10
        playerOneHealthNum -= 10;

        // checks if the player has reached 0 health
        if (playerOneHealthNum <= 0) {
            // ensures health does not dig into the negative
            playerOneHealthNum = 0;
            playerOneHealth.innerHTML = playerOneHealthNum;
            // ends the game
            gameOver();
        } else {
            // resets the HTML to the new value
            playerOneHealth.innerHTML = playerOneHealthNum;
            // switch to the next player and change the UI's display / behavior
            gameState.whoseTurn = 1;

            // grabs the 'playerName' element and changes the player's turn display
            let playerName = document.getElementById("playerName");
            playerName.innerHTML = `Player ${gameState.whoseTurn}`;
        }
    }

    // update attack button styles and states after changing turns
    updateAttackButtons();
}

// if a player's health reaches 0 at the end of a turn, the game ends
// and the winner is announced
function gameOver() {
    let title = document.getElementById("title");
    title.style = "display: none;";
    let playerTurnDisplay = document.getElementById("playerTurn");
    playerTurnDisplay.style = "display: none;";

    let winningPlayer = document.getElementById("winningPlayer");
    winningPlayer.innerHTML = `Player ${gameState.whoseTurn} wins!`;

    let gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.style = "display: flex; flex-direction: column;";
    
    // disables both buttons
    document.getElementById("playerOneAttack").disabled = true;
    document.getElementById("playerTwoAttack").disabled = true;
}

// function that updates which player's button is active and which is not
function updateAttackButtons() {
    let playerOneAttackButton = document.getElementById("playerOneAttack");
    let playerTwoAttackButton = document.getElementById("playerTwoAttack");

    if (gameState.whoseTurn === 1) {
        // enables player 1 button and disables player 2
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");

        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");
    } else {
        // enables player 2 button and disables player 1
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");

        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");
    }
}

// function that allows the player one attack button to reduce the player two's
// health
function attackPlayerTwo() {
    // compartmentalized function that will switch the player 2 attack button to inactive
    // and player 1 attack button to active using DOM manipulation
    function changeButtonStatus() {
        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = true;
        playerTwoAttackButton.classList.add("inactive");
        playerTwoAttackButton.classList.remove("active");

        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = false;
        playerOneAttackButton.classList.add("active");
        playerOneAttackButton.classList.remove("inactive");
    }

    // commpartmentalized function that changes the player 1's sprite using the array
    // containing multiple images
    function animatePlayer() {
        let playerOneFrames = [
            "./images/R_Idle.png",
            "./images/R_Attack.png"
        ];

        let playerSprite = document.getElementById("playerOneSprite");
        playerSprite.src = playerOneFrames[1];
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack");

        let enemySprite = document.getElementById("playerTwoSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        enemySprite.classList.remove("idle");
        enemySprite.classList.add("damage");
        enemyDamage.play();

        function changePlayerOneSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerOneFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerOneSprite, 350);
    }

    if (gameState.whoseTurn === 1) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}

// function that allows the player two attack button to reduce the player one's
// health
function attackPlayerOne() {
    function changeButtonStatus() {
        let playerOneAttackButton = document.getElementById("playerOneAttack");
        playerOneAttackButton.disabled = true;
        playerOneAttackButton.classList.add("inactive");
        playerOneAttackButton.classList.remove("active");

        let playerTwoAttackButton = document.getElementById("playerTwoAttack");
        playerTwoAttackButton.disabled = false;
        playerTwoAttackButton.classList.add("active");
        playerTwoAttackButton.classList.remove("inactive");
    }

    function animatePlayer() {
        let playerTwoFrames = [
            "./images/L_Idle.png",
            "./images/L_Attack.png"
        ];

        let playerSprite = document.getElementById("playerTwoSprite");
        playerSprite.src = playerTwoFrames[1];
        playerSprite.classList.remove("idle");
        playerSprite.classList.add("attack");

        let enemySprite = document.getElementById("playerOneSprite");
        let enemyDamage = document.getElementById("SFX_PlayerDamage");
        enemySprite.classList.remove("idle");
        enemySprite.classList.add("damage");
        enemyDamage.play();

        function changePlayerTwoSprite() {
            enemySprite.classList.remove("damage");
            enemySprite.classList.add("idle");

            playerSprite.src = playerTwoFrames[0];
            playerSprite.classList.remove("attack");
            playerSprite.classList.add("idle");
        }

        setTimeout(changePlayerTwoSprite, 350);
    }

    if (gameState.whoseTurn === 2) {
        animatePlayer();
        changeButtonStatus();
        changePlayer();
    }
}
