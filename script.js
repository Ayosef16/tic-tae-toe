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
    return { setIndex, showBoard }
})();

//create the displayController module

const displayController = (() => {
    const gameCell = document.querySelectorAll('td');
    const winner = document.querySelector('.winner');

    let turn = 1;
    let player;

    const playerTurn = () => {
        return turn % 2 === 0 ? player = player2 : player = player1;
    }
/*
    const checkWinner = () => {
        //check rows
        for (let i=0; i<9; i+=3) {
            if (gameBoard.showBoard()[i] !== '' && gameBoard.showBoard()[i] === gameBoard.showBoard()[i+1] && gameBoard.showBoard()[i] === gameBoard.showBoard()[i+2]) {
                if (gameBoard.showBoard()[i] === 'X') {
                    return `${player1.getName()} wins!`
                }
                else {
                    return `${player2.getName()} wins!`
                }
            }
        }
        //check columns
        for (let i=0; i<3; i++) {
            if (gameBoard.showBoard()[i] !== '' && gameBoard.showBoard()[i] === gameBoard.showBoard()[i+3] && gameBoard.showBoard()[i] === gameBoard.showBoard()[i+6]) {
                if (gameBoard.showBoard()[i] === 'X') {
                    return `${player1.getName()} wins!`
                }
                else {
                    return `${player2.getName()} wins!`
                }
            }
        }
        //check diagonals
        if(gameBoard.showBoard()[0] !== '' && gameBoard.showBoard()[0] === gameBoard.showBoard()[4] && gameBoard.showBoard()[0] === gameBoard.showBoard()[8]) {
            if (gameBoard.showBoard()[0] === 'X') {
                return `${player1.getName()} wins!`
            }
            else {
                return `${player2.getName()} wins!`
            }
        }
        if(gameBoard.showBoard()[2] !== '' && gameBoard.showBoard()[2] === gameBoard.showBoard()[4] && gameBoard.showBoard()[2] === gameBoard.showBoard()[6]) {
            if (gameBoard.showBoard()[0] === 'X') {
                return `${player1.getName()} wins!`
            }
            else {
                return `${player2.getName()} wins!`
            }
        }
    }*/

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
                return declareWinner();
            }
        }
    }

    const declareWinner = () => {
        return `${player.getName()} wins!`
    }

    const getPlayer = () => player;

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

    return { getPlayer }
})();



