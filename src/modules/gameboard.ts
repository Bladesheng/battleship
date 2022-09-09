import { Ship } from "./ship";

export interface Itile {
  shipInfo: IshipInfo;
  hit: boolean;
}

export interface IshipInfo {
  ship?: Ship;
  hullIndex?: number;
}

export class Gameboard {
  #board: Itile[][];

  constructor(width: number, height: number) {
    this.#board = [];

    // construct columns ("x" coordinates)
    for (let i = width; i > 0; i--) {
      // construct rows ("y" coordinates)
      const column: Itile[] = [];
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

  receiveAttack(tile: Itile) {
    tile.hit = true;

    // if there is a ship in the tile
    if (!this.isTileEmpty(tile)) {
      const hullIndex = tile.shipInfo.hullIndex;
      if (hullIndex !== undefined) {
        tile.shipInfo.ship?.hit(hullIndex);
      }
    }
  }

  isTileEmpty(tile: Itile) {
    return Object.keys(tile.shipInfo).length === 0;
  }

  // places a single part of hull
  placeHullPart(ship: Ship, hullIndex: number, tile: Itile) {
    const shipInfo = tile.shipInfo;

    shipInfo.ship = ship;
    shipInfo.hullIndex = hullIndex;
  }

  placeShip(
    ship: Ship,
    direction: "horizontal" | "vertical",
    xCoords: number,
    yCoords: number
  ) {
    function isValid(board: Itile[][], xCoords: number, yCoords: number) {
      // check if ship would be placed outside of board
      if (xCoords > board.length - 1 || yCoords > board[xCoords].length - 1) {
        throw new Error(
          "Gameboard Error: Ship would be placed outside of board"
        );
      }
    }

    const length = ship.length;

    // select the tiles where ship will be placed
    const tiles: Itile[] = [];
    for (let i = 0; i < length; i++) {
      if (direction === "horizontal") {
        isValid(this.#board, xCoords + i, yCoords);
        const tile = this.#board[xCoords + i][yCoords];
        tiles.push(tile);
      } else if (direction === "vertical") {
        isValid(this.#board, xCoords, yCoords + 1);
        const tile = this.#board[xCoords][yCoords + i];
        tiles.push(tile);
      }
    }

    // place all hull parts
    tiles.forEach((tile, hullIndex) => {
      this.placeHullPart(ship, hullIndex, tile);
    });
  }

  get board() {
    return this.#board;
  }
}
