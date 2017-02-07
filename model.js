var torps = 25, ships = 5;
var SHIP = 1;
var SHIP5= 5;
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
    place5Ships();
    placeShips();
  }

  function placeShips() {
    //Loop gens five random locations for our ships
    for(var i = 0; i<5; i++){
      var randRow = getRandomInt(0,9);
      var randCol = getRandomInt(0,9);
      if(board[randRow][randCol]==SHIP || shipNextDoor(randRow, randCol)){ //if there is already a ship there
        console.log("Proposed ship location -- Row: " + randRow + " Col: " +randCol);
        i--; //subtract 1 from i, meaning the loop will loop 1 extra time
      }
      else {
        board[randRow][randCol]=SHIP;
        console.log("Final ship location -- Row: " + randRow + " Col: " +randCol);
      }
    }
  }
  function place5Ships(){
    //Generate random location that is 2 spaces away from every wall.
    var randRow = getRandomInt(2,7);
    var randCol = getRandomInt(2,7);
    //0 represents the vertical condition and 1 represents the horizontal condition
    var randDirection = getRandomInt(0,1);

    for(var i = -2; i <= 2; i++){
      //if to use direction to determine row vs. column ship placement
      if(randDirection == 0){
          board[randRow+i][randCol]=SHIP5;
          console.log("Proposed ship location -- Row: " + (randRow+i) + " Col: " +randCol);

      }
      else{
        board[randRow][randCol+i] = SHIP5;
        console.log("Proposed ship location -- Row: " + randRow + " Col: " +(randCol+i));
      }
    }
  }

  function shipNextDoor(randRow, randCol){
    if(randRow!=9 && randRow!=0 && randCol!=9 && randCol!=0){ //if ship is not at the edges of the board
      if(board[randRow][randCol-1]==1
        || board[randRow][randCol+1]==1 || board[randRow-1][randCol]==1
        || board[randRow+1][randCol]==1 || board[randRow+1][randCol+1]==1
        || board[randRow+1][randCol-1]==1 || board[randRow-1][randCol+1]==1
        || board[randRow-1][randCol-1]==1){ //check if any of the four cardinal directions contains a ship
        return true; //return true is ship
      }
      else {
        return false; //return false if no ship
      }
   }

   else {
     if(randRow==0 && randCol==0 && (board[randRow+1][randCol]==1
     || board[randRow][randCol+1]==1 || board[randRow+1][randCol+1]==1)){ //Top left corner check
      return true;
     }
     else if(randRow==0 && randCol==9 && (board[randRow+1][randCol]==1
     || board[randRow][randCol-1]==1 || board[randRow+1][randCol-1]==1)){ //Top right corenr check
       return true;
     }
     else if(randRow==9 && randCol==9 && (board[randRow-1][randCol]==1
     || board[randRow][randCol-1]==1 || board[randRow-1][randCol-1]==1)){ //Bottom right corner check
       return true;
     }
     else if(randRow==9 && randCol==0 && (board[randRow-1][randCol]==1
     || board[randRow][randCol+1]==1 || board[randRow-1][randCol+1]==1)){ //Bottom left coern check
       return true;
     }
     else if(randRow==0 && (randCol>0 && randCol<9) && (board[randRow+1][randCol]==1
     || board[randRow][randCol+1]==1 || board[randRow][randCol-1]==1
     || board[randRow+1][randCol-1]==1 || board[randRow+1][randCol+1]==1)){
       //Top row
       return true;
     }
     else if(randCol==9 && (randRow>0 && randRow<9) && (board[randRow+1][randCol]==1
     || board[randRow-1][randCol]==1 || board[randRow][randCol-1]==1
     || board[randRow-1][randCol-1]==1 || board[randRow+1][randCol-1]==1)){
       //Right column
       return true;
     }
     else if(randRow==9 && (randCol>0 && randCol<9) && (board[randRow-1][randCol]==1
     || board[randRow][randCol+1]==1 || board[randRow][randCol-1]==1
     || board[randRow-1][randCol+1]==1 || board[randRow-1][randCol-1]==1)){
       //Bottom row
       return true;
     }
     else if(randCol==0 && (randRow>0 && randRow<9) && (board[randRow+1][randCol]==1
     || board[randRow-1][randCol]==1 || board[randRow][randCol+1]==1
     || board[randRow-1][randCol+1]==1 || board[randRow+1][randCol+1]==1)){
       //Left column
       return true;
     }
     else {
       return false;
     }
   }

  }
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
