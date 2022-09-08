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

test("Shoot at empty tile", () => {
  const testBoard = new Gameboard(3, 3);

  testBoard.receiveAttack(1, 2);

  // the targeted tile should be hit
  expect(testBoard.board[1][2].hit).toBe(true);

  // other tiles shouldn't be hit
  expect(testBoard.board[1][1].hit).toBe(false);
});

test("Check if tile is empty", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][0];

  // new board should be empty
  expect(testBoard.isTileEmpty(tile)).toBe(true);
});

test("Manually place a 1x1 ship", () => {
  const testBoard = new Gameboard(3, 3);
  const tile = testBoard.board[1][2];

  const testShip = new Ship(1);
  testBoard.placeHullPart(testShip, 0, tile);

  // the tile is not empty because the ship is there
  expect(testBoard.isTileEmpty(tile)).toBe(false);
});
