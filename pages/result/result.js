// pages/result/result.js
Page({
  data: {
    baziResult: '',
    characterTags: [],
    wuxingAdvice: [],
    wuxingData: {} // 五行数据，用于绘制图表
  },

  onLoad: function(options) {
    const params = JSON.parse(decodeURIComponent(options.params));
    this.calculateBazi(params);
  },

  calculateBazi: function(params) {
    // 调用云函数 calcBazi
    wx.cloud.callFunction({
      name: 'calcBazi',
      data: params,
      success: (res) => {
        const result = res.result;
        this.setData({
          baziResult: result.bazi,
          characterTags: result.tags,
          wuxingAdvice: result.advice,
          wuxingData: result.wuxing
        });
        this.drawWuxingChart(result.wuxing);
      },
      fail: (err) => {
        console.error('云函数调用失败', err);
        wx.showToast({
          title: '计算失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  drawWuxingChart: function(wuxingData) {
    // 使用 canvas 绘制五行环形图
    const ctx = wx.createCanvasContext('wuxingChart', this);
    const centerX = 150;
    const centerY = 100;
    const radius = 60;
    const colors = {
      金: '#FFD700',
      木: '#228B22',
      水: '#1E90FF',
      火: '#DC143C',
      土: '#D2691E'
    };

    let startAngle = -Math.PI / 2;
    Object.keys(wuxingData).forEach(key => {
      const percentage = wuxingData[key] / 100;
      const angle = percentage * 2 * Math.PI;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
      ctx.lineTo(centerX, centerY);
      ctx.setFillStyle(colors[key]);
      ctx.fill();
      startAngle += angle;
    });

    // 添加标签
    let labelAngle = -Math.PI / 2;
    Object.keys(wuxingData).forEach(key => {
      const percentage = wuxingData[key] / 100;
      const angle = percentage * 2 * Math.PI;
      const labelX = centerX + (radius + 20) * Math.cos(labelAngle + angle / 2);
      const labelY = centerY + (radius + 20) * Math.sin(labelAngle + angle / 2);
      ctx.setFontSize(12);
      ctx.setFillStyle('#333');
      ctx.fillText(`${key}: ${wuxingData[key]}%`, labelX - 20, labelY);
      labelAngle += angle;
    });

    ctx.draw();
  },

  goBack: function() {
    wx.navigateBack();
  },
  data: {
    baziResult: '',
    characterTags: ['稳重', '聪明', '有耐心', '领导力'],
    wuxingAdvice: [
      '适合多接触水属性事物',
      '颜色适合蓝色、黑色',
      '方向喜北方',
    ],
  },

  onLoad(options) {
    // 接收从首页传来的八字数据
    if (options.bazi) {
      this.setData({
        baziResult: decodeURIComponent(options.bazi)
      });
    }
  },

  // 返回首页
  goBack() {
    wx.navigateBack();
  },
});