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
    const placeMarker = (column, row, player) => {
        
    }




}