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
        if (board[row][column].getValue() !== 0) return 0;

        // If cell isn't already filled, place marker.
        board[row][column].addMarker(player);
        
    }

    const printBoard = () => {
        const boardFilled = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardFilled);
    }

    const checkWinner = () => {
        //Check rows
        for (let i = 0; i < rows; i++) {
            if (
                board[i][0].getValue() !== 0 &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                return board[i][0].getValue();
            }
        }

        //Check columns
        for (let i = 0; i < columns; i++) {
            if (
                board[0][i].getValue() !== 0 &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                return board[0][i].getValue();
            }
        }

        return -1;
    }

    return {
        getBoard,
        placeMarker,
        printBoard,
        checkWinner
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

function GameController(
    player1name = 'Player One',
    player2name = 'Player Two'
) {
    const board = Gameboard();

    const players = [
        {
            name: player1name,
            marker: 'O'
        },
        {
            name: player2name,
            marker: 'X'
        }
    ];

    let activePlayer = players[0];

    const switchTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} just went.`);
        
        if (board.placeMarker(row, column, getActivePlayer().marker) !== 0) {
            const winner = board.checkWinner();
            if (winner !== -1) {
                board.printBoard();
                console.log(`${getActivePlayer().name} wins!`);
            }
            else {
              switchTurn();
              printNewRound();
            }
        } else {
        printNewRound();
        }
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();