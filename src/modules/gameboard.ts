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

  get board() {
    return this.#board;
  }
}
