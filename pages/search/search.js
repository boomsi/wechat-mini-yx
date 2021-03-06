const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultKeyword: [],
    historyKeywordList: [],
    hotKeywordList: [],
    isShow: true,
    inputValue: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    tools.promise(api.searchIndexUrl, 'GET', {})
      .then(res => {
        this.setData({
          defaultKeyword: res.data.data.defaultKeyword,
          historyKeywordList: res.data.data.historyKeywordList,
          hotKeywordList: res.data.data.hotKeywordList
        })
        // console.log(this.data.hotKeywordList)
      })
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
  addHistoryResult: function(el) {//向历史记录中添加
    if (el.detail.value.length === 0) {
      return false
    }
    this.setData({
      historyKeywordList: this.data.historyKeywordList.concat(el.detail.value)
    })
  },
  showSearchResult: function () {//显示搜索结果
    this.setData({
      isShow: !this.data.isShow
    })

  },
  searchGoods: function(el) {
    this.addHistoryResult(el)
    this.showSearchResult()
  },
  cancel: function (el) {
    this.setData({
      isShow: true,
      inputValue: null
    })
    if (this.data.isShow === true) {
      
    }
  }
})