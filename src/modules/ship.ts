export class Ship {
  #length: number;
  #hull: number[];
  #sunk: boolean;

  constructor(length: number) {
    this.#length = length;

    this.#hull = [];
    for (let i = 0; i < length; i++) {
      this.#hull.push(0);
    }

    this.#sunk = false;
  }

  hit(position: number) {
    this.#hull[position] = 1;
    this.#checkIfSunk();
  }

  #checkIfSunk() {
    // ship can only be sunked, it can't be unsunked
    if (!this.hull.includes(0)) {
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
