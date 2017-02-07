var game1 = game();
$(document).ready(function(){
  buildTable(); //Builds 100 cell table which is the board

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
    if(game1.whoWon()){
      //update the gameWon tag if there is winner
      //somehow disable gameplay/board
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
    return true; //meaning hit
  }
  else {
    return false; //meaning miss
  }
}
