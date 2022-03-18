import { toArray } from "../steps/toArray.mjs";

export const educe = (transducer, iterable) => ({
  *[Symbol.iterator]() {
    const transformer = transducer(toArray([]));
    for (const item of iterable) {
      const wrapper = transformer["@@transducer/step"]([], item);
      yield* wrapper.result;
      if (wrapper.reduced) {
        break;
      }
    }
    yield* transformer["@@transducer/result"]([]);
  },
});
