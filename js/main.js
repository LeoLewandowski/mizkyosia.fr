
let alpha = 45;
setInterval(() => {
    alpha = (alpha >= 360 ? 1 : alpha+1);
    document.body.style.setProperty('--bg-angle',`${alpha}deg`);
}, 50);