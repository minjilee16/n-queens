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
  

var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
};


window.findNRooksSolution = function(n) {
  
  var matrix = makeEmptyMatrix(n);
// console.log('matrix 1', matrix);
  var board = new Board(matrix);
  
  // matrix[0][0] = 1; 
  // if ( n === 1 ) {
  //   var newthing = new Board({n: n});
  //   return newthing.rows();
  // }


  var recursion = function(row, col) {
    for ( var i = row; i < n; i ++) {
      for ( var j = col; j < n; j++) {
        board.togglePiece(i, j); 
        if ( board.hasAnyRooksConflicts() ) {
          board.togglePiece(i, j); 
        } else if ( !board.hasAnyRooksConflicts()) {
          return recursion(i + 1, j + 1);  
        }
      } 
    }
  };
  
  recursion(0, 0);
// console.log('board:', board );
  // togglePiece: function(rowIndex, colIndex) {
  //     this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
  //     this.trigger('change');
  // },


  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return board.rows();
};






// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
