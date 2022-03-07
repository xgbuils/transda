export const range = (a, b) => ({
  *[Symbol.iterator]() {
    for (let index = a; index <= b; ++index) {
      yield index;
    }
  },
});
