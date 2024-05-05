import { transform } from "./context/transform.mjs";
import { toArray } from "./steps/toArray.mjs";

export const createFunction =
  (length, transducerCreator) =>
  (...args) => {
    const transducer = transducerCreator(...args);
    if (args.length === length) {
      return transform(transducer, toArray([]), args[args.length - 1]);
    }
    return transducer;
  };
