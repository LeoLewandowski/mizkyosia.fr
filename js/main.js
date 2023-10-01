document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.proj').forEach(a => a.onmouseover = 'this.t = textGen()');
    checkSize();
})

window.addEventListener('resize', checkSize)

let alpha = 45;
// setInterval(() => {
//     alpha = (alpha >= 360 ? 1 : alpha+1);
//     document.body.style.setProperty('--bg-angle',`${alpha}deg`);
// }, 50);

function textGen() {
    String.fromCharCode()
}

function checkSize() {
    if(window.screen.width <= 425) document.body.classList.add('smallScreen');
    else document.body.classList.remove('smallScreen');
}