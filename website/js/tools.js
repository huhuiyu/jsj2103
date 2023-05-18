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
  // 门户信息的格式转换
  convertProtableInfo: (list) => {
    let json = {};
    for (let i = 0; i < list.length; i++) {
      const info = list[i];
      // 判定json中是否有对应的messageGroup
      if (!json[info.messageGroup]) {
        json[info.messageGroup] = {};
      }
      json[info.messageGroup][info.messageKey] = info.message;
    }

    return json;
  },
  // 将文字信息复制到剪贴板
  copyText: async (text) => {
    // 剪贴板对象的实现方式（更新和更好的方式，但是需要浏览器授权）
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (ex) {
      console.error(ex);
    }
    // 原始的，不支持剪贴板对象的实现方式
    // 创建输入框并设置内容
    let input = document.createElement('input');
    input.value = text;
    // 放到页面上
    document.body.appendChild(input);
    // 选中文本框中的内容
    input.focus();
    input.select();
    input.setSelectionRange(0, text.length);
    // 调用浏览器的复制指令
    document.execCommand('Copy');
    // 移除input
    document.body.removeChild(input);
  },
};

export default tools;

export { tools as tools };
