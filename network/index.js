const baseURL = "http://106.54.54.237:8000/api/w1" || "http://123.207.32.32:8000/api/w1";

export default function(options) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: "http://123.207.32.32:8000/api/hy" + options.url,
      timeout: 5000,
      method:options.method || 'get',
      data: options.data,
      success: res=> {
        resolve(res);
      },
      fail: reject
    })
  })
}