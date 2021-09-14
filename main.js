const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(fieldArray, x_Postion, y_Postion){
        this.field = fieldArray;
        this.x_Postion = x_Postion;
        this.y_Postion = y_Postion;
    }
    print() {
    for (let row in this.field){
      console.log(this.field[row].join(''));
    }
    // move method:
    // takes argument of key stroke - wasd 
    // checks if teh move will take the player out of bound
    // moves character w s a d 
    // replaces previous postion with pathCharacter * 
    // updates new postion with feildCharacter 
    move(keystroke) {


    }


    // winOrLose method
    // checks if the character has found hat or moved into hole
   winOrLose() {

   }

   // play game method
   // loops game until win or lose is true

  }
}



// class creation
 const game = new Field([['*', '░', 'O'],
 ['░', 'O', '░'],
 ['░', '^', '░'],]);

 game.print();

