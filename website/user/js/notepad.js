//#region 导入js的部分

import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

//#endregion

//#region 页面元素获取的部分

// 查询相关的页面元素
let tbData = document.getElementById('tbData');
let btnQuery = document.getElementById('btnQuery');
let btnReset = document.getElementById('btnReset');
let txtQTitle = document.getElementById('txtQTitle');
let txtQInfo = document.getElementById('txtQInfo');

// 添加相关的页面元素
let addDialog = document.getElementById('addDialog');
let txtATitle = document.getElementById('txtATitle');
let txtAInfo = document.getElementById('txtAInfo');
let btnAdd = document.getElementById('btnAdd');

// 修改相关的页面元素
let modifyDialog = document.getElementById('modifyDialog');
let txtMTitle = document.getElementById('txtMTitle');
let txtMInfo = document.getElementById('txtMInfo');
let btnModify = document.getElementById('btnModify');

// 分页相关页面元素
let pages = document.querySelectorAll('#navPage > span');

//#endregion

//#region  查询的部分

let queryInfo = {
  title: '',
  info: '',
};

let page = {
  pageNumber: 1,
  pageSize: 5,
};

let list = [];

btnQuery.addEventListener('click', () => {
  page.pageNumber = 1;
  queryInfo.title = txtQTitle.value;
  queryInfo.info = txtQInfo.value;
  query();
});

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
      showPage();
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

    // 操作的部分
    td = document.createElement('td');
    tr.append(td);
    // 修改按钮
    let btn1 = document.createElement('span');
    btn1.append('修改');
    btn1.classList.add('btn', 'btn-primary', 'btn-sm', 'm-1');
    td.append(btn1);
    btn1.addEventListener('click', () => {
      showModify(info);
    });

    // 删除按钮
    let btn2 = document.createElement('span');
    btn2.append('删除');
    btn2.classList.add('btn', 'btn-danger', 'btn-sm', 'm-1');
    td.append(btn2);
    btn2.addEventListener('click', () => {
      showDel(info);
    });
  }
}

function showPage() {
  pages[1].innerHTML = `
    当前页/总页数/记录数：
    ${page.pageNumber}/
    ${page.pageCount}/
    ${page.total}
  `;
}

pages[0].addEventListener('click', () => {
  page.pageNumber--;
  if (page.pageNumber < 1) {
    page.pageNumber = 1;
    return;
  }
  query();
});

pages[2].addEventListener('click', () => {
  page.pageNumber++;
  if (page.pageNumber > page.pageCount) {
    page.pageNumber = page.pageCount;
    return;
  }
  query();
});

//#endregion

//#region 添加的部分

btnAdd.addEventListener('click', () => {
  let info = {
    title: txtATitle.value,
    info: txtAInfo.value,
  };
  ajax.send('/user/note/add', info, (data) => {
    showToast(data.message);
    if (data.success) {
      txtATitle.value = '';
      txtAInfo.value = '';
      txtATitle.focus();
    }
  });
});

addDialog.addEventListener('hide.bs.modal', () => {
  query();
});

//#endregion

//#region 修改的部分

let modifyInfo = {};

function showModify(info) {
  console.log('修改的信息：', info);
  modifyInfo = info;
}

//#endregion

//#region 删除的部分

function showDel(info) {
  console.log('删除的信息：', info);
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
