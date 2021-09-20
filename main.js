const prompt = require('prompt-sync')({sigint: true});

const maze = require('./helper_modules/maze.js')

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(){
        this.map = [];
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
        for (let row in this.map){
            console.log(this.map[row].join(''));
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
        if (position < 0 || position >= this.map[0].length) {
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
          if (position < 0 || position >= this.map.length) {
            console.log('invalid move: player out of bounds. Please try again!')
                return process.exit();
          } else {
                this.y_Position = position;
                return true;
            }  
    }

    
    updatePathCharacter () {
        this.map[this.y_Position][this.x_Position] = pathCharacter;
    }

    checkForHole() { 
        if (this.map[this.y_Position][this.x_Position] === hole){
            console.log('You fell down a hole, please look where you are going!');
            return process.exit(); 
        }
    }

   winOrLose() {
    if (this.map[this.y_Position][this.x_Position] === hat) {
        this.win = true;
        console.log('Congratulations, you\'ve found your hat!')
        return this.playAgain();
        }
   }

   playAgain () {
       this.win = false;
       this.x_Position = 0;
       this.y_Position = 0;
       let anotherGo = prompt('would you like to play again? yes / no ');
       if (anotherGo == 'yes') return this.run();
       else if (anotherGo == 'no') process.exit();
       else return this.playAgain();
   }

    run() {
        // play game or watch the maze solver
        let playOrWatchMazeSolver = prompt('Would you like to play or watch the maze solver? Enter: play / maze solver: ');

        if (playOrWatchMazeSolver === 'maze solver') return maze.watchMapValidation();
        else if(playOrWatchMazeSolver === 'play') return this.playGame();
        else return this.run();
    }

    playGame() {    
        let newMapParams = prompt('Please enter height, width and percentage hole coverage % (num: 1 - 40) seperated by spaces: ').split(' ')
        // map generation and validation loop
        let mapValid = false;
        do  {
            this.map = maze.generateMap(newMapParams[0], newMapParams[1], newMapParams[2]);
            mapValid = maze.validateMap();
        } while (mapValid === false);
        
        // main game loop
        let startgame = prompt('would you like to start: yes/no ')
        if (startgame === 'yes'){
            do {
                this.move();
                this.winOrLose();
                this.checkForHole();
                this.updatePathCharacter();
                this.clearConsole();
                } while (!this.win)
            } else process.exit();
        
    }     

};

// class creation
const game = new Field();

 // run game
game.run();


