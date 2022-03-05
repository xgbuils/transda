export class Transducer {
  constructor(xf) {
    this.xf = xf;
  }
  "@@transducer/init"() {
    return this.xf["@@transducer/init"]();
  }
  "@@transducer/result"(result) {
    return this.xf["@@transducer/result"](result);
  }
  "@@transducer/stop"(stop) {
    if (stop) {
      this["@@transducer/reduced"] = stop;
    }
  }
}
