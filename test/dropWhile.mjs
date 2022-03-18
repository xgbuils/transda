import * as assert from "assert";
import { dropWhile } from "../src/index.mjs";
import { transduce } from "../src/context/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";

const isOdd = (x) => x % 2 === 1;

describe("dropWhile", function () {
  describe("list", () => {
    it("empty array", function () {
      assert.deepEqual(dropWhile(isOdd)([]), []);
    });

    it("non empty array with some dropped items", function () {
      const step = toArray([]);
      assert.deepEqual(
        dropWhile(isOdd)([1, 3, 5, 2, 4, 7, 9, 6]),
        [2, 4, 7, 9, 6]
      );
    });

    it("non empty iterable, take some items", function () {
      assert.deepEqual([...dropWhile(isOdd)(range(1, 6))], [2, 3, 4, 5]);
    });
  });

  describe("transduce - toArray step", () => {
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
