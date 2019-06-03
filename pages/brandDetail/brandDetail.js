const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/brandDetail/brandDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    brand: [],
    goodsList: [],
    page: 1,
    size: 20,
    over: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      id: options.id
    })
    this.getData()
    this.getGoodsList()
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!this.data.over) {
      this.getGoodsList()
    }
  },
  getData: function() {
    tools.promise(api.brandDetail, 'GET', {
        id: this.data.id
      })
      .then(res => {
        // console.log(res)
        this.setData({
          brand: res.data.data.brand
        })
      })
  },
  getGoodsList: function() {
    tools.promise(api.goodsList, 'GET', {
        brandId: this.data.id,
        page: this.data.page,
        size: this.data.size
      })
      .then(res => {
        // console.log(res)
        if (res.data.data.goodsList.length === 0) {
          this.setData({
            over: true
          })
          wx.showToast({
            title: '到底了',
            mask: true,
            duration: 1500
          })
        } else {
          this.setData({
            goodsList: this.data.goodsList.concat(res.data.data.goodsList),
            page: this.data.page + 1
          })
        }
      })
  }
})