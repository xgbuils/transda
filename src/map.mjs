function XMap(f, xf) {
  this.f = f;
  this.xf = xf;
}
XMap.prototype["@@transducer/init"] = function () {
  return this.xf["@@transducer/init"]();
};
XMap.prototype["@@transducer/step"] = function (result, input) {
  return this.xf["@@transducer/step"](result, this.f(input));
};
XMap.prototype["@@transducer/result"] = function (result) {
  return this.xf["@@transducer/result"](result);
};

export const map = (f) => (xf) => new XMap(f, xf);
