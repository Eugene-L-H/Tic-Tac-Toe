const gameboard = (() => {
  const playArea = document.querySelectorAll('.tile');

  for (let i = 0; i < playArea.length; i++) {
    let tile = playArea[i];

    tile.addEventListener('click', (e) => {
      addX(e.target);
      // opponentPlay();
      // checkForWin();
    });
  }

  let marked = [
    [{ ['a0']: '', ['b0']: '', ['c0']: '' }],
    [{ ['a1']: '', ['b1']: '', ['c1']: '' }],
    [{ ['a2']: '', ['b2']: '', ['c2']: '' }],
  ];

  return marked;
})();

function createPlayer(name, marker) {
  let o = new Object();
  o.name = name;
  o.marker = marker;

  return o;
}

let player = createPlayer('player', 'X');
let cpu = createPlayer('CPU', 'O');
