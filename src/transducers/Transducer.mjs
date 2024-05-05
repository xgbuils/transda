export class Transducer {
  constructor(transducer) {
    this.transducer = transducer;
  }
  call(xf) {
    return this.transducer(xf);
  }
}

export const identityTransducer = new Transducer((xf) => xf);
