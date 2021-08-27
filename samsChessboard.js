/**
 * @class Square
 * @description - Contains all the logic and the data of the single squre
 * Also contains the chess piece
 */
 class Square {
  x;
  y;
  color;
  piece = null;

  /**
   * @constructor
   *
   * @param string x - horizontal coordinates [a - h]
   * @param number y - vertical coordinates [1 - 8]
   * @param string color - light/dark
   */
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  /**
   * @method setPiece
   *
   * @param Piece piece - chess piece on the square
   */
  setPiece(piece) {
    this.piece = piece;
  }

  /**
   * @method getPiece
   *
   * @return Piece|null
   */
  getPiece() {
    return this.piece;
  }
}

/**
 * @class Board
 * @description - Main Board setup and logic including the moves
 */
// ********************************************************************************************
class Board {
  static LETTERS = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  static WIDTH = 8;
  static HEIGHT = 8;

  // squares grid in the format square = {}{}, so it could be easily
  // accessed as squares['a'][3];
  squares = {};

  /**
   * @constructor
   */
  constructor() {
    let flag = true;

    // Setting vertical
    for (let i = 1; i <= Board.WIDTH; i += 1) {
      const letter = Board.LETTERS[i];
      this.squares[letter] = {};

      // Setting horizontal
      for (let j = 1; j <= Board.HEIGHT; j += 1) {
        const color = flag ? 'dark' : 'light';

        this.squares[letter][j] = new Square(letter, j, color);
        flag = !flag;
      }
    }
  }

  print() {

    for (let i = Board.HEIGHT; i > 0; i -= 1) {
      let rowString = i + ": ";

      for (let j = 1; j <= Board.WIDTH; j += 1) {
        let letter = Board.LETTERS[j],
          square = board.getSquare(letter, i),
          piece = square.getPiece();

        if (piece == null) {
          rowString += "[ ]";
        }
        else {
          let firstLetterOfPiece = piece.type[0];
          rowString += "[" + firstLetterOfPiece + "]";
        }
      }
      console.log(rowString);
    }
  }

  /**
   * @methdd getSquare - returns the selected square
   * @param string x - horizontal coordinates [a - h]
   * @param number y - vertical coordinates [1 - 8]
   * @return Square - returns a square
   */
  getSquare(x, y) {
    return this.squares[x][y];
  }

  /**
   * @method setPiece - setting a chess piece on the board
   *
   * @param Piece piece - chess piece on the board
   * @param string x - horizontal coordinates [a - h]
   * @param number y - vertical coordinates [1 - 8]
   */
  setPiece(piece, x, y) {
    let square = this.getSquare(x, y);
    square.setPiece(piece);
    this.setSquare(square, x, y);
  }

  /**
   * @method setSquare - setting a piece on the board
   *
   * @param Square square - Square
   * @param string x - horizontal coordinates [a - h]
   * @param number y - vertical coordinates [1 - 8]
   */
  setSquare(square, x, y) {
    this.squares[x][y] = square;
  }

  /**
   * @method makeMove - The implementation of the move of the piece on the board
   * picking the piece from the starting square (array), and moving to the
   * ending square (array).
   *
   * @param Array start - starting square [x, y]
   * @param Array end - finishing square [x, y]
   * @return {*}
   */

  makeMove(start, end) {
    // Collects all squares in a move, checks if pieces are on the squares in the move and if they're legal.
    let startLetter = start[0];
    let startNum = start[1];
    let endLetter = end[0];
    let endNum = end[1];
    // Find the piece making the move and execute the pieces move.
    let squareStart = this.getSquare(startLetter, startNum),
        pieceInPlay = squareStart.getPiece(),
      // Collects an array of squares in between start and end move, inclusive.
        inbetweenSquares = pieceInPlay.makeMove(start, end);
    // console.log(inbetweenSquares, "inbetweenSquares");

    // Illegal moves will return as empty array.
    if (inbetweenSquares.length == []) {
      return false;
    }

    // make sure the loop reads the array in order from start to end
    if (inbetweenSquares[0][0] == endLetter) {
      if (inbetweenSquares[0][1] == endNum) {
        inbetweenSquares = inbetweenSquares.reverse();
      }
    }

    for (let item of inbetweenSquares) {
      // console.log(item, "item");
      let arrayItemLetter = item[0];
      let arrayItemNum = item[1];

      // extract squares from array.
      let retrieveSquare = this.getSquare(arrayItemLetter, arrayItemNum);
      // check if there is a piece on the square.
      let pieceValue = retrieveSquare.getPiece();

      // if the end square has a same-team piece on it, the move fails  
      if (pieceValue != null) {
        if (arrayItemLetter == endLetter && arrayItemNum == endNum) {
          if (pieceValue['color'] != pieceInPlay['color']) {
            return true;
          }
        }
        return false;

      }

      // if the square is empty, check if it's the end square. if its still empty, the move passes. 
      else if (pieceValue == null) {

        if (arrayItemLetter == endLetter && arrayItemNum == endNum) {
          return true;
        }
      }
    }
    return false;
  }
}
/**
 * @class Piece - Chess Piece
 */
// *******************************************************************
class Piece {
  color;
  type;

  /**
   * @constructor
   *
   * @param string color - piece color [black/white]
   * @param string type - piece type, queen, king, pawn etc.
   */
  constructor(color, type) {
    this.color = color;
    this.type = type;
  }

  /**
   * @method makeMove - current existing piece should be making a move to x, y
   *
   * @param string x - horizontal coordinates [a - h]
   * @param number y - vertical coordinates [1 - 8]
   * @return mixed
   */
  makeMove(x, y) {
    return;
  }
}

/**
 * @class Pawn
 */
class Pawn extends Piece {
  /**
   * @constructor
   * @param string color- piece color [black/white]
   */
  constructor(color) {
    super(color, 'pawn');
  }
}

/**
 * @class Bishop
 * @todo - finish the class
 */
class Bishop extends Piece {
  /**
   * @constructor
   * @param string color- piece color [black/white]
   */
  constructor(color) {
    super(color, 'bishop');
  }

  /**
   * @method makeMove - Implementing the move of the piece
   * @param x
   * @param y
   */

  makeMove(start, end) {
    // Diagonal movement only
    let startLetterIndex = Board.LETTERS.indexOf(start[0]),
      endLetterIndex = Board.LETTERS.indexOf(end[0]),
      horizonalMovementSquaresCount = Math.abs(endLetterIndex - startLetterIndex),
      collectSquares = [],
      verticalMovementSquaresCount = Math.abs(start[1] - end[1]);

    // check for legal diagonal move: squares moved vertical and horizontal will be the same
    if (verticalMovementSquaresCount != horizonalMovementSquaresCount) {
      console.log("This move is not allowed for a Bishop. Must be diagonal.");
      return [];
    }

    let bishopMoveArray = [start, end].sort();
    let minLetter = Board.LETTERS.indexOf(bishopMoveArray[0][0]);
    let minNum = bishopMoveArray[0][1];

    // adds letter and num incrementally upward
    if (bishopMoveArray[0][1] < bishopMoveArray[1][1]) {
      collectSquares.push(bishopMoveArray[0]);
      for (let i = 1; i <= horizonalMovementSquaresCount; i++) {
        collectSquares.push([Board.LETTERS[minLetter + i], minNum + i]);
      }
    }

    // adds letter upward, and num reduces
    else {
      collectSquares.push(bishopMoveArray[0]);
      for (let i = 1; i <= horizonalMovementSquaresCount; i++) {
        collectSquares.push([Board.LETTERS[minLetter + i], minNum - i]);
      }
    }

    // reverse array if it begins with the end square
    if (collectSquares[0][0] == end[0] && collectSquares[0][1] == end[1]) {
      collectSquares.reverse();
    }

    // skips the start square
    collectSquares.shift()    

    return collectSquares;
  }
}


/**
 * @class Rook
 * @todo - finish the class
 */
class Rook extends Piece {
  /**
   * @constructor
   * @param string color- piece color [black/white]
   */
  constructor(color) {
    super(color, 'rook');
  }

  /**
   * @method makeMove - Implementing the move of the piece
   * @param x
   * @param y
   */
  makeMove(start, end) {
    let collectSquares = [];

    // Verical movement only
    if (start[0] == end[0]) {
      let squareLetter = start[0],
          min = Math.min(start[1], end[1]),
          max = Math.max(start[1], end[1]);

      for (let i = min; i <= max; i++) {
        collectSquares.push([squareLetter, i]);
      }
      // reverse array if it begins with the end square
      if (collectSquares[0][0] == end[0] && collectSquares[0][1] == end[1]) {
        collectSquares.reverse();
      }
      // skips the start square
      collectSquares.shift()    
      return collectSquares;
    }

    // Horizontal movement only
    else if (start[1] == end[1]) {
      let squareNum = start[1],
          min = Math.min(Board.LETTERS.indexOf(start[0]),
                Board.LETTERS.indexOf(end[0])),
          max = Math.max(Board.LETTERS.indexOf(start[0]),
                Board.LETTERS.indexOf(end[0]));

      for (let i = min; i <= max; i++) {
        collectSquares.push([Board.LETTERS[i], squareNum]);
      }
      // reverse array if it begins with the end square
      if (collectSquares[0][0] == end[0] && collectSquares[0][1] == end[1]) {
        collectSquares.reverse();
      }
      // skips the start square
      collectSquares.shift()    
      return collectSquares;
    }

    else {
      console.log("Rooks do not move that way");
      return [];
    }
  }
}


// // Setting Up the Board: START
const board = new Board();
// White Pawn on B4
board.setPiece(new Pawn('white'), 'a', 5);
// White Pawn on E4
board.setPiece(new Pawn('white'), 'd', 3);
// White Bishop on C3
board.setPiece(new Bishop('white'), 'c', 3);
// Black Pawn on F6
board.setPiece(new Pawn('black'), 'f', 6);
// Black Rook on E6
board.setPiece(new Rook('black'), 'd', 6);
// Setting Up the Board: END

// To print the board and its piece placement
board.print();


function runTest(testValue, expectedResult, description) {
  console.log(description)
  if (testValue === expectedResult) {
    console.log('    ✅ Test passed')
  } else {
    console.log('    ❌ Test failed!')
  }
};

runTest(board.makeMove(['c', 3], ['e', 1]), true, 'Bishop makes legal move, down right');
runTest(board.makeMove(['c', 3], ['b', 4]), true, 'Bishop makes legal move, up left');
runTest(board.makeMove(['c', 3], ['a', 1]), true, 'Bishop makes legal move, down left');
runTest(board.makeMove(['c', 3], ['e', 5]), true, 'Bishop makes legal move, up right');
runTest(board.makeMove(['c', 3], ['h', 5]), false, 'Bishop makes illegal move, not diagonal');
runTest(board.makeMove(['c', 3], ['a', 5]), false, 'Bishop makes illegal move, cannot land on team piece');
runTest(board.makeMove(['c', 3], ['f', 6]), true, 'Bishop makes legal move, captures opponent');
runTest(board.makeMove(['c', 3], ['g', 7]), false, 'Bishop makes illlegal move, cannot jump over pieces');

runTest(board.makeMove(['c', 3], ['h', 4]), false, 'BISHOPS DO NOT MOVE THAT WAY');

runTest(board.makeMove(['d', 6], ['a', 6]), true, 'Rook makes legal move, left');
runTest(board.makeMove(['d', 6], ['d', 4]), true, 'Rook makes legal move, down');
runTest(board.makeMove(['d', 6], ['e', 6]), true, 'Rook makes legal move, right');
runTest(board.makeMove(['d', 6], ['d', 8]), true, 'Rook makes legal move, up');
runTest(board.makeMove(['d', 6], ['c', 2]), false, 'Rook makes illegal move, must move horizonal or vertical');
runTest(board.makeMove(['d', 6], ['f', 6]), false, 'Rook makes illegal move, cannot land on team piece');
runTest(board.makeMove(['d', 6], ['d', 3]), true, 'Rook makes legal move, captures opponent');
runTest(board.makeMove(['d', 6], ['d', 1]), false, 'Rook makes illegal move, cannot jump over pieces');

