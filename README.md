# knights-travails

## Problem Background

The [Knights Travails](https://en.wikipedia.org/wiki/Knight%27s_tour) problem is a classic puzzle in the field of graph theory, and it's often used as a benchmark for testing graph algorithms. The problem asks the following question:

Given a standard chess board and two squares on the board, what is the shortest path that a knight can take to reach the second square from the first square?

The knight is allowed to move in an L-shaped pattern, which means it can move two squares in one direction (either horizontally or vertically) and one square in the other direction. The puzzle is interesting because it requires finding the shortest path on a complex graph with many possible paths. It also has practical applications in fields such as network routing, logistics, and transportation planning.

## How to view the solution

This repository contains the solution to the [Odin Project](https://www.theodinproject.com/lessons/javascript-knights-travails) Knights Travails problem. The solution can be viewed by running `node knightsTravails.js` in the terminal.

The function `knightMoves` inputs the starting point of a chess knight and a final destination. It calculates and returns the shortest sequence of moves to reach the destination. 3 examples are provided, and more examples can be viewed by inserting `knightMoves([x-starting-coord, y-starting-coord],[x-destination-coord, y-destination-coord], grid-size);` at the end of knightsTravails.js

The solution creates a Graph of the chessboard and implements [Dijkstra's Algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) to find the shortest path between the starting coordinate and the destination coordinate.
