// pages/movies/movies.js
import {
  convertToStarArray,
  httpGet
} from '../../utils/util.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '我是电影列表',
    inTheaterData: {},
    comingSoonData: {},
    top250Data: {},
    keyWord: '',
    searchMovies: [], //搜索结果
    containerPanel: true,
    searchPaner: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 正在上映
    let in_theaters_url = app.globalData.doubanBaseUrl + '/v2/movie/in_theaters'
    // 即将上映
    let coming_soon_url = app.globalData.doubanBaseUrl + '/v2/movie/coming_soon'
    // top250
    let top_250_url = app.globalData.doubanBaseUrl + '/v2/movie/top250'

    this.getMoviesListData('inTheaterData', in_theaters_url)
    this.getMoviesListData('comingSoonData', coming_soon_url)
    this.getMoviesListData('top250Data', top_250_url)
  },
  getMoviesListData: function(settedKey, url) {
    let that = this
    httpGet(url, {
      start: 0,
      count: 3
    }, function(data) {
      that.buildViewData(data, settedKey)
    })
  },
  buildViewData: function(bingData, settedKey) {
    console.log(bingData)
    bingData.subjects.map((item) => {
      item.title = item.title.length >= 6 ? item.title.substring(0, 6) + '...' : item.title
      item.stars = convertToStarArray(item.rating.stars)
    })
    console.log(bingData.subjects)
    let readyData = {}
    readyData[settedKey] = {
      movies: bingData.subjects
    }
    this.setData(readyData)
  },
  onMoreTap: function(event) {
    let category = event.currentTarget.dataset.category
    console.log(category)
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  },
  onMovieTap: function (event) {
    let movieId = event.currentTarget.dataset.movieid
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },
  onBindFocus: function(event) {
    this.setData({
      containerPanel: false,
      searchPaner: true
    })
  },
  onCancelImgTap: function(event) {
    this.setData({
      containerPanel: true,
      searchPaner: false,
      keyWord: '',
      searchMovies: []
    })
  },
  onBindChange: function(e) {
    let keyWord = e.detail.value
    this.setData({
      keyWord: keyWord
    })
    let search_url = app.globalData.doubanBaseUrl + '/v2/movie/search?q=' + keyWord
    this.getMoviesListData('searchMovies', search_url)
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

  }
})