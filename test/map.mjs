import * as assert from "assert";
import { map } from "../src/index.mjs";
import { transduce } from "../src/context/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";

const double = (x) => 2 * x;

describe("map", function () {
  describe("list", () => {
    it("empty array", function () {
      assert.deepEqual(map(double)([]), []);
    });

    it("non empty array with some dropped items", function () {
      assert.deepEqual(map(double)([1, 3, 5]), [2, 6, 10]);
    });

    it("non empty iterable, take some items", function () {
      assert.deepEqual([...map(double)(range(1, 4))], [2, 4, 6]);
    });
  });

  describe("transduce - toArray step", () => {
    it("empty array", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, []), []);
    });

    it("non empty array", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, [1, 2, 3]), [2, 4, 6]);
    });

    it("empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, range(0, 0)), []);
    });

    it("non empty iterable", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, range(1, 5)), [2, 4, 6, 8]);
    });
  });
});
