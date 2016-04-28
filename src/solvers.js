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

var isInBounds = function(rowIndex, colIndex, n) {
  return (
    0 <= rowIndex && rowIndex < n &&
    0 <= colIndex && colIndex < n
  );
};

var hasMajorDiagonalConflictAt = function(majorDiagonalColumnIndexAtFirstRow, arr) {
  var diagIndex = 1;
  var conflict = 0;
  if (arr[0][majorDiagonalColumnIndexAtFirstRow] === 1) {
    conflict += 1;
  }
  for (var i = majorDiagonalColumnIndexAtFirstRow; i < arr.length; i++) {
    if (isInBounds(diagIndex, i + 1, arr.length) && arr[diagIndex][i + 1] === 1) {
      //return true;
      conflict += 1;
      diagIndex += 1;
    } else { 
      diagIndex += 1;
    }
  }
  
  return conflict >= 2 ? true : false;
};

var hasAnyMajorDiagonalConflicts = function(arr) {
  debugger;
  if (arr === undefined || arr.length === 0) {
    return false;
  }

  for (var i = (arr.length * -1) + 1; i < arr.length; i++) {
    if (hasMajorDiagonalConflictAt(i, arr)) {
      return true;
    }
  }
  debugger;
  return false;
};

var hasMinorDiagonalConflictAt = function(givenColumn, arr) {
  //debugger;
  //startRowIndex = startRowIndex || 0;
  var currentCol = givenColumn;
  var currentRow = 0;
  var count = 0;
  while (currentCol >= 0) {
    if (isInBounds(currentRow, currentCol, arr.length) && arr[currentRow][currentCol] === 1) {
      count++;
      if (count > 1) {
        return true;
      }
    }
    currentCol--;
    currentRow++;
  }

  return false;
};

var hasAnyMinorDiagonalConflicts = function(arr) {
  debugger;
  for (var i = 0; i < arr.length + arr.length - 1; i++) {
    if (hasMinorDiagonalConflictAt(i, arr)) {
      return true;
    }
  }
  debugger;
  return false;
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
  // var solutionCount = 0;

  // //var board = createBoard(n);
  // var finalRow = n - 1;
  
  // if (n === 1) {
  //   return 1;
  // }

  // var helper = function(boardRowLength, currRow, colArr) {
  //   // start at row 1 and go until row n
  //   // at each row, go through each column in the row
  //     // if it 
  //   debugger;
  //   console.log('colArr: ' + colArr);
  //   for (var i = 0; i < boardRowLength; i++) {
  //     if (colArr.indexOf(i) === -1 && currRow !== finalRow) {
  //       colArr.push(i);
  //       helper(boardRowLength, currRow + 1, colArr);
  //       colArr.splice(colArr.length - 1, 1);
  //     } else if (colArr.indexOf(i) === -1 && currRow === finalRow) {
  //       solutionCount += 1;
  //     } 
  //   }
  // };

  // var currRow = 1;

  // for (var i = 0; i < n; i++) {
  //   var colArr = [];
  //   colArr.push(i);
  //   helper(n, currRow, colArr);
  // }

  // //start at row 1 and loop to n
  // //for each other row check each column index and see if it passes
  // //if it does go to the next row and check those
  // //then recurse back to check the columns from the previous row
  // //if its the last row, and you find a good column index, then solutionCount gets incremented.

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = createBoard(n);

  if (n === 0) {
    return solution;
  }

//  debugger;
  //solution[0][1] = 1;

  var checkSol = function(arr) {
    var count = 0;
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        debugger;
        solution[i][j] = 1;
        count++;
        if (hasRowConflictAt(i, solution) || hasColConflictAt(j, solution) || hasAnyMinorDiagonalConflicts(solution) || hasAnyMajorDiagonalConflicts(solution)) {
          solution[i][j] = 0;
          count--;
        }
      }
    }

    return count;
  };

  for (var i = 0; i < n; i++) {
    solution[0][i] = 1;
    if (checkSol(solution) === n) {
      return solution;
    } else {
      solution = createBoard(n);
    }
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined;
  var solutionBoards = [];


  //   for (var i = 0; i < boardRowLength; i++) {
  //     if (colArr.indexOf(i) === -1 && currRow !== finalRow) {
  //       colArr.push(i);
  //       helper(boardRowLength, currRow + 1, colArr);
  //       colArr.splice(colArr.length - 1, 1);
  //     } else if (colArr.indexOf(i) === -1 && currRow === finalRow) {
  //       solutionCount += 1;
  //     } 
  //   }
  // };

  // var currRow = 1;

  // for (var i = 0; i < n; i++) {
  //   var colArr = [];
  //   colArr.push(i);
  //   helper(n, currRow, colArr);
  // }


  // create board to store solution in
  // set row 0, col i = 1
  // go down each row and do the following until you hit the last row
    // go through each column and check to see if it passes the conflict tests until you hit the last column
      // if it passes the conflict tests, then set it equal to 1 and call helper function recursively with current array
      // if not, keep going down columns


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
