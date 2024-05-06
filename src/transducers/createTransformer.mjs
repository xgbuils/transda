import { Transducer, identityTransducer } from "./Transducer.mjs";

function defaultInit() {
  return this.xf["@@transducer/init"]();
}

function defaultResult(result) {
  return this.xf["@@transducer/result"](result);
}

export const createTransformerClass = ({
  constructor,
  init = defaultInit,
  step,
  result = defaultResult,
  innerXd = identityTransducer,
}) =>
  class Transformer {
    constructor(...args) {
      constructor.apply(this, args);
    }
    "@@transducer/init" = init;
    "@@transducer/step" = step;
    "@@transducer/result" = result;
    "@@transducer/inner-xd" = innerXd;
  };
