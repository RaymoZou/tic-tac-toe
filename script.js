const gameBoard = (() => {
    let _board = [null, null, null,
                    null, null, null,
                    null, null, null];

    let _htmlBoxes = document.querySelectorAll('.box');
    _htmlBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const index = Array.from(_htmlBoxes).indexOf(box);
            if (!_board[index] && !gameManager.getGameOver()) {
                _board[index] = gameManager.player.getMarker();
                renderBoard();
                checkGameState();
                gameManager.player.flipMarker();
            }
        })
    })

    const checkGameState = () => {
        // check rows
        if (_board[0]) checkTriplet(0, 1, 2);
        if (_board[3]) checkTriplet(3, 4, 5);
        if (_board[6]) checkTriplet(6, 7, 8);
        // check columns
        if (_board[0]) checkTriplet(0, 3, 6);
        if (_board[1]) checkTriplet(1, 4, 7);
        if (_board[2]) checkTriplet(2, 5, 8);   
        // check diagonals
        if (_board[0]) checkTriplet(0, 4, 8);
        if (_board[2]) checkTriplet(2, 4, 6);
        // check draw
        if (!_board.includes(null)) gameManager.draw();
    }

    const checkTriplet = (num1, num2, num3) => {
        if (_board[num1] == _board[num2] && _board[num1] == _board[num3]) {
            gameManager.declareWinner();
        }
    }

    const clearBoard = () => {
        _htmlBoxes.forEach(box => {
            if (box.firstChild) box.removeChild(box.firstChild);
        })
    }
    const resetMarkers = () => {
        _board = [null, null, null,
                    null, null, null,
                    null, null, null];
        renderBoard();
    }
    const renderBoard = () => {
        clearBoard();
        for (let i=0; i < _board.length; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            marker.textContent = _board[i];
            _htmlBoxes[i].append(marker);
        }
    }
    return {clearBoard, renderBoard, resetMarkers};
})();

const Player = (name) => {
    let _currMarker = 'X';
    const getMarker = () => {return _currMarker;}
    const flipMarker = () => {_currMarker = _currMarker == 'X' ? 'O' : 'X';}
    return {name, getMarker, flipMarker};
}

const gameManager = (() => {
    let isGameOver = false;
    const player = Player();
    const win = () => {
        document.querySelector('.header').textContent = player.getMarker() + ' wins!';
        isGameOver = true;
    }
    const draw = () => {
        document.querySelector('.header').textContent = 'Draw!';
        isGameOver = true;
    }
    const resetGame = () => {
        document.querySelector('.header').textContent = 'TIC-TAC-TOE';
        gameBoard.resetMarkers();
        isGameOver = false;
    }
    const getGameOver = () => {return isGameOver};
    document.querySelector('.reset-button').addEventListener("click", resetGame);
    return {player, getGameOver, declareWinner: win, resetGame, draw}
})();