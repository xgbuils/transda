export const reduce = (xf, list) => {
  let result = xf["@@transducer/init"]();
  for (let index = 0; index < list.length; ++index) {
    result = xf["@@transducer/step"](result, list[index]);
  }
  return xf["@@transducer/result"](result);
};
