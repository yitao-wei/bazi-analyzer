// pages/index/index.js
const { Solar, Lunar } = require('lunar-javascript');
const { provinces, cityMap } = require('../../utils/city.js');

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

  // 顶部当前时间（只计算一次，不频繁刷新）
  refreshCurrentTime() {
    try {
      const now = new Date();
      const solar = Solar.fromDate(now);
      const lunar = solar.getLunar();
      const bazi = lunar.getEightChar();
      this.setData({
        currentBazi: `${bazi.getYear()} ${bazi.getMonth()} ${bazi.getDay()} ${bazi.getTime()}`
      });
    } catch (e) {
      this.setData({ currentBazi: '获取时间失败' });
    }
  },

  // 选择日期
  onDateChange(e) {
    const selectedDate = e.detail.value;
    const yearIndex = selectedDate[0] % 127; // 2026-1900+1=127
    const monthIndex = selectedDate[1] % 12;
    const dayIndex = selectedDate[2] % 31;
    const year = this.data.yearOptions[yearIndex];
    const month = this.data.monthOptions[monthIndex];
    const day = this.data.dayOptions[dayIndex];
    this.setData({
      birthDate: `${year}-${month}-${day}`,
      selectedDate: selectedDate
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


  // 选择时间
  onTimeChange(e) {
    const index = e.detail.value;
    const actualIndex = index % 25;
    this.setData({
      birthTimeIndex: index,
      birthTime: this.data.timeOptions[actualIndex]
    });
  },

  // 切换公历/农历
  onCalendarChange(e) {
    this.setData({
      isLunar: e.detail.value === 'true'
    });
  },

  // 性别
  onGenderChange(e) {
    this.setData({
      gender: e.detail.value
    });
  },

  // 省份
  onProvinceChange(e) {
    const i = e.detail.value;
    const name = this.data.provinceList[i];
    this.setData({ provinceIndex: i });
    const cities = i === 0 ? this.getAllCities() : (cityMap[name] || []);
    this.setData({ cityList: cities, cityIndex: 0 });
  },

  // 城市
  onCityChange(e) {
    this.setData({ cityIndex: e.detail.value });
  },

  // 提交计算（异步执行，绝不卡顿）
  onSubmit() {
    const { birthDate, birthTime } = this.data;
    if (!birthDate) {
      wx.showToast({ title: '请选择出生日期', icon: 'none' });
      return;
    }

    // 组合出生时间
    let birthDateTime;
    if (birthTime === '未知') {
      birthDateTime = `${birthDate} 12:00`; // 默认中午
    } else {
      birthDateTime = `${birthDate} ${birthTime}:00`;
    }

    // 异步计算 → 永不 timeout
    setTimeout(() => {
      try {
        const params = {
          birthDateTime,
          isLunar: this.data.isLunar,
          gender: this.data.gender,
          province: this.data.provinceList[this.data.provinceIndex],
          city: this.data.cityList[this.data.cityIndex]
        };

        wx.navigateTo({
          url: `/pages/result/result?params=${encodeURIComponent(JSON.stringify(params))}`
        });
      } catch (err) {
        wx.showToast({ title: '计算失败', icon: 'none' });
      }
    }, 200);
  },

  // 所有城市
  getAllCities() {
    let arr = [];
    for (let p in cityMap) arr = arr.concat(cityMap[p]);
    return arr;
  }
});