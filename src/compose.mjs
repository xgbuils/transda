const identity = (x) => x;

export const compose =
  (f = identity, ...fns) =>
  (...args) =>
    fns.reduceRight((result, fn) => fn(result), f(...args));
