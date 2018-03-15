var readlineSync = require('readline-sync');

class Board {
  constructor() {
    this.state = [
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
    } else if (x !== undefined && x !== undefined && this.state[x][y] !== '-') {
      console.log('space taken');
      return false;
    }
    console.log(`You place an X at row: ${x}, column: ${y}`)
    this.state[x][y] = 'X';
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
    } else if (x !== undefined && x !== undefined && this.state[x][y] !== '-') {
      console.log('space taken');
      return false;
    }
    console.log(`The AI places an O at row: ${x}, column: ${y}`)
    this.state[x][y] = 'O';
    return true;
  }

  checkFull() {
    let full = true;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state[i][j] === '-') {
          full = false;
        }
      }
    }
    return full;
  }

  aiMove() {
    let placed = false;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state[i][j] === '-') {
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
      output = output + this.state[i][0] + '|' + this.state[i][1] + '|' + this.state[i][2] + '\n';
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
console.log(typeof userName);

for (let i = 0; i < 9; i++) {
  // let userPlaced = false;
  // while (!userPlaced) {
    let input = readlineSync.question('Your move! Enter Row and Column: ');
    let x = input.charAt(0);
    let y = input.charAt(1);
    let valid = a.addX(x, y);
    
    if (valid) {
      a.print();
      a.aiMove();
      a.print();
      // userPlaced = true;
    } else {
      i--;
    }
    
  // }
  
  // a.aiMove();
  // a.print();
}

a.print();

