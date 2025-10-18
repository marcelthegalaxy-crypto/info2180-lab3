document.addEventListener("DOMContentLoaded", () => {
    // Initialize game state (array to track the board)
    const boardState = Array(9).fill(null); // A 3x3 grid (9 squares)
    let isXTurn = true; // Start with 'X'

    // Get all divs inside the board and the status div
    const squares = document.querySelectorAll("#board > div");
    const statusDiv = document.getElementById("status");
    const newGameButton = document.querySelector(".btn"); // The New Game button

    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Function to check for a winner
    const checkWinner = () => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a]; // Winner found
            }
        }
        return null; // No winner
    };

    // Function to handle a square click
    const handleSquareClick = (index) => {
        if (boardState[index]) return; // Ignore click if square is filled

        const currentPlayer = isXTurn ? 'X' : 'O';
        boardState[index] = currentPlayer; // Update board state
        squares[index].textContent = currentPlayer; // Display X or O
        squares[index].classList.add(currentPlayer); // Add CSS class for styling

        const winner = checkWinner();
        if (winner) {
            statusDiv.textContent = `Congratulations! ${winner} is the Winner!`;
            statusDiv.classList.add("you-won");
            return; // Stop the game if there's a winner
        }

        isXTurn = !isXTurn; // Switch turn
    };

    //Add interactivity with hover effect
    squares.forEach((square, index) => {
        // Add click event listener to each square
        square.classList.add("square"); // Ensure the square has the correct class
        square.addEventListener("click", () => handleSquareClick(index));

        // Add hover effect on mouseover
        square.addEventListener("mouseover", () => {
            if (!boardState[index]) {
                square.classList.add("hover");
            }
        });

        // Remove hover effect on mouseout
        square.addEventListener("mouseout", () => {
            square.classList.remove("hover");
        });
    });

    //Reset the game when the "New Game" button is clicked
    newGameButton.addEventListener("click", () => {
        // Reset the game state
        boardState.fill(null); // Clear the board state
        isXTurn = true; // Reset to 'X' turn

        // Clear the squares on the board
        squares.forEach(square => {
            square.textContent = ''; // Remove X or O
            square.classList.remove('X', 'O', 'hover'); // Remove all classes
        });

        // Reset the status message
        statusDiv.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDiv.classList.remove("you-won"); // Remove winning message
    });
});