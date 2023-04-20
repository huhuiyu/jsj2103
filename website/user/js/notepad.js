//#region 导入js的部分

import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

//#endregion

//#region 页面元素获取的部分

// 查询相关的页面元素
let tbData = document.getElementById('tbData');

// 添加相关的页面元素
let addDialog = document.getElementById('addDialog');
let txtATitle = document.getElementById('txtATitle');
let txtAInfo = document.getElementById('txtAInfo');
let btnAdd = document.getElementById('btnAdd');

//#endregion

//#region  查询的部分

let queryInfo = {
  title: '',
  info: '',
};

let page = {
  pageNumber: 1,
  pageSize: 10,
};

let list = [];

function query() {
  ajax.send(
    '/user/note/queryAll',
    tools.concatJson(queryInfo, page),
    (data) => {
      if (!data.success) {
        showToast(data.message);
        return;
      }
      page = data.page;
      list = data.list;
      showData();
    }
  );
}

function showData() {
  tbData.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    let info = list[i];
    let tr = document.createElement('tr');
    tbData.append(tr);
    let td;

    // 标题
    td = document.createElement('td');
    tr.append(td);
    td.append(info.title);

    // 内容
    td = document.createElement('td');
    tr.append(td);
    td.append(info.info);

    // 修改时间
    td = document.createElement('td');
    tr.append(td);
    td.append(tools.formatDate(info.lastupdate));
  }
}

//#endregion

//#region 公用的轻提示对话框

let liveToast = document.getElementById('liveToast');
let liveToastMessing = document.querySelector('#liveToast .toast-body');

const toast = new bootstrap.Toast(liveToast);

function showToast(message) {
  liveToastMessing.innerHTML = message;
  toast.show();
}

//#endregion

query();
