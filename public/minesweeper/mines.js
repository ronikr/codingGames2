/*** MINESWEEPER web application  - Roni Krakover */

//global variables
var gLevel = {
    size: 9,
    mines: 9
}
var gState = {
    minesFlagged: 0,
    cellsShown: 0,
    gameStarted: false,
    gTimeElapsed: 0
};
var gInterval;
var gBoard = [];
var gameStarted = false;
MINE = '*';
var gTimeElapsed = 0;
var gBestTime = Number.MAX_VALUE;

function setGameLevel(size, mines) {
    gLevel.size = size;
    gLevel.mines = mines;
    reset();
}

function initGame() {
    gBoard = createBoard();
    renderBoard();
}

function reset() {
    endGame();
    var elMsg = document.querySelector(".messages");
    elMsg.innerHTML = '';
    var elPage = document.querySelector("html");
    elPage.classList.remove("htmlEnd");
    gameStarted = false;
    clearInterval(gInterval);
    gState.cellsShown = 0;
    var elTimer = document.querySelector(".timer");
    elTimer.innerHTML = '0';
    initGame();
}

function createBoard() {
    //creates initial board
    gBoard = [];
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        var row = [];
        for (var j = 0; j < gLevel.size; j++) {
            row.push(0);
        }
        board.push(row);
    }

    //randomizes mine location
    var mineCount = 1;
    while (mineCount <= gLevel.mines) {

        var i = randomInteger(0, gLevel.size - 1);
        var j = randomInteger(0, gLevel.size - 1);
        if (board[i][j] !== MINE) {
            board[i][j] = MINE;
            mineCount++;
        }
    }
    //check for each cell how many of its neighbours are mines. Then set cell content to number of adjacent mines
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            if (board[i][j] === MINE) continue;
            var minesCount = 0;
            for (var ii = i - 1; ii <= i + 1; ii++) {
                for (var jj = j - 1; jj <= j + 1; jj++) {
                    if (ii === i && jj === j) continue;
                    // Boarder check
                    if (ii < 0 || ii >= board.length) continue;
                    if (jj < 0 || jj >= board[0].length) continue;
                    if (board[ii][jj] === MINE) {
                        minesCount++;
                    }
                }
            }
            board[i][j] = minesCount;
        }
    }
    return board;
}

////*******Test - print board ***************
//    for (var i = 0; i < board.length; i++) {
//        for (var j = 0; j < board[0].length; j++) {
//            document.write(board[i][j]);
//        }
//        document.write('<br/>')
//    }


function renderBoard() {
    //create the item on the right that tracks number of mines "flagged"
    var elFlagCounter = document.querySelector(".mineCounter");
    elFlagCounter.innerHTML = String(gLevel.mines);

    //create game table
    var elBoard = document.querySelector(".tableGame");
    var str = '';
    for (var i = 0; i < gLevel.size; i++) {
        str += '<tr>'
        for (var j = 0; j < gLevel.size; j++) {
            str += '<td id="' + i + j +
                '"class="tdHide" onclick="cellClicked(this,' + i + ',' + j +
                ')" oncontextmenu="flagCell(this); return false;">' + gBoard[i][j] + '</td>'
        }
    }
    elBoard.innerHTML = str;
}

function flagCell(elCell) {
    if (elCell.classList.contains("show")) return;

    if (elCell.classList.contains("flagged")) {
        elCell.classList.remove("flagged");
        gState.minesFlagged--;
    }
    else {
        elCell.classList.add("flagged");
        gState.minesFlagged++;
    }
    updateFlagCounter(gState.minesFlagged);
}

function cellClicked(elCell, i, j) {
    if (!gameStarted) {
        startTimer();
        sendGameStartedJSON('minesweeper','played');
        gameStarted = true;
    }

    if (gBoard[i][j] === MINE) {
        handleMineClicked(elCell);
        return;
    }
    if (elCell.classList.contains("tdHide") && gBoard[i][j] === 0) {
        showCell(elCell);
        expendShown(i, j);
    }
    showCell(elCell);
    checkWin();
}

function endGame() {
    clearInterval(gInterval);
    gInterval = null;
    var elTable = document.querySelectorAll('td');
    [].forEach.call(elTable, function (td) {
        td.classList.remove("tdHide");
        str = td.id;
        var arStr = [];
        arStr = str.split('');
        var row = parseInt(arStr[0]);
        var column = parseInt(arStr[1]);
        // mark wrong flags in yellow
        if (td.classList.contains("flagged") && gBoard[row][column] !== MINE) {
            td.style.backgroundColor = "yellow";
        }
    });
    gState.minesFlagged = 0;
};


function expendShown(i, j) {
    for (var ii = i - 2; ii <= i + 2; ii++) {
        for (var jj = j - 2; jj <= j + 2; jj++) {
            if (ii === i && jj === j) continue;
            if (ii < 0 || ii >= gBoard.length) continue;
            if (jj < 0 || jj >= gBoard[0].length) continue;
            if (gBoard[ii][jj] !== MINE) {
                var cellID = '' + ii + jj;
                var elCell = document.getElementById(cellID);
                showCell(elCell);
            }
        }
    }
}

function checkWin() {
    if (gState.cellsShown === gLevel.size * gLevel.size - gLevel.mines) {
        var elMsg = document.querySelector(".messages");
        elMsg.style.opacity = 1;
        elMsg.innerHTML = 'You Win!<br><button onclick="reset()">Go Again?</button> ';
        handleHighScore();
        endGame();
    }
}

function startTimer() {
    gTimeElapsed = 0;
    gInterval = setInterval(function () {
        var elTimer = document.querySelector(".timer");
        gTimeElapsed++;
        elTimer.innerHTML = String(gTimeElapsed);
    }, 1000);
};

function updateFlagCounter(flagNumber) {
    var elFlagCounter = document.querySelector(".mineCounter");
    elFlagCounter.innerHTML = String(gLevel.mines - flagNumber);
}

function checkFlagged(elCell) {

    if (elCell.classList.contains("flagged")) {
        elCell.classList.remove("flagged")
        gState.minesFlagged--;
        console.log(gState.minesFlagged);
        updateFlagCounter(gState.minesFlagged);
    }
}

function handleHighScore() {

    if (gTimeElapsed <= gBestTime) {
        gBestTime = gTimeElapsed;
        var name = prompt("You have the highest score! What is your name?");
        if (name !== null) {
            localStorage.setItem('winnerName', name);
            localStorage.setItem('winnerTime', gBestTime);
        }
    }
    displayHighScore();
}


function displayHighScore() {
    var retrievedName = localStorage.getItem('winnerName');
    var retrievedTime = localStorage.getItem('winnerTime');
    var elHallOfFame = document.querySelector(".hallOfFame");
    elHallOfFame.innerHTML = retrievedName + ' is on the lead with a time of ' + retrievedTime + ' seconds';
}

function showCell(elCell) {

    if (elCell.classList.contains("tdHide")) {
        elCell.classList.remove("tdHide");
        gState.cellsShown++;
        checkFlagged(elCell);
    }
}

function handleMineClicked(elCell) {
    elCell.classList.add("showMine");
    var elMsg = document.querySelector(".messages");
    elMsg.style.opacity = 1;
    elMsg.innerHTML = 'You Lose!<br><button onclick="reset()">Try Again?</button> ';
    var elPage = document.querySelector("html");
    elPage.classList.add("htmlEnd");
    endGame();
}



// MAIN
initGame();
//displayHighScore();