import * as assert from "assert";
import { map } from "../src/transducers/map.mjs";
import { transduce } from "../src/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";

describe("map", function () {
  describe("toArray step", () => {
    it("empty list", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, []), []);
    });

    it("non empty list", function () {
      const double = (x) => 2 * x;
      const step = toArray([]);
      assert.deepEqual(transduce(map(double), step, [1, 2, 3]), [2, 4, 6]);
    });
  });
});
