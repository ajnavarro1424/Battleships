$(document).ready(function(){
  buildTable(); //Builds 100 cell table which is the board

  $("td").on("click", function() {
    $(this).addClass("miss"); //Adds red .miss class wheneve u click
  })

});

function buildTable() {
  var currentRow = 0; //variable keeps track of current row
  for(var i = 0; i <100; i++){ //for loop creates 100 cell table
    if(i%10==0){ // if counter%10 is 0, make a new row
      currentRow = i/10; //update current row
      $("#board").append('<tr id="row' + currentRow + '"></tr>'); //create a new table row with id "row<currentRow>"
    }
    $("#row"+ currentRow).append('<td id="index-' + i + '"></td>'); //makes a new table cell with id "index<i>" under "row<currentRow"

  }
}
