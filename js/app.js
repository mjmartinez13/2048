
  // 1 create game object
var myGlobalGame;
$(document).ready(function () {
  myGlobalGame = new Game2048();

  renderTiles();
});
function renderTiles() {
  $('#tile-container').empty(); 
  myGlobalGame.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      if (cell === null) {
        return;
      }
      console.log('Tile value: ' + cell);
      console.log('Row: ' + rowIndex);
      console.log('column ' + colIndex);
      //put cell on the screen if is not empty

      var tileHtml = '<div class="tile tile-position-'+rowIndex+'-'+colIndex+' val-'+cell+'"> '+cell+' </div>';
      $('#tile-container').append(tileHtml);
    });
  });
}
// 2 load initial board state onto page
// 3 handle keyboard events
// 4 move board in object based on keypresses (up, down, left, right)
// 5 updating the screen base on new board state
// 6 win or lose (maybe)
