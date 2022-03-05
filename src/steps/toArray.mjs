export const toArray = (list) => ({
  "@@transducer/init"() {
    return [...list];
  },
  "@@transducer/step"(result, input) {
    result.push(input);
    return result;
  },
  "@@transducer/result"(result) {
    return result;
  },
});
