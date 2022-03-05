class XMap {
  constructor(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  "@@transducer/init"() {
    return this.xf["@@transducer/init"]();
  }
  "@@transducer/step"(result, input) {
    return this.xf["@@transducer/step"](result, this.f(input));
  }
  "@@transducer/result"(result) {
    return this.xf["@@transducer/result"](result);
  }
}

export const map = (f) => (xf) => new XMap(f, xf);
