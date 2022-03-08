export const range = (from, to) => ({
  *[Symbol.iterator]() {
    for (let index = from; index < to; ++index) {
      yield index;
    }
  },
});
