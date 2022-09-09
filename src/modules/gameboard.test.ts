import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("Create empty 10x10 board", () => {
  const testBoard = new Gameboard(10, 10);

  const tile = {
    shipInfo: {},
    hit: false
  };

  expect(testBoard.board).toEqual([
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile],
    [tile, tile, tile, tile, tile, tile, tile, tile, tile, tile]
  ]);
});

test("Create empty 3x3 board", () => {
  const testBoard = new Gameboard(3, 3);

  const tile = {
    shipInfo: {},
    hit: false
  };

  expect(testBoard.board).toEqual([
    [tile, tile, tile],
    [tile, tile, tile],
    [tile, tile, tile]
  ]);
});

test("Check if tile is empty", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][0];

  // new board should be empty
  expect(testBoard.isTileEmpty(tile)).toBe(true);
});

test("Shoot at empty tile", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][2];

  testBoard.receiveAttack(tile);

  // the targeted tile should be hit
  expect(testBoard.board[1][2].hit).toBe(true);

  // other tiles shouldn't be hit
  expect(testBoard.board[1][1].hit).toBe(false);
});

test("Manually place a 1x1 ship", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][2];

  const testShip = new Ship(1);
  testBoard.placeHullPart(testShip, 0, tile);

  // the tile is not empty because the ship is there
  expect(testBoard.isTileEmpty(tile)).toBe(false);
});

test("Sink 1x1 ship", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][2];

  const testShip = new Ship(1);
  testBoard.placeHullPart(testShip, 0, tile);

  testBoard.receiveAttack(tile);

  // the 1x1 ship should be sunk after being hit
  expect(tile.shipInfo.ship?.sunk).toBe(true);
});

test("Place 2x1 ship horizontally", () => {
  const testBoard = new Gameboard(3, 3);
  const tile1 = testBoard.board[1][2];
  const tile2 = testBoard.board[2][2];

  const testShip = new Ship(2);
  testBoard.placeShip(testShip, "horizontal", 1, 2);

  // the tiles are not empty because the ship is there
  expect(testBoard.isTileEmpty(tile1)).toBe(false);
  expect(testBoard.isTileEmpty(tile2)).toBe(false);
});

test("Place 2x1 ship vertically", () => {
  const testBoard = new Gameboard(3, 3);
  const tile1 = testBoard.board[1][1];
  const tile2 = testBoard.board[1][2];

  const testShip = new Ship(2);
  testBoard.placeShip(testShip, "vertical", 1, 1);

  // the tiles are not empty because the ship is there
  expect(testBoard.isTileEmpty(tile1)).toBe(false);
  expect(testBoard.isTileEmpty(tile2)).toBe(false);
});

test("Shoot at 2x1 ship", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][2];

  const testShip = new Ship(2);
  testBoard.placeShip(testShip, "horizontal", 1, 2);

  testBoard.receiveAttack(tile);

  // the ship shouldn't be sunk after taking 1 hit
  expect(tile.shipInfo.ship?.sunk).toBe(false);
});

test("Sink 2x1 ship", () => {
  const testBoard = new Gameboard(3, 3);
  const tile1 = testBoard.board[1][2];
  const tile2 = testBoard.board[2][2];

  const testShip = new Ship(2);
  testBoard.placeShip(testShip, "horizontal", 1, 2);

  testBoard.receiveAttack(tile1);
  testBoard.receiveAttack(tile2);

  // the ship should be sunk after taking 2 hits
  expect(tile1.shipInfo.ship?.sunk).toBe(true);
});

test("Try to place 2x1 ship at invalid location - outside of board", () => {
  const testBoard = new Gameboard(3, 3);

  const testShip = new Ship(2);

  const errorMsg = "Gameboard Error: Ship would be placed outside of board";

  // part of ship would be outside of board
  expect(() => {
    testBoard.placeShip(testShip, "horizontal", 2, 2);
  }).toThrow(errorMsg);

  // part of ship would be outside of board
  expect(() => {
    testBoard.placeShip(testShip, "vertical", 2, 2);
  }).toThrow(errorMsg);

  // the whole ship would be outside of board
  expect(() => {
    testBoard.placeShip(testShip, "horizontal", 69, 69);
  }).toThrow(errorMsg);
});

test("Try to place 2 different ships over each other", () => {
  const testBoard = new Gameboard(3, 3);

  const testShip1 = new Ship(2);
  const testShip2 = new Ship(2);

  testBoard.placeShip(testShip1, "horizontal", 1, 1);

  const errorMsg =
    "Gameboard Error: Another ship is already placed at that location";

  expect(() => {
    testBoard.placeShip(testShip2, "horizontal", 1, 1);
  }).toThrow(errorMsg);
});

test("Add ship to shiplist", () => {
  const testBoard = new Gameboard(3, 3);

  const testShip = new Ship(2);

  testBoard.placeShip(testShip, "horizontal", 1, 1);

  expect(testBoard.shipList).toContain(testShip);
});

test("Check if all ships are sunk", () => {
  const testBoard = new Gameboard(3, 3);

  const tile1 = testBoard.board[1][1];
  const tile2 = testBoard.board[1][2];

  const testShip1 = new Ship(1);
  const testShip2 = new Ship(1);

  testBoard.placeShip(testShip1, "horizontal", 1, 1);
  testBoard.placeShip(testShip2, "horizontal", 1, 2);

  expect(testBoard.checkIfAllSunk()).toBe(false); // nothing is sunk yet

  testBoard.receiveAttack(tile1);
  expect(testBoard.checkIfAllSunk()).toBe(false); // ship 1 is sunk, but ship 2 is ok

  testBoard.receiveAttack(tile2);
  expect(testBoard.checkIfAllSunk()).toBe(true); // both ships are sunk
});
