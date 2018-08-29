import {
  convertToStarArray,
  httpGet
} from '../../../utils/util.js'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: '',
    navigationBarTitle: '',
    movies: {},
    isEmpty: true,
    totalCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let category = options.category
    console.log(category)
    this.data.navigationBarTitle = category
    let data_url = ''
    switch (category) {
      case '正在热映':
        data_url = app.globalData.doubanBaseUrl + '/v2/movie/in_theaters'
        break;
      case '即将上映':
        data_url = app.globalData.doubanBaseUrl + '/v2/movie/coming_soon'
        break;
      case '豆瓣Top250':
        data_url = app.globalData.doubanBaseUrl + '/v2/movie/top250'
        break;
    }
    this.data.requestUrl = data_url
    httpGet(data_url, {}, this.buildViewData)
  },
  buildViewData: function(bingData) {
    bingData.subjects.map((item) => {
      item.title = item.title.length >= 6 ? item.title.substring(0, 6) + '...' : item.title
      item.stars = convertToStarArray(item.rating.stars)
    })
    let totalMovies = []
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(bingData.subjects)
    } else {
      totalMovies = bingData.subjects
      this.data.isEmpty = false
    }
    wx.hideNavigationBarLoading()
    this.setData({
      movies: totalMovies
    })
    this.data.totalCount += 20
  },
  onReachBottom: function() {
    console.log('加载更多')
    this.data.isEmpty = false
    let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
    httpGet(nextUrl, {}, this.buildViewData)
    wx.showNavigationBarLoading()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    let that = this
    that.data.movies = []
    console.log('下拉刷新')
    that.data.totalCount = 0
    that.data.isEmpty = true
    wx.showNavigationBarLoading()
    let nextUrl = that.data.requestUrl + '?start=0&count=20'
    httpGet(nextUrl, {}, that.buildViewData)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 2000)
  },
  onMovieTap: function(event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.setNavigationBarTitle({
      title: this.data.navigationBarTitle,
    })
  }
})