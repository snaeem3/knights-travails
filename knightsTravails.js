class Graph {
    // defining vertex array and
    // adjacent list
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
        // console.log(this.AdjList);
        for (const [vertex, neighbors] of this.AdjList.entries()) {
            neighbors.forEach((neighbor) => {
                // console.log(vertex, neighbor);
            });
            dist[vertex] = MAX_VALUE;
            prev[vertex] = null;
            q.push(vertex);
        }

        dist[source] = 0;
        // console.log(dist);

        while (q.length > 0) {
            // Get vertex from q that has the minimum dist
            // let currentVertex = Object.keys(dist).reduce((key, v) => dist[v] < dist[key] ? v : key);
            let currentVertex = q.reduce((key, v) => dist[v] < dist[key] ? v : key);

            if (prev[target] !== null || currentVertex === target) {
                while (currentVertex !== null) {
                    finalSequence.push(currentVertex);
                    currentVertex = prev[currentVertex];
                }
                break;
            }

            // console.log(currentVertex);
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

        return {dist, prev, finalSequence};
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



function knightMoves(startCoord, endCoord) {

}

const board = createBoard(8);
board.printGraph();
console.log(board.dijkstra('0,0','4,4').dist);
console.log(board.dijkstra('0,0','4,4').prev);
console.log(board.dijkstra('0,0','4,4').finalSequence);