/**********************************************
 * File: app.js
 * Description: A simple Tic-Tac-Toe game
 * Author: [Henry Chen]
 **********************************************/

// Select the status display element from the DOM.
// We'll use this to display messages to the user.
const statusDisplay = document.querySelector(".game--status");

// Set initial game state values
let gameActive = true; // This keeps track of whether the game is active or has ended
let currentPlayer = "X"; // This tracks whose turn it currently is
let gameState = ["", "", "", "", "", "", "", "", ""]; // Represents the 9 cells in the game board

// A function to return the current player's turn message
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

// Display the initial status message in the DOM
statusDisplay.innerHTML = currentPlayerTurn();

// Define the possible winning conditions for Tic-Tac-Toe
// Each array within this array represents a set of indices in 'gameState'
// that forms a winning line
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],  [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

/**
 * handleCellPlayed
 * ----------------
 * Updates the gameState array and the clicked cell with the current player's symbol.
 * @param {HTMLElement} clickedCell - The cell that was clicked in the UI.
 * @param {number} clickedCellIndex - The index of the clicked cell in the gameState.
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
  // Update the game state to reflect the move
  // Display the current player's symbol in the clicked cell
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

/**
 * handlePlayerChange
 * ------------------
 * Switches the active player from X to O or O to X.
 * Also updates the UI text to notify whose turn it is.
 */
function handlePlayerChange() {
  // Toggle the current player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
  // Update the status text to reflect the new player's turn
}

/**
 * handleResultValidation
 * ----------------------
 * Checks if the current move caused a win or a draw.
 * If a win, display a win message and end the game.
 * If a draw, display a draw message and end the game.
 * Otherwise, switch players.
 */
function handleResultValidation() {
  let roundWon = false;

 
  for(let i=0; i<=7;i++){
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if(a === '' || b === '' || c === ''){
      continue;
    }
    if (a==b && b==c){
      roundWon = true;    
    }
  }
  if(roundWon){
    statusDisplay.innerHTML = `${currentPlayer} Won!`;
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = "Draw!";
    gameActive = false;
    return;
  } 
  
  handlePlayerChange();
}

/**
 * handleCellClick
 * ---------------
 * This function is triggered whenever a cell in the board is clicked.
 * It determines which cell was clicked, checks if that cell is already used
 * or if the game is inactive, and if valid, calls the functions to update the game state.
 * @param {Event} clickedCellEvent - The click event on one of the cells.
 */
function handleCellClick(clickedCellEvent) {
  // The clicked cell element
  const clickedCell = clickedCellEvent.target;

  // The index of the cell based on its data attribute
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  // If the cell is already filled or the game is not active, don't do anything
  if(gameState[clickedCell]=="" || gameActive == false){
    return;
  }
  // Otherwise, handle the cell being played and validate results
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}


function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();

  // Clear each cell in the UI
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = "";
  }
}

// Add event listeners to each cell for a click event
const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

// Add event listener to the restart button
document.querySelector(".game--restart").addEventListener("click", handleRestartGame);
