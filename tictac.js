var readlineSync = require('readline-sync');

class Board {
  constructor() {
    this.board = [
      ['-', '-', '-'],
      ['-', '-', '-'],
      ['-', '-', '-']
    ];
  }

  addX(x, y) {
    if (x === undefined || y === undefined) {
      console.log('incorrect format');
      return false;
    } else if (x < 0 || x > 2) {
      console.log('invalid x input');
      return false;
    } else if (y < 0 || y > 2) {
      console.log('invalid y input');
      return false;
    } else if (x !== undefined && x !== undefined && this.board[x][y] !== '-') {
      console.log('space taken');
      return false;
    }
    console.log(`You place an X at row: ${x}, column: ${y}`)
    this.board[x][y] = 'X';
    return true;
  }

  addO(x, y) {
    if (x === undefined || y === undefined) {
      console.log('incorrect format');
      return false;
    } else if (x < 0 || x > 2) {
      console.log('invalid x input');
      return false;
    } else if (y < 0 || y > 2) {
      console.log('invalid y input');
      return false;
    } else if (x !== undefined && x !== undefined && this.board[x][y] !== '-') {
      console.log('space taken');
      return false;
    }
    console.log(`The AI places an O at row: ${x}, column: ${y}`)
    this.board[x][y] = 'O';
    return true;
  }

  checkFull() {
    let full = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '-') {
          full = false;
        }
      }
    }
    return full;
  }

  checkWin() {
    // check columns
    for (let j = 0; j < 2; j++) {
      if ('X' === this.board[0][j] && this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]) {
        console.log('============\nPlayer wins!\n============');
        return true;
      }
      if ('O' === this.board[0][j] && this.board[0][j] === this.board[1][j] && this.board[1][j] === this.board[2][j]) {
        console.log('============\nAI wins!\n============');
        return true;
      }
    }
    // check rows
    for (let j = 0; j < 2; j++) {
      if ('X' === this.board[j][0] && this.board[j][0] === this.board[j][1] && this.board[j][1] === this.board[j][2]) {
        console.log('============\nPlayer wins!\n============');
        return true;
      }
      if ('O' === this.board[j][0] && this.board[j][0] === this.board[j][1] && this.board[j][1] === this.board[j][2]) {
        console.log('============\nAI wins!\n============');
        return true;
      }
    }
    // check diagonal
    if ('X' === this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      console.log('============\nPlayer wins!\n============');
      return true;
    }

    if ('O' === this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      console.log('============\nAI wins!\n============');
      return true;
    }

    // check diagonal
    if ('X' === this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      console.log('============\nPlayer wins!\n============');
      return true;
    }

    if ('O' === this.board[0][2] && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      console.log('============\nAI wins!\n============');
      return true;
    }

    return false;
  }

  aiMove() {
    let placed = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '-') {
          this.addO(i, j);
          placed = true;
          return;
        }
      }
    }
    if (!placed) {
      throw 'Board is full';
    }
  }

  print() {
    let output = ``;
    for (let i = 0; i < 3; i++) {
      output = output + this.board[i][0] + '|' + this.board[i][1] + '|' + this.board[i][2] + '\n';
    }
    console.log(output);
  }

}


let a = new Board();

// a.addX(0, 1);
// a.print();

// for (let i = 0; i < 10; i++) {
//   a.aiMove();
//   a.print();
// }

var userName = readlineSync.question('May I have your name? ');
// console.log(typeof userName);
console.log(`Hello, ${userName}!`);

for (let i = 0; i < 9; i++) {
  let input = readlineSync.question('Your move! Enter Row and Column. (format: xy, 0 <= x, y <= 2)\n(example: 00 => top left square): ');
  let x = input.charAt(0);
  let y = input.charAt(1);
  let valid = a.addX(x, y);
  
  if (valid) {
    let completed = a.checkWin();
    if (completed) {
      break;
    }
    a.print();
    a.aiMove();
    completed = a.checkWin();
    if (completed) {
      break;
    }
    a.print();
  } else {
    i--;
  }
}

a.print();

