import { Transducer } from "./Transducer.mjs";
import { createTransformerClass } from "./createTransformer.mjs";

const XTake = createTransformerClass({
  constructor(n, xf) {
    this.xf = xf;
    this.n = n;
  },
  init() {
    const wrapper = this.xf["@@transducer/init"]();
    return this.n > 0
      ? wrapper
      : {
          result: wrapper.result,
          reduced: true,
        };
  },
  step(acc, input) {
    const wrapper = this.xf["@@transducer/step"](acc, input);
    this.n -= 1;
    if (this.n <= 0) {
      wrapper.reduced = true;
    }
    return wrapper;
  },
});

export const take = (n) => new Transducer((xf) => new XTake(n, xf));
