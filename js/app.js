///////////////////// CONSTANTS /////////////////////////////////////
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let xWins = 0;
let oWins = 0;
let ties = 0;
let first = "X"
///////////////////// CACHED ELEMENT REFERENCES /////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("xFirst").onclick = xFirst;
document.getElementById("oFirst").onclick = oFirst;
document.getElementById("reset-scoreboard").onclick = resetScoreboard;
///////////////////// FUNCTIONS /////////////////////////////////////
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;

if (first === "X") {
  turn = "X"
}
else if (first === "O") {
  turn = "O"
}

  render();
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      if (win === "T") {
        ties++;
        document.getElementById("tScore").innerHTML = ties;
      }

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
      if (winner === "X") {
        xWins++;
        document.getElementById("xScore").innerHTML = xWins;
        playYuh();
      }
      else if (winner === "O") {
        oWins++;
        document.getElementById("oScore").innerHTML = oWins;
        playYuh();
      }

    }

  });

  return winner ? winner : board.includes("") ? null : "T";
}

function xFirst(){
  init();
  document.getElementById("turn").innerHTML = "Turn: X";
  turn = "X";
  first = "X"

}
function oFirst(){
  init();
  document.getElementById("turn").innerHTML = "Turn: O";
  turn = "O";
  first = "O"
}

function playYuh() {
  document.getElementById("myAudio").play();
}

function resetScoreboard() {
    xWins = 0;
    oWins = 0;
    ties = 0;

    document.getElementById("xScore").innerHTML = xWins;
    document.getElementById("tScore").innerHTML = ties;
    document.getElementById("oScore").innerHTML = oWins;
}
