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
 
    bfs(startingNode, endingNode) {
        // create a visited object
        var visited = {};
    
        // Create an object for queue
        var q = new Queue();
    
        // add the starting node to the queue
        visited[startingNode] = true;
        q.enqueue(startingNode);
    
        // loop until queue is empty
        while (!q.isEmpty()) {
            // get the element from the queue
            var getQueueElement = q.dequeue();
    
            // passing the current vertex to callback function
            console.log(getQueueElement);
    
            // get the adjacent list for current vertex
            var get_List = this.AdjList.get(getQueueElement);
    
            for (var i in get_List) {
                var neigh = get_List[i];
    
                if (!visited[neigh]) {
                    visited[neigh] = true;
                    q.enqueue(neigh);
                }
            }
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

const board = createBoard(5);
board.printGraph();

board.bfs([0,1]);