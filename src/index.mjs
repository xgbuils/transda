import { createFunction } from "./createFunction.mjs";
import { dropWhile as _dropWhile } from "./transducers/dropWhile.mjs";
import { map as _map } from "./transducers/map.mjs";
import { take as _take } from "./transducers/take.mjs";
import { takeWhile as _takeWhile } from "./transducers/takeWhile.mjs";

export const dropWhile = createFunction(2, _dropWhile);
export const map = createFunction(2, _map);
export const take = createFunction(2, _take);
export const takeWhile = createFunction(2, _takeWhile);
