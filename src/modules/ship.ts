export interface IShip {
  length: number;
  hull: boolean[];
  sunk: boolean;
}

export class Ship {
  #length: number;
  #hull: boolean[];
  #sunk: boolean;

  constructor(length: number) {
    this.#length = length;

    // false == not hit yet, true == hit
    this.#hull = [];
    while (this.#hull.length < length) {
      this.#hull.push(false);
    }

    this.#sunk = false;
  }

  hit(position: number) {
    this.#hull[position] = true;
    this.#checkIfSunk();
  }

  #checkIfSunk() {
    // ship can only be sunked, it can't be unsunked
    if (!this.hull.includes(false)) {
      this.#sunk = true;
    }
  }

  get length() {
    return this.#length;
  }
  get hull() {
    return this.#hull;
  }
  get sunk() {
    return this.#sunk;
  }
}
