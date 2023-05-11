const gameCell = document.querySelectorAll('td');

const gameBoard = () => {
}

let gameboard = ['10','x','x','x','x','x','x','o','x'];

let player1 = {
    name: 'Ben',
    mark: 'O'
}

let player2 = {
    name: 'Sophie',
    mark: 'X'
}

function putMark() {

}

gameCell.forEach(cell =>  cell.addEventListener('click', (e) => {
    console.log(e.currentTarget.dataset.number);
    let number = e.currentTarget.dataset.number - 1;
    e.currentTarget.textContent = gameboard[number];
}));