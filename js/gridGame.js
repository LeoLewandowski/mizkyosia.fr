const keyMap = {};
let game, gameWrapper, originalGame;
//Adds an event to every cell of the game, so that clicking on them actuallly do something
document.addEventListener('DOMContentLoaded', () => {
    game = document.getElementById('game');
    game.addEventListener('contextmenu', e => e.preventDefault());
    window.addEventListener('resize', (e) => rescaleElement(game));
    initGame();
    rescaleElement(document.getElementById('game'));
});

onkeydown = onkeyup = function(e){
    keyMap[e.key] = e.type == 'keydown';
    if(e.key.match(/(w|z|s|ArrowDown|ArrowUp)/)) e.preventDefault();
}

function initGame() {
    gameWrapper = document.getElementById('gameWrapper');
    if (!gameWrapper) return;
    if(game.classList.contains('plateGame')) document.querySelectorAll('.gameCell').forEach(c => c.addEventListener('click', turn));
    originalGame = game.innerHTML;
    //gameWrapper.addEventListener('click', (e) => gameWrapper.requestFullscreen());
}

function restartGame() {
    game.innerHTML = originalGame;
    game.classList.remove('finished');
    document.getElementById('winner').innerHTML = '';
    document.querySelectorAll('.gameCell').forEach(c => c.addEventListener('click', turn));
}

function endGame(txt){
    playSound('win');
    document.getElementById('winner').innerHTML = txt;
    game.classList.add('finished');
}