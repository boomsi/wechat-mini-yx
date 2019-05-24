const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/topic/topic.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topicList: [],
    page: 1,
    size: 10,
    isShow: true //是否还存在数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },
  getData() {//获取数据,包括上拉加载
    wx.showNavigationBarLoading()
    if (this.data.isShow) {
      tools.promise(api.topicUrl, 'GET', {
          page: this.data.page,
          size: this.data.size
        })
        .then(res => {
          if (res.data.data.data.length === 0) {
            this.setData({
              isShow: false
            })
          }
          this.setData({
            topicList: this.data.topicList.concat(res.data.data.data),
            page: this.data.page + 1
          })
        })
        .then(res => {
          wx.hideNavigationBarLoading()
        })
        .catch(err => {
          wx.showLoading({
            title: '加载失败，请刷新',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        })
    } else {
      wx.showToast({
        title: '到底了',
        icon: 'success',
        duration: 1500,
        mask: true
      })
      wx.hideNavigationBarLoading()
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.getData()
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})