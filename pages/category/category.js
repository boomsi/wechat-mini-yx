const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    titleList: [], //标题数组
    itemList: [], //商品数组
    showList: [], //当前显示页面信息
    page: 1,
    size: 10,
    isShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
    this.getData()
    this.getGoodsList()
    console.log('category')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.isShow) {
      this.getGoodsList()
    } else {
      wx.showToast({
        title: '到底了',
        mask: true,
        duration: 1000
      })
    }
  },
  getData: function() {//获取标题列表
    tools.promise(api.goodsCategory, 'GET', {
        id: this.data.id
      })
      .then(res => {
        // console.log(res)
        this.setData({
          titleList: res.data.data.brotherCategory,
          showList: res.data.data.currentCategory
        })
      })
  },
  getGoodsList: function() {//获取商品列表
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    tools.promise(api.goodsList, 'GET', {
      categoryId: this.data.id,
      page: this.data.page,
      size: this.data.size
    })
    .then(res => {
      console.log(res)
      wx.hideLoading()
      if (res.data.data.data.length === 0) {
        this.data.isShow = false
        return false
      }
      this.setData({
        itemList: this.data.itemList.concat(res.data.data.data),
        page: this.data.page + 1
      })
    })
    .catch(err => {
      wx.showToast({
        title: '加载失败，请重试',
        duration: 1500
      })
    })
  },
  changeItem: function (el) {
    // console.log(el.target.dataset.id)
    this.setData({
      id: el.target.dataset.id,
      page: 1,
      showList: [],
      itemList: [],
      isShow: true
    })
    this.getData()
    this.getGoodsList()
  }
})