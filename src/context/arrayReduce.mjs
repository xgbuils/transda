export const arrayReduce = (xf, init, list) => {
  let wrapper = init;
  for (let index = 0; index < list.length; ++index) {
    if (wrapper.reduced) {
      return xf["@@transducer/result"](wrapper.result);
    }
    wrapper = xf["@@transducer/step"](wrapper.result, list[index]);
  }
  return xf["@@transducer/result"](wrapper.result);
};
