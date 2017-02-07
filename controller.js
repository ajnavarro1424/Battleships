var game1 = game();
$(document).ready(function(){
  buildTable(); //Builds 100 cell table which is the board
  //findShips();

  $("td").on("click", function() {
    $("#torps2").text(game1.spendTorp());
    //if ship is on clicked cell, then do .hit class, else do .miss
    if(convertGrid($(this).attr('id'))){
      $(this).addClass("hit");
    }
    else {
      //Adds red .miss class wheneve u click
      $(this).addClass("miss");
    }
    //Disables the cell if it has been clicked already
    $(this).off("click");
    //Call whoWon() every click to see if the game is over
    if(game1.whoWon() == 1){
      //update the gameWon tag if there is winner
      $("#gameWon2").text("You torpedoed all the ships! Game Over!");
      //somehow disable gameplay/board
      $("td").off("click");

    }
    else if(game1.whoWon() == 0){
      //update the gameWon tag to show loss
      $("#gameWon2").text("You're out of torpedoes! Game Over!");
      findShips();
      //disable game board
      $("td").off("click");
    }

  })

});

function buildTable() {
  var currentRow = 0; //variable keeps track of current row
  for(var i = 0; i <100; i++){ //for loop creates 100 cell table
    if(i%10==0){ // if counter%10 is 0, make a new row
      currentRow = i/10; //update current row
      $("#board").append('<tr id="row' + currentRow + '"></tr>'); //create a new table row with id "row<currentRow>"
    }
    $("#row"+ currentRow).append('<td id="' + i + '"></td>'); //makes a new table cell with id "index<i>" under "row<currentRow"

  }
}

function convertGrid(strNum){ //takes the id of the cell as a string
  var spl = strNum.split(""); //splits it into an array
  if(spl.length<2){
    var row = 0;
    var col = parseInt(spl[0]);
  }//converts each cell into an int
  else {
    var row = parseInt(spl[0]);
    var col = parseInt(spl[1]);
  }

  if(board[row][col]==SHIP){ //compares the row and col to the existing board to see if there is a ship
    $("#ships2").text(game1.decrementShips());
    //Changes the value of SHIP to "Found ship"=2
    board[row][col] = 2;
    return true; //meaning hit
  }
  else {
    return false; //meaning miss
  }
}

function findShips(){
  board.forEach(function(e, i){
    e.forEach(function(e2, i2){
      if(e2==1){
        $("#"+convertBoard(i,i2)).addClass("showShips")
        //convert i and i2 to a string
      }
    });
  });
}

function convertBoard(i, i2){
  if(i==0){
    return i2;
  }
  else {
    return i.toString() + i2.toString();
  }
}
