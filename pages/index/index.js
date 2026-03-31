// pages/index/index.js
const { Solar, Lunar } = require('lunar-javascript');

Page({
  data: {
    currentBazi: '',
    birthDateTime: '',
    isLunar: false
  },

  onLoad() {
    // 获取当前时间的八字
    this.calculateBazi(new Date());
  },

  // 计算八字的核心函数
  calculateBazi(date) {
    try {
      const solar = Solar.fromDate(date);
      const lunar = solar.getLunar();
      const baZi = lunar.getEightChar();
      
      this.setData({
        currentBazi: baZi.toString() // 或自定义格式
      });
    } catch (err) {
      console.error('八字计算失败:', err);
    }
  },

  // 日期选择器变化
  onDateTimeChange(e) {
    const selectedDate = new Date(e.detail.value);
    this.calculateBazi(selectedDate);
    this.setData({
      birthDateTime: e.detail.value
    });
  },

  // 农历/公历切换
  onCalendarChange(e) {
    this.setData({
      isLunar: e.detail.value
    });
  }
});