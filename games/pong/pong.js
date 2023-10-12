const keyMap = {};
let bar, ball;
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx, drawId;

document.addEventListener('DOMContentLoaded', () => {
    ctx = game.getContext('2d');
    var grad = ctx.createLinearGradient(0,0,ctx.canvas.width, ctx.canvas.height);
    grad.addColorStop(0,'orange');
    grad.addColorStop(1/3,'red');
    grad.addColorStop(2/3,'purple');
    grad.addColorStop(1,'blue');
    ctx.fillStyle = grad;
    restart();
    ctx.fillRect(0,0,ctx.canvas.width,bar.w);
    ctx.fillRect(0,ctx.canvas.height - bar.w,ctx.canvas.width,ctx.canvas.height);
})

onkeydown = onkeyup = function(e){
    keyMap[e.key] = e.type == 'keydown';
    if(e.key.match(/(w|z|s|ArrowDown|ArrowUp)/)) e.preventDefault();
}

function draw() {
    bar.v0 = 0;
    bar.v1 = 0;
    if(keyMap['w'] || keyMap['z']) { bar.b0-=bar.s; bar.v0=-1; }
    if(keyMap['s']) { bar.b0+=bar.s; bar.v0=1; }
    if(keyMap['ArrowUp']) { bar.b1-=bar.s; bar.v1=-1; }
    if(keyMap['ArrowDown']) { bar.b1+=bar.s; bar.v1=1; }
    physics();
    ctx.clearRect(0,bar.w,ctx.canvas.width, ctx.canvas.height - 2*bar.w)
    ctx.beginPath();
    ctx.fillRect(0, bar.b0, bar.w, bar.h);
    ctx.fillRect(ctx.canvas.width - bar.w, bar.b1, bar.w, bar.h);
    ctx.arc(ball.x, ball.y, ball.r, 0, 360);
    ctx.fill();
}

function physics() {
    bar.b0 = clamp(bar.b0, bar.w, ctx.canvas.height - bar.h - bar.w);
    bar.b1 = clamp(bar.b1, bar.w, ctx.canvas.height - bar.h - bar.w);
    ball.x += Math.cos(ball.a) * ball.s;
    ball.y += Math.sin(ball.a) * ball.s;
    if(ball.x <= ball.r) return end('blue','1');
    else if(ball.x >= ctx.canvas.width - ball.r) return end('orange','0');
    if(ball.y <= ball.r + bar.w || ball.y >= ctx.canvas.height - bar.w - ball.r) ball.a = -ball.a;
    if(ball.x <= ball.r + bar.w && ball.y - bar.b0 < bar.h && ball.y - bar.b0 > 0 && Math.cos(ball.a) < 0 || ball.x >= ctx.canvas.width - ball.r - bar.w && ball.y - bar.b1 < bar.h && ball.y - bar.b1 > 0 && Math.cos(ball.a) > 0){
        ball.a = Math.atan2(Math.sin(ball.a),-Math.cos(ball.a)) + (ball.x < 600 ? bar.v0 : bar.v1) * Math.sign(ball.a) * Math.PI/6;
        if(Math.abs(Math.cos(ball.a)) < .1) ball.a = Math.sign(ball.a) * Math.PI/8;
        ball.s += .2;
    }
}

function end(c,i){
    endGame(c,i);
    clearInterval(drawId);
}

function restart() {
    document.getElementById('winner').innerHTML = '';
    game.classList.remove('finished');
    bar = {
        v0: 0,
        v1: 0,
        h: 200,
        w: 25,
        s: 5
    };
    bar.b0 = ctx.canvas.height/2 - bar.h/2;
    bar.b1 = ctx.canvas.height/2 - bar.h/2;
    ball = {
        x: ctx.canvas.width / 2,
        y: ctx.canvas.height / 2,
        r: 10,
        a: randomBetween(0, 2*Math.PI),
        s: 5
    };
    drawId = setInterval(draw, 1);
}