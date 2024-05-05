import * as assert from "assert";
import { map, take } from "../src/index.mjs";
import { transduce } from "../src/context/transduce.mjs";
import { toArray } from "../src/steps/toArray.mjs";
import { range } from "../src/generators/range.mjs";
import { compose } from "../src/compose.mjs";

const arrayRange = (m, n) =>
  Array.from({ length: n - m }, (_, index) => index + m);
const increase = (x) => x + 1;
const double = (x) => 2 * x;

describe("map", function () {
  describe("list", () => {
    it("empty array", function () {
      assert.deepEqual(map(double, []), []);
    });

    it("non empty array with some dropped items", function () {
      assert.deepEqual(map(double, [1, 3, 5]), [2, 6, 10]);
    });

    it("non empty iterable, take some items", function () {
      assert.deepEqual([...map(double, range(1, 4))], [2, 4, 6]);
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

  describe("transduce - composition", () => {
    it("map(Infinity range) then map(take(2))", () => {
      const step = toArray([]);
      const result = transduce(
        compose([map((n) => range(n, Infinity)), map(take(2))]),
        step,
        [1, 2, 3]
      );
      assert.deepEqual(
        result.map((item) => [...item]),
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ]
      );
    });

    it("map(Infinity range) then map(take(4)) then map(take(2))", () => {
      const step = toArray([]);
      const result = transduce(
        compose([map((n) => range(n, Infinity)), map(take(4)), map(take(2))]),
        step,
        [1, 2, 3]
      );
      assert.deepEqual(
        result.map((item) => [...item]),
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ]
      );
    });

    it("map(array length 1) then map(take(2))", () => {
      const step = toArray([]);
      const result = transduce(
        compose([map((n) => [n]), map(take(2))]),
        step,
        [1, 2, 3]
      );
      assert.deepEqual(result, [[1], [2], [3]]);
    });

    it("map(array length 5) then map(take(2))", () => {
      const step = toArray([]);
      const result = transduce(
        compose([map((n) => arrayRange(n, n + 5)), map(take(2))]),
        step,
        [1, 2, 3]
      );
      assert.deepEqual(result, [
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
    });

    it("map(array length 2) then map(map(increase))", () => {
      const step = toArray([]);
      const result = transduce(
        compose([map((n) => arrayRange(n, n + 2)), map(map(increase))]),
        step,
        [1, 2, 3]
      );
      assert.deepEqual(result, [
        [2, 3],
        [3, 4],
        [4, 5],
      ]);
    });
  });
});
