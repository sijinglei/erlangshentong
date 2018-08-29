// var postData = require('../../data/posts-data.js')
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
    message: '',
    postList: [],
    weeklyData: []
  },
  changeItem: function(item) {
    // if (item.detail.current==1){
    //   this.data.message = '我更有钱'
    // } else if (item.detail.current == 2) {
    //   this.data.message = '我比你们都有钱'
    // } else if (item.detail.current == 3) {
    //   this.data.message = '谁最有钱谁请客吃饭'
    // } else if (item.detail.current == 4) {
    //   this.data.message = '上面一群傻逼！……………………'
    // } else if (item.detail.current == 5) {
    //   this.data.message = '呵呵……………………'
    // }else {
    //   this.data.message = '我有钱'
    // }
    // this.setData({
    //   message: this.data.message
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.data.postList =postData.postList
    // console.log(this.data.postList)
    let url = app.globalData.doubanBaseUrl + '/v2/movie/weekly'
    httpGet(url, {}, this.initPost)
  },
  initPost: function(resData) {
    console.log(resData)
    let allData = resData.subjects
    let tempArr = resData.subjects.slice(0, 5)
    let swiperArr = []
    tempArr.map(item => {
      swiperArr.push({
        image: item.subject.images.large,
        id: item.subject.id
      })
    })
    resData.subjects.map(item=>{
      item.stars = convertToStarArray(item.subject.rating.stars)
    })
    
    this.setData({
      weeklyData: swiperArr,
      postList: resData.subjects
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  onPostTapInfo: function(event) {
    console.log(event)
    let movieId = event.currentTarget.dataset.postid;
    // wx.navigateTo({
    //   url: 'post-detail/post-detail?id=' + id
    // })
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + movieId
    })
  },
  onTapInfo:function(e){
    // console.log(e)
    let movieId = e.target.dataset.postid;
    wx.navigateTo({
      url: '/pages/movies/movie-detail/movie-detail?id=' + movieId
    })
  }
})