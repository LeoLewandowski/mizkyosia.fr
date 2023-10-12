//`1` is circles and `0` is crosses
let player = 1;
//Fired each turn, i.e. after a cell is clicked
function turn(e){
    //Adds the symbol to the cell : cross or circle
    e.target.innerHTML = player ? '<svg><circle r="35%" cx="50%" cy="50%"></svg>' : '<svg><line x1="15%" y1="15%" x2="85%" y2="85%"/><line x1="85%" y1="15%" x2="15%" y2="85%"/></svg>';
    e.target.classList.add(player ? 'circle' : 'cross');
    e.target.classList.add('filled');
    //Checks the plate to see if a player has won. I believe this part could be heavily optimized, but I have yet to find a way to do it right
    //Diagonal checks : (no fancy stuff here, checks the only two diagonals in the plate)
    if(document.getElementById(`1,1`).classList.length > 1 && (document.getElementById(`0,0`).classList.value == document.getElementById('1,1').classList.value && document.getElementById('2,2').classList.value == document.getElementById('1,1').classList.value || game.children[2].classList.value == document.getElementById('1,1').classList.value && game.children[6].classList.value == document.getElementById('1,1').classList.value)) endGame();
    //Horizontal & vertical checks (iterates through all 3 columns and rows) :
    for(let i = 0; i < 3; i++){
        if(
            (document.getElementById(`${i},0`).classList.length > 1 && document.getElementById(`${i},1`).classList.value == document.getElementById(`${i},0`).classList.value && document.getElementById(`${i},2`).classList.value == document.getElementById(`${i},0`).classList.value)
            ||
            (document.getElementById(`0,${i}`).classList.length > 1 && document.getElementById(`1,${i}`).classList.value == document.getElementById(`0,${i}`).classList.value && document.getElementById(`2,${i}`).classList.value == document.getElementById(`0,${i}`).classList.value)
        ) return endGame(player ? 'O' : '1');
    }
    if(!document.querySelector('.gameCell:not(.circle):not(.cross)')) return endGame(true);
    //Changes the player
    player = -player + 1;
}