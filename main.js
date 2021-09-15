const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray){
        this.field = fieldArray;
        this._x_Position = 0;
        this._y_Position = 0;
        this.win = false;
    }
    
    get x_Position() {
        return this._x_Position
    }

    set x_Position(move) {
        this._x_Position = move;
    }

    get y_Position() {
        return this._y_Position
    }

    set y_Position(move) {
        this._y_Position = move       
    }

    print() {
        for (let row in this.field){
            console.log(this.field[row].join(''));
            }
    }

    clearConsole() {
        return console.clear();
    }

    move() {
        this.print();
        // user enters keystroke
        let keystroke = prompt('Please enter your move - w, a, s, d: ');
        // keystroke validation
        if (this.keystrokeValidation(keystroke)){
            switch(keystroke){
                case 'w':
                    this.moveValidation_Y(-1);
                    break;
                case 's':
                    this.moveValidation_Y(1);
                    break;
                case 'a':
                    this.moveValidation_X(-1);
                    break;
                case 'd':
                    this.moveValidation_X(1);
                    break;          
                default: 
                    throw new Error('hmmm something went wrong, please try again. Error message: end of switch statement reached with no valid move');
            }
        } else {
                return this.move();
            } 

        return 
    }

    keystrokeValidation (keystroke) {
        let regex = '[w?a?s?d?]';
        if (!keystroke.match(regex) || keystroke.length > 1) {
            console.log('invalid keystroke, try again!');
            return false; 
        } else {
            return true;
        }
    }

    moveValidation_X (move) {
        // get current value
        let position = this.x_Position;
        // increment or decrement current value based on input: a = -1 (left) || d = +1 (right)
        if (move === -1) position += move; // don't use -= and value - -1 = value +1 
        if (move === 1) position += move;
        // check if new postion will put player out of bounds, else update y_position
        if (position < 0 || position >= this.field[0].length) {
            console.log('invalid move: player out of bounds. Please try again!')
            return process.exit();
        } else {                
            this.x_Position = position;
            return true;
        }
    }

    moveValidation_Y (move) {
          // get current value
          let position = this.y_Position;
          // increment or decrement current value based on input: W = -1 (up) || s = +1 (down)
          if (move === -1) position += move; // don't use -= and value - -1 = value +1 
          if (move === 1) position += move;
          // check if new postion will put player out of bounds, else update y_position
          if (position < 0 || position >= this.field.length) {
            console.log('invalid move: player out of bounds. Please try again!')
                return process.exit();
          } else {
                this.y_Position = position;
                return true;
            }  
    }

    
    updatePathCharacter () {
        this.field[this.y_Position][this.x_Position] = pathCharacter;
    }

    checkForHole() { 
        if (this.field[this.y_Position][this.x_Position] === hole){
            console.log('You fell down a hole, please look where you are going!');
            return process.exit(); 
        }
    }

   winOrLose() {
    if (this.field[this.y_Position][this.x_Position] === hat) {
        this.win = true;
        console.log('Congratulations, you\'ve found your hat!')
        return this.playAgain();
        }
   }

   playAgain () {
       this.win = false;
       let anotherGo = prompt('would you like to play again? yes / no ');
       if (anotherGo == 'yes') return this.run();
       else if (anotherGo == 'no') process.exit();
       else return this.playAgain();
   }

   run() {
      do {
          this.move();
          this.winOrLose();
          this.checkForHole();
          this.updatePathCharacter();
          this.clearConsole();
      } while (!this.win)
   } 
}

// starting move is feild[0][0]
    // w = feild[-1][0]
    // s = feild[+1][0]
    // a = feild[0][-1]
    // d = feild[0][+1]

// class creation
 const game = new Field([['*', '░', 'O'],
 ['░', 'O', '░'],
 ['░', '^', '░'],]);


game.run();
