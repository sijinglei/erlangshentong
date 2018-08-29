import {
  httpGet
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:'',
    origin:'',
    author:'',
    category:'',
    openData:[],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadData()
  },
  loadData(){
    // 古诗词
    // httpGet('https://api.gushi.ci/all.json', {}, this.InitData)
    // 随机热门段子
    httpGet('https://www.apiopen.top/satinApi?type=1&page=1', {}, this.InitData)
  },
  InitData: function (res ){
    console.log(res)
    this.setData({
      openData:res.data
    })
    wx.hideNavigationBarLoading()
  },
  // onReachBottom: function () {
  //   console.log('加载更多')
  //   this.data.page+=1
  //   let nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=20'
  //   httpGet('https://www.apiopen.top/satinApi?type=1&page=' + this.data.page, {}, this.InitData)
  //   wx.showNavigationBarLoading()
  // },
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