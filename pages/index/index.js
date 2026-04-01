// pages/index/index.js
const { Solar, Lunar } = require('lunar-javascript');

Page({
  data: {
    currentBazi: '',
    birthDateTime: '',
    isLunar: false,
    gender: '1', // 1:男, 2:女

    // 地区相关数据
    provincename:"北京市",//省
    cityname:"北京市",//市
    districtname:"东城区"//
  },

  onLoad() {


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
// 省份选择变化：联动更新城市列表
// pages/index/index.js
onAddressChange(e){
  const arry=e.detail.value
  this.setData({
    provincename:arry[0],
    cityname:arry[1],
    districtname:arry[2]
  })
},


  // 农历/公历切换
  onCalendarChange(e) {
    this.setData({
      isLunar: e.detail.value
    });
  }
});