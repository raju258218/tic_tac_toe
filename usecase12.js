const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
let player = '';
let computer = '';
let current = '';
// usecase1
function printBoard() {
  console.log("Current Board:");
  for (let i = 0; i < 3; i++) {
    console.log(board[i][0]+ "  |"+ board[i][1]+"  |"+board[i][2]);
    if (i < 2) console.log("---|---|---");
  }
  console.log();
}
function checkWin(sym) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === sym && board[i][1] === sym && board[i][2] === sym) return true;
    if (board[0][i] === sym && board[1][i] === sym && board[2][i] === sym) return true;
  }
  if (board[0][0] === sym && board[1][1] === sym && board[2][2] === sym) return true;
  if (board[0][2] === sym && board[1][1] === sym && board[2][0] === sym) return true;
  return false;
}

function checkDraw() {
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (board[i][j] === ' ') return false;
  return true;
}
//usecase4
function playNextTurn() {
  if (current === 'Player') {
    rl.question("Enter your position(row col): ", (input) => {
      let [row, col] = input.trim().split(" ").map(Number);
      if (row >= 0 && row <= 2 && col >= 0 && col <= 2 && board[row][col] === ' ') {
        board[row][col] = player;
         //usecase5
        if (checkWin(player)) {
          printBoard();
          console.log("player win");
          rl.close();
          return;
        }

        if (checkDraw()) {
          printBoard();
          console.log(" both player didn't win,so it's draw");
          rl.close();
          return;
        }
            //usecase6
        current = 'Computer';
        printBoard();
        playNextTurn();
      } else {
        console.log(" Invalid move. Try again.");
        playNextTurn();
      }
    });
  } else {
    console.log("it's computer turn");
    let moved = false;
    for (let r = 0; r < 3 && !moved; r++) {
      for (let c = 0; c < 3 && !moved; c++) {
        if (board[r][c] === ' ') {
          board[r][c] = computer;
          if (checkWin(computer)) {
            moved = true;
            break;
          }
          board[r][c] = ' ';
        }
      }
    }
    if (!moved) {
    let emptyCells = [];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[r][c] === ' ') {
          emptyCells.push([r, c]);
        }
      }
    }
    if (emptyCells.length > 0) {
      let index = Math.floor(Math.random() * emptyCells.length);
      let [r, c] = emptyCells[index];
      board[r][c] = computer;
      moved = true;
    }
  }    
    if (checkWin(computer)) {
      printBoard();
      console.log("Computer wins!");
      rl.close();
    } else if (checkDraw()) {
      printBoard();
      console.log(" It's a draw!");
      rl.close();
    } else {
      current = 'Player';
      printBoard();
      playNextTurn();
    }
  }
}
// usecase2
function askToss() {
  rl.question("toss: Heads or Tails? (H/T): ", (call) => {
    call = call.trim().toUpperCase();
    if (call !== 'H' && call !== 'T') {
      console.log("Invalid input.....Enter only H or T.");
      askToss();
      return;
    }
    let coin;
    let coinFlip = Math.floor(Math.random() * 2);
    if (coinFlip === 0) {
      coin = 'H';
    } else {
      coin = 'T';
    }
    if (coin === 'H') {
      console.log("Toss Result: Heads");
    } else {
      console.log("Toss Result: Tails");
    }
    let tossWinner;
    if (call === coin) {
      tossWinner = 'Player';
    } else {
      tossWinner = 'Computer';
    }
    console.log( tossWinner + " win the toss.");
    current = tossWinner;
    if (tossWinner === 'Player') {
      askSymbol(); 
    } else {
      let symbolFlip = Math.floor(Math.random() * 2); 
      if (symbolFlip === 0) {
        computer = 'X';
      } else {
        computer = 'O';
      }
      if (computer === 'X') {
        player = 'O';
      } else {
      player = 'X';
      }
      console.log(" Computer chose " + computer + ", You are " + player );
      printBoard();
      playNextTurn();
    }
  });
}
// usecase3
function askSymbol() {
  rl.question("Choose your symbol (X or O): ", (symbol) => {
    symbol = symbol.trim().toUpperCase();
    if (symbol !== 'X' && symbol !== 'O') {
      console.log("Invalid input.Enter only X or O.");
      askSymbol();
      return;
    }
    player = symbol;
    computer = (player === 'X') ? 'O' : 'X';
    console.log("You: "+player+" | Computer: "+computer);
    printBoard();
    playNextTurn();
  });
}
askToss();
