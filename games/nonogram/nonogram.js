var Cells = [];

document.addEventListener('DOMContentLoaded', () => {
    restart();
});

function checkEnd() {
    let end = true;
    for(let i = 0; i < Cells.length; i++) {
        for(let j = 0; j < Cells[i].length; j++) {
            end = end && (document.getElementById(`${j + 1}-${i + 1}`).classList.contains('black') == Cells[i][j]);
        }
    }
    return end;
}

function fill(e) {
    let pos = e.target.id.split('-').map(n => parseInt(n) - 1);
    console.log(pos);
    e.preventDefault();
    playSound('click');
    if (!e.target.classList.contains('crossed') && e.button === 0 && Cells[pos[1]][pos[0]]) return e.target.classList.add('black');
    else if (!e.target.classList.contains('crossed') && e.button === 0) return e.target.animate(
        [{ backgroundColor: 'white' }, { backgroundColor: 'red' }],
        {
            iterations:6,
            duration: 200,
            direction: 'alternate'
        }
        ).play();
    else if(e.button === 0) return false;
    else if(e.target.classList.contains('crossed')) e.target.classList.remove('crossed');
    else e.target.classList.add('crossed');
    if(checkEnd()) endGame('You won !');
    return false;
}

function restart() {
    Cells = [];
    document.getElementById('game').innerHTML = '';
    width = parseInt(document.getElementById('width').value) || 1;
    height = parseInt(document.getElementById('height').value) || 1;
    game.setAttribute('style', `aspect-ratio:${width} / ${height};--game-columns:${width};--game-rows:${height};`);
    verticalCounts = [];

    for (let i = 0; i < height + 1; i++) {
        if (i > 0) Cells[i - 1] = [];
        let horizontalCount = 0;
        for (let j = 0; j < width + 1; j++) {
            if (verticalCounts[j] == undefined) verticalCounts[j] = 0;

            let r = randomBetween(0, 100) < 33;
            if (r && i && j) {
                horizontalCount++;
                verticalCounts[j]++;
            }
            else if (i && j) {
                if (horizontalCount) {
                    document.getElementById('0-' + i).innerHTML += '   ' + horizontalCount;
                    horizontalCount = 0;
                }
                if (verticalCounts[j]) {
                    document.getElementById(j + '-0').innerHTML += '<br>' + verticalCounts[j];
                    verticalCounts[j] = 0;
                }
            }

            game.innerHTML += `<div id="${j}-${i}" class="gameCell ${i && j ? (r && debugging ? 'black' : 'white') : 'instructions'}"></div>`;

            let e = document.getElementById(`${j}-${i}`);
            e.addEventListener('click', () => console.log('click'));
            e.addEventListener('auxclick', fill);
            e.addEventListener('contextmenu', e => e.preventDefault());

            if (i && j) Cells[i - 1].push(Boolean(r && j && i));
        }
        if (horizontalCount) document.getElementById('0-' + i).innerHTML += '   ' + horizontalCount;
    }
    for (let j = 1; j < verticalCounts.length; j++) if (verticalCounts[j]) {
        document.getElementById(j + '-0').innerHTML += '<br>' + verticalCounts[j];
        verticalCounts[j] = 0;
    }
    console.log(Cells);
    rescaleElement(document.getElementById('game'));
    document.querySelectorAll('.gameCell').forEach(e => {
        e.addEventListener('click', fill);
        e.addEventListener('auxclick', fill);
        e.addEventListener('contextmenu', e => e.preventDefault());
    });
}