// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      // params an object 
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
            // params { n :  }
        this.set(makeEmptyMatrix(this.get('n')));
        // console.log('this set:',this.set(makeEmptyMatrix(this.get('n'))));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        // n 
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var conflictComparisonArray = [];
      var row = this.rows()[rowIndex];
      row.forEach(function(column, index, array) {
        if (column === 1) { 
          conflictComparisonArray.push(column);
        }
      });
      if (conflictComparisonArray.length > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflict      s
    hasAnyRowConflicts: function() {
      var conflictComparisonArray = [[], [], [], []];
      var row = this.rows();
        
      for ( var i = 0; i < row.length; i++ ) {
        for ( var k = 0; k < row[i].length; k++ ) {
          if ( row[i][k] === 1 ) {
            conflictComparisonArray[i].push(row[i][k]);
          }
        }
      }
      for (var x = 0; x < conflictComparisonArray.length; x++) {
        if ( conflictComparisonArray[x].length > 1 ) {
          return true; 
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {

      var matrix = this.rows();
      var colConflictComparison = [];
      
      for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][colIndex] === 1) {
          colConflictComparison.push(matrix[i][colIndex]);
        } 
      }
      if (colConflictComparison.length > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // var hasConflicts = false; 
      var matrix = this.rows(); 
      var colConflictComparison = [[], [], [], []];
      for (var i = 0; i < matrix.length; i++ ) {
        for ( var j = 0; j < matrix[i].length; j++) {
          colConflictComparison[j].push( matrix[i][j] ); 
        }
      }
      var possibleConflictsArray = [[], [], [], []]; 
      for ( var x = 0; x < colConflictComparison.length; x++ ) {
        for ( var y = 0; y < colConflictComparison[x].length; y++) {
          if ( colConflictComparison[x][y] === 1 ) {
            possibleConflictsArray[x].push(colConflictComparison[x][y]);
          }
        }
      }
      for ( var x = 0; x < possibleConflictsArray.length; x ++ ) {
        if ( possibleConflictsArray[x].length > 1 ) {
          return true; 
        }
      }
      return false; 
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
// console.log('majorDiagonalColumnIndexAtFirstRow' , majorDiagonalColumnIndexAtFirstRow); 
// _getFirstRowColumnIndexForMajorDiagonalOn
      var rows = this.rows();
      var count = 0; 
      for ( var i = 0; i < rows.length; i++ ) {
        if ( rows[i][i + majorDiagonalColumnIndexAtFirstRow] === 1 ) {
          count++;
        }
      }  
      if (count > 1) {
        return true;
      }
      return false; 
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rows = this.rows();
      var count = 0; 
      for ( var i = -3; i < rows.length; i++ ) {
        if ( this.hasMajorDiagonalConflictAt(i) ) {
          return true;
        }
      }      
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
/*    


    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },




*/
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    // console.log(minorDiagonalColumnIndexAtFirstRow, "majorDiagonalColumnIndexAtFirstRow");
      var rows = this.rows();
      var count = 0; 
     
//go through every array starting from the bottom
//go through every item in the array
  //if the result of helper function is the same as the minorDiagonalColumnIndexAtFirstRow variable passed in, THEN
   //check if that box has a 1,
   //add one to the count

      for (var i = rows.length -1; i >= 0; i-- ) {
        for (var j = 0; j < rows[i].length; j++) {
           // console.log('getFirstRowColumnIndexForMinorDiagonalOn(i' +i +',j'+j+'', this._getFirstRowColumnIndexForMinorDiagonalOn(i,j), "minorDiagonalColumnIndexAtFirstRow:",minorDiagonalColumnIndexAtFirstRow);
           if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow ) {
             if (rows[i][j] === 1) {
               count++;
             }
           }         
        }
      }
      if (count > 1) {
        // console.log('has a minor conflict, we counted:', count);
        return true;
      }
      // console.log('false, we did not find minor conflict. counted:', count);
      return false; // fixme
    },


    hasAnyMinorDiagonalConflicts: function() {
      var rows = this.rows();
      var count = 0; 
      for ( var i = 6; i >= 0; i--) {
 
         
        if ( this.hasMinorDiagonalConflictAt(i) ) {
          return true;
        }
      }      
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };
// create array of array 
// n ???? 

}());
