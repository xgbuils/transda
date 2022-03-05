class XTake {
  constructor(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  "@@transducer/init"() {
    const wrapper = this.xf["@@transducer/init"]();
    return this.n > 0
      ? wrapper
      : {
          result: wrapper.result,
          reduced: true,
        };
  }
  "@@transducer/step"(acc, input) {
    const wrapper = this.xf["@@transducer/step"](acc, input);
    this.n -= 1;
    if (this.n <= 0) {
      wrapper.reduced = true;
    }
    return wrapper;
  }
  "@@transducer/result"(result) {
    return this.xf["@@transducer/result"](result);
  }
}

export const take = (f) => (xf) => new XTake(f, xf);
