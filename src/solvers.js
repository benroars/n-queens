/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

var hasRowConflictAt = function (rowIndex, arr) {
  var conflict = 0;

  if (arr === undefined || arr.length === 0) {
    return false;
  }
  for (var i = 0; i < arr[rowIndex].length; i++) {
    if (arr[rowIndex][i] === 1) {
      conflict += 1;
    }
  }
  return conflict >= 2 ? true : false;
};

var hasColConflictAt = function (colIndex, arr) {
  if (arr === undefined || arr.length === 0) {
    return false;
  }
  var conflict = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][colIndex] === 1) {
      conflict += 1;
    }
  }
  return conflict >= 2 ? true : false;
};

var createBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    var temp = [];
    for (var j = 0; j < n; j++) {
      temp.push(0);
    }
    board.push(temp);
  }
  return board;
};

window.findNRooksSolution = function(n) {
  var solution = createBoard(n);

  solution[0][0] = 1;

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution[i][j] = 1;
      if (hasRowConflictAt(i, solution) || hasColConflictAt(j, solution)) {
        solution[i][j] = 0;
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined;

  var board = createBoard(n);
  for (var i = 0; i < n; i++) {
    board[0][i] = 1;

  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
