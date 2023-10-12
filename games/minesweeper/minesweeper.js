const DIRS = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];

document.addEventListener('DOMContentLoaded', () => {
    start();
});

var width, height;

function start(){
    restartGame();
    let s, m;
    width = parseInt(document.getElementById('width').value) || 1;
    height = parseInt(document.getElementById('height').value) || 1;
    game.setAttribute('style',`aspect-ratio:${width} / ${height};--game-columns:${width};--game-rows:${height};`);
    for(let i = 0; i < height; i++){
        for(let j = 0; j < width; j++){
            m = randomBetween(0,1) <= 1/3;
            s = m;
            game.innerHTML += `<div class="gameCell ${s ? 'mine ' : ''}hidden"></div>`;
        }
    }
    document.querySelectorAll('.gameCell').forEach(e => {
        if(e.classList.contains('mine')) setNeighborMineCount(Array.prototype.indexOf.call(game.children, e) % width, Math.floor(Array.prototype.indexOf.call(game.children, e) / width));
        e.addEventListener('click', onClick,false);
        e.addEventListener('auxclick', onClick,false);
    });
    return rescaleElement(game);
}

function onClick(e) {
    e.preventDefault();
    if(e.button == 2) flagTile(e.target);
    else digTile(e.target);
    return false;
}

function end(w){
    document.getElementById('winner').innerHTML = w ? 'You won !' : 'You lost...';
    game.classList.add('finished');
}

function setNeighborMineCount(i,j) {
    let e;
    return DIRS.forEach(([x,y]) => {
        if(i + x >= width || i + x < 0) return;
        e = game.children[(j + y)*width + i + x];
        if(e && !e.classList.contains('mine')) e.setAttribute('mines',(parseInt(e.getAttribute('mines')) || 0) + 1);
    });
}

function digTile(e){
    if(!e || !e.classList.contains('hidden')) return;
    e.classList.remove('hidden');
    if(e.classList.contains('mine')) return end(false);
    if(e.classList.contains('flagged')) e.classList.remove('flagged');
    if(!e.getAttribute('mines')) DIRS.forEach(([x,y]) => {
        let i = Array.prototype.indexOf.call(game.children, e) % width, j = Math.floor(Array.prototype.indexOf.call(game.children, e) / width);
        digTile(game.children[(j + y)*width + clamp(i + x,0,width-1)]);
    });
    if(!document.querySelector('.gameCell.hidden:not(.mine)')) return end(true);
    return;
}

function digAll(){
    document.querySelectorAll('.gameCell.hidden').forEach(h => digTile(h));
}

function flagTile(e){
    if(e.classList.contains('flagged')) e.classList.remove('flagged');
    else e.classList.add('flagged');
    console.log('lol');
}