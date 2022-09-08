interface tile {
  shipInfo: shipInfo | {};
  hit: boolean;
}

interface shipInfo {
  ship: object;
  hullIndex: number;
}

export class Gameboard {
  #board: tile[][];

  constructor(width: number, height: number) {
    this.#board = [];

    // construct columns ("x" coordinates)
    for (let i = width; i > 0; i--) {
      // construct rows ("y" coordinates)
      const column: tile[] = [];
      for (let i = height; i > 0; i--) {
        const emptyTile = {
          shipInfo: {},
          hit: false
        };

        column.push(emptyTile);
      }

      this.#board.push(column);
    }
  }

  get board() {
    return this.#board;
  }
}
