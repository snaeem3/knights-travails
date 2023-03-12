class Graph {
    // defining vertex array and adjacent list
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
 
    addVertex(v) {
        this.AdjList.set(v, []);
    }

    addEdge(v, w) {
        if (!this.AdjList.get(v).includes(w)){
            this.AdjList.get(v).push(w);
        }

        if (!this.AdjList.get(w).includes(v)) {
            this.AdjList.get(w).push(v);
        }
    }

    dijkstra(source, target) {
        const MAX_VALUE = 9007199254740991;
        let dist = {};
        let prev = {};
        let q = [];
        let finalSequence = [];
        for (const [vertex, neighbors] of this.AdjList.entries()) {
            // neighbors.forEach((neighbor) => {
            //     // console.log(vertex, neighbor);
            // });
            dist[vertex] = MAX_VALUE;
            prev[vertex] = null;
            q.push(vertex);
        }

        dist[source] = 0;

        while (q.length > 0) {
            // Get vertex from q that has the minimum dist
            let currentVertex = q.reduce((key, v) => dist[v] < dist[key] ? v : key);

            // Remove current vertex from q
            q.splice(q.indexOf(currentVertex),1);

            for (const neighbor of this.AdjList.get(currentVertex)) {
                if (q.includes(neighbor)) {
                    const distToNeighbor = dist[currentVertex] + 1;
                    if (distToNeighbor < dist[neighbor]) {
                        dist[neighbor] = distToNeighbor;
                        prev[neighbor] = currentVertex;
                    }
                }
            }
        }

        // Construct final sequence
        let node = target;
        while (node !== source) {
            finalSequence.push(node);
            node = prev[node];
        }
        finalSequence.push(source);

        const numMoves = finalSequence.length - 1; // subtract 1 for adding target to sequence

        return {dist, prev, finalSequence, numMoves};
    }


    printGraph() {
        // get all the vertices
        var get_keys = this.AdjList.keys();
    
        // iterate over the vertices
        for (var i of get_keys) {
            var get_values = this.AdjList.get(i);
            var conc = "";
    
            for (var j of get_values)
                conc += j + " ";
    
            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

}

function createBoard(size) {
    const numVertices = size * size;
    const board = new Graph(numVertices);

    // add squares to board
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const vertexKey = `${i},${j}`;
            board.addVertex(vertexKey);
        }
    }

    const lMoves = [        
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
    ];

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const vertexKey = `${i},${j}`;
            lMoves.forEach(move => {
                const possibleX = i + move[0];
                const possibleY = j + move[1];

                if (possibleX >= 0 && possibleX < size && possibleY >= 0 && possibleY < size) {
                    const possibleKey = `${possibleX},${possibleY}`;
                    board.addEdge(vertexKey, possibleKey);
                }
            });
        }
    }
    
    return board;
}

function sequenceStringToMatrix (sequenceArray) {
    // Convert a sequence of strings to a numerical 2D array
    let result = [];
    sequenceArray.forEach(coordinate => {
        result.push([parseInt(coordinate[0]), parseInt(coordinate[2])]);
    });
    return result;
}

function createBoardTable(boardSize, sequenceArray) {
    // Create a table of the board
    const boardArray = [...Array(boardSize)].map(e => Array(boardSize).fill(`-`)); //⬜ ⬛
    let moveNum = 0;
    sequenceArray.forEach(coordinate => {
        boardArray[coordinate[0]][coordinate[1]] = moveNum;
        moveNum += 1;
    });
    return boardArray;
}



function knightMoves(startCoord, endCoord, gridSize = 8) {
    const board = createBoard(gridSize);
    const dijkstraResult = board.dijkstra(
        `${startCoord[0]},${startCoord[1]}`,
        `${endCoord[0]},${endCoord[1]}`);

    const boardSequence = sequenceStringToMatrix(dijkstraResult.finalSequence.reverse());

    console.log(`You made it in ${dijkstraResult.numMoves} moves!  Here's your path:`);
    console.log(boardSequence);
    console.table(createBoardTable(gridSize, boardSequence));
}


// Examples:
console.log('-------------------------------------------------------')
console.log('--------------------- Example 1: ----------------------')
console.log('-------------------------------------------------------')
console.log(`Starting from (0,0) and ending at (7,4): `);
knightMoves([0,0],[7,4])

console.log('-------------------------------------------------------')
console.log('--------------------- Example 2: ----------------------')
console.log('-------------------------------------------------------')
console.log(`Starting from (5,3) and ending at (0,0): `);
knightMoves([5,3],[0,0]);

console.log('-------------------------------------------------------')
console.log('--------------------- Example 3: ----------------------')
console.log('-------------------------------------------------------')
console.log(`Starting from (1,3) and ending at (8,7) on a 10 x 10 grid: `);
knightMoves([1,3],[8,7], 10);
