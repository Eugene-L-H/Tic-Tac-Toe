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
    winPatterns = boardChecker.tileRuns(gameboard.marked);

    for (let i = 0; i < 8; i++) {
      let showLine = () => {
        gameboard.winLines[i].classList.add('show'), 1000;
      };
      let pattern = winPatterns[i];
      if (pattern == 'XXX' || pattern == 'OOO') {
        // Reveal blue line across win.
        document.querySelector('.wrapper').classList.add('no-pointers'); 
        setTimeout(showLine, 1500);
        setTimeout(gameboard.clearBoard, 3000);
        setTimeout(() => { return }, 3000);
      }
    }
  }

  // Resets the game after short delay.
  function outOfTurns(turn) {
    if (turn == 5) {
      setTimeout(gameboard.clearBoard, 2000);
      gameboard.turn = 0;
      return;
    }
  }

  return { tileRuns, checkForWin, outOfTurns };
})();

// AI opponent behavior.
cpu.behavior = (turn) => {
  // Will handle inserting markers into marked array and inserting to the DOM.
  function insertMark(index, spots) {
    spot = spots[index];
    gameboard.marked[spot] = 'O';
    cpu.addMarker(spot);
    return;
  }

  function insertMark2(spot) {
    gameboard.marked[spot] = 'O';
    cpu.addMarker(spot);
  }

  // Do not place marker if game is over.
  if (turn == 0) {
    return;
  }

  // Place marker in random spot to simulate fallibility.
  let randomCPU = cpu.random(3);
  console.log(randomCPU);
  if (randomCPU === 2) {
    for (let h = 0; h < 8; h++) {
      let check = gameboard.marked[h];
      
      if (check === '-') {
        insertMark2(h);
        cpu.addMarker(h);
        return;
      }
    }
  }

  // Shortform for constant reference.
  const board = gameboard.marked; // Board.

  let spot = 0; // Spot on board to be marked.

  // AI decisions.
  if (turn == 1) {
    // If player not on center square, pick center.
    if (board[4] != 'X') {
      board[4] = 'O'; // "O" on center square.
      spot = 4;
      // Pick corner.
    } else {
      spot = cpu.pickCorner();
    }
  } else {
    // Get current status of gameboard
    const boardStatus = boardChecker.tileRuns(board);

    // Looking for the win.
    for (let i = 0; i < 8; i++) {
      let check = boardStatus[i];

      switch (check) {
        case '-OO':
          insertMark(i, [0, 3, 6, 0, 1, 2, 0, 6]);
          return;
        case 'OO-':
          insertMark(i, [2, 5, 8, 6, 7, 8, 8, 2]);
          return;
        case 'O-O':
          insertMark(i, [1, 4, 7, 3, 4, 5, 4, 4]);
          return;
      }
    }

    // For defense against X.
    for (let j = 0; j < 8; j++) {
      check = boardStatus[j];

      switch (check) {
        case '-XX':
          insertMark(j, [0, 3, 6, 0, 1, 2, 0, 6]);
          return;
        case 'XX-':
          insertMark(j, [2, 5, 8, 6, 7, 8, 8, 2]);
          return;
        case 'X-X':
          insertMark(j, [1, 4, 7, 3, 4, 5, 4, 4]);
          return;
      }
    }

    // Lone zero in the middle of a row after no runs found.
    for (let k = 0; k < 8; k++) {
      check = boardStatus[k];
      if (check == '-O-') {
        let side = cpu.random(2);
        switch (k) {
          case 0:
            side == 1 ? insertMark2(0) : insertMark2(2);
            return;
          case 1:
            side == 1 ? insertMark2(3) : insertMark2(5);
            return;
          case 2:
            side == 1 ? insertMark2(6) : insertMark2(8);
            return;
          case 3:
            side == 1 ? insertMark2(0) : insertMark2(6);
            return;
          case 4:
            side == 1 ? insertMark2(1) : insertMark2(7);
            return;
          case 5:
            side == 1 ? insertMark2(2) : insertMark2(8);
            return;
          case 6:
            side == 1 ? insertMark2(0) : insertMark2(8);
            return;
          case 7:
            side == 1 ? insertMark2(6) : insertMark2(2);
            return;
        }
      }
    }

    // If no runs are found.
    for (let k = 0; k < 8; k++) {
      let emptySpace = board[k];
      if (emptySpace == '-') {
        spot = k;
      }
    }
  }
  gameboard.marked[spot] = 'O';
  cpu.addMarker(spot);
};
