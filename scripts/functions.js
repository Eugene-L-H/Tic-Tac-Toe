function addX(tile) {
  // Add marker to screen on tile clicked.
  tile.textContent = player.marker;

  let id = tile.id;
  console.log(id.slice(1));

  gameboard[id.slice(1)][0][id] = 'X';
  console.log(gameboard);
}
