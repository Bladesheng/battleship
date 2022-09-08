import { Gameboard } from "./gameboard";

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
