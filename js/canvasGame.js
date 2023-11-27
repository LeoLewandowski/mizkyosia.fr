const keyMap = {};
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx, drawId, paused;

document.addEventListener('keypress', e => {
    if(e.key == ' ') pause();
})

onkeydown = onkeyup = function(e){
    keyMap[e.key] = e.type == 'keydown';
    if(e.key.match(/(w|z|s|ArrowDown|ArrowUp)/)) e.preventDefault();
}

document.addEventListener('DOMContentLoaded', () => {
    game = document.getElementById('game');
    ctx = game.getContext('2d');
    game.addEventListener('contextmenu', e => e.preventDefault());
    restartGame();
});

function restartGame(){
    clearInterval(drawId);
    game.classList.remove('finished');
    document.getElementById('winner').innerHTML = '';
    drawId = setInterval(update,1);
}

function endGame(arg,p){
    clearInterval(drawId);
    playSound('win');
    player = p||player;
    document.getElementById('winner').innerHTML = arg === true ? 'Game ended up in a draw !' : `Player ${player} (${arg}) has won !`;
    game.classList.add('finished');
}

function update(){
    input();
    physics();
    draw();
}

function pause(){
    if(paused){
        paused = false;
        drawId = setInterval(update,1);
    } else {
        paused = true;
        clearInterval(drawId);
    }
}