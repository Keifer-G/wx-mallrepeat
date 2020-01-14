// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfoImg:"../../assets/img/profile/avatar.png"
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
  imagechoose(){
    wx.chooseImage({
      count:1,
      success:res=>{
        // success
        this.setData({
          userInfoImg: res.tempFilePaths
        })
      }  
    })
  }
})