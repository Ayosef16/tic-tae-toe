//form variables
const formX = document.querySelector('#form-x');
const formO = document.querySelector('#form-o');

//prevent default to the form
formX.addEventListener('submit', (e) => {
    e.preventDefault();
    player1 = playerFactory(formX.playerX.value, 'X');
})
formO.addEventListener('submit', (e) => {
    e.preventDefault();
    player2 = playerFactory(formO.playerO.value, 'O');
})

//function factory to create players

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

let player1;
let player2;


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

    let turn = 0;
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
                return declareWinner();
            }
        }
        if (turn == 9) {
            playAgainButton.style.visibility = 'visible';
            return "It's a Draw!";
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
        winner.textContent = '';
        turn = 0;
    }

    playAgainButton.addEventListener('click', resetGame);

    gameCell.forEach(cell =>  cell.addEventListener('click', (e) => {
        if (e.currentTarget.textContent !== '') return
        if (winner.textContent !== '') return
        turn++;
        playerTurn();
        let index = e.currentTarget.dataset.number - 1;
        e.currentTarget.textContent = player.getMark();
        gameBoard.setIndex(index);
        winner.textContent = checkWinner(gameBoard.showBoard());
    }));

    return { getPlayer }
})();



