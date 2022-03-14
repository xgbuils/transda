import { reduce } from "../reduce.mjs";

class XGroupBy {
  constructor(keyFn, outerXf, innerXf) {
    this.outerXf = outerXf;
    this.innerXf = innerXf;
    this.keyFn = keyFn;
  }
  "@@transducer/init"() {
    this.values = new Map();
    this.done = {};
    return this.outerXf["@@transducer/init"]();
  }
  "@@transducer/step"(result, input) {
    const key = this.keyFn(input);
    let wrapper = this.values.get(key);
    if (this.done[key]) {
      return { result };
    }
    if (!wrapper) {
      wrapper = this.innerXf["@@transducer/init"]();
    }
    wrapper = this.innerXf["@@transducer/step"](wrapper.result, input);
    if (wrapper.reduced) {
      this.values.delete(key);
      this.key;
      this.done[key] = true;
      return this.outerXf["@@transducer/step"](result, wrapper.result);
    } else if (!this.done[key]) {
      this.values.set(key, wrapper);
    }
    return { result };
  }
  "@@transducer/result"(result) {
    delete this.done;
    const value = reduce(
      this.outerXf,
      { result },
      [...this.values].map(([, value]) => value.result)
    );
    delete this.values;
    return value;
  }
}

export const groupBy = (keyFn, innerXf) => (outerXf) =>
  new XGroupBy(keyFn, outerXf, innerXf);
