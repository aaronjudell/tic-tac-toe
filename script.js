function Gameboard() {

//Establish gameboard variables
    const rows = 3;
    const columns = 3;
    const board = [];

//Create an array of the gameboard
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

//a returned function that obtains the gameboard
    const getBoard =  () => board;

//a returned function that places the marker on the board
    const placeMarker = (row, column, player) => {
        // Return and don't do anything if there's already an X or O placed.
        if (board[row][column].getValue() !== 0) return;

        // If cell isn't already filled, place marker.
        board[row][column].addMarker(player);
        
    }

    const printBoard = () => {
        const boardFilled = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardFilled);
    }

    return {
        getBoard,
        placeMarker,
        printBoard
    };

}

function Cell() {
    let value = 0;

    const addMarker = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMarker,
        getValue
    };
}