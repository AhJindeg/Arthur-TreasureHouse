// pages/testing/radio/radio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answer: 'A',
    answer2: ['A'],
    answer3: false,
    answer4: []
  },
  changeEvent4(event){
    this.setData({answer4: event.detail.value})
  },
  changeEvent3(event){
    this.setData({answer3: event.detail.value})
  },

  /** 当改变多选框选中项后执行 */
  changeEvent2(event){
    console.log(event.detail.value)
    this.setData({answer2: event.detail.value.sort()})
  },

  /** 改变单选选中项后触发 */
  changeEvent (event){
    this.setData({answer: event.detail.value})
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