import { reduce } from "./reduce.mjs";

export const transduce = (transducer, xf, list) => {
  return reduce(transducer(xf), list);
};
