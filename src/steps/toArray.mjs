import { Transducer, identityTransducer } from "../transducers/Transducer.mjs";

export const toArray = (list) => ({
  "@@transducer/init"() {
    return { result: [...list] };
  },
  "@@transducer/step"(result, input) {
    result.push(input);
    return { result };
  },
  "@@transducer/result"(result) {
    return result;
  },
  "@@transducer/inner-xd": identityTransducer,
});
