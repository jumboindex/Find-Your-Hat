const assert = require('assert');
const maze = require('../helper_modules/maze.js')

describe('Maze object', () => {
    describe('.generateMap', () => {
        it(' should return a new map 4 tiles high', () => {
            // setup
            const expectedResultHeight = 4 
            const width = 1
            const height = 4
            const percentageHoleCoverage = 20 // default setting
            // exercise
            const result = maze.generateMap(height, width, percentageHoleCoverage);
            // test
            assert.strictEqual(result.length, expectedResultHeight);

        })
        it('should return a new map 4 tiles wide', () => {
            // setup
            const expectedResultWidth = 4 
            const width = 4
            const height = 1
            const percentageHoleCoverage = 20 // default setting
            // exercise
            const result = maze.generateMap(height, width, percentageHoleCoverage);
            // test
            assert.strictEqual(result[0].length, expectedResultWidth);
        })
        it('should return a new map 100 tiles high', () => {
            // setup
            const expectedResultHeight = 100 
            const width = 4
            const height = 100
            const percentageHoleCoverage = 20 // default setting
            // exercise
            const result = maze.generateMap(height, width, percentageHoleCoverage);
            // test
            assert.strictEqual(result.length, expectedResultHeight);

        })
        it('should return a new map 100 tiles wide', () => {
            // setup
            const expectedResultWidth = 100
            const width = 100
            const height = 4
            const percentageHoleCoverage = 20 // default setting
            // exercise
            const result = maze.generateMap(height, width, percentageHoleCoverage);
            // test
            assert.strictEqual(result[0].length, expectedResultWidth);
        })
        it('should reject a percentage hole coverage value < 0', () => {
                // setup
                const width = 20
                const height = 20
                const percentageHoleCoverage = 0 
                //exercise
                assert.throws(()=>{maze.generateMap(height, width, percentageHoleCoverage)}, Error);
        })
        it('should reject a percentage hole coverage value > 50', ()=> {
                // setup
                const width = 20
                const height = 20
                const percentageHoleCoverage = 51 
                //exercise
                assert.throws(()=>{maze.generateMap(height, width, percentageHoleCoverage)}, Error);
                })
        it('should reject a height value < 0 ', () => {
                // setup
                let width = 20
                let height = 0
                const percentageHoleCoverage = 20 // default setting 
                // exercise 
                assert.throws(()=>{maze.generateMap(height, width, percentageHoleCoverage)}, Error);
        })
        it('should reject a width value < 0 ', () => {
            // setup
            let width = 0
            let height = 20
            const percentageHoleCoverage = 20 // default setting 
            // exercise 
            assert.throws(()=>{maze.generateMap(height, width, percentageHoleCoverage)}, Error);
        })
    })            
})   