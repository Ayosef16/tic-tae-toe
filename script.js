//function factory to create players

const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

let player1 = playerFactory('Ben', 'X');
let player2 = playerFactory('Marta', 'O');

let player = player1;

//create the gameBoard module

const gameBoard = (() => {
    const gameboard = ['','','','','','','','',''];
    const setIndex = (boardIndex) => {
        gameboard[boardIndex] = player.getMark();
    }
    const showBoard = () => gameboard;
    return { setIndex, showBoard }
})();

//create the displayController module

const displayController = (() => {
    const gameCell = document.querySelectorAll('td');

    const changePlayer = () => {
        if (player === player1) {
            player = player2;
        }
        else if (player === player2) {
            player = player1;
        }
    };

    gameCell.forEach(cell =>  cell.addEventListener('click', (e) => {
        console.log(e.currentTarget.dataset.number);
        let index = e.currentTarget.dataset.number - 1;
        e.currentTarget.textContent = player.getMark();
        gameBoard.setIndex(index);
        changePlayer();
    }));
})();



