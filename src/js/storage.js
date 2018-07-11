const config = {
  // 本地存储
  // 获取storage
  getStorage(key) {
    var object = wx.getStorageSync(key);
    // if (object) {
    //   object = JSON.parse(object)
    // }
    return object;
  },

  // 设置storage
  setStorage(key, object) {
    var i,
      o = wx.getStorageSync(key);
    if (object) {
      if (o) {
        if (typeof o === 'object') {
          for (i in object) {
            if (object.hasOwnProperty(i)) {
              o[i] = object[i];
            }
          }
          wx.setStorageSync(key, o);
          // sessionStorage.setItem(key, JSON.stringify(o))
        } else {
          wx.setStorageSync(key, object);
          // sessionStorage.setItem(key, JSON.stringify(object))
        }
      } else {
        wx.setStorageSync(key, object);
        // sessionStorage.setItem(key, JSON.stringify(object))
      }
    } else {
      wx.setStorageSync(key);
      // sessionStorage.setItem(key, null)
    }
  }
};

export default config;
