import { Transducer } from "./Transducer.mjs";
import { createTransformerClass } from "./createTransformer.mjs";

const XTakeWhile = createTransformerClass({
  constructor(predicate, xf) {
    this.predicate = predicate;
    this.xf = xf;
  },
  step(acc, input) {
    if (this.predicate(input)) {
      return this.xf["@@transducer/step"](acc, input);
    }
    return { result: acc, reduced: true };
  },
});

export const takeWhile = (predicate) =>
  new Transducer((xf) => new XTakeWhile(predicate, xf));
