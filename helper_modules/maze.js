const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Maze {
    constructor() {
        this.map = [];
        this.hat_X_Position = '';
        this.hat_Y_Position = '';
        this.width = '';
        this.height = '';
        this.numberOfHoles = '';
        this.queue = [];
    }
    generateMap (height = 4, width = 4, percentageHoleCoverage = 50) {
        
        if (percentageHoleCoverage > 51 || percentageHoleCoverage <= 0) throw new Error('the map generated contains either too many or not enough holes.');
        if (height < 1 || width < 1) throw new Error('the map generated is not playable');
        
        // store width and height for map validation
        this.width = width;
        this.height = height;
        // generate empy map
        let newMaze = [];

        for (let i = height; i > 0; i--) {
            let newArr = [];
            for (let y = width; y > 0; y-- ) {
                newArr.push(fieldCharacter);
            }
            newMaze.push(newArr);
        }

        // add holes 
        // caculate number of holes to add by converting percentage param to no. of holes. 
        let numberOfHoles = Math.floor(((height * width) / 100) * percentageHoleCoverage);
        this.numberOfHoles = numberOfHoles // store for map validation / path findings
        // add holes to random positions
        for (let i = numberOfHoles; i > 0; i--) {
            let y_Axis = Math.floor(Math.random() * height);
            let x_Axis = Math.floor(Math.random() * width);

            if (newMaze[y_Axis][x_Axis] === hole) {
                i++;
                continue;
            } else {
                newMaze[y_Axis][x_Axis] = hole; 
            }
        }

        // add path character to start position
        newMaze[0][0] = pathCharacter;
        
        // add hat to map
        let hatPlaced = false;
        
        do {
            let hat_Y_Axis = Math.floor(Math.random() * height);
            let hat_X_Axis = Math.floor(Math.random() * width);

            if (hat_X_Axis === 0 && hat_Y_Axis === 0) continue;
            else {
                newMaze[hat_Y_Axis][hat_X_Axis] = hat;
                this.hat_X_Position = hat_X_Axis; // store hat position for path finding / map validation
                this.hat_Y_Position = hat_Y_Axis;
                hatPlaced = true 
                }

            } while  (hatPlaced = false);
        // store map for map validation
        this.map = newMaze;
 
        return newMaze;
    }

    validateMap () {

        let map = Array.from(this.map); 
        let queue = [[this.hat_Y_Position, this.hat_X_Position, 0]]; // create queue of possible coordinates - [[y, x, counter]]
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
                else if (queue.some(queueValue => possiblePosition[0] === queueValue[0] && possiblePosition[1] === queueValue[1])) continue; // check if value exisits in queue
                else if (map[possiblePosition[0]][possiblePosition[1]] === hole ) continue; // check if grid position contains a hole 
                else {
                    possiblePosition[2] = (queue[queueCounter][2] + 1); // increment counter add to queue
                    queue.push(possiblePosition);
                };
                if (map[possiblePosition[0]][possiblePosition[1]] === pathCharacter){
                    pathFound = true; // check if path found to start position
                    break;
                } 
            }
            queueCounter++;  
        } while (pathFound == false && queue.length > queueCounter);
    
        if (pathFound === true && queueCounter > this.width) {
            this.queue = queue;
            return true;
        } else return false;       
    }

    watchMapValidation() {

        // user input for map to be solved
        let mapParams = prompt('To watch map validation, please enter height, width and percentage hole coverage % (num: 1 - 50) seperated by spaces: ').split(' ');

        let mapValid = false;
        do  {
            this.maze = this.generateMap(mapParams[0], mapParams[1], mapParams[2]);
            mapValid = this.validateMap();
        } while (mapValid === false);

        let queue = this.queue;
        let map = this.map;
        // print 
        for (let i = 1; i < queue.length; i++ ){
                console.clear();
                let y = queue[i][0];
                let x = queue[i][1];
                map[y][x] = pathCharacter;
                for (let row in map){
                    console.log(map[row].join(''));
                }    
        }
        
        let watchAgain = prompt('would you like to watch the map validation algorithm again? yes / no ');
        if (watchAgain === 'yes') return this.watchMapValidation();
        else return process.exit();
    } 
}

let gameMap = new Maze();

// export to main.js
module.exports.generateMap = gameMap.generateMap;
module.exports.validateMap = gameMap.validateMap;
module.exports.watchMapValidation = gameMap.watchMapValidation;

