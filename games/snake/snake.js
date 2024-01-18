const Apple = { x:0, y:0, img: new Image() };
const GameParams = {
    cellsW: 0,
    cellsH: 0,
    cellsX: 12,
    cellsY: 12,
    wrap: false
};

Apple.img.src = '/images/apple.svg';

function input() {
    if ((keyMap['z'] || keyMap['w'] || keyMap['ArrowUp'] && Snake.direction[1] != 1)) Snake.turn([0, -1]);
    else if ((keyMap['s'] || keyMap['ArrowDown']) && Snake.direction[1] != -1) Snake.turn([0, 1]);
    else if ((keyMap['q'] || keyMap['a'] || keyMap['ArrowLeft']) && Snake.direction[0] != 1) Snake.turn([-1, 0]);
    else if ((keyMap['d'] || keyMap['ArrowRight']) && Snake.direction[0] != -1) Snake.turn([1, 0]);
}

function physics() {
    Snake.x += Snake.direction[0] * Snake.speed;
    Snake.y += Snake.direction[1] * Snake.speed;
    Snake.collision();
    Snake.checkLength();
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(Apple.img, Apple.x - Snake.diameter / 2, Apple.y - Snake.diameter / 2, Snake.diameter * 2, Snake.diameter * 2);
    Snake.draw();
    if(debugging) Snake.drawDebug();
}

function restart() {
    Snake = new Snek();
    Snake.x = 50;
    Snake.y = -50;
    Snake.turn([0, 1]);
    Snake.nodes.push({x:50, y:-50, direction:[0,-1]});
    Snake.length = 100;
    Snake.positionApple();
    GameParams.cellsH = Math.round(ctx.canvas.height / GameParams.cellsY);
    GameParams.cellsW = Math.round(ctx.canvas.width / GameParams.cellsX);
    Snake.diameter = GameParams.cellsH / 2;
    Snake.innerDiameter = Snake.diameter * 4 / 5;
    restartGame();
}

function end() {
    endGame('You lost !\nFinal Score : ' + score);
}

/**
 * @typedef {{
 * x:number,
 * y:number,
 * dir:[number,number]
 * }} Node
 */

class Snek {
    x = 0; y = 0;
    length = 20;
    direction = [0, 1];
    diameter = 1;
    innerDiameter = .8;
    /** @type {Node[]} */
    nodes = [];
    speed = 2;

    constructor() { }

    checkLength() {
        if(!this.nodes.length) return;
        let currentLength = dist(this, this.nodes[0]), i = 1;
        for(i; i < this.nodes.length && currentLength + dist(this.nodes[i - 1], this.nodes[i]) < this.length; i++) {
            currentLength += dist(this.nodes[i - 1], this.nodes[i]);
        }

        this.nodes.splice(i);        
        if(currentLength > this.length) this.nodes.pop();
        var lastNode = this.nodes[this.nodes.length - 1];
        if(this.nodes.length <= 0 || !lastNode.direction) return this.nodes.push({ x:this.x - this.direction[0] * this.length, y:this.y - this.direction[1] * this.length});
        
        this.nodes.push({x:lastNode.x + lastNode.direction[0] * (this.length - currentLength), y :lastNode.y + lastNode.direction[1] * (this.length - currentLength), direction: lastNode.direction});
    }

    turn(newDir) {
        if(this.direction[0] == newDir[0]) return;
        this.nodes.unshift({x:this.x, y:this.y, direction: [-this.direction[0], -this.direction[1]]});
        this.direction = newDir;
    }

    positionApple() {
        do {
            Apple.x = randomBetween(this.diameter / 2, ctx.canvas.width - this.diameter / 2);
            Apple.y = randomBetween(this.diameter / 2, ctx.canvas.height - this.diameter / 2);
        } while(dist(this, Apple) < this.diameter * 3);
    }

    collision() {
        if(Date.now() - startTime < 1_000) return;

        if(this.x < this.diameter
            || this.x > ctx.canvas.width - this.diameter
            || this.y < this.diameter
            || this.y > ctx.canvas.height - this.diameter
            ) return end();

        for (let i = 3; i < this.nodes.length; i++) {
            if(distToSegment(this, this.nodes[i - 1], this.nodes[i]) < this.innerDiameter * 2) return end();
        }

        if(dist(Apple, this) <= this.diameter * 2) {
            score++;
            this.length += 100;
            this.positionApple();
            document.getElementById('winner').innerHTML = `Score : ${score}`; 
        }
        
    }

    draw() {
        ctx.lineWidth = 10;
        ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(this.x + this.direction[0] * this.diameter * 1.3, this.y + this.direction[1] * this.diameter * 1.3);
        ctx.lineTo(this.x + this.direction[0] * this.diameter * 1.7, this.y + this.direction[1] * this.diameter * 1.7);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.diameter / 2, 0, 360);
        ctx.fill();
        ctx.closePath();
        
        ctx.moveTo(this.x, this.y);
        ctx.strokeStyle = ctx.fillStyle = '#6CBB3C';
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.lineWidth = this.innerDiameter * 2;
        for(let n of this.nodes) ctx.lineTo(n.x, n.y);
        ctx.stroke();

        ctx.lineWidth = 10;

        ctx.fillStyle = 'black'

        var side = this.diameter / 4 * 2, front = this.diameter / 4 * 1.5;

        ctx.beginPath();
        ctx.arc(this.x - side * this.direction[1] + front * this.direction[0], this.y + side * this.direction[0] + front * this.direction[1], this.diameter / 4, 0, 360);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(this.x + side * this.direction[1] + front * this.direction[0], this.y - side * this.direction[0] + front * this.direction[1], this.diameter / 4, 0, 360);
        ctx.fill();
        ctx.closePath();
    }

    drawDebug() {
        ctx.fillStyle = ctx.strokeStyle = 'blue';

        for(let n of this.nodes) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, this.innerDiameter, 0, 360);
            ctx.fill();
            ctx.closePath();
        }
    }
}

var Snake = new Snek(), score = 0;