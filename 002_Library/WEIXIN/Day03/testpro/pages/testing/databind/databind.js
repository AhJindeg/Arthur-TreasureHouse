// pages/testing/databind/databind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'round',
    size: 150,
    url: '/images/1.jpg',
    num: 1,
    name: '亮亮',
    age: 60,
    married: false,
    hobby: ['抽烟', '喝酒', '烫头'],
    school: {
      name: '清华大学',
      loc: '五道口'
    },
    goods:[ {id:1001, name:'叫花鸡', price:28.8},
        		{id:1002, name:'鱼香肉丝', price:38.8},
            {id:1003, name:'宫保鸡丁', price:21.8},
            {id:1004, name:'臭豆腐', price:5.8} ]
  },

  /** 当点击图片时触发 */
  tapImage(){
    let newnum = this.data.num==1 ? 2 : 1
    // 将data.num修改掉
    // this.data.num = newnum
    this.setData({ num:newnum })
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