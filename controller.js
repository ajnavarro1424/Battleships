$(document).ready(function(){
  buildTable();

});

function buildTable() {
  var currentRow = 0;
  for(var i = 0; i <100; i++){
    if(i%10==0){
      currentRow = i/10;
      $("#board").append('<tr id="row' + currentRow + '"></tr>');
      console.log("We're here!")
    }
    $("#row"+ currentRow).append('<td id="index-' + i + '"></td>');

  }
}
