const ApiRootUrl = 'http://127.0.0.1:8360/api/'
module.exports = {
  indexUrl: ApiRootUrl + 'index/index',
  topicUrl: ApiRootUrl + 'topic/list',
  catelogUrl: ApiRootUrl + 'catalog/index',
  searchIndexUrl: ApiRootUrl + 'search/index',
  goodsCount: ApiRootUrl + 'goods/count',
  goodsCategory: ApiRootUrl + 'goods/category',
  goodsList: ApiRootUrl + 'goods/list', 
  goodsDetail: ApiRootUrl + 'goods/detail',
  goodsRelated: ApiRootUrl + 'goods/related',
  commentList: ApiRootUrl + 'comment/list',
  commentCount: ApiRootUrl + 'comment/count',
  brandDetail: ApiRootUrl + 'brand/detail',
}
