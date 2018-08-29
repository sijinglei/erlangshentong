const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarArray = stars => {
  let num = stars.toString().substring(0, 1)
  let array = []
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}
const convertToCastString = (casts) => {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

const convertToCastInfos = (casts) => {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return [...castsArray, ...castsArray];
}
const httpGet = (url, data = {}, callback) => {
  wx.request({
    url: url,
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'json'
    },
    success: function(res) {
      if (res.statusCode === 200) {
        callback(res.data)
      } else {
        wx.showToast({
          title: res.errMsg
        })
      }
    },
    fail: function(error) {
      wx.showToast({
        title: '网络异常。'
      })
    }
  })
}

module.exports = {
  formatTime: formatTime,
  convertToStarArray: convertToStarArray,
  httpGet: httpGet,
  convertToCastString,
  convertToCastInfos
}