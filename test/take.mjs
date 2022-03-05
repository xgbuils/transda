import * as assert from "assert";
import { take } from "../src/transducers/take.mjs";
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
});
