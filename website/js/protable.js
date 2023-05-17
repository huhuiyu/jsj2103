import { ajax, accessKey } from '../js/ajax.js';
console.log(accessKey);

//#region 计数器相关
const COUNT_01 = 'huhuiyu.top.access';
let sp01 = document.getElementById('sp01');

function queryCount01() {
  ajax.send(
    '/portable/message/counterInfo',
    {
      accessKey: accessKey,
      messageKey: COUNT_01,
    },
    (data) => {
      console.log('计数器1：', data);
      if (data.success) {
        sp01.innerHTML = data.message;
      }
    }
  );
}

function addCount01() {
  ajax.send(
    '/portable/message/counterAdd',
    {
      accessKey: accessKey,
      messageKey: COUNT_01,
    },
    () => {
      queryCount01();
    }
  );
}

addCount01();
// accessKey是区分用户的信息
// messageKey是区分应用的信息

const COUNT_02 = 'huhuiyu.top.access_2';
let sp02 = document.getElementById('sp02');

function queryCount02() {
  ajax.send(
    '/portable/message/counterInfo',
    {
      accessKey: accessKey,
      messageKey: COUNT_02,
    },
    (data) => {
      console.log('计数器2：', data);
      if (data.success) {
        sp02.innerHTML = data.message;
      }
    }
  );
}

function addCount02() {
  // 控制浏览器没有关闭的情况下不要反复发起计数器添加
  let hascount = sessionStorage.getItem(COUNT_02);
  console.log('hascount', hascount);
  if (hascount == 'hascount') {
    queryCount02();
    return;
  }
  ajax.send(
    '/portable/message/counterAdd',
    {
      accessKey: accessKey,
      messageKey: COUNT_02,
    },
    () => {
      sessionStorage.setItem(COUNT_02, 'hascount');
      queryCount02();
    }
  );
}

setTimeout(addCount02, 1000);

// 最完善的版本，指定时间间隔刷新计数器
// 1：获取本地存储的上一次添加计数器的时间戳
// 2：如果不存在
// 2-1：本地存储当前时间戳
// 2-2：计数器加一
// 3：如果存在，就和当前时间戳进行比对
// 3-1：已经超过时间间隔，调用步骤2的流程
// 3-2：没有超过时间间隔，流程终止，直接进查询

//#endregion

//#region 门户信息的使用

function queryProtable() {
  ajax.send(
    '/portable/message/queryAll',
    {
      accessKey: accessKey,
      messageGroup: 'protable',
    },
    (data) => {
      if (!data.success) {
        alert(data.message);
        return;
      }
      console.log('门户信息：', data.list);

      document.querySelector('title').innerHTML 
        = data.list[0].message;
    }
  );
}

queryProtable();

//#endregion
