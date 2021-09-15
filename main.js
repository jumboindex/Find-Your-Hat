const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray){
        this.field = fieldArray;
        this._x_Position = 2;
        this._y_Position = 2;
    }
    
    get x_Position() {
        return this._x_Position
    }

    set x_Position(input) {
        // get current value
        let position = this.x_Position;
        // increment or decrement current value based on input: W = -1 (up) || s = +1 (down)
        if (input === -1) position += input; // don't use -= and value - -1 = value +1 
        if (input === 1) position += input;
        // check if new postion will put player out of bounds, else update y_position
        if (position < 0 || position > this.field[0].length) {
            console.log('invalid move: player out of bounds')
                    return this.move();
        } else {
            return this._x_Position = position;     
        } 
    }

    get y_Position() {
        return this._y_Position
    }

    set y_Position(input) {
        // get current value
        let position = this.y_Position;
        // increment or decrement current value based on input: W = -1 (up) || s = +1 (down)
        if (input === -1) position += input; // don't use -= and value - -1 = value +1 
        if (input === 1) position += input;
        // check if new postion will put player out of bounds, else update y_position
        if (position < 0 || position > this.field.length) {
            console.log('invalid move: player out of bounds')
                    return this.move();
        } else {
            return this._y_Position = position;     
        }   
    }

    print() {
    for (let row in this.field){
      console.log(this.field[row].join(''));
        }
    }

    // move method:
    // takes argument of key stroke - wasd 
    // checks if teh move will take the player out of bound
    // moves character 
    // replaces previous postion with pathCharacter * 
    // updates new postion with feildCharacter 
    move() {
        // user enters keystroke
        let keystroke = prompt('Please enter your move - w, a, s, d: ');
        // keystroke validation
        let regex = '[w?a?s?d?]';
        if (!keystroke.match(regex) || keystroke.length > 1) {
            console.log('invalid keystroke, try again!')
            return this.move();
        } 

        switch(keystroke){
            case 'w':
                this.y_Position = -1;
                break;
            case 's':
                this.y_Position = 1;
                break;
            case 'a':
                this.x_Position = -1;
                console.log(this.x_Position);
                break;
            case 'd':
                this.x_Position = 1;
                console.log(this.x_Position);
                break;          
            default: 
                throw new Error('hmmm something went wrong, please try again. Error message: end of switch statement reached with no valid move');
        }

        // starting move is feild[0][0]
        // w = feild[-1][0]
        // s = feild[+1][0]
        // a = feild[0][-1]
        // d = feild[0][+1]


    }


    // winOrLose method
    // checks if the character has found hat or moved into hole
   winOrLose() {

   }

   // play game method
   // loops game until win or lose is true

  
}



// class creation
 const game = new Field([['*', '░', 'O'],
 ['░', 'O', '░'],
 ['░', '^', '░'],]);

game.print();
game.move();
