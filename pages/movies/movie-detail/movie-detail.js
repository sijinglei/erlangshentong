import {
  Movie
} from 'class/Movie.js';
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    this.getDetailById(id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
  },
  getDetailById: function(movieId) {
    var that = this
    let url = app.globalData.doubanBaseUrl + '/v2/movie/subject/' + movieId
    var movie = new Movie(url);
    wx.showLoading()
    movie.getMovieData((movie) => {
      wx.setNavigationBarTitle({
        title: movie.title
      })
      that.setData({
        movie: movie,
        navigationBarTitle: movie.title
      })
      // wx.navigationBarTitleText = movie.title
      wx.hideLoading()
    })
  },
  bindDetail: function(detailData) {
    console.log(detailData)
    this.setData({
      movie: detailData
    })
  },
  viewMoviePostImg: function(e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})