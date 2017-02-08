var game1 = game();
$(document).ready(function(){
  buildTable(); //Builds 144 cell table which is the board
  findShips();


  $("td").on("click", function() {
    $("#torps2").text(game1.spendTorp());
    //if ship is on clicked cell, then do .hit class, else do .miss
    if(convertGrid($(this).attr('id'))){ //only working for SHIPs rn
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
  for(var i = 0; i <144; i++){ //for loop creates 100 cell table
    if(i%12==0){ // if counter%10 is 0, make a new row
      currentRow = i/12; //update current row
      $("#board").append('<tr id="row' + currentRow + '"></tr>'); //create a new table row with id "row<currentRow>"

    }
     //makes a new table cell with id "index<i>" under "row<currentRow"
    if(i <= 11 || i >= 132){
      $("#row"+ currentRow).append('<td class="border"></td>');
    }
    else if(i%12 == 0 || i%12 == 11) {
      $("#row"+ currentRow).append('<td class="border"></td>');
    }
    else {
      $("#row"+ currentRow).append('<td id="' + ((i%12)+(currentRow-1)*10) + '"></td>');
    }
  }
}
//Takes the HTML table cell id and converts it into board array index
function convertGrid(strNum){ //takes the id of the cell as a string
  if(strNum==null){}
  else {
    var spl = strNum.split(""); //splits it into an array
    console.log(strNum);
    if(spl.length<2){ //1-9, all of our single digits
      var row = 1;
      var col = parseInt(spl[0]);
    }//converts each cell into an int
    else { //controls everything that contains 2 digits
      if(spl.length==3){ //clean dis up
        var row = 10;
        var col = 10;
      }
      else if(parseInt(spl[1])==0){
        var row = parseInt(spl[0]);
        var col = 10;
      } else {
        var row = parseInt(spl[0])+1;
        var col = parseInt(spl[1]);
      }
    }

    console.log(row, col);

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
}
//Takes the board array index and converts it to to the HTML index
//(i-1)*10+i2
function convertBoard(i, i2){
  return ((i-1)*10)+i2;
}


function findShips(){
  board.forEach(function(e, row){
    e.forEach(function(e2, col){
      if(e2>=1){
        console.log("Found ship: ", e2, row, col);
        $("#"+convertBoard(row,col)).addClass("showShips")
        //convert i and i2 to a string
      }
    });
  });
}
