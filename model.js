var torps = 25, ships = 5;
var SHIP = 1;
var board = [];
//Populates the board array with zeroes


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() {
  buildBoard();

  function buildBoard() {
    //creates the jagged array populated with zeroes
    for(var i= 0; i <= 9; i++){
      board.push(Array(10).fill(0)); //pushes a new, size-10 array that is filled with 0s to board
    }
    console.log(board);
    placeShips();
  }

  function placeShips() {
    //Loop gens five random locations for our ships
    for(var i = 0; i<5; i++){
      var randRow = getRandomInt(0,9);
      var randCol = getRandomInt(0,9);
      if(board[randRow][randCol]==SHIP){ //if there is already a ship there
        i--; //subtract 1 from i, meaning the loop will loop 1 extra time
      }
      else {
        board[randRow][randCol]=SHIP;
        console.log("Ship location -- Row: " + randRow + " Col: " +randCol);
      }
    }
  }
  return {
    whoWon: function() {
      //Determines if the game is over, and if there is a winner
      
    },
    spendTorp: function(){
      console.log("Remaining Torpedoes: ",--torps)
      return torps;
    },
    getBoard: function(){
      return board;
    },
    getShips: function(){
      return ships;
    },
    getTorps: function(){
      return torps;
    },
    decrementShips: function(){
      return --ships;
    }
  }

}
