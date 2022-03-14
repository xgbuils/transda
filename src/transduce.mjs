import { reduce } from "./reduce.mjs";

export const transduce = (transducer, xf, list) => {
  var newXf = transducer(xf);
  return reduce(newXf, newXf["@@transducer/init"](), list);
};
