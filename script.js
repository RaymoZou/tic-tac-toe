const gameBoard = (() => {
    let _markers = ['', '', '',
                    '', '', '',
                    '', '', ''];
    let htmlBoxes = document.querySelectorAll('.box');
    let htmlBoxesArr = Array.prototype.slice.call(htmlBoxes);
    htmlBoxes.forEach(box => {
        box.addEventListener('click', () => {
            const index = htmlBoxesArr.indexOf(box);
            if (_markers[index] == '') {
                _markers[index] = gameManager.player.getMarker();
                gameManager.player.flipMarker();
                renderBoard();
            }
        })
    })
    const clearBoard = () => {
        htmlBoxes.forEach(box => {
            if (box.firstChild) box.removeChild(box.firstChild);
        })
    }
    const renderBoard = () => {
        clearBoard();
        for (let i=0; i < _markers.length; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            marker.textContent = _markers[i];
            htmlBoxes[i].append(marker);
        }
    }
    return {renderBoard};
})();

const Player = (name) => {
    let _currMarker = 'X';
    const getMarker = () => {return _currMarker;}
    const flipMarker = () => {_currMarker = _currMarker == 'X' ? 'O' : 'X';}
    return {name, getMarker, flipMarker};
}

const gameManager = (() => {
    const player = Player();
    return {player}
})();