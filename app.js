// app.js
App({
  onLaunch: function() {
    // 初始化云开发
    wx.cloud.init({
        env: 'your-env-id', // 替换为实际环境ID
        traceUser: true
    });
  }
});