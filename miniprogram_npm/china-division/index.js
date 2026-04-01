module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1774967362888, function(require, module, exports) {
var path = require('path')

module.exports = {
  // 省级（省份、直辖市、自治区）
  provinces: require(path.resolve(__dirname, '../dist/provinces.json')),
  // 地级（城市）
  cities: require(path.resolve(__dirname, '../dist/cities.json')),
  // 县级（区县）
  areas: require(path.resolve(__dirname, '../dist/areas.json')),
  // 乡级（乡镇、街道）
  streets: require(path.resolve(__dirname, '../dist/streets.json')),
  // 乡级（乡镇、街道）
  villages: require(path.resolve(__dirname, '../dist/villages.json')),
  // “省份、城市” 二级联动数据
  pc: require(path.resolve(__dirname, '../dist/pc.json')),
  // “省份、城市” 二级联动数据（带编码）
  pcC: require(path.resolve(__dirname, '../dist/pc-code.json')),
  // “省份、城市、区县” 三级联动数据
  pca: require(path.resolve(__dirname, '../dist/pca.json')),
  // “省份、城市、区县” 三级联动数据（带编码）
  pcaC: require(path.resolve(__dirname, '../dist/pca-code.json')),
  // “省份、城市、区县、乡镇” 四级联动数据
  pcas: require(path.resolve(__dirname, '../dist/pcas.json')),
  // “省份、城市、区县、乡镇” 四级联动数据（带编码）
  pcasC: require(path.resolve(__dirname, '../dist/pcas-code.json'))
}

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1774967362888);
})()
//miniprogram-npm-outsideDeps=["path"]
//# sourceMappingURL=index.js.map