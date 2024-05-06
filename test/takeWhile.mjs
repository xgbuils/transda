import * as assert from "assert";
import { takeWhile } from "../src/index.mjs";
import { transduce } from "../src/context/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";

const isOdd = (x) => x % 2 === 1;

describe("takeWhile", function () {
  describe("list", () => {
    it("empty array", function () {
      assert.deepEqual(takeWhile(isOdd, []), []);
    });

    it("non empty array with some dropped items", function () {
      const step = toArray([]);
      assert.deepEqual(takeWhile(isOdd, [1, 3, 5, 2, 4, 7, 9, 6]), [1, 3, 5]);
    });

    it("non empty iterable, take some items", function () {
      assert.deepEqual([...takeWhile(isOdd, range(1, 6))], [1]);
    });
  });

  describe("transduce - toArray step", () => {
    it("empty array", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(takeWhile(isOdd), step, []), []);
    });

    it("non empty array with some taken items", function () {
      const step = toArray([]);
      assert.deepEqual(
        transduce(takeWhile(isOdd), step, [1, 3, 5, 2, 4, 7, 9, 6]),
        [1, 3, 5]
      );
    });

    it("non empty array without taken items", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(takeWhile(isOdd), step, [2, 4, 7, 9]), []);
    });

    it("non empty array where every item is taken", function () {
      const step = toArray([]);
      assert.deepEqual(
        transduce(takeWhile(isOdd), step, [1, 3, 5, 7, 9]),
        [1, 3, 5, 7, 9]
      );
    });

    it("empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(takeWhile(isOdd), step, range(0, 0)), []);
    });

    it("non empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(takeWhile(isOdd), step, range(1, 5)), [1]);
    });
  });
});
