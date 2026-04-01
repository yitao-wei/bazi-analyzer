module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1774961784855, function(require, module, exports) {



/**
 * 县级(区县)信息
 * @param {Array} arr 总数组
 * @param {Number} code 县级(区县) code
 * @param {Number} level [0,1,2,3] 返回层级
 */
exports.findAreaChild = function findAreaChild(arr, code, level) {
  return arr.filter(item => {
    // 四个直辖市 北京:11, 上海:31，天津:12，重庆市:50
    if (/(11|31|12|50)/.test(item.province)) {
      return (new RegExp(`^${code}`)).test(item.code) && item.town !== 0;
    }
    return (new RegExp(`^${code}`)).test(item.code) && item.town === 0 && item.area !== 0;
  }).map((item) => {
    return { ...item };
  })
}

/**
 * 序列化省市信息
 * @param  {Array} arr 总数组
 * @return {Array}     [序列化后的层级总数组]
 */
exports.findCityChild = function findCityChild(arr, code, level) {
  return arr.filter(item => {
    if (/(70|81|82)/.test(item.province)) {
      return false;
    }
    // 四个直辖市 北京:11, 上海:31，天津:12，重庆市:50
    if (/(11|31|12|50)/.test(item.province)) {
      return (new RegExp(`^${code}`)).test(item.code) && item.area !== 0 && item.town === 0;
    }
    return (new RegExp(`^${code}`)).test(item.code) && item.city !== 0 && item.area === 0 && item.town === 0;
  }).map((item) => {
    if (level > 1) {
      const codeCom = /(11|31|12|50)/.test(item.province) ? `${code}${item.city}${item.area}` : `${code}${item.city}`;
      item.children = findAreaChild(arr, codeCom, level);
    }
    delete item.town;
    delete item.province;
    return {
      ...item,
      // code: /(11|31|12|50)/.test(code) ? item.area : item.city,
    }
  });
}

/**
 * 序列化 省市区信息 第一级
 * @param {Array} arr 总数组
 * @param {Number} level [0,1,2,3] 返回层级
 * @return {Array}     [序列化后的总数组]
 */
exports.sortProvince = function sortProvince(arr, level) {
  if (!level) level = 3;
  return arr.filter(item => item.city === 0 && item.area === 0 && item.town === 0)
    .map((item) => {
      if (level > 0) {
        item.children = findCityChild([...arr], item.province, level);
      }
      item.code = item.province;
      if (item.children && item.children.length === 0) delete item.children;
      delete item.province;
      delete item.city;
      delete item.area;
      delete item.town;
      return { ...item };
    });
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1774961784855);
})()
//miniprogram-npm-outsideDeps=[]
//# sourceMappingURL=index.js.map