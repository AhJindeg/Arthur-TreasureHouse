// pages/testing/input/input.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '', // 保存用户名
    password: ''
  },

  /** 处理密码输入事件 */
  doInput2(event){
    this.setData({
      password: event.detail.value
    })
  },

  /** 处理输入框的input事件 */
  doInput(event){
    console.log(event.detail.value)
    // 更新username
    // 第一种方式不会更新界面
    // this.data.username = event.detail.value
    // 第二种方式会更新界面
    this.setData({
      username : event.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})