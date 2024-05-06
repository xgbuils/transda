import { Transducer, identityTransducer } from "../transducers/Transducer.mjs";

export const toObject = (obj) => ({
  "@@transducer/init"() {
    return { result: { ...obj } };
  },
  "@@transducer/step"(result, input, key) {
    result[key] = input;
    return { result };
  },
  "@@transducer/result"(result) {
    return result;
  },
  "@@transducer/inner-xd": identityTransducer,
});
