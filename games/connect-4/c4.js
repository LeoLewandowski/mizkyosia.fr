let player = 0, tra;

function turn(e) {
    if (e.target.firstElementChild.childElementCount >= 6) return;
    tra = [Array.prototype.indexOf.call(e.target.parentElement.children, e.target), e.target.firstElementChild.childElementCount];
    e.target.firstElementChild.innerHTML += `<circle class="circle${player}" r="5%" cx="50%" cy="${90 - e.target.firstElementChild.childElementCount * 16}%">`;
    let cls = `circle${player}`;
    [[0,1],[1,1],[1,0],[1,-1]].forEach(dir => {
        let neg = true, pos = true, count = 1;
        for(let i = 1; i < 4; i++){
            if(pos && game.children[dir[0]*i + tra[0]]?.firstElementChild.children[dir[1]*i + tra[1]]?.classList[0] == cls) count++;
            else pos = false;
            if(neg && game.children[dir[0]*-i + tra[0]]?.firstElementChild.children[dir[1]*-i + tra[1]]?.classList[0] == cls) count++;
            else neg = false;
            if(!neg && !pos) break;
            if(count >= 4) return endGame(player ? 'yellow' : 'red');
        }
    });
    for(let s of document.querySelectorAll('.gameCell svg')){
        if(s.childElementCount < 7) break;
    }
    player = -player + 1;
}