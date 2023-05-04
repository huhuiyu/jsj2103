let tools = {
  // 格式化日期
  formatDate: (date, format = 'yyyy-MM-dd hh:mm:ss') => {
    let time = new Date();
    // 如果传入的是日期对象就直接赋值
    if (typeof date == 'Date') {
      time = date;
    } else {
      // 否则就是时间戳
      time.setTime(date);
    }
    // 获取分区时间信息
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    // 格式化
    let result = format.replace(/yyyy/g, y);
    result = result.replace(/MM/g, m);
    result = result.replace(/dd/g, d);
    result = result.replace(/hh/g, h);
    result = result.replace(/mm/g, mm);
    result = result.replace(/ss/g, s);
    return result;
  },
  // 合并多个json为一个，...是不定长参数
  concatJson: (...jsons) => {
    let result = {};
    for (let i = 0; i < jsons.length; i++) {
      const json = jsons[i];
      // json对象的key循环
      for (let key in json) {
        // {id:100,name:'胡辉煜'}
        // key=>id,name
        // json['id'] ==> 100
        console.log(key, json[key]);
        // 复制信息
        result[key] = json[key];
      }
    }

    return result;
  },
  // 浏览文件，通过回调返回文件
  openFile: (cb) => {
    let efile = document.createElement('input');
    efile.setAttribute('type', 'file');

    efile.addEventListener('change', () => {
      // 有选中文件的情况
      if (efile.files && efile.files.length > 0) {
        // 回调传回文件
        cb(efile.files[0]);
      }
    });

    efile.click();
  },
};

export default tools;
