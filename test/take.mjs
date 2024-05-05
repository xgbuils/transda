import * as assert from "assert";
import { range } from "../src/generators/range.mjs";
import { map, take } from "../src/index.mjs";
import { compose } from "../src/compose.mjs";
import { transduce } from "../src/context/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";

describe("take", function () {
  describe("list", () => {
    it("empty array", function () {
      assert.deepEqual(take(3, []), []);
    });

    it("non empty array, take some items", function () {
      assert.deepEqual(take(4, [6, 5, 4, 3, 2, 1]), [6, 5, 4, 3]);
    });

    it("non empty iterable, take some items", function () {
      assert.deepEqual([...take(4, range(0, 10))], [0, 1, 2, 3]);
    });
  });

  describe("transduce - toArray step", () => {
    it("empty array", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(3), step, []), []);
    });

    it("non empty array, take 0", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(0), step, [1, 2, 3, 4]), []);
    });

    it("non empty array, take less than length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(2), step, [1, 2, 3, 4]), [1, 2]);
    });

    it("non empty array, take the same as length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(4), step, [1, 2, 3, 4]), [1, 2, 3, 4]);
    });

    it("non empty array, take more than length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(6), step, [1, 2, 3, 4]), [1, 2, 3, 4]);
    });

    it("empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(3), step, range(1, 1)), []);
    });

    it("non empty iterable, take some elements", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(3), step, range(1, Infinity)), [1, 2, 3]);
    });
  });

  describe("transduce - composition", () => {
    const double = (x) => 2 * x;

    it("take and then map", () => {
      const step = toArray([]);
      assert.deepEqual(
        transduce(compose([map(double), take(2)]), step, [1, 2, 3]),
        [2, 4]
      );
    });

    it("map and then take", () => {
      const step = toArray([]);
      assert.deepEqual(
        transduce(compose([take(2), map(double)]), step, [1, 2, 3]),
        [2, 4]
      );
    });

    it("take and then take", () => {
      assert.deepEqual(
        transduce(compose([take(1), take(2)]), toArray([]), [1, 2, 3]),
        [1]
      );
      assert.deepEqual(
        transduce(compose([take(2), take(1)]), toArray([]), [1, 2, 3]),
        [1]
      );
    });
  });
});
