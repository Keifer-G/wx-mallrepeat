// components/goos/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goodsList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    naviTo(e){
      /* console.log(e) */
      let item = e.currentTarget.dataset.item
      let iid = e.currentTarget.dataset.item.iid
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid + '&target=' +item
      })
    }
  }
})
