// tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(event){
      const index = event.currentTarget.dataset.index;

      this.setData({
        currentIndex:index
      })

      this.triggerEvent('tabclick',{index})
    }
  },
  
})
