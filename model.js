var torps = 25, ships = 5;
var SHIP = 1;
var CARRIER= 5;
var BATTLESHIP = 4;
var CRUISER = 3;
var board = [];
//Populates the board array with zeroes

function game() {
  //Relevant function calls
  //Builds the 12x12 array with appropriate 0's and -1's
  buildBoard();
  searchPlaceShip(CARRIER, 1);
  //Random number generator for randRow,randCol,randDir
  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
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
  function searchPlaceShip (shipType, numOfShips){

    //Loop for number of ships
    for(var curShip = 1; curShip <= numOfShips; curShip++){
      //Reset randRow & randCol, randDir if all directions fail search
      console.log("Current ship has changed, new OG pos generating now...");
      var randRow = getRandomInt(1,10);
      var randCol = getRandomInt(1,10);
      var randDir = getRandomInt(0,3);
      var finalCords = [-1,-1,-1];
      console.log("The coords and the dir is", randRow, randCol, randDir);
      //Checks the initial position
      if(initialShipCheck() == false || dirShipCheck() == false){
        console.log("Counter is decrimented");
        curShip--//reset the randRow and randCol
      }
      else{
        console.log("The positions are valid!");
        placeShip(shipType);
      }
    }
    //Check to make sure the start coordinate is valid
    function initialShipCheck(){
      return board[randRow][randCol] == 0;
    }
    //Loop iterating through all directions if necessary
    function dirShipCheck(){
      for(var dirCounter = 1; dirCounter<=4; dirCounter++){
        //Loop for a searching for other ship conflicts or bounds
        console.log("We are on dirCounter loop: ", dirCounter);
        for(var search = 0; search<shipType; search++){
          console.log("We are on search: ", search);
          if(!searchAround(incrementPos(search))){
            console.log("Oh no!!");
            break;
          }
         else if (search==shipType-1){
           console.log("We found a position that fits!");
           return true;
          }
        }

        if(randDir==3){
          console.log("Reset direction to 0 from 3");
          randDir=0;
        }
        else{
          randDir++;
          console.log("Direction now" , randDir);
        }
      }

      return false;
    }

    function incrementPos(search){ //incrememnts the search position based on the direction
      switch (randDir) {
        case 0:
          return [randRow-search,randCol];
        case 1:
          return [randRow,randCol+search];
        case 2:
          return [randRow+search,randCol];
        case 3:
          return [randRow,randCol-search];
      }
    }

    function searchAround(posArr){
      var row = posArr[0];
      var col = posArr[1];
      console.log("Inside of searchAround, the new coordinates are ", row, col);
      if(board[row][col]!=0){
        console.log("searchAround found border or ship at row and col");
        return false; //position not valid!
      }
      else if(board[row+1][col]>=1 || board[row-1][col]>=1 || board[row][col+1]>=1 || board[row][col-1]>=1
            || board[row+1][col+1]>=1 || board[row+1][col-1]>=1 || board[row-1][col-1]>=1 || board[row+1][col+1]>=1){
              console.log("searchAround found ship using radar");
        return false
      }
      else {
        console.log("Nothing was found!!!" );
        return true; //position valid
      }
    }

    function placeShip(shipType) {
      var placeShipCounter = 1;
      for(var shipPlace = 0; shipPlace<shipType; shipPlace++){
        console.log("OG, direction, ship type, placeShipCounter ", randRow, randCol, randDir, shipType);
        switch (randDir) {
          case 0:
            board[randRow-shipPlace][randCol]=shipType;
            break;
          case 1:
            board[randRow][randCol+shipPlace]=shipType;
            break;
          case 2:
            board[randRow+shipPlace][randCol]=shipType;
            break;
          case 3:
            board[randRow][randCol-shipPlace]=shipType;
            break;
        }
      }
      placeShipCounter++;
    }
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
