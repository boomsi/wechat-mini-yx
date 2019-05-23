module.exports = {
  promise: function (url, type, data) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        data: data,
        method: type,
        dataType: 'json',
        responseType: 'text',
        success: resolve,
        fail: reject
      })
    })
  }
}