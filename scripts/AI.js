const boardChecker = (() => {
  function tileRuns(r) {
    const aRow = r.slice(0, 3).join('');
    const bRow = r.slice(3, 6).join('');
    const cRow = r.slice(6, 9).join('');
    const zeroCol = r[0] + r[3] + r[6];
    const oneCol = r[1] + r[4] + r[7];
    const twoCol = r[2] + r[5] + r[8];
    const diagonal1 = r[0] + r[4] + r[8];
    const diagonal2 = r[6] + r[4] + r[2];

    const gameRuns = [
      aRow,
      bRow,
      cRow,
      zeroCol,
      oneCol,
      twoCol,
      diagonal1,
      diagonal2,
    ];

    return gameRuns;
  }

  function checkForWin() {
    let results = '';

    for (let i = 0; i < 9; i++) {
      let tile = gameboard.marker[i];
      // Return gameboard.marker array converted to string.
      results += tile;
    }

    winPatterns = boardChecker.tileRuns(r);

    let patternNo = 0;
    for (let j = 0; j < 8; j++) {
      let pattern = winPatterns[j];

      if (pattern == 'XXX' || pattern == 'OOO') {
        console.log('WIN!');
        // Draw reveal proper blue line across win.
        break;
      }
      patternNo++; // Used to determine which win line to use.
    }

    return results;
  }

  return { tileRuns, checkForWin };
})();

cpu.behavior = (turn) => {
  // Shortform for constant reference.
  const board = gameboard.marked; // Board.
  const rand = cpu.random;

  let spot = 0; // Spot on board to be marked.

  // AI decisions.
  if (turn == 0) {
    // If player not on center square, pick center.
    if (board[4] != 'X') {
      board[4] = 'O'; // "O" on center square.
      spot = 4;
      // Pick corner.
    } else {
      spot = cpu.pickCorner();
    }
  } else {
    const boardStatus = boardChecker.tileRuns(gameboard.marked);
    let index = 0;
    for (let i = 0; i < 8; i++) {
      let check = boardStatus[i];
      console.log(check);
      if (check == '-XX') {
        let row = [0, 3, 6, 0, 1, 2, 0, 6];

        spot = row[index];
        board[spot] = 'O';
        cpu.addMarker(spot);
        return;
      } else if (check == 'XX-') {
        let row = [2, 5, 8, 6, 7, 8, 8, 2];

        spot = row[index];
        board[spot] = 'O';
        cpu.addMarker(spot);
        return;
      } else if (check == 'X-X') {
        let row = [1, 4, 7, 3, 4, 5, 4, 4];

        spot = row[index];

        board[spot] = 'O';
        cpu.addMarker(spot);
        return;
      }
      index++;
    }
    let markedIndex = 0;
    for (let j = 0; j < 8; j++) {
      let emptySpace = board[j];
      if (emptySpace == '-') {
        spot = markedIndex;
      }
      markedIndex++;
    }
  }
  gameboard.marked[spot] = 'O';
  cpu.addMarker(spot);
};
