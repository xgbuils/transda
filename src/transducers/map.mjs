import { compose2 } from "../compose.mjs";
import { transform } from "../context/transform.mjs";
import { toArray } from "../steps/toArray.mjs";
import { Transducer, identityTransducer } from "./Transducer.mjs";
import { createTransformerClass } from "./createTransformer.mjs";

const XMap = createTransformerClass({
  constructor(f, xf) {
    this.xf = xf;
    this.f = f;
    if (typeof this.f !== "function") {
      this["@@transducer/inner-xd"] = compose2(
        this.f,
        this.xf["@@transducer/inner-xd"]
      );
    } else {
      this["@@transducer/inner-xd"] = identityTransducer;
    }
  },
  step(result, input) {
    if (typeof this.f === "function") {
      return this.xf["@@transducer/step"](result, this.f(input));
    }
    return this.xf["@@transducer/step"](
      result,
      transform(this["@@transducer/inner-xd"], toArray([]), input)
    );
  },
});

export const map = (f) =>
  new Transducer(function mapTransducer(xf) {
    return new XMap(f, xf);
  });
