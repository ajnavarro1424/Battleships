var torps = 25, ships = 5;
var SHIP = 1;
var CARRIER= 5;
var BATTLESHIP = 4;
var CRUISER = 3;
var board = [];
//Populates the board array with zeroes




function game() {
  buildBoard();
  placeCarrier();
  // placeCruiser();
  // placeShips();

  function buildBoard() {
    //creates the jagged array populated with zeroes
    for(var i= 0; i <= 9; i++){
      board.push(Array(10).fill(0)); //pushes a new, size-10 array that is filled with 0s to board
    }

  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function placeShips() {
    //Loop gens five random locations for our ships
    for(var i = 0; i<5; i++){
      var randRow = getRandomInt(0,9);
      var randCol = getRandomInt(0,9);
      if(board[randRow][randCol]==SHIP) { // || shipNextDoor(randRow, randCol, SHIP)){ //if there is already a ship there
        console.log("Proposed ship location -- Row: " + randRow + " Col: " +randCol);
        i--; //subtract 1 from i, meaning the loop will loop 1 extra time
      }
      else {
        board[randRow][randCol]=SHIP;
        console.log("Final ship location -- Row: " + randRow + " Col: " +randCol);
      }
    }
  }

  function placeCarrier(){
    //Generate random location that is 2 spaces away from every wall.
    var randRow = getRandomInt(2,7);
    var randCol = getRandomInt(2,7);
    //0 represents the vertical condition and 1 represents the horizontal condition
    var randDirection = getRandomInt(0,1);

    for(var i = -2; i <= 2; i++){
      //if to use direction to determine row vs. column ship placement
      if(randDirection == 0){
          board[randRow+i][randCol]=CARRIER;
          console.log("Final carrier location -- Row: " + (randRow+i) + " Col: " +randCol);

      }
      else{
        board[randRow][randCol+i] = CARRIER;
        console.log("Final carrier location -- Row: " + randRow + " Col: " +(randCol+i));
      }
    }
  }

  function placeBattleship() {

  }

  function placeCruiser() {

    for(var c = 0; c < 2; c++){
      //Generate random location that is 1 spaces away from every wall.
      var randRow = getRandomInt(1,8);
      var randCol = getRandomInt(1,8);
      //0 represents the vertical condition and 1 represents the horizontal condition
      var randDirection = getRandomInt(0,1);
      if(board[randRow][randCol]>=CRUISER){ //|| shipNextDoor(randRow, randCol, CRUISER)){ //if there is already a ship there
        console.log("Proposed cruiser location -- Row: " + randRow + " Col: " +randCol);
      c--; //subtract 1 from i, meaning the loop will loop 1 extra time
      }
      else {
        for(var i = -1; i <= 1; i++){
          //if to use direction to determine row vs. column ship placement
          if(randDirection == 0){
              board[randRow+i][randCol]=CRUISER;
              console.log("Final cruiser location -- Row: " + (randRow+i) + " Col: " +randCol);

          }
          else{
            board[randRow][randCol+i] = CRUISER;
            console.log("Final cruiser location -- Row: " + randRow + " Col: " +(randCol+i));
          }
        }
      }
    }
  }


  // function shipNextDoor(randRow, randCol, shipLevel, randDirection){ //New version consists of looping thru entire ship and calling shipNextDoor on each index of the ship
  //   function searchHorizontal(){
  //     if(randDirection == 1){
  //       if(board[randRow][randCol-1]>=shipLevel
  //         || board[randRow][randCol+1]>=shipLevel){
  //         return true;
  //         }
  //       else{
  //         return false;
  //       }
  //     }
  //   }
  //   function searchVeritcal(){
  //     if (board[randRow-1][randCol]>=shipLevel
  //       || board[randRow+1][randCol]>=shipLevel) {
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  //   function searchDiagnol(){
  //     if (board[randRow+1][randCol+1]>=shipLevel
  //       || board[randRow+1][randCol-1]>=shipLevel ||  board[randRow-1][randCol+1]>=shipLevel
  //       || board[randRow-1][randCol-1]>=shipLevel) {
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  //
  //
  //   if(randRow!=9 && randRow!=0 && randCol!=9 && randCol!=0){ //if ship is not at the edges of the board
  //     if(board[randRow][randCol-1]>=shipLevel
  //       || board[randRow][randCol+1]>=shipLevel || board[randRow-1][randCol]>=shipLevel
  //       || board[randRow+1][randCol]>=shipLevel || board[randRow+1][randCol+1]>=shipLevel
  //       || board[randRow+1][randCol-1]>=shipLevel || board[randRow-1][randCol+1]>=shipLevel
  //       || board[randRow-1][randCol-1]>=shipLevel){ //check if any of the four cardinal and diagnol directions contains a ship
  //       return true; //return true is ship
  //     }
  //     else {
  //       return false; //return false if no ship
  //     }
  //  }
  //
  //  else {
  //    if(randRow==0 && randCol==0 && (board[randRow+1][randCol]>=shipLevel
  //    || board[randRow][randCol+1]>=shipLevel || board[randRow+1][randCol+1]>=shipLevel)){ //Top left corner check
  //     return true;
  //    }
  //    else if(randRow==0 && randCol==9 && (board[randRow+1][randCol]>=shipLevel
  //    || board[randRow][randCol-1]>=shipLevel || board[randRow+1][randCol-1]>=shipLevel)){ //Top right corenr check
  //      return true;
  //    }
  //    else if(randRow==9 && randCol==9 && (board[randRow-1][randCol]>=shipLevel
  //    || board[randRow][randCol-1]>=shipLevel || board[randRow-1][randCol-1]>=shipLevel)){ //Bottom right corner check
  //      return true;
  //    }
  //    else if(randRow==9 && randCol==0 && (board[randRow-1][randCol]>=shipLevel
  //    || board[randRow][randCol+1]>=shipLevel || board[randRow-1][randCol+1]>=shipLevel)){ //Bottom left coern check
  //      return true;
  //    }
  //    else if(randRow==0 && (randCol>0 && randCol<9) && (board[randRow+1][randCol]>=shipLevel
  //    || board[randRow][randCol+1]>=shipLevel || board[randRow][randCol-1]>=shipLevel
  //    || board[randRow+1][randCol-1]>=shipLevel || board[randRow+1][randCol+1]>=shipLevel)){
  //      //Top row
  //      return true;
  //    }
  //    else if(randCol==9 && (randRow>0 && randRow<9) && (board[randRow+1][randCol]>=shipLevel
  //    || board[randRow-1][randCol]>=shipLevel || board[randRow][randCol-1]>=shipLevel
  //    || board[randRow-1][randCol-1]>=shipLevel || board[randRow+1][randCol-1]>=shipLevel)){
  //      //Right column
  //      return true;
  //    }
  //    else if(randRow==9 && (randCol>0 && randCol<9) && (board[randRow-1][randCol]>=shipLevel
  //    || board[randRow][randCol+1]>=shipLevel || board[randRow][randCol-1]>=shipLevel
  //    || board[randRow-1][randCol+1]>=shipLevel || board[randRow-1][randCol-1]>=shipLevel)){
  //      //Bottom row
  //      return true;
  //    }
  //    else if(randCol==0 && (randRow>0 && randRow<9) && (board[randRow+1][randCol]>=shipLevel
  //    || board[randRow-1][randCol]>=shipLevel || board[randRow][randCol+1]>=shipLevel
  //    || board[randRow-1][randCol+1]>=shipLevel || board[randRow+1][randCol+1]>=shipLevel)){
  //      //Left column
  //      return true;
  //    }
  //    else {
  //      return false;
  //    }
  //  }
  //
  // }
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
