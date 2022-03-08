import * as assert from "assert";
import { dropWhile } from "../src/transducers/dropWhile.mjs";
import { transduce } from "../src/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";

describe("dropWhile", function () {
  describe("toArray step", () => {
    const isOdd = (x) => x % 2 === 1;

    it("empty array", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(dropWhile(isOdd), step, []), []);
    });

    it("non empty array with some dropped items", function () {
      const step = toArray([]);
      assert.deepEqual(
        transduce(dropWhile(isOdd), step, [1, 3, 5, 2, 4, 7, 9, 6]),
        [2, 4, 7, 9, 6]
      );
    });

    it("non empty array without dropped items", function () {
      const step = toArray([]);
      assert.deepEqual(
        transduce(dropWhile(isOdd), step, [2, 4, 7, 9]),
        [2, 4, 7, 9]
      );
    });

    it("non empty array where every item is dropped", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(dropWhile(isOdd), step, [1, 3, 5, 7, 9]), []);
    });

    it("empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(dropWhile(isOdd), step, range(0, 0)), []);
    });

    it("non empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(
        transduce(dropWhile(isOdd), step, range(1, 5)),
        [2, 3, 4]
      );
    });
  });
});
