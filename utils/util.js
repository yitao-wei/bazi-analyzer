// utils/util.js
// 通用工具函数

/**
 * 格式化日期
 * @param {Date} date
 * @returns {string}
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 格式化时间
 * @param {Date} date
 * @returns {string}
 */
function formatTime(date) {
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${hour}:${minute}`;
}

/**
 * 校验出生日期时间
 * @param {string} dateTime
 * @returns {boolean}
 */
function validateBirthDateTime(dateTime) {
  const date = new Date(dateTime);
  const now = new Date();
  return date <= now && date >= new Date('1900-01-01');
}

/**
 * 获取城市列表（简化）
 * @param {string} province
 * @returns {Array}
 */
function getCitiesByProvince(province) {
  const cities = {
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市', '珠海市']
  };
  return cities[province] || [];
}

module.exports = {
  formatDate,
  formatTime,
  validateBirthDateTime,
  getCitiesByProvince
};