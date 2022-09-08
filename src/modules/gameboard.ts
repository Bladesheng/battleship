import { IShip } from "./ship";

export interface Itile {
  shipInfo: IshipInfo;
  hit: boolean;
}

export interface IshipInfo {
  ship?: IShip;
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

  receiveAttack(xCoords: number, yCoords: number) {
    this.#board[xCoords][yCoords].hit = true;
  }

  isTileEmpty(tile: Itile) {
    return Object.keys(tile.shipInfo).length === 0;
  }

  // places a single part of hull
  placeHullPart(ship: IShip, hullIndex: number, tile: Itile) {
    const shipInfo = tile.shipInfo;

    shipInfo.ship = ship;
    shipInfo.hullIndex = hullIndex;
  }

  get board() {
    return this.#board;
  }
}
