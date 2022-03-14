import * as assert from "assert";
import { groupBy } from "../src/transducers/groupBy.mjs";
import { map } from "../src/transducers/map.mjs";
import { take } from "../src/transducers/take.mjs";
import { compose } from "../src/compose.mjs";
import { transduce } from "../src/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { dropWhile } from "../src/transducers/dropWhile.mjs";
import { range } from "../src/generators/range.mjs";

describe("groupBy", function () {
  describe("toArray step", () => {
    const mod3 = (x) => x % 3;

    it("empty array", function () {
      const step = toArray([]);
      const innerXf = toArray([]);
      assert.deepEqual(transduce(groupBy(mod3, innerXf), step, []), []);
    });

    it("non empty finite array", function () {
      const step = toArray([]);
      const innerXf = toArray([]);
      assert.deepEqual(
        transduce(groupBy(mod3, innerXf), step, [1, 2, 3, 4, 5, 6]),
        [
          [1, 4],
          [2, 5],
          [3, 6],
        ]
      );
    });

    it("non empty infinite iterable", function () {
      const step = toArray([]);
      const innerXf = toArray([]);
      const findSmallestDivisor = (n) =>
        transduce(
          compose(dropWhile((m) => n % m !== 0, take(1))),
          toArray([]),
          range(2, n + 1)
        )[0];
      const result = transduce(
        compose(take(5), groupBy(findSmallestDivisor, take(1)(innerXf))),
        step,
        range(2, Infinity)
      );
      assert.deepEqual(result, [[2], [3], [5], [7], [11]]);
    });
  });
});
