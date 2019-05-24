const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsCount: 0,
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    channel: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tools.promise(api.indexUrl, 'GET', {})
    .then(res => {
      // console.log(res)
      this.setData({
        newGoods: res.data.data.newGoodsList,
        hotGoods: res.data.data.hotGoodsList,
        topics: res.data.data.topicList,
        brand: res.data.data.brandList,
        floorGoods: res.data.data.categoryList,
        banner: res.data.data.banner,
        channel: res.data.data.channel
      })
    }),
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // wx.showNavigationBarLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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