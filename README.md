# Find Your Hat - terminal game

## Table of contents

- [Find Your Hat - terminal game](#find-your-hat---terminal-game)
  - [Table of contents](#table-of-contents)
  - [General info](#general-info)
  - [Technologies](#technologies)
  - [Setup](#setup)
  - [To-do list](#to-do-list)
  - [Status](#status)

## General info

This is simple terminal game where the objective is to navigate a maze and find the ^ symbol:

- hat = '^' // as explained above.
- hole = 'O' // avoid falling down holes or the game is over.
- fieldCharacter = '░' // navigable space.
- pathCharacter = '*' // represents path taken throughout the maze.

The maps are randomly generated via user input (mapHeight, mapWidth, percentageWholeCoverage) and are navigated using w, a, s, d.

## Technologies

- Javascript
- Node
- [prompt-sync](https://github.com/heapwolf/prompt-sync)

## Setup

`npm install prompt-sync`

## To-do list

- Update maze validator function to check all mazes can be solved.

## Status

Project is: _in progress_
