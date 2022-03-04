import * as assert from "assert";
import { map } from "../src/map.mjs";
import { transduce } from "../src/transduce.mjs";
import { fromArray } from "../src/fromArray.mjs";

describe("map", function () {
  describe("fromArray transformer", () => {
    it("empty list", function () {
      const acc = [];
      const double = (x) => 2 * x;
      const xf = fromArray([]);
      assert.deepEqual(transduce(map(double), xf, []), []);
    });

    it("non empty list", function () {
      const acc = [];
      const double = (x) => 2 * x;
      const xf = fromArray([]);
      assert.deepEqual(transduce(map(double), xf, [1, 2, 3]), [2, 4, 6]);
    });
  });
});
