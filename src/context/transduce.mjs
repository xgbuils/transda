import { reduce } from "./reduce.mjs";

export const transduce = (transducer, xf, list) => {
  var newXf = transducer.call(xf);
  return reduce(newXf, newXf["@@transducer/init"](), list);
};
