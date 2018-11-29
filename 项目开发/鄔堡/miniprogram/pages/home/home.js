// miniprogram/pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
    data: {
    feeds: [],
    page: 1
  },
  onLoad: function() {
    var that = this;
    this.getFeeds(that.data.page);
  },
  onReachBottom: function() {
    wx.showLoading({
      title: '加载更多文章',
    })
    var that = this;
    this.getFeeds(that.data.page);
  },
  getFeeds: function(page) {
    if (page == 1) {
      wx.showLoading({
        title: '加载中',
      })
    }
    var that = this
    wx.request({
      url: 'http://api.sina.cn/sinago/list.json?channel=news_toutiao',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var res = res.data;

        if (that.data.page > 1) {
          var feedTemp = that.data.feeds;
          that.setData({
            feeds: feedTemp.concat(res),
            page: page + 1
          })
        } else {
          console.log(res);
          that.setData({
            feeds: res,
            page: page + 1
          })
        }
      },
      
      fail: function() {
        wx.showToast({
          title: '服务器异常',
          duration: 1500
        })
      },
      complete: function() {
        if (page >= 1) {
          wx.hideLoading()
        } else {
          //wx.stopPullDownRefresh()
        }
      }
    })
  },
  //单项的点击事件
  tapItem: function(event) {
    var that = this; 
    var article = event.currentTarget.dataset.para;
    wx.navigateTo({
      url: "/pages/details/details?id=" + article.ArticleId
    })
  }
})