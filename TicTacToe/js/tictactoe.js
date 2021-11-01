let activePlayer = 'X';
let selectedSquares = [];
//This function is called when the player or computer selects a square
//It places the correct image based on who the active player is
function placeXOrO(squareNumber) {
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        let select = document.getElementById(squareNumber);
        if (activePlayer === 'X') {
            select.style.backgroundImage = 'url("images/duck.png")';
        } else {
            select.style.backgroundImage = 'url("images/frog.jpg")';
        }
        selectedSquares.push(squareNumber + activePlayer);
        checkWinConditions();
        if (activePlayer === 'X') {
            activePlayer = 'O';
        } else {
            activePlayer = 'X';
        }
        audio('./media/put.mp3');
        if(activePlayer === "O") {
            disableClick();
            setTimeout(function (){ computersTurn(); }, 1000)
        }
        return true;

    }
//This function chooses a random unselected square and places their piece
    function computersTurn() {
        let success = false;
        let pickASquare;
        while(!success) {
            pickASquare = String(Math.floor(Math.random() * 9));
            if (placeXOrO(pickASquare)) {
                placeXOrO(pickASquare);
                success = true;
            };
        }
    }
}
//This function checks every win condition and calls the line drawing function
//with the correct coordinates
function checkWinConditions() {
    if      (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520)}
    else if (arrayIncludes('0O)', '1O', '2O')){ drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520)}
    else if (selectedSquares.length >= 9) {
        audio('./media/tied.mp3');
        setTimeout(function()  { resetGame(); }, 1000);
    }
    function arrayIncludes(squareA, squareB, squareC) {
        const a = selectedSquares.includes(squareA)
        const b = selectedSquares.includes(squareB)
        const c = selectedSquares.includes(squareC)
        if (a === true && b === true && c === true) { return true }
    }
}
//This function does not allow the player to place an x during the computer's turn
function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}
//This function is called whenever a sound needs to be played
function audio(audioURL) {
    let audio = new Audio(audioURL);
    audio.play();
}

//This function draws a line according to the coordinates
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    const canvas = document.getElementById('win-lines')
    const c = canvas.getContext('2d');
    let x1 = coordX1,
        y1 = coordY1,
        x2 = coordX2,
        y2 = coordY2,
        x = x1,
        y = y1;
//This function plays animation of the line being drawn
        function animateLineDrawing() {
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            c.clearRect(0, 0, 608, 608)
            c.beginPath();
            c.moveTo(x1, y1)
            c.lineTo(x, y)
            c.lineWidth = 10;
            c.strokeStyle = 'rgba(70, 255, 33, .8';
            c.stroke();
            if (x1 <= x2 && y1 <= y2) {
                if (x < x2) { x += 10; }
                if (y < y2) { y += 10; }
                if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
            }
        }
//This function clears the line
        function clear() {
            const animationLoop = requestAnimationFrame(clear);
            c.clearRect(0, 0 , 608, 608);
            cancelAnimationFrame(animationLoop);
        }
        disableClick();
        audio('./media/win.mp3');
        animateLineDrawing();
        setTimeout(function () { clear(); resetGame(); }, 1000)
}
//This function resets the board
function resetGame() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(String(i))
        square.style.backgroundImage = ''
    }
    selectedSquares = [];
}