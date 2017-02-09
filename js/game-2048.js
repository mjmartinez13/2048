
function Game2048() {
  this.score = 0; //because all the score of the game start at 0
  this.board = [ // is a 4X4 array //every board will start enty for every one
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
    [ null, null, null, null ],
  ];

  this.hasWon = false;
  this.hasLost = false;
  this.boardHasChanged = false;
  this._generateTile();//this will generate a random tile with val 2 or 4
  this._generateTile();//this will generate a random tile with val 2 or 4
}

// marlonGame = new Game2048(); here im checking and creating a new game

Game2048.prototype._generateTile  = function () {
  var tileValue;

  if (Math.random() < 0.8) {
    tileValue = 2;
  } else {
    tileValue = 4;
  }

  var emptyTile = this._getAviablePosition();
  if (emptyTile !== null) {
    var row = emptyTile.x;
    var col = emptyTile.y;
    this.board[row][col] = tileValue;
  }
};

Game2048.prototype._getAviablePosition = function () {
  var emptyTile = [];//it will be the empty arrays

  this.board.forEach(function (row, rowIndex) { // it will loop for the array index (when doing a 2d array got get the val is this way only)
    row.forEach(function (cell, colIndex) { // this will loop for each index inside the row(when doing a 2d array got get the val is this way only)
      if(cell === null) { //for each row check if everty cell is empty ***
        emptyTile.push({ x: rowIndex, y: colIndex});
      }
    });
  });

  if (emptyTile.length === 0) {
    return null;
  }

  var randomIndex = Math.floor(Math.random() * emptyTile.length);
  return emptyTile[randomIndex];
};

  Game2048.prototype._renderBoard = function () {
    this.board.forEach(function (row) {
      console.log(row);
    });
  };

  // ============================================
  // MOVE LEFT
  // ============================================

  Game2048.prototype.moveLeft = function () {
    var updatedBoard = [];
    var theGame = this;

    this.board.forEach(function (row) {
      // 1 remove empty from row
      var newRow = []; // in here are the number that are in the row

      row.forEach( function (cell) {
        if (cell !== null){
          newRow.push(cell);
        }
      });

      // 2 merge tile in the row that are together and the same number
      for (var i = 0; i < newRow.length; i += 1) {
        // e.g [8, 8, 4] -> [16, null, 4]
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i + 1] = null;

          theGame._updateScore(newRow[i]);
        }
      }
      //3 remove new empties in the middle
      // e.g [8, 8, 4] -> [16, 4] getting the null out
      var moved = [];

      newRow.forEach( function (cell) {
        if (cell !== null){
          moved.push(cell);
        }
      });

      if(moved.length !== row.length ){
        this.boardHasChanged = true;
      }

      // 4 push() nulls until row has length 4 again
      while (moved.length < 4) {
        moved.push(null);
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

    this.board.forEach(function (row) {
      // 1 remove empty from row
      var newRow = []; // in here are the number that are in the row

      row.forEach( function (cell) {
        if (cell !== null){
          newRow.push(cell);
        }
      });

      // 2 merge tile in the row that are together and the same number
      for (var i = newRow.length - 1; i >= 0; i -= 1) {
        // e.g [8, 8, 4] -> [16, null, 4]
        if (newRow[i] === newRow[i + 1]) {
          newRow[i] *= 2;
          newRow[i - 1] = null;

          theGame._updateScore(newRow[i]);

        }
      }
      //3 remove new empties in the middle
      // e.g [8, 8, 4] -> [16, 4] getting the null out
      var moved = [];

      newRow.forEach( function (cell) {
        if (cell !== null){
          moved.push(cell);
        }
      });

      if(moved.length !== row.length ){
        this.boardHasChanged = true;
      }

      // 4 push() nulls until row has length 4 again
      while (moved.length < 4) {
        moved.unshift(null);
      }

      updatedBoard.unshift(moved);
    });

      this.board = updatedBoard;
  };


  // ============================================
  // TRANSPOSE
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

  // ============================================
  // MOVE UP
  // ============================================


  Game2048.prototype.moveUp = function () {
    this._transposeMatrix();
    this.moveLeft();
    this._transposeMatrix();
  };
  // ============================================
  // MOVE DOWN
  // ============================================
  Game2048.prototype.moveDown = function () {
    this._transposeMatrix();
    this.moveRight();
    this._transposeMatrix();
  };
  // ============================================
  // MOVE
  // ============================================
  Game2048.prototype.move = function (direction) {
    if (this.hasWon || this.hasLost) { //if we haven't won or haven't lost do the switch
      return;
    }

    switch (direction) {
      case 'up':
        this.moveUp();
        break;
      case 'down':
        this.moveDown();
        break;
      case 'left':
        this.moveLeft();
        break;
      case 'right':
        this.moveRight();
        break;
    }

    if (this.boardHasChanged) {
      this._generateTile();
      this._isGameLost();
      this.boardHasChanged = false;
    }
  };

  Game2048.prototype._updateScore = function () {
    this.score += points;

    if (points === 2048){
      this.hasWon = true;
    }

  };

  Game2048.prototype._isGameLost = function () {
      if (this._getAviablePosition() !== null) {
        return;
      }
      var theGame = this;

      this.board.forEach(function (row, rowIndex) {
        row.forEach(function (cell, cellIndex) {
          var current = that.board[rowIndex][cellIndex];
          var top, bottom, left, right;

          if (theGame.board[rowIndex][cellIndex - 1]) {
            left  = that.board[rowIndex][cellIndex - 1];
          }
          if (theGame.board[rowIndex][cellIndex + 1]) {
            right = that.board[rowIndex][cellIndex + 1];
          }
          if (theGame.board[rowIndex - 1]) {
            top    = that.board[rowIndex - 1][cellIndex];
          }
          if (theGame.board[rowIndex + 1]) {
            bottom = that.board[rowIndex + 1][cellIndex];
          }

          if (current === top || current === bottom || current === left || current === right)
            theGame.hasLost = true;
            });
      });
  };
