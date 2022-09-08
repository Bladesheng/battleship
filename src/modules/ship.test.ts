import { Ship } from "./ship";

test("Ship length", () => {
  const testShip = new Ship(3);
  expect(testShip.length).toBe(3);
});

test("Ship hull", () => {
  const testShip = new Ship(3);
  expect(testShip.hull).toEqual([0, 0, 0]);
});

test("Ship hit", () => {
  const testShip = new Ship(3);
  testShip.hit(1);
  expect(testShip.hull).toEqual([0, 1, 0]);
});

test("Ship is not sunk", () => {
  const testShip = new Ship(3);
  expect(testShip.sunk).toBe(false);

  testShip.hit(1);
  expect(testShip.sunk).toBe(false);

  testShip.hit(0);
  expect(testShip.sunk).toBe(false);
});

test("Ship is sunk", () => {
  const testShip = new Ship(3);

  // hit all hull parts
  testShip.hit(0);
  testShip.hit(1);
  testShip.hit(2);

  expect(testShip.sunk).toBe(true);
});
