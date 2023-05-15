//function factory to create players

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

let player1 = playerFactory('Ben', 'X');
let player2 = playerFactory('Marta', 'O');


//create the gameBoard module

const gameBoard = (() => {
    const gameboard = ['','','','','','','','',''];
    const setIndex = (boardIndex) => {
        gameboard[boardIndex] = displayController.getPlayer().getMark();
    }
    const showBoard = () => gameboard;
    const clearBoard = () => {
        for ( i=0; i < gameboard.length; i++) {
            gameboard[i] = '';
        }
    }
    return { setIndex, showBoard, clearBoard }
})();

//create the displayController module

const displayController = (() => {
    const gameCell = document.querySelectorAll('td');
    const winner = document.querySelector('.winner');
    const playAgainButton = document.querySelector('.play-again');

    let turn = 1;
    let player;

    const playerTurn = () => {
        return turn % 2 === 0 ? player = player2 : player = player1;
    }

    //check for the win condition
    const checkWinner = (board) => {
        const winCondition = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let win of winCondition) {
            if (board[win[0]] !== '' && board[win[0]] === board[win[1]] && board[win[0]] === board[win[2]]) {
                playAgainButton.style.visibility = 'visible';
                winner.style.visibility = 'visible';
                return declareWinner();
            }
        }
    }

    const declareWinner = () => {
        return `${player.getName()} wins!`
    }

    const getPlayer = () => player;

    const resetGame = () => {
        gameBoard.clearBoard();
        gameCell.forEach(cell => cell.textContent = '');
        playAgainButton.style.visibility = 'hidden';
        winner.style.visibility = 'hidden';
    }

    playAgainButton.addEventListener('click', resetGame);

    gameCell.forEach(cell =>  cell.addEventListener('click', (e) => {
        if (e.currentTarget.textContent !== '') return
        if (winner.textContent !== '') return
        playerTurn();
        let index = e.currentTarget.dataset.number - 1;
        e.currentTarget.textContent = player.getMark();
        gameBoard.setIndex(index);
        turn++;
        winner.textContent = checkWinner(gameBoard.showBoard());
    }));

    return { getPlayer, gameCell }
})();



