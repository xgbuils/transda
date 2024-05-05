import { Transducer } from "./transducers/Transducer.mjs";

export const compose2 = (xd1, xd2) =>
  new Transducer((xf) => xd1.call(xd2.call(xf)));

export const compose = (transducers) =>
  new Transducer((xf) =>
    transducers.reduceRight((result, transducer) => transducer.call(result), xf)
  );
