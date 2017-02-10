var  myGlobalGame;

$(document).ready(function () {
 myGlobalGame = new Game2048();


 renderTiles(); // 2. Take the initial info in that object (tiles) and put them on the screen define to make use of the myGlobalGame function

 $(document).keydown(function (ev) {

 // prevent arrow key scrolling
 var acceptableKeys = [37, 65, 38, 87, 39, 68, 40, 83 ];
 if (!acceptableKeys.includes(ev.keyCode)) {
   return;
 }
 ev.preventDefault();

// 4. Move board in object based on keypresses (up, down, left, right)
 // move if correct keys were pressed
   switch (ev.keyCode) {
     case 37:
     case 65:
       myGlobalGame.move('left');
       break;
     case 38:
     case 87:
       myGlobalGame.move('up');
       break;
     case 39:
     case 68:
       myGlobalGame.move('right');
     break;
     case 40:
     case 83:
       myGlobalGame.move('down');
     break;
   }

   renderTiles();
 });
});

 // There's really 2 boards: the board in the object and the board on the screen
 // Since there isn't a magical connection between the object and the screen we create that with code
 // we'll loop through every single cell in the board to do this

 function renderTiles () {
   $("#tile-container").empty(); // clears out existing tiles in the DOM

   myGlobalGame.board.forEach(function (row, rowIndex) {
     row.forEach(function (cell, colIndex) {
       if (cell === null) {
         return;
       }
     // What to test at this point:
     // console.log("Tile value: " + cell);
     // console.log("Row " + rowIndex);
     // console.log("Column: " + colIndex);
     var tileHtml = '<div class="tile tile-position-' + rowIndex + '-' + colIndex + ' val-' + cell + '">' + cell +'</div>';
      $("#tile-container").append(tileHtml);

     });
   });
 }
 function checkIfDone() {
   if (myGlobalGame.hasWon) {
     var winnerHtml = '<img src="https://media.giphy.com/media/l3q2BXqLMnzhVF720/giphy.gif">';
     $('body').append(winnerHtml);
   }
   else if (myGlobalGame.hasLost) {
     var loserHtml = '<img src="https://media.giphy.com/media/3o7TKr3nzbh5WgCFxe/giphy.gif">';
     $('body').append(loserHtml);
   }
 }

// 3. Handle keyboard events



// 5. Updating the screen based on the new board state

// 6. Win or Lose?
