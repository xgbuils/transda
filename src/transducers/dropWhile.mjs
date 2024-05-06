import { Transducer } from "./Transducer.mjs";
import { createTransformerClass } from "./createTransformer.mjs";

const XDropWhile = createTransformerClass({
  constructor(predicate, xf) {
    this.predicate = predicate;
    this.isDropping = true;
    this.xf = xf;
  },
  step(acc, input) {
    if (!this.isDropping) {
      return this.xf["@@transducer/step"](acc, input);
    } else if (this.predicate(input)) {
      return { result: acc };
    }
    this.isDropping = false;
    return this.xf["@@transducer/step"](acc, input);
  },
});

export const dropWhile = (f) => new Transducer((xf) => new XDropWhile(f, xf));
