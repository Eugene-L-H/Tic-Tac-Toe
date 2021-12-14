const boardChecker = () => {
  function tileRuns(r) {
    const aRow = r.slice(0, 3);
    const bRow = r.slice(3, 6);
    const cRow = r.slice(6, 9);
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
    for (let j = 0; j < 9; j++) {
      let pattern = winPatterns[j];

      if (pattern == 'XXX' || pattern == 'OOO') {
        console.log('WIN!');
        // Draw reveal proper blue line across win.
        break;
      }
      patternNo++; // Used to determine which win line to use.
    }

    return r;
  }

  return { tileRuns, checkForWin };
};

cpu.behavior = (turn) => {
  function determineMove() {}

  // Shortform for constant reference.
  const brd = gameboard.marked; // Board.
  const rand = cpu.random;

  let spot = 0; // Spot on board to be marked.

  // AI decisions.
  switch (turn) {
    case 0:
      // If player not on center square, pick center.
      if (brd[4] != 'X') {
        brd[4] = 'O'; // "O" on center square.
        spot = 4;
        // Pick corner.
      } else {
        spot = cpu.pickCorner();
      }
      break;
    default:
      // for (let i = 0; i < 9; i++) {}
      while (true) {}
  }

  cpu.addMarker(spot);
};
