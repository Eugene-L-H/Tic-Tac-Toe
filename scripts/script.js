const gameboard = (() => {
  const winLines = document.querySelectorAll('.line');
  const playArea = document.querySelectorAll('.tile');

  for (let i = 0; i < playArea.length; i++) {
    const tile = playArea[i];

    tile.addEventListener('click', (e) => {
      addX(e.target);
      gameboard.turn++;
      // Game over if board is full.
      boardChecker.outOfTurns(gameboard.turn);

      // CPU turn.
      cpu.behavior(gameboard.turn);

      // Determine if game should end due to 3 in a row.
      boardChecker.checkForWin();
    });
  }

  const squares = [
    {
      ['a0']: 0,
      ['b0']: 1,
      ['c0']: 2,
      ['a1']: 3,
      ['b1']: 4,
      ['c1']: 5,
      ['a2']: 6,
      ['b2']: 7,
      ['c2']: 8,
    },
  ];

  let marked = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

  let turn = 0;

  function clearBoard() {
    for (let i = 0; i < playArea.length; i++) {
      const tile = playArea[i];
      tile.innerHTML = '';
      tile.classList.remove('no-pointers');
      tile.classList.remove('red-tile');
      for (let i = 0; i < winLines.length; i++) {
        let line = winLines[i];
        line.classList.remove('show');
      }
    }

    gameboard.marked = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];
    gameboard.turn = 0;
  }

  return { winLines, playArea, squares, marked, turn, clearBoard };
})();
