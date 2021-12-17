const gameboard = (() => {
  const playArea = document.querySelectorAll('.tile');

  for (let i = 0; i < playArea.length; i++) {
    const tile = playArea[i];

    tile.addEventListener('click', (e) => {
      addX(e.target);
      // CPU turn.
      cpu.behavior(gameboard.turn);
      // checkForWin(gameboard.marked);
      gameboard.turn++;
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

  const turn = 0;

  return { squares, marked, turn };
})();
