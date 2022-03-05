import * as assert from "assert";
import { map } from "../src/transducers/map.mjs";
import { take } from "../src/transducers/take.mjs";
import { compose } from "../src/compose.mjs";
import { transduce } from "../src/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";

describe("take", function () {
  describe("toArray step", () => {
    it("empty list", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(3), step, []), []);
    });

    it("non empty list, take 0", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(0), step, [1, 2, 3, 4]), []);
    });

    it("non empty list, take less than length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(2), step, [1, 2, 3, 4]), [1, 2]);
    });

    it("non empty list, take the same as length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(4), step, [1, 2, 3, 4]), [1, 2, 3, 4]);
    });

    it("non empty list, take more than length", function () {
      const step = toArray([]);
      assert.deepEqual(transduce(take(6), step, [1, 2, 3, 4]), [1, 2, 3, 4]);
    });
  });

  describe("composition", () => {
    const double = (x) => 2 * x;

    it("take and then map", () => {
      const step = toArray([]);
      assert.deepEqual(
        transduce(compose(map(double), take(2)), step, [1, 2, 3]),
        [2, 4]
      );
    });

    it("map and then take", () => {
      const step = toArray([]);
      assert.deepEqual(
        transduce(compose(take(2), map(double)), step, [1, 2, 3]),
        [2, 4]
      );
    });

    it("take and then take", () => {
      assert.deepEqual(
        transduce(compose(take(1), take(2)), toArray([]), [1, 2, 3]),
        [1]
      );
      assert.deepEqual(
        transduce(compose(take(2), take(1)), toArray([]), [1, 2, 3]),
        [1]
      );
    });
  });
});
