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
        if (board[row][column].getValue() == "") {
            if (checkWinner() === -1) {
            // If cell isn't already filled, place marker.
                board[row][column].addMarker(player);
            }
        } else {
            return 0;
        }
        
    }

    const printBoard = () => {
        const boardFilled = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardFilled);
    }

    const checkWinner = () => {
        //Check rows
        for (let i = 0; i < rows; i++) {
            if (
                board[i][0].getValue() !== "" &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                return board[i][0].getValue();
            }
        }

        //Check columns
        for (let i = 0; i < columns; i++) {
            if (
                board[0][i].getValue() !== "" &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                return board[0][i].getValue();
            }
        }

        //Check diagonals
        if (
            board[0][0].getValue() !== "" &&
            board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue()
        ) {
            return board[0][0].getValue();
        }

        if (
            board[0][2].getValue() !== "" &&
            board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue()
        ) {
            return board[0][2].getValue();
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
    let value = "";

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
    let board = Gameboard();

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

    const resetPlayer = () => {
        activePlayer = players[0];
    }

    const clearBoard = () => {
        board.getBoard().forEach(row => row.forEach(cell => cell.addMarker('')));
    }

    const switchTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        } else {
            activePlayer = players[0];
        }
    };

    const getActivePlayer = () => activePlayer;

    const setPlayerNames = (array) => {
        players[0].name = array[0];
        players[1].name = array[1];
    }

    const printNewRound = () => {
        board.printBoard();
        const turn = document.querySelector('.turn');
        console.log(`${getActivePlayer().name}'s turn.`);
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
        getActivePlayer,
        setPlayerNames,
        resetPlayer,
        clearBoard,
        getBoard: board.getBoard,
        checkWinner: board.checkWinner
    };
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const playerNamesButton = document.querySelector('.player-names-button');
    const resetButton = document.querySelector('.reset-button');
    const cancelButton = document.querySelector('.cancel-button');
    const dialog = document.querySelector('.form-container');
    const form = document.querySelector('.player-names');

    playerNamesButton.addEventListener('click', () => {
        dialog.showModal();
    });

    resetButton.addEventListener('click', () => {
       game.resetPlayer();
       game.clearBoard();
       updateScreen();
    });

    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    form.addEventListener('submit', () => {
        changeNames();
        form.reset();
    });

    const updateScreen = () => {

        boardDiv.textContent = "";

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn!`;
    
        let i = 0;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('boxes', `box${i+1}`);
                cellButton.textContent = cell.getValue();
                cellButton.addEventListener("click", () => clickHandler(rowIndex, columnIndex));
                boardDiv.appendChild(cellButton);
                i++;
            })
        })

        checkTie(board);
        displayWinner(game);
    }
    function clickHandler(row, column) {
        console.log("Clicked on row:", row, "column:", column);
        game.playRound(row, column);
        updateScreen();
    }

    function displayWinner(game) {
        const won = game.checkWinner();
        const player = game.getActivePlayer();
        if (won != -1) {
            playerTurnDiv.textContent = `${player.name} wins!!`;
        };
    }

    function checkTie(board) {
        let full = true;
        for (const row of board) {
            for (const cell of row) {
                if (cell.getValue() === "") {
                    full = false;
                }
            }
        }
        if (full === true) {
            playerTurnDiv.textContent = `It's a tie!`;
        };
    }

    function changeNames() {
        const player1 = document.querySelector('#player1').value;
        const player2 = document.querySelector('#player2').value;
        const playerArray = [player1, player2];
        console.log(playerArray[0], playerArray[1]);
        game.setPlayerNames(playerArray);
        updateScreen();
    }

    updateScreen();

}

ScreenController();