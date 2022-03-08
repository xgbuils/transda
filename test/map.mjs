import * as assert from "assert";
import { map } from "../src/transducers/map.mjs";
import { transduce } from "../src/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";

describe("map", function () {
  describe("toArray step", () => {
    it("empty array", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, []), []);
    });

    it("non empty array", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, [1, 2, 3]), [2, 4, 6]);
    });

    it("empty iterable", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, range(0, 0)), []);
    });

    it("non empty iterable", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, range(1, 5)), [2, 4, 6, 8]);
    });
  });
});
