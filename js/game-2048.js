
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
