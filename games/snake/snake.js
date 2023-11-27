const GameParams = {
    cellsW:0,
    cellsH:0,
    cellsX:12,
    cellsY:12,
    wrap:false
};

var Snake = {
    x:0,
    y:0,
    direction:[0,-1],
    radius:1,
    innerRadius:.8,
    size:1,
    speed:2
}, Apples = [];

function input(){
    if((keyMap['z']||keyMap['w']||keyMap['ArrowUp'] && Snake.direction[1] != 1)) Snake.direction = [0,-1];
    else if((keyMap['s']||keyMap['ArrowDown']) &&Snake.direction[1] != -1) Snake.direction = [0,1];
    else if((keyMap['q']||keyMap['a']||keyMap['ArrowLeft']) && Snake.direction[0] != 1) Snake.direction = [-1,0];
    else if((keyMap['d']||keyMap['ArrowRight']) && Snake.direction[0] != -1) Snake.direction = [1,0];
}

function physics(){
    Snake.x += Snake.direction[0] * Snake.speed;
    Snake.y += Snake.direction[1] * Snake.speed;
}

function draw(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    ctx.drawImage(document.querySelector('#imageSources *[sprite="apple"]'),Snake.x, Snake.y,100,100);
}

function restart(){
    Apples = [];
    Snake = {
        x:0,
        y:0,
        radius:1,
        innerRadius:.8,
        size:1,
        speed:1
    };
    GameParams.cellsH = Math.round(ctx.canvas.height / GameParams.cellsY);
    GameParams.cellsW = Math.round(ctx.canvas.width / GameParams.cellsX);
    restartGame();
}