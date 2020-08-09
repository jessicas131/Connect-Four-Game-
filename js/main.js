//---------------------------constants---------------------------//

const colorChange = {
  '1': 'black',
  '-1': 'red'
}


//------------------------state variables-----------------------//

let board; 
let turn;
let winner;

board.fill(41);

console.log(board);

//------------------------cached elements----------------------//

const messageEl = document.querySelector('#msg');
const circlesEl = document.querySelectorAll('td div');
//might need varaible for just columns to listen to instead of individual circles


//-----------------------event listeners----------------------//

//document.querySelector('.gameBoard').addEventListener('click', handleMove);
//document.querySelector('button').addEventListener('click', init);


//-----------------------functions----------------------------//

function init() {
  board = newArray(41).fill(null);
  turn = 1;
  winner = null;
  //call render
}

function handleMove(evt){
  //find index of idividual circle or column?
  //check to see if available if not return
  //fill spot closest to the bottom 
  //fill with correct player
  //update turn
  //call render

}