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
        this.hat_X_Position = '';
        this.hat_Y_Position = '';
        this.width = '';
        this.height = '';
        this.numberOfHoles = '';
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

    generateMap (height = 4, width = 4, percentageHoleCoverage = 50) {
        
        if (percentageHoleCoverage > 50 || percentageHoleCoverage <= 0) return console.log('Error: the map generated contains either too many or not enough holes.');
        
        // store width and height for map validation
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
        let numberOfHoles = Math.floor(((height * width) / 100) * percentageHoleCoverage);
        this.numberOfHoles = numberOfHoles // store for map validation / path findings
        // add holes to random positions
        for (let i = numberOfHoles; i > 0; i--) {
            let y_Axis = Math.floor(Math.random() * height);
            let x_Axis = Math.floor(Math.random() * width);

            if (newMap[y_Axis][x_Axis] === hole) {
                i++;
                continue;
            } else {
                newMap[y_Axis][x_Axis] = hole; 
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
                this.hat_X_Position = hat_X_Axis; // store hat position for path finding / map validation
                this.hat_Y_Position = hat_Y_Axis;
                hatPlaced = true 
                }

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

    let newMapParams = prompt('Please enter height, width and percentage hole coverage % (num: 1 - 40) seperated by spaces: ').split(' ')
    // map generation and validation loop
    do {
    this.field = this.generateMap(newMapParams[0], newMapParams[1], newMapParams[2]);
    this.validateMap();
    } while (!this.validateMap());
    
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

   validateMap () {

    let map = this.field; 
    let queue = [[this.hat_Y_Position, this.hat_X_Position, 0]]; // create queue of possible coordinates
    let maximumNumberOfMoves = (this.height * this.width) - this.numberOfHoles; // stoping condition for loop below
    let counter = 1; // check if outer loop exicution exceeds maximum number of moves
    let queueCounter = 0 // to access correct queue element
    let pathFound = false;
    
    do {
        let positionAbove = [(queue[queueCounter][0] -1),queue[queueCounter][1]]; // position above queue element
        let positionBelow = [(queue[queueCounter][0] +1),queue[queueCounter][1]]; // possition below queue element 
        let positionRight = [queue[queueCounter][0], (queue[queueCounter][1] +1)]; // position to right of queue element 
        let positionLeft = [queue[queueCounter][0] ,(queue[queueCounter][1] -1)]; // position to left of queue element
        let arr = [positionAbove, positionBelow, positionRight, positionLeft]; // add each position to array, and check if each element meets condtions below
        
        for (let i = 0; i < arr.length; i++){
            let possiblePosition = arr[i];
            if (possiblePosition[0] < 0 || possiblePosition[0] >= this.height) continue; // check if Y position is greater than map height
            else if (possiblePosition[1] < 0 || possiblePosition[1] >= this.width) continue; // check if X position is greater than map width
            else if (queue.some(queueValue => possiblePosition[0] === queueValue[0]) && queue.some(queueValue => possiblePosition[1] === queueValue[1])) continue; // check if value exisits in queue 
            else if (map[possiblePosition[0]][possiblePosition[1]] === hole ) continue; // check if grid position contains a hole 
            else {
                possiblePosition[2] = (queue[queueCounter][2] + 1); // increment counter queue = [[y, x, counter][y, x, counter][y, x, counter]] and add to queue
                queue.push(possiblePosition);
            };
            if (map[possiblePosition[0]][possiblePosition[1]] === pathCharacter){
                pathFound = true; // check if path found to start position
                break;
            } 
        }
        counter ++;
        queueCounter++;  
    } while ( counter < maximumNumberOfMoves && pathFound == false && queue.length > queueCounter);

    if (pathFound === true && queueCounter > this.width) {
        
      /*   for (let i = 0; i < queue.length; i++ ){
            let y = queue[i][0];
            let x = queue[i][1];
            map[y][x] = pathCharacter;
            for (let row in map){
                console.log(map[row].join(''));
                }    
        } */
        console.log('does the first loop finish');
      
        return true;
    } 
    else {
        console.log('return false for map')
        return false;
    } 

   }

}

// class creation
const game = new Field();

 // run game
game.run();

