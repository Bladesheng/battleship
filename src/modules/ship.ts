export class Ship {
  length: number;
  hull: number[] = [];

  constructor(length: number) {
    this.length = length;

    for (let i = 0; i < length; i++) {
      this.hull.push(0);
    }
  }

  hit(position: number) {
    this.hull[position] = 1;
  }

  isSunk() {
    return !this.hull.includes(0);
  }
}
