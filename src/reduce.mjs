export const reduce = (xf, list) => {
  let result = xf["@@transducer/init"]();
  for (let index = 0; index < list.length; ++index) {
    if (xf["@@transducer/reduced"]) {
      return xf["@@transducer/result"](result);
    }
    result = xf["@@transducer/step"](result, list[index]);
  }
  return xf["@@transducer/result"](result);
};
