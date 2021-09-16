const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(){
        this.field = [];
        this._x_Position = 0;
        this._y_Position = 0;
        this.win = false;
        this.hat_X_Position = 0;
        this.hat_Y_Position = 0;
        this.width = '';
        this.height = '';
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

    static generateMap (height = 4, width = 4, percentageHoleCoverage = 50) {
        
        if (percentageHoleCoverage > 50 || percentageHoleCoverage <= 0) return console.log('Error: the map generated contains either too many or not enough holes.');
        
        // add width and length values to game instance
        this.width = width;
        this.height = height;
        // generate empy map
        let newMap = [];

        for (let i = height; i > 0; i--) {
            let newArr = [];
            for (let y = width; y > 0; y-- ) {
                newArr.push(fieldCharacter);
            }
            newMap.push(newArr);
        }

        // add holes 
        // caculate number of holes to add by converting percentage param to no. of holes. 
        let numberOfHoles = Math.floor(((height * width) / 100) * percentageHoleCoverage)
        // add holes to random positions
        for (let i = numberOfHoles; i > 0; i--) {
            let y_Axis = Math.floor(Math.random() * height);
            let x_Axis = Math.floor(Math.random() * width);

            if (newMap[y_Axis][x_Axis] === hole) {
                i++;
                continue;
            } else {
                newMap[y_Axis][x_Axis] = hole;
                this.hat_X_Position = x_Axis;
                this.hat_Y_Position = y_Axis;
            }
        }

        // add path character to start position
        newMap[0][0] = pathCharacter;
        
        // add hat to map
        let hatPlaced = false;
        
        do {
            let hat_Y_Axis = Math.floor(Math.random() * height);
            let hat_X_Axis = Math.floor(Math.random() * width);

            if (hat_X_Axis === 0 && hat_Y_Axis === 0) continue;
            else {
                newMap[hat_Y_Axis][hat_X_Axis] = hat;
                hatPlaced = true 
                };

            } while  (hatPlaced = false);
          
        return newMap;
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
       this.x_Position = 0;
       this.y_Position = 0;
       let anotherGo = prompt('would you like to play again? yes / no ');
       if (anotherGo == 'yes') return this.run();
       else if (anotherGo == 'no') process.exit();
       else return this.playAgain();
   }

   run() {
    let newMapParams = prompt('Please enter height, width and percentage hole cooverage % (num: 1 - 40) seperated by spaces: ')
    newMapParams = newMapParams.split(' ');
    this.field = Field.generateMap(newMapParams[0], newMapParams[1], newMapParams[2]);
    this.clearConsole();
      do {
          this.move();
          this.winOrLose();
          this.checkForHole();
          this.updatePathCharacter();
          this.clearConsole();
      } while (!this.win)
   } 

   validateMap () {
    let map = this.field;
    let queue = [[this.hat_Y_Position, this.hat_X_Position, 0]]

    do {
        let counter = 1;
        let pathFound = false;
        let positionAbove = [(this.hat_Y_Position --),this.hat_X_Position, counter];
        let positionBelow = [(this.hat_Y_Position ++),this.hat_X_Position, counter];
        let positionRight = [this.hat_Y_Position, (this.hat_X_Position ++), counter];
        let positionLeft = [this.hat_Y_Position ,(this.hat_X_Position --), counter];
        let arr = [positionAbove, positionBelow, positionRight, positionLeft];

        for (let i = 0; i < arr.length; i++){
            let possiblePosition = arr[i];
            if (possiblePosition[0] < 0 || possiblePosition[0] > this.height) continue; // check if Y position is greater than map height
            if (possiblePosition[1] < 0 || possiblePosition[1] > this.width) continue; // check if X position is greater than map width
            if (queue.some(queueValue => possiblePosition === queueValue)) continue; // check if value exisits in queue 
            if (map[possiblePosition[0]][possiblePosition[1]] === hole ) continue; // check if grid position contains a hole 
            queue.push(possiblePosition);
            if (map[possiblePosition[0]][possiblePosition[1]] === pathCharacter){
                pathFound = true;
                break;
            } 
        }

    } while (pathFound === false || counter > 100);

   }

}

// starting move is feild[0][0]
    // w = feild[-1][0]
    // s = feild[+1][0]
    // a = feild[0][-1]
    // d = feild[0][+1]

// class creation
 const game = new Field();

 
game.run();

