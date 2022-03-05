import { Transducer } from "./Transducer.mjs";

class XTake extends Transducer {
  constructor(n, xf) {
    super(xf);
    this.n = n;
  }
  "@@transducer/init"() {
    this["@@transducer/stop"](this.n <= 0);
    return this.xf["@@transducer/init"]();
  }
  "@@transducer/step"(acc, input) {
    const result = this.xf["@@transducer/step"](acc, input);
    this.n -= 1;
    this["@@transducer/stop"](this.n <= 0);
    return result;
  }
}

export const take = (f) => (xf) => new XTake(f, xf);
