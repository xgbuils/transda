import { transform } from "./context/transform.mjs";
import { createFunction } from "./createFunction.mjs";
import { dropWhile as _dropWhile } from "./transducers/dropWhile.mjs";
import { map as _map } from "./transducers/map.mjs";
import { take as _take } from "./transducers/take.mjs";

export const dropWhile = createFunction(transform, _dropWhile);
export const map = createFunction(transform, _map);
export const take = createFunction(transform, _take);
