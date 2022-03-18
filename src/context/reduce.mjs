import { arrayReduce } from "./arrayReduce.mjs";

const iteratorReduce = (xf, init, iterator) => {
  let wrapper = init;
  while (!wrapper.reduced) {
    const step = iterator.next();
    if (step.done) {
      break;
    }
    wrapper = xf["@@transducer/step"](wrapper.result, step.value);
  }
  return xf["@@transducer/result"](wrapper.result);
};

const symbolIterator = Symbol.iterator;
const isIterable = (list) => typeof list[symbolIterator] === "function";

export const reduce = (xf, init, list) => {
  let wrapper = init;
  if (Array.isArray(list)) {
    return arrayReduce(xf, wrapper, list);
  }
  if (isIterable(list)) {
    return iteratorReduce(xf, wrapper, list[symbolIterator]());
  }
  return arrayReduce(xf, wrapper, list);
};
