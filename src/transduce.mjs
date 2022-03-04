export const transduce = (transducer, xf, list) => {
  const transformer = transducer(xf);
  let result = transformer["@@transducer/init"]();
  for (let index = 0; index < list.length; ++index) {
    result = transformer["@@transducer/step"](result, list[index]);
  }
  return transformer["@@transducer/result"](result);
};
