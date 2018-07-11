const config = {
  //判断是否为空
  isEmpty(obj) {
    return obj === '' || obj == null || obj == undefined;
  },

  validMoney(money) {
    var reg = /^\d+(\.\d+)?$/;
    return reg.test(money);
  },

  //正则表达式判断手机号码是否正确,不正确，返回true
  phone(mobile) {
    var tel = /^1[3|4|5|7|8]\d{9}$/;
    return tel.test(mobile.replace(/[^0-9]/gi, ''));
  },

  //正则表达式整理iOS设备不规则手机号码，返回字符串中所有数字
  trim(mobile) {
    console.log(mobile.replace(/[^0-9]/gi, ''));
    return mobile.replace(/[^0-9]/gi, '');
  },

  //正则表达式判断身份证号码是否正确
  judgeIdno(idNo) {
    var idCard = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    return idCard.test(idNo);
  }
};

export default config;
