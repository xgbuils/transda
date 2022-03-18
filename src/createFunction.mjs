const isTransformer = (obj) => typeof obj["@@transducer/step"] === "function";

export const createFunction =
  (transformation, transducerCreator) =>
  (...args) => {
    const transducer = transducerCreator(...args);
    return (obj) => {
      if (isTransformer(obj)) {
        return transducer(obj);
      }
      return transformation(transducer, obj);
    };
  };
