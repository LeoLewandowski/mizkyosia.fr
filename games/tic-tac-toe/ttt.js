let plate;
//Adds an event to every cell of the game, so that clicking on them actuallly do something
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cell').forEach(c => c.addEventListener('click', turn));
    plate = document.getElementById('plate');
});

//`true` is circles and `false` is crosses
let player = true;
//Fired each turn, i.e. after a cell is clicked
function turn(e){
    //Adds the symbol to the cell : cross or circle
    e.target.innerHTML = player ? '<svg><circle r="35%" cx="50%" cy="50%"></svg>' : '<svg><line x1="15%" y1="15%" x2="85%" y2="85%"/><line x1="85%" y1="15%" x2="15%" y2="85%"/></svg>';
    e.target.classList.add(player ? 'circle' : 'cross');
    //Checks the plate to see if a player has won. I believe this part could be heavily optimized, but I have yet to find a way to do it right
    //Diagonal checks : (no fancy stuff here, checks the only two diagonals in the plate)
    if(document.getElementById(`1,1`).classList.length > 1 && (document.getElementById(`0,0`).classList.value == document.getElementById('1,1').classList.value && document.getElementById('2,2').classList.value == document.getElementById('1,1').classList.value || plate.children[2].classList.value == document.getElementById('1,1').classList.value && plate.children[6].classList.value == document.getElementById('1,1').classList.value)) endGame();
    //Horizontal & vertical checks (iterates through all 3 columns and rows) :
    for(let i = 0; i < 3; i++){
        console.log(i + '|' + document.getElementById(`0,${i}`).classList.value == document.getElementById(`1,${i}`).classList.value == document.getElementById(`2,${i}`).classList.value)
        if(
            (document.getElementById(`${i},0`).classList.length > 1 && document.getElementById(`${i},1`).classList.value == document.getElementById(`${i},0`).classList.value && document.getElementById(`${i},2`).classList.value == document.getElementById(`${i},0`).classList.value)
            ||
            (document.getElementById(`0,${i}`).classList.length > 1 && document.getElementById(`1,${i}`).classList.value == document.getElementById(`0,${i}`).classList.value && document.getElementById(`2,${i}`).classList.value == document.getElementById(`0,${i}`).classList.value)
        ) return endGame();
    }
    if(!document.querySelector('.cell:not(.circle):not(.cross)')) return endGame(true);
    //Changes the player
    player = !player;
}

function endGame(draw){
    document.getElementById('winner').innerHTML = draw ? 'Game ended up in a draw !' : `Player ${player ? '0 (O)' : '1 (X)'} has won !`;
    plate.classList.add('finished');
}