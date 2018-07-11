// import txmap from '../../utils/qqmap-wx-jssdk.min.js';
// var txmap = require('../../utils/qqmap-wx-jssdk.min.js');
// let qqmap = new txmap({
//   key: '53SBZ-72AHG-AJYQT-IKTOB-EYUB3-HKBQL'
// });

const config = {
  /*获取当前页url*/
  getCurrentPageUrl() {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = currentPage.route; //当前页面url
    return url;
  },

  //处理图片地址
  handlePicUrl(url) {
    if (url.indexOf('http') < 0 && url != '') {
      url = 'http://img.bensue.com/' + url;
    }
    return url;
  },

  //防止多次点击
  click(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 800;
    }

    let _lastTime = null;

    // 返回新的函数
    return function() {
      let _nowTime = +new Date();
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments); //将this和参数传给原函数
        _lastTime = _nowTime;
      }
    };
  },

  //数字转汉字
  numToHan(num) {
    num = Number(num);
    switch (num) {
      case 1:
        return '一';
      case 2:
        return '二';
      case 3:
        return '三';
      case 4:
        return '四';
      case 5:
        return '五';
      case 6:
        return '六';
      case 7:
        return '七';
      case 8:
        return '八';
      case 9:
        return '九';
      case 10:
        return '十';
      case 11:
        return '十一';
      case 12:
        return '十二';
    }
  },

  arrayByNum(num) {
    //根据数字生成相应数组
    var list = [];
    for (var i = 1; i <= num; i++) {
      list.push(i);
    }
    return list;
  },

  getAddress(param) {
    //传入字符串地址，进行地址解析
    qqmap.geocoder({
      address: param.data.address,
      success(res) {
        console.log(res);
        param.success(res);
      },
      fail(res) {
        param.fail(res);
      }
    });
  },

  getAddressWord(param) {
    //传入经纬度，进行地址逆解析
    qqmap.reverseGeocoder({
      location: {
        latitude: param.data.latitude,
        longitude: param.data.longitude
      },
      get_poi: 1,
      success(res) {
        param.successCallback(res);
      },
      fail(res) {
        param.fail(res);
      }
    });
  },

  getAreaPoi(param) {
    //传入经纬度，获取目标区域热门
    // console.log(param);
    qqmap.getSuggestion({
      keyword: '盘古',
      region: '上海市',
      region_fix: 1,
      policy: 1,
      success(res) {
        // console.log(res);
      },
      fail(res) {
        param.fail(res);
      }
    });
  }
};

export default config;
