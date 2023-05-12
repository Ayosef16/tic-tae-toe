const gameCell = document.querySelectorAll('td');

const gameBoard = () => {
}

let gameboard = ['','','','','','','','',''];

let player1 = {
    name: 'Ben',
    mark: 'X'
}

let player2 = {
    name: 'Sophie',
    mark: 'O'
}

let player = player1;

function changePlayer() {
    if (player === player1) {
        player = player2;
    }
    else if (player === player2) {
        player = player1;
    }
}


gameCell.forEach(cell =>  cell.addEventListener('click', (e) => {
    console.log(e.currentTarget.dataset.number);
    let number = e.currentTarget.dataset.number - 1;
    e.currentTarget.textContent = player.mark;
    gameboard[number] = player.mark;
    changePlayer();
}));