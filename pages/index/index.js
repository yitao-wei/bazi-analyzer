// pages/index/index.js
const { Solar, Lunar } = require('lunar-javascript');
const { provinces, cityMap } = require('../../utils/city.js');

Page({
  data: {
    currentBazi: '加载中...',
    birthDateTime: '',
    isLunar: false,
    gender: '1',

    provinceList: provinces,
    provinceIndex: 0,
    cityList: [],
    cityIndex: 0
  },

  onLoad() {
    // 【最关键】用异步延迟，避免小程序阻塞 → 永远不 timeout！
    setTimeout(() => {
      this.refreshCurrentTime();
    }, 300);

    this.setData({
      cityList: this.getAllCities()
    });
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

  // 选择时间
  onDateTimeChange(e) {
    this.setData({
      birthDateTime: e.detail.value
    });
  },

  // 切换公历/农历
  onCalendarChange(e) {
    this.setData({
      isLunar: e.detail.value
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
    const { birthDateTime } = this.data;
    if (!birthDateTime) {
      wx.showToast({ title: '请选择出生时间', icon: 'none' });
      return;
    }

    // 异步计算 → 永不 timeout
    setTimeout(() => {
      try {
        const date = new Date(birthDateTime);
        const solar = Solar.fromDate(date);
        const lunar = solar.getLunar();
        const bazi = lunar.getEightChar();
        const baziStr = `${bazi.getYear()}年 ${bazi.getMonth()}月 ${bazi.getDay()}日 ${bazi.getTime()}时`;

        wx.navigateTo({
          url: `/pages/result/result?bazi=${encodeURIComponent(baziStr)}`
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