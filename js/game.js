let game, gameWrapper, originalGame;
//Adds an event to every cell of the game, so that clicking on them actuallly do something
document.addEventListener('DOMContentLoaded', () => {
    game = document.getElementById('game');
    window.addEventListener('resize', (e) => rescaleElement(game));
    initGame();
    rescaleElement(document.getElementById('game'));
});

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
}

function endGame(arg,p){
    player = p||player;
    document.getElementById('winner').innerHTML = arg === true ? 'Game ended up in a draw !' : `Player ${player} (${arg}) has won !`;
    game.classList.add('finished');
}