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
    if(plate.children[4].classList.length > 1 && (plate.children[0].classList.value == plate.children[4].classList.value && plate.children[8].classList.value == plate.children[4].classList.value || plate.children[2].classList.value == plate.children[4].classList.value && plate.children[6].classList.value == plate.children[4].classList.value)) endGame();
    //Horizontal & vertical checks (iterates through all 3 columns and rows) :
    for(let i = 0; i < 3; i++){
        if((plate.children[3*i].classList.length > 1 && plate.children[i*3 + 1].classList.value == plate.children[i*3].classList.value && plate.children[i*3 + 2].classList.value == plate.children[i*3].classList.value) || (plate.children[i].classList.length > 1 && plate.children[i + 3].classList.value == plate.children[i].classList.value && plate.children[i + 6].classList.value == plate.children[i].classList.value)) endGame();
    }
    //Changes the player
    player = !player;
}

function endGame(){
    document.getElementById('winner').innerHTML = `Player ${player ? '0 (O)' : '1 (X)'} has won !`;
    plate.classList.add('finished');
}