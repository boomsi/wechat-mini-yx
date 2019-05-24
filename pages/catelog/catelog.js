const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/catelog/catelog.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [],
    showList: [],
    showId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getList: function(data) {
    wx.showLoading({
      title: '加载中',
    })
    tools.promise(api.catelogUrl, 'GET', data)
      .then(res => {
        console.log(res)
        this.setData({
          showList: res.data.data.currentCategory,
          itemList: res.data.data.categoryList
        })
      })
      .then(res => {
        wx.hideLoading()
      })
  },
  changeItem: function(event) {
    var id = event.target.dataset.id
    if (id === this.data.showList.id) {
      return false
    }
    this.getList({id: id})
  }
})