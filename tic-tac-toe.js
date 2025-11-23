document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let isGameActive = true;

    const squares = document.querySelectorAll('#board div');
    const statusDisplay = document.getElementById('status');
    const newGameButton = document.querySelector('.btn');

    statusDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';

    squares.forEach(function(square) {
        square.setAttribute('class', 'square');
    });

    squares.forEach(function(square, index) {
        square.addEventListener('click', function() {
            if (square.textContent === '' && isGameActive) {
                square.textContent = currentPlayer;
                square.setAttribute('class', 'square ' + currentPlayer);
                gameBoard[index] = currentPlayer;

                if (checkForWinner() === true) {
                    statusDisplay.textContent = 'Congratulations! ' + currentPlayer + ' is the Winner!';
                    statusDisplay.setAttribute('class', 'you-won');
                    isGameActive = false;
                } else {
                    if (currentPlayer === 'X') {
                        currentPlayer = 'O';
                    } else {
                        currentPlayer = 'X';
                    }
                }
            }
        });
    });

    squares.forEach(function(square) {
        square.addEventListener('mouseover', function() {
            square.setAttribute('class', square.getAttribute('class') + ' hover');
        });

        square.addEventListener('mouseout', function() {
            square.setAttribute('class', square.getAttribute('class').replace(' hover', ''));
        });
    });

    newGameButton.addEventListener('click', function() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        isGameActive = true;

        squares.forEach(function(square) {
            square.textContent = '';
            square.setAttribute('class', 'square');
        });

        statusDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDisplay.setAttribute('class', '');
    });

    function checkForWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombos.some(function(combo) {
            const a = combo[0];
            const b = combo[1];
            const c = combo[2];
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }
});
