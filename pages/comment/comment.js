const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/comment/comment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    valueId: null,
    typeId: null,
    allCount: null,
    hasPicCount: null,
    commentList: [],
    hasPicList: [],
    isShow: 0,
    size: 20,
    page: 1,
    over: false,
    showBig: null,
    isShowBig: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      valueId: options.valueId,
      typeId: options.typeId
    })
    this.getData()
    this.getCount()
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
  // 上拉触底
  onReachBottom: function () {
    if (!this.data.over) {
      wx.showLoading({
        title: '加载中',
      })
      this.getData()
    } else {
      wx.showToast({
        title: '到底啦',
        mask: true,
        duration: 1500
      })
    }
  },
  getData: function() {
    tools.promise(api.commentList, 'GET', {
      valueId: this.data.valueId,
      typeId: this.data.typeId,
      size: this.data.size,
      page: this.data.page,
      showType: 0
    })
    .then(res => {
      // console.log(res)
      if(res.data.data.data.length === 0) {
        this.data.over = true
      }
      this.setData({
        commentList: this.data.commentList.concat(res.data.data.data),
        page: this.data.page + 1
      })
      if (this.data.isShow === 1) {
        this.changeComment()
      }
    })
    .then(res => {
      wx.hideLoading()
    })
    .catch(err => {
      wx.showToast({
        title: '加载失败',
        mask: true,
        duration: 1500
      })
    })
  },
  getCount: function () {
    tools.promise(api.commentCount, 'GET', {
      valueId: this.data.valueId,
      typeId: this.data.typeId
    })
    .then(res => {
      // console.log(res)
      this.setData({
        allCount: res.data.data.allCount,
        hasPicCount: res.data.data.hasPicCount
      })
    })
  },
  filterPic: function () {//仅作为筛选有图评论
    return this.data.commentList.filter(item => {
      return item.pic_list.length === 0 ? false : true
    })
  },
  changeComment: function () {
    this.setData({
      hasPicList: this.filterPic(),
      isShow: 1
    })
  },
  changeAll: function () {
    this.setData({
      isShow: 0
    })
  },
  showBig: function (event) {
    this.setData({
      showBig: event.target.dataset.url,
      isShowBig: true
    })
  },
  hideBig: function () {
    this.setData({
      showBig: null,
      isShowBig: false
    })
  }
})
