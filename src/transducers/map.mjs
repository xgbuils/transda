import { Transducer } from "./Transducer.mjs";

class XMap extends Transducer {
  constructor(f, xf) {
    super(xf);
    this.f = f;
  }
  "@@transducer/step"(result, input) {
    return this.xf["@@transducer/step"](result, this.f(input));
  }
}

export const map = (f) => (xf) => new XMap(f, xf);
