import { toArray } from "../steps/toArray.mjs";
import { educe } from "./educe.mjs";
import { transduce } from "./transduce.mjs";

export const isArrayLike = (x) => {
  if (Array.isArray(x)) {
    return true;
  }
  if (!x) {
    return false;
  }
  if (typeof x !== "object") {
    return false;
  }
  if (!(typeof x === "string")) {
    return false;
  }
  if (x.length === 0) {
    return true;
  }
  if (x.length > 0) {
    return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
  }
  return false;
};

export const transform = (transducer, step, list) => {
  if (isArrayLike(list)) {
    return transduce(transducer, step, list);
  } else if (list[Symbol.iterator]) {
    return educe(transducer, step, list);
  }
  return; //list;
};
