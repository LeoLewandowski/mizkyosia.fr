let alpha = 45, mainAudio = new Audio();
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.proj').forEach(a => a.onmouseover = 'this.t = textGen()');

    checkSize();
})

window.addEventListener('resize', checkSize)

// setInterval(() => {
//     alpha = (alpha >= 360 ? 1 : alpha+1);
//     document.body.style.setProperty('--bg-angle',`${alpha}deg`);
// }, 50);

function textGen() {
    String.fromCharCode()
}

function checkSize() {
    if (window.screen.width <= 425) document.body.classList.add('smallScreen');
    else document.body.classList.remove('smallScreen');
}

function isVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Rescales the given element so that it fits into the viewport
 * @param {HTMLElement} elem 
 */
function rescaleElement(elem) {
    let scale,
        width = window.innerWidth,
        height = window.innerHeight,
        isMax = width >= elem.clientWidth && height >= elem.clientHeight;
    // Calculates the scale, and applies it to the element
    scale = .9 *  Math.min(width / elem.clientWidth, height / elem.clientHeight);
    elem.style.transform = isMax ? '' : `scale(${scale})`;
    // Sets the element's margin so that the distance between it and the other elements remains
    // (mostly) the same even with the rescale
    elem.style.margin = isMax ? '' : `-${(1 - scale) * (elem.clientHeight / elem.clientWidth)*45}% 0%`;
}

function clamp(x,min,max) {
    return Math.min(Math.max(min,x),max);
}

function randomBetween(min,max){
    return Math.random() * (max - min + 1) + min;
}

function playSound(src,loop){
    new Audio(`/sounds/${src}.wav`).play();
}