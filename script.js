let player1 = prompt("Player One: Enter your name , you will be blue");
let player1Color = "rgb(86, 151, 255)";

let player2 = prompt("Player Two: Enter your name, you will be red");
let player2Color = "rgb(237, 45, 73)";

let table = $("table tr");

//Function to report win to console
function reportWin(rowNum, colNum) {
    console.log(`You won at row ${rowNum} and column ${colNum}.`);
    console.log(rowNum);
    console.log(colNum);
}

// Function to change the color of a button
function changeColor(rowIndex, colIndex, color) {
    return table
        .eq(rowIndex)
        .find("td")
        .eq(colIndex)
        .find("button")
        .css("background-color", color);
}

// Function to find the current color of the button
function returnColor(rowIndex, colIndex) {
    return table
        .eq(rowIndex)
        .find("td")
        .eq(colIndex)
        .find("button")
        .css("background-color");
}

// Function to find bottom most button by taking in column index & returning the bottom row that is still gray
function checkBottom(colIndex) {
    let colorReport = returnColor(5, colIndex);
    for (let row = 5; row > -1; row--) {
        colorReport = returnColor(row, colIndex);
        if (colorReport === "rgb(128, 128, 128)") {
            return row;
        }
    }
}

// Function to check to see if four buttons are of same color
function colorMatchCheck(one, two, three, four) {
    return (
        one === two &&
        one === three &&
        one === four &&
        one !== "rgb(128, 128, 128)" &&
        one !== undefined
    );
}

// Function to check for Horizontal Wins
function horizontalWinCheck() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                colorMatchCheck(
                    returnColor(row, col),
                    returnColor(row, col + 1),
                    returnColor(row, col + 2),
                    returnColor(row, col + 3)
                )
            ) {
                console.log("horiz");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Function to check for Vertical Wins
function verticalWinCheck() {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (
                colorMatchCheck(
                    returnColor(row, col),
                    returnColor(row + 1, col),
                    returnColor(row + 2, col),
                    returnColor(row + 3, col)
                )
            ) {
                console.log("vertical");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Function to check for Diagonal Wins
function diagonalWinCheck() {
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (
                colorMatchCheck(
                    returnColor(row, col),
                    returnColor(row + 1, col + 1),
                    returnColor(row + 2, col + 2),
                    returnColor(row + 3, col + 3)
                )
            ) {
                console.log("diag");
                reportWin(row, col);
                return true;
            } else if (
                colorMatchCheck(
                    returnColor(row, col),
                    returnColor(row - 1, col + 1),
                    returnColor(row - 2, col + 2),
                    returnColor(row - 3, col + 3)
                )
            ) {
                console.log("diag");
                reportWin(row, col);
                return true;
            } else {
                continue;
            }
        }
    }
}

// Function to end the game
function gameEnd(winningPlayer) {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 7; row++) {
            $("h3").fadeOut("fast");
            $("h2").fadeOut("fast");
            $("h1")
                .text(`${winningPlayer} has won! Refresh to play again!`)
                .css("fontSize", "50px");
            $(".board button").off("click");
        }
    }
}

//Starting
let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$("h3")
    .text(
        `${player1} it is your turn, please pick a column to drop your blue chip.`
    )
    .css("color", player1Color);

//Game logic and event listening
$(".board button").on("click", function gameLogic() {
    // Recognize what column was chosen
    let col = $(this).closest("td").index();

    // Get back bottom available row to change
    let bottomAvail = checkBottom(col);

    // Drop the chip in that column at the bottomAvail Row
    changeColor(bottomAvail, col, currentColor);

    // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);
    }

    // If no win or tie, continue to next player
    currentPlayer = currentPlayer * -1;

    // Re-Check who the current Player is.
    if (currentPlayer === 1) {
        currentName = player1;
        currentColor = player1Color;
        $("h3")
            .text(
                `${currentName} it is your turn, please pick a column to drop your blue chip.`
            )
            .css("color", currentColor);
    } else {
        currentName = player2;
        currentColor = player2Color;
        $("h3")
            .text(
                `${currentName} it is your turn, please pick a column to drop your red chip.`
            )
            .css("color", currentColor);
    }
});
