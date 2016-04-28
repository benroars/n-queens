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

var calcInvalidSpotsRooks = function(rowIndex, colIndex, n, obj) {
  // cancel out columns
  for (var i = 0; i < n; i++) {
    if (obj[i].indexOf(colIndex) === -1) {
      obj[i].push(colIndex);
    }
  }
  // cancel out rows
  for (var i = 0; i < n; i++) {
    if (obj[rowIndex].indexOf(i) === -1) {
      obj[rowIndex].push(i);
    }
  }
  return obj;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var badIndexObj = {};
 
  var populateObj = function(obj) {
    for (var i = 0; i < n; i++) {
      obj[i] = [];
    }
    return obj;
  };
  badIndexObj = populateObj(badIndexObj);
  
  if (n < 2) {
    return 1;
  }

  var helper = function(boardRowLength, currRow) {
    for (var i = 0; i < boardRowLength; i++) {
      //debugger;
      if (badIndexObj[currRow] !== undefined) {
        if (badIndexObj[currRow].indexOf(i) === -1 && currRow !== finalRow) {
          var copy = JSON.parse(JSON.stringify(badIndexObj));
          calcInvalidSpotsRooks(currRow, i, n, badIndexObj);
          helper(boardRowLength, currRow + 1);
          badIndexObj = JSON.parse(JSON.stringify(copy));
        } else if (badIndexObj[currRow].indexOf(i) === -1 && currRow === finalRow) {
          solutionCount++;
        } else if (badIndexObj[currRow].length === n && currRow !== finalRow) {
          return;
        } else if (badIndexObj[currRow].length === n && currRow === finalRow) {
          return;
        }
      }
    }
  };

  var currRow = 1;
  var finalRow = n - 1;
  for (var i = 0; i < n; i++) {
    calcInvalidSpotsRooks(0, i, n, badIndexObj);    
    helper(n, currRow);
    badIndexObj = populateObj(badIndexObj);
  }

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

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

var calcInvalidSpots = function(rowIndex, colIndex, n, obj) {
  // cancel out columns
  for (var i = 0; i < n; i++) {
    if (obj[i].indexOf(colIndex) === -1) {
      obj[i].push(colIndex);
    }
  }
  // cancel out rows
  for (var i = 0; i < n; i++) {
    if (obj[rowIndex].indexOf(i) === -1) {
      obj[rowIndex].push(i);
    }
  }
  // cancel out diags
  var colLeft = colIndex;
  var colRight = colIndex;
  for (var i = rowIndex; i < n; i++) {
    if (obj[i + 1] !== undefined) {
      (colRight + 1 >= 0 && colRight + 1 < n && obj[i + 1].indexOf(colRight + 1) === -1) ? obj[i + 1].push(colRight + 1) : colRight;
      (colLeft - 1 >= 0 && colLeft - 1 < n && obj[i + 1].indexOf(colLeft - 1) === -1) ? obj[i + 1].push(colLeft - 1) : colLeft;
      colLeft--;
      colRight++;
    }
  }
  colLeft = colIndex;
  colRight = colIndex;
  for (var i = rowIndex; i > 0; i--) {
    if (obj[i - 1] !== undefined) {
      (colRight + 1 >= 0 && colRight + 1 < n && obj[i - 1].indexOf(colRight + 1) === -1) ? obj[i - 1].push(colRight + 1) : colRight;
      (colLeft - 1 >= 0 && colLeft - 1 < n && obj[i - 1].indexOf(colLeft - 1) === -1) ? obj[i - 1].push(colLeft - 1) : colLeft;
      colLeft--;
      colRight++;
    }
  }

  obj[rowIndex].splice(obj[rowIndex].indexOf(colIndex), 1);

  return obj;
};

window.findNQueensSolution = function(n) {
  var solution = createBoard(n);
  var badIndexObj = {};
  var solutionObj = {};
 
  var populateObj = function(obj) {
    for (var i = 0; i < n; i++) {
      obj[i] = [];
    }
    return obj;
  };
  debugger;
  badIndexObj = populateObj(badIndexObj);

  var sum = 0;
  for (var i = 0; i < n; i++) {
    sum += i;
  }
  
  if ( n === 0) {
    return [];
  }
  if (n === 1) {
    return [[1]];
  }

  var finished = false;

  var helper = function(boardRowLength, currRow) {
    if (!finished) {
      for (var i = 0; i < boardRowLength; i++) {
        if (badIndexObj[currRow] !== undefined) {
          if (badIndexObj[currRow].indexOf(i) === -1 && currRow !== finalRow) {
            var copy = JSON.parse(JSON.stringify(badIndexObj));
            calcInvalidSpots(currRow, i, n, badIndexObj);
            helper(boardRowLength, currRow + 1);
            badIndexObj = JSON.parse(JSON.stringify(copy));
          } else if (badIndexObj[currRow].indexOf(i) === -1 && currRow === finalRow) {
            for (var key in badIndexObj) {
              solutionObj[key] = sum - badIndexObj[key].reduce(function(a, b) { return a + b; });
            }
            for (var keys in solutionObj) {
              solution[keys][solutionObj[keys]] = 1;
            }
            finished = true;
            return solution;
          } else if (badIndexObj[currRow].length === n && currRow !== finalRow) {
            return;
          } else if (badIndexObj[currRow].length === n && currRow === finalRow) {
            return;
          }
        }
      }
    }
  };

  var currRow = 1;
  var finalRow = n - 1;
  for (var i = 0; i < n; i++) {
    calcInvalidSpots(0, i, n, badIndexObj);
    helper(n, currRow);
    badIndexObj = populateObj(badIndexObj);
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

//generates all diagonals from a certain point and adds to obj; 
var calculateInvalidSpots = function(rowIndex, colIndex, n, obj) {
  // cancel out columns
  for (var i = 0; i < n; i++) {
    if (obj[i].indexOf(colIndex) === -1) {
      obj[i].push(colIndex);
    }
  }
  // cancel out rows
  for (var i = 0; i < n; i++) {
    if (obj[rowIndex].indexOf(i) === -1) {
      obj[rowIndex].push(i);
    }
  }
  // cancel out diags
  var colLeft = colIndex;
  var colRight = colIndex;
  for (var i = rowIndex; i < n; i++) {
    if (obj[i + 1] !== undefined) {
      (colRight + 1 >= 0 && colRight + 1 < n && obj[i + 1].indexOf(colRight + 1) === -1) ? obj[i + 1].push(colRight + 1) : colRight;
      (colLeft - 1 >= 0 && colLeft - 1 < n && obj[i + 1].indexOf(colLeft - 1) === -1) ? obj[i + 1].push(colLeft - 1) : colLeft;
      colLeft--;
      colRight++;
    }
  }
  colLeft = colIndex;
  colRight = colIndex;
  for (var i = rowIndex; i > 0; i--) {
    if (obj[i - 1] !== undefined) {
      (colRight + 1 >= 0 && colRight + 1 < n && obj[i - 1].indexOf(colRight + 1) === -1) ? obj[i - 1].push(colRight + 1) : colRight;
      (colLeft - 1 >= 0 && colLeft - 1 < n && obj[i - 1].indexOf(colLeft - 1) === -1) ? obj[i - 1].push(colLeft - 1) : colLeft;
      colLeft--;
      colRight++;
    }
  }
  return obj;
};


window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var badIndexObj = {};
 
  var populateObj = function(obj) {
    for (var i = 0; i < n; i++) {
      obj[i] = [];
    }
    return obj;
  };
  badIndexObj = populateObj(badIndexObj);
  
  if (n < 2) {
    return 1;
  }

  var helper = function(boardRowLength, currRow) {
    for (var i = 0; i < boardRowLength; i++) {
      //debugger;
      if (badIndexObj[currRow] !== undefined) {
        if (badIndexObj[currRow].indexOf(i) === -1 && currRow !== finalRow) {
          var copy = JSON.parse(JSON.stringify(badIndexObj));
          calculateInvalidSpots(currRow, i, n, badIndexObj);
          helper(boardRowLength, currRow + 1);
          badIndexObj = JSON.parse(JSON.stringify(copy));
        } else if (badIndexObj[currRow].indexOf(i) === -1 && currRow === finalRow) {
          solutionCount++;
        } else if (badIndexObj[currRow].length === n && currRow !== finalRow) {
          return;
        } else if (badIndexObj[currRow].length === n && currRow === finalRow) {
          return;
        }
      }
    }
  };

  var currRow = 1;
  var finalRow = n - 1;
  for (var i = 0; i < n; i++) {
    calculateInvalidSpots(0, i, n, badIndexObj);    
    helper(n, currRow);
    badIndexObj = populateObj(badIndexObj);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
