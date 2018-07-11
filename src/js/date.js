const config = {
  //判断是否为空
  isEmpty(obj) {
    return obj === '' || obj == null || obj == undefined;
  },

  // 时间格式化
  // const formatTime = date => {
  formatTime(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
      [year, month, day].map(formatNumber).join('/') +
      ' ' +
      [hour, minute, second].map(formatNumber).join(':')
    );
  },

  // 数字格式化
  // const formatNumber = n => {
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },

  //判断是否是闰年
  isLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  },

  getDayNum(year, month) {
    //获取指定年月的天数
    year = parseInt(year);
    month = parseInt(month);
    if ([1, 3, 5, 7, 8, 10, 12].indexOf(month) > -1) {
      return 31;
    } else if ([4, 6, 9, 11].indexOf(month) > -1) {
      return 30;
    } else if (this.isLeapYear(year)) {
      return 29;
    } else {
      return 28;
    }
  },

  //毫秒数转换为时分秒格式
  milliTrans(milli) {
    let time = milli / 1000;
    let seconds = parseInt(time % 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    let minutes = parseInt((time / 60) % 60);
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    let hours = parseInt((time / 3600) % 60);
    if (hours > 0) {
      console.log(hours);
      return (
        hours +
        ':' +
        (minutes != 0 ? minutes : '00') +
        ':' +
        (seconds != 0 ? seconds : '00')
      );
    } else if (minutes > 0) {
      console.log(minutes);
      return minutes + ':' + (seconds != 0 ? seconds : '00');
    } else {
      return seconds + '秒';
    }
  },

  //24小时机制
  hourMechanism(time) {
    //使用手机系统时间
    time = this.isEmpty(time) ? 0 : time;
    let current = new Date().getTime();
    let diff = (current - time) / (60 * 60 * 1000);
    if (diff > 24) {
      return true;
    } else {
      return false;
    }
  },

  //判断当前时间是否超过指定时间
  determineCurrentTime(time) {
    let balance = Date.parse(new Date()) - time;
    return balance > 0 ? true : false;
  },

  diffTwoDates(start, end) {
    //计算两个字符串日期差值，精确到天
    start = new Date(start);
    end = new Date(end);
    return parseInt(Math.abs(end - start) / 1000 / 60 / 60 / 24);
  },

  tranDateFormat(date) {
    //转换日期格式，斜杠转换为横杠，接口只识别横杠
    return date.replace(/\//g, '-');
  },

  compareDate(first, second) {
    //比较两个字符串日期大小,传斜杠的,虽然横杠和斜杠混用也不出错.  返回大的值序号
    var date1 = new Date(first),
      date2 = new Date(second);
    if (date1 < date2) {
      return 2;
    } else if (date2 == date1) {
      return 0;
    } else {
      return 1;
    }
  },

  compareThreeDate(choose, second, third) {
    //传入三个日期比较大小，依次为选中日期，开始日期，结束日期
    var date = new Date(choose),
      start = new Date(second) || '',
      end = new Date(third) || '';
    if (start == '' || end == '') {
      return 1;
    } else if (date < start) {
      return 0;
    } else if (start < date < end) {
      return 2;
    } else if (date > end) {
      return 3;
    }
  },

  //传入完整时间，返回 hh:mm
  getHourTime(date) {
    return date.slice(11, 16);
  },

  handleDayList(year, month, num, today) {
    //传入当前时间，方便灰色显示问题
    //处理月份列表,有开始和结束的话，显示下
    const that = this;
    today = today.substring(0, 10);
    var list = [],
      dateStr = year + '/' + month + '/01',
      reserveNum = new Date(dateStr).getDay(),
      isGrey = true;
    for (var i = 1 - reserveNum; i <= num; i++) {
      if (i > 0) {
        if (that.compareDate(today, year + '/' + month + '/' + (i + 1)) == 2) {
          isGrey = false;
        }
      }
      list.push({
        id: i,
        date: year + '/' + month + '/' + i,
        isRight: i > 0 ? true : false,
        isShow: false,
        isGrey: isGrey
      });
    }
    return list;
  },

  //传入完整时间，返回 MM月DD日
  formatDate(str) {
    var date = new Date(str.replace(/-/g, '/'));

    return date.getMonth() + 1 + '月' + date.getDate() + '日';
  },

  formatDateObj(date, type) {
    switch (type) {
      case 'yyyy-mm-dd hh:00':
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate() +
          ' ' +
          date.getHours() +
          ':00'
        );
      case 'yyyy-mm-dd':
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
        );
    }
  },

  getDateByDays(date, days) {
    var d = new Date();
    d.setFullYear(
      date.split('-')[0],
      date.split('-')[1] - 1,
      date.split('-')[2]
    );
    d.setDate(d.getDate() + days);

    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    return year + '-' + month + '-' + day;
  },

  //根据日历日期index返回时间字符串
  getDate(index) {
    var date;
    if (index == -1) {
      return '';
    } else {
      date = vmCalendar.calendarDates[index];
      return (
        date.year +
        '-' +
        (date.month < 10 ? '0' + date.month : date.month) +
        '-' +
        (date.day < 10 ? '0' + date.day : date.day)
      );
    }
  },

  //返回上一个月的时间字符串
  getPreMonth(date) {
    var d = new Date(date.replace(/-/g, '/')),
      year = d.getFullYear(),
      month = d.getMonth() + 1;

    if (month == 1) {
      year = year - 1;
      return year + '-12';
    } else {
      month = month - 1;
      if (month < 10) {
        month = '0' + month;
      }
      return year + '-' + month;
    }
  },

  //返回上一天的时间字符串
  getPreDay(date) {
    var d = new Date(date.replace(/-/g, '/'));
    d.setDate(d.getDate() - 1);

    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  },

  //返回下一天的时间字符串
  getNextDay(date) {
    var d = new Date(date.replace(/-/g, '/'));
    d.setDate(d.getDate() + 1);

    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  },

  //返回上月第一天和最后一天的字符串 2016-2-1, 2016-2-29
  //type: start, end
  getLastMonth(type) {
    var d = new Date(),
      year = d.getFullYear(),
      month = d.getMonth() + 1;

    if (month == 1) {
      year = year - 1;
      if (type == 'start') {
        return year + '-12-1';
      } else if (type == 'end') {
        return year + '-12-31';
      }
    } else {
      month = month - 1;
      if (type == 'start') {
        return year + '-' + month + '-1';
      } else if (type == 'end') {
        return year + '-' + month + '-' + getDayNum(year, month);
      }
    }
  },

  getWeekday(date) {
    var w_array = new Array(
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六'
      ),
      d = new Date(date.replace(/-/g, '/'));
    return w_array[d.getDay()];
  },

  //type
  //date yyyy-MM-dd
  //month yyyy年m月
  //monthFirst yyyy-MM-01
  //yearFirst yyyy-01-01
  //time hh:mm:ss
  //day d
  //hour h
  //空 yyyy-MM-dd hh:mm:ss
  getToday(type, serverTime) {
    var d;
    if (serverTime) {
      d = new Date(serverTime.replace(/-/g, '/'));
    } else {
      d = new Date();
    }
    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate(),
      week = d.getDay(),
      h = d.getHours(),
      mins = d.getMinutes(),
      s = d.getSeconds();
    if (month < 10) {
      month = '0' + month;
    } else {
      month = month + '';
    }
    if (day < 10) day = '0' + day;
    if (h < 10) h = '0' + h;
    if (mins < 10) mins = '0' + mins;
    if (s < 10) s = '0' + s;

    switch (type) {
      case 'date':
        return year + '-' + month + '-' + day;
      case 'monthNotFormat':
        return year + '-' + month;
      case 'preMonthNotFormat':
        if (month == '01') {
          year = year - 1;
          month = 12;
        } else {
          month = d.getMonth();
          if (month < 10) month = '0' + month;
        }
        return year + '-' + month;
      case 'month':
        if (month.indexOf('0') == 0) {
          month = month[1];
        }
        return year + ' 年 ' + month + ' 月 ';
      case 'monthFirst':
        return year + '-' + month + '-01';
      case 'yearFirst':
        return year + '-01-01';
      case 'time':
        return h + ':' + mins + ':' + s;
      case 'day':
        return d.getDate();
      case 'hour':
        return d.getHours();
      default:
        return year + '-' + month + '-' + day + ' ' + h + ':' + mins + ':' + s;
    }
  },

  //获取以今天为基础的日期时间字符串，addDayCount＝0就是当前时间，1为明天的此时，－1为前一天的此时
  getDates(addDayCount) {
    var d = new Date();
    d.setDate(d.getDate() + addDayCount);
    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate(),
      h = d.getHours(),
      mins = d.getMinutes(),
      s = d.getSeconds();
    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (h < 10) h = '0' + h;
    if (mins < 10) mins = '0' + mins;
    if (s < 10) s = '0' + s;
    return year + '-' + month + '-' + day + ' ' + h + ':' + mins + ':' + s;
  },

  //根据指定日期和天数，返回新的时间字符串
  calDates(date, addDayCount, type) {
    // var d = new Date(date.replace(/-/g, '/'));
    var d = new Date(date);

    d.setDate(d.getDate() + addDayCount);

    var year = d.getFullYear(),
      month = d.getMonth() + 1,
      day = d.getDate(),
      h = d.getHours(),
      mins = d.getMinutes(),
      s = d.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (h < 10) h = '0' + h;
    if (mins < 10) mins = '0' + mins;
    if (s < 10) s = '0' + s;
    switch (type) {
      case 'day':
        return year + '-' + month + '-' + day;
        break;
      default:
        return year + '-' + month + '-' + day + ' ' + h + ':' + mins + ':' + s;
        break;
    }
  }
};

export default config;
