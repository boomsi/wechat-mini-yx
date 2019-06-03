const api = require('../../api/api.js')
const tools = require('../../tools/tools.js')

// pages/goods/goods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [], //轮播图
    info: [],
    brand: [],
    comment: [],
    issue: [],
    attribute: [], //商品参数
    suggestList: [], //商品推荐
    parameter: null,
    id: null,
    openList: true, //是否打开商品规格选择菜单
    aboutList: [], //该商品所有规格属性列表
    goodsCount: 1, //已选中的商品数量
    alreadyChoose: [] //已选中的规格
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      id: options.id
    })
    this.getData()
    this.getSuggest()
    console.log('goods')
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
  getData: function() {
    tools.promise(api.goodsDetail, 'GET', {
        id: this.data.id
      })
      .then(res => {
        // console.log(res)
        this.setData({
          banner: res.data.data.gallery,
          info: res.data.data.info,
          brand: res.data.data.brand,
          comment: res.data.data.comment,
          issue: res.data.data.issue,
          attribute: res.data.data.attribute,
          parameter: res.data.data.info.goods_desc,
          aboutList: res.data.data.specificationList
        })
        // console.log(this.data.parameter)
        // console.log(this.data.aboutList)
      })
      .then(res => {
        this.setData({
          parameter: this.filterData(this.data.parameter)
        })
        // console.log(this.data.parameter)
      })
      .catch(err => {
        wx.showToast({
          title: '加载失败',
          mask: true,
          duration: 1500
        })
      })
  },
  getSuggest: function() { //大家都在看数据
    tools.promise(api.goodsRelated, 'GET', {
        id: this.data.id
      })
      .then(res => {
        // console.log(res)
        this.setData({
          suggestList: res.data.data.goodsList
        })
      })
  },
  filterData: function(str) { //对商品参数文本进行操作
    return str.split('"')
      .filter(item => {
        return item.match(/http/)
      })
      .filter((item, index) => {
        return index % 2 !== 0 ? true : false
      })
  },
  changeAbout: function() { //关闭规格数量的选择
    this.setData({
      openList: !this.data.openList
    })
  },
  lessCount: function() {
    if (this.data.goodsCount == 1) return;
    this.setData({
      goodsCount: this.data.goodsCount - 1
    })
  },
  addCount: function() {
    this.setData({
      goodsCount: this.data.goodsCount + 1
    })
  },
  activeActive: function(event) {
    console.log(event)
    for(item of this.data.alreadyChoose) {
      console.log(item)
    }
    this.setData({
      alreadyChoose: this.data.alreadyChoose.concat(event.target.dataset)
    })
  }
})