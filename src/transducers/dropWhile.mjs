class XDropWhile {
  constructor(f, xf) {
    this.f = f;
    this.isDropping = true;
    this.xf = xf;
  }
  "@@transducer/init"() {
    return this.xf["@@transducer/init"]();
  }
  "@@transducer/step"(acc, input) {
    if (!this.isDropping) {
      return this.xf["@@transducer/step"](acc, input);
    } else if (this.f(input)) {
      return { result: acc };
    }
    this.isDropping = false;
    return this.xf["@@transducer/step"](acc, input);
  }
  "@@transducer/result"(result) {
    return this.xf["@@transducer/result"](result);
  }
}

export const dropWhile = (f) => (xf) => new XDropWhile(f, xf);
