function createPlayer(name, marker) {
  let o = new Object();
  o.name = name;
  o.marker = marker;

  return o;
}

let player = createPlayer('player', 'X');

// Add marker to screen on tile clicked.
function addX(tile) {
  tile.textContent = player.marker;

  // Once marked, tile can not be clicked on.
  tile.classList.add('no-pointers');

  const id = tile.id;

  // Inside squares, inside object, id is the key.
  const position = gameboard.squares[0][id];

  gameboard.marked[position] = 'X';
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

// CPU functionalities.
let cpu = createPlayer('CPU', 'O');

cpu.random = (num) => {
  return Math.floor(Math.random() * num);
};

cpu.addMarker = (spot) => {
  setTimeout(() => {
    const tileID = getKeyByValue(gameboard.squares[0], spot);

    let markedTile = document.querySelector(`#${tileID}`);
    markedTile.classList.add('red-tile');
    markedTile.classList.add('no-pointers');
    markedTile.textContent = cpu.marker;
  }, (cpu.random(1) + 1) * 1000);
};

cpu.pickCorner = () => {
  const corners = [0, 2, 6, 8]; // Corner positions

  while (true) {
    let spot = corners[cpu.random(3)];
    if (gameboard.marked[spot] != '-') {
      continue;
    }
    gameboard.marked[spot] = 'O';
    return spot;
  }
};
