//---------------------------constants---------------------------//

const colorChange = {
  '1': 'black',
  '-1': 'red',
  null: 'white',
}

const winningCombos= [
  [0,1,2,3], [6,7,8,9], [12,13,14,15], [18,19,20,21], [24,25,26,27], [30,31,32,33], [36,37,38,39], [2,3,4,5], [8,9,10,11], [14,15,16,17], [20,21,22,23], [26,27,28,29], [32,33,34,35], [38,39,40,41], [1,2,3,4], [7,8,9,10], [13,14,15,16,], [19,20,21,22], [25,26,27,28],    [31,32,33,34], [37,38,39,40], [0,6,12,18], [1,7,13,19], [2,8,14,20], [3,9,15,21], [4,10,16,22], [5,11,17,23], [18,24,30,36], [19,25,31,37], [20,26,32,38], [21,27,33,39], [22,28,34,40], [23,29,35,41], [7,13,19,25], [8,14,20,26], [9,15,21,27], [10,16,22,28], [11,17,23,29], [13,19,25,31], [14,20,26,32], [15,21,27,33], [16,22,28,34], [17,23,29,35], [3,8,13,18], [4,9,14,19], [5,10,15,20], [0,7,14,21], [1,8,15,22], [2,9,16,23], [6,13,20,27], [7,14,21,28], [8,15,22,29], [11,16,21,26], [10,15,20,25], [9,14,19,24], [12,19,26,33], [13,20,27,34], [14,21,28,35], [17,22,27,32], [16,21,26,31], [15,20,25,30], [36,31,26,21], [37,32,27,22], [38,33,28,23], [41,34,27,20], [40,33,26,19], [39,32,25,18]
]

//------------------------state variables-----------------------//

let board; 
let turn;
let winner;

//------------------------cached elements----------------------//

const messageEl = document.querySelector('#msg');
const circlesEls = document.querySelectorAll('td');

//-----------------------event listeners----------------------//

document.querySelector('.gameBoard').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);

//-----------------------functions----------------------------//

init();

function init() {
  board = new Array(42).fill(null);
  turn = 1;
  winner = null;
  document.querySelector('.gameBoard').addEventListener('click', handleMove);
  render();
};

function render(){
  circlesEls.forEach(function(cir) {
    let cellIdx = cir.id.replace("c", "");
    cir.style.backgroundColor = colorChange[board[cellIdx]];
  });
  if (winner === "Tie") {
    messageEl.textContent = "It's a tie! No one wins!";
  } else if (winner) {
     messageEl.textContent = `Congratulations ${colorChange[winner]}! You win!`
     document.querySelector('.gameBoard').removeEventListener('click', handleMove);
  } else{
    messageEl.textContent = `Player ${colorChange[turn]} turn!`;
  }
  
  }

function handleMove(evt){
  // find index of idividual  "board index"
  let colIdx = parseInt(evt.target.id.replace("c", ""));
  //converting to column
  colIdx = Math.floor(colIdx / 6);
  if ( isNaN(colIdx) ) return;
  //compute index at bottom of column
  let bottomColIdx = colIdx * 6;
  //find first null in column
  let offSet;
  for ( offSet = 0; offSet < 6 ; offSet++ )  {
    if ( board[bottomColIdx + offSet] === null) break;
  }
  if ( offSet === 6 ) return;
  board[bottomColIdx + offSet] = turn;
  turn *= -1;
  winner = checkWinner();
  render();
 };

 function checkWinner(){
   for(let i= 0; i < winningCombos.length; i++) {
     if (
       Math.abs(
         board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] + board[winningCombos[i][3]]
       ) === 4
     )
     return board[winningCombos[i][0]];
   }
   if (board.includes(null)) return null;
   return "Tie";
 }