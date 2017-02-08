var torps = 25, ships = 5;
var SHIP = 1;
var CARRIER= 5;
var BATTLESHIP = 4;
var CRUISER = 3;
var board = [];
//Populates the board array with zeroes

function game() {
  //Builds the 12x12 array with appropriate 0's and -1's
  buildBoard();

  function buildBoard() {
    //creates the jagged array populated with zeroes
    for(var i= 0; i <= 11; i++){
      board.push(Array(12).fill(0)); //pushes a new, size-10 array that is filled with 0s to board
    }
    //Adds -1 to all edges of the 11x11 board for seachShipDir();
    board.forEach(function(elementValue,row){
      if(row == 0 || row ==11){
        elementValue.fill(-1);
      }
      else{
        elementValue[0] = -1;
        elementValue[11] = -1;
      }
    });
  }
  //Random number generator for randRow,randCol,randDir
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Inde game() return obejct closure
  return {
    whoWon: function() {
      //Determines if the game is over, and if there is a winner
      if(ships == 0){//Determines win if ships = 0
        return 1;
      }
      else if(torps <= 0){//Determines loss if torps =0
        return 0;
      }
      else{ //Nothing happens if ships & torps > 0
        return -1
      }
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
