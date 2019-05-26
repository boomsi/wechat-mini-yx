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
  onLoad: function(options) {
    this.getData()
    this.getCounts()
    // wx.showNavigationBarLoading()
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
  getData: function() {
    tools.promise(api.indexUrl, 'GET', {})
      .then(res => {
        console.log(res)
        this.setData({
          newGoods: res.data.data.newGoodsList,
          hotGoods: res.data.data.hotGoodsList,
          topics: res.data.data.topicList,
          brand: res.data.data.brandList,
          floorGoods: res.data.data.categoryList,
          banner: res.data.data.banner,
          channel: res.data.data.channel
        })
      })
      .catch(res => {
        wx.showToast({
          title: '加载失败',
        })
      })
      wx.showLoading({
        title: '加载中',
        mask: true
      })
  },
  getCounts: function () {
    tools.promise(api.goodsCount, 'GET', {})
    .then(res => {
      this.setData({
        goodsCount: res.data.data.goodsCount
      })
    })
  }
})