function Game2048 () {
 this.score = 0;
 this.board = [
   [ null, null, null, null ],
   [ null, null, null, null ],
   [ null, null, null, null ],
   [ null, null, null, null ],
 ];
 this.hasWon = false;
 this.hasLost = false;
 this.boardHasChanged = false; //we dont truly need this but nice to have; added it after we created Movement function

 this._generateTile(); //we type this twice so it generates two tiles, each being either 2 or 4
 this._generateTile();
}

Game2048.prototype._generateTile = function () {
 var tileValue;

 if(Math.random() < 0.8) { // means 80% of the time it will be a 2 and 20% of the time it will be a 4
   tileValue = 2;
 } else {
   tileValue = 4;
 }

 var emptyTile = this._getAvailablePosition(); // tries to figure out what are the empty spaces in my board; its gonna give me a random empty position or null so save that to a var

 if (emptyTile !== null) {
   var row = emptyTile.x;
   var col = emptyTile.y;
   this.board[row][col] = tileValue;
 }
};

// I'm gonna loop through all the positions and check if they are empty, any that are empty are stored in emptyTiles

Game2048.prototype._getAvailablePosition = function () {
 var emptyTiles = [];

 this.board.forEach(function (row, rowIndex) {
   row.forEach(function (cell, colIndex) {
     if (cell === null) {
       emptyTiles.push({x: rowIndex, y: colIndex}); // if it is add its coordinates to the array
     }
 });
});

if (emptyTiles.length === 0) { // sometimes there are no empty tiles
 return null;
}

var randomIndex = Math.floor(Math.random() * emptyTiles.length); // at the end of the this loop we want to pick one of those empty positions
 return emptyTiles[randomIndex]; // if I get 11 results for example I want to pick one at random and plug it into the emptyTiles array at the top of this prototype
};

Game2048.prototype._renderBoard = function () { // just prints out everything in each row
 this.board.forEach(function(row) {
   console.log(row);
 });

console.log('Current Score: ' + this.score);
};


// ============================================
// MOVE LEFT
// ============================================

Game2048.prototype.moveLeft = function () {
 var updatedBoard = [];
 var theGame = this;  //need to add it because in the for each function the context of this is different from AlinasGame

 this.board.forEach(function (row) {
   //1. Remove empties from row; remove the item if its null
   var newRow = [];

   row.forEach(function (cell) {
     if (cell !== null) {
       newRow.push(cell);
     }
   });

   //2. Merge tiles that are together and same #

   for (var i = 0; i < newRow.length; i ++) {
     if (newRow[i] === newRow[i +1]) {
     newRow[i] *= 2;
     newRow[i+1] = null;

     theGame._updateScore(newRow[i]);
   }
 }

 // 3. Remove new empties in the middle
 //     e.g. when step #2 turns [8, 8, 4] into [16, null, 4]
 //          we want to end up with [16, 4]
 var moved = [];

 newRow.forEach(function (cell) {
   if (cell !== null) {
     moved.push(cell);
   }
 });

 if (moved.length !== row.length) {
   theGame.boardHasChanged = true;
 }

 // 4. push() nulls until row has length 4 again
 while (moved.length < 4) {
   moved.push(null);
 }

 if (newRow.length !== row.length) {
   this.boardHasChanged = true;
 }

 updatedBoard.push(moved);
});

this.board = updatedBoard;
};
// ============================================
// MOVE RIGHT
// ============================================

Game2048.prototype.moveRight = function () {
  var updatedBoard = [];
  var theGame = this;  //need to add it because in the for each function the context of this is different from AlinasGame

  this.board.forEach(function (row) {
    // 1 remove empty from row
    var newRow = []; // in here are the number that are in the row

    row.forEach( function (cell) {
      if (cell !== null){
        newRow.push(cell);
      }
    });

    // 2 merge tile in the row that are together and the same number
    for (var i = newRow.length - 1; i >= 0; i --) {
      // e.g [8, 8, 4] -> [16, null, 4]
      if (newRow[i] === newRow[i - 1]) {
        newRow[i] *= 2;
        newRow[i - 1] = null;
      }
    }
    //3 remove new empties in the middle
    // e.g [8, 8, 4] -> [16, null, 4] getting the null out
    var moved = [];

    newRow.forEach( function (cell) {
      if (cell !== null){
        moved.push(cell);
      }
    });

    if (moved.length !== row.length) {
      theGame.boardHasChanged = true;
    }

    // 4 push() nulls until row has length 4 again
    while (moved.length < 4) {
      moved.unshift(null);
    }

    updatedBoard.push(moved);
  });

    this.board = updatedBoard;
};


// to TEST at this point:
// alinasGame = new Game2048();
// alinasGame._renderBoard();
// alinasGame.moveRight();
// alinasGame._renderBoard();


// ============================================
// MOVE UP/DOWN
// ============================================


Game2048.prototype._transposeMatrix = function () {
 for (var row = 0; row < this.board.length; row++) {
   for (var column = row+1; column < this.board.length; column++) {
     var temp = this.board[row][column];
     this.board[row][column] = this.board[column][row];
     this.board[column][row] = temp;
   }
 }
};

Game2048.prototype.moveUp = function () {
 this._transposeMatrix();
 this.moveLeft();
 this._transposeMatrix();
};


Game2048.prototype.moveDown = function () {
 this._transposeMatrix();
 this.moveRight();
 this._transposeMatrix();
};

// to TEST at this point:

// alinasGame = new Game2048();
// alinasGame._renderBoard();
// alinasGame.moveLeft();
// alinasGame._renderBoard();

// ============================================
// MOVEMENT
// ============================================


Game2048.prototype.move = function (direction) {
// an early return to check for an error. If we do reurn will stop it because return is a break for functions
 if (this.hasWon || this.hasLost) {
   return;
 }

  switch (direction) {
    case "up":
     this.moveUp();
     break;
   case "down":
     this.moveDown();
     break;
   case "left":
     this.moveLeft();
     break;
   case "right":
     this.moveRight();
     break;
  }

  if (this.boardHasChanged) { // so that when you make a movement it adds a new tile and we're not stuck in new tiles forever
    this._generateTile();
    this._isGameLost();
    this.boardHasChanged = false;
  }
};

Game2048.prototype._updateScore = function (points) {
  this.score += points;

  if (points === 2048) {
    this.hasWon = true;
  }
};


Game2048.prototype._isGameLost = function () {
  if (this._getAvailablePosition() !== null) {
    return;
  }

  var theGame = this;

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, colIndex) {
      var current = theGame.board[rowIndex][colIndex];
      var top, bottom, left, right;

      if (theGame.board[rowIndex][colIndex - 1]) {
        left = theGame.board[rowIndex][colIndex - 1];
      }
      if (theGame.board[rowIndex][colIndex + 1]) {
        right = theGame.board[rowIndex][colIndex + 1];
      }
      if (theGame.board[rowIndex - 1]) {
        top = theGame.board[rowIndex - 1][colIndex];
      }
      if (theGame.board[rowIndex + 1]) {
        bottom = theGame.board[rowIndex + 1][colIndex];
      }

      if (current === top || current === bottom || current === left || current === right) {
        theGame.hasLost = true;
      }
    });
  });
};
