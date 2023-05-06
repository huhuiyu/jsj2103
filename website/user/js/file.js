import tools from '../../js/tools.js';
import ajax from '../../js/ajax.js';

//#region 查询的部分
let page = {
  pageSize: 5,
  pageNumber: 1,
};

let queryInfo = {
  contentType: '',
  fileinfo: '',
  filename: '',
};

let list = [];

let btnQuery = document.getElementById('btnQuery');
let txtQContentType = document.getElementById('txtQContentType');
let txtQFilename = document.getElementById('txtQFilename');
let txtQFileinfo = document.getElementById('txtQFileinfo');
let tbData = document.getElementById('tbData');

function query() {
  queryInfo.contentType = txtQContentType.value;
  queryInfo.fileinfo = txtQFileinfo.value;
  queryInfo.filename = txtQFilename.value;

  ajax.send(
    '/user/file/queryAll',
    tools.concatJson(queryInfo, page),
    (data) => {
      if (!data.success) {
        showToast(data.message);
        return;
      }
      list = data.list;
      page = data.page;
      showData();
    }
  );
}

function showData() {
  tbData.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    const info = list[i];
    let tr = document.createElement('tr');
    let td;

    // 文件名
    td = document.createElement('td');
    td.append(info.filename);
    tr.append(td);

    // 文件类型
    td = document.createElement('td');
    td.append(info.contentType);
    tr.append(td);

    // 文件大小
    td = document.createElement('td');
    td.append(info.fileSize);
    tr.append(td);

    // 文件描述
    td = document.createElement('td');
    td.append(info.fileinfo);
    tr.append(td);

    // 上传时间
    td = document.createElement('td');
    td.append(tools.formatDate(info.lastupdate));
    tr.append(td);

    tbData.append(tr);
  }
}

btnQuery.addEventListener('click', () => {
  page.pageNumber = 1;
  query();
});

//#endregion

//#region 上传文件的部分

let btnShowUpload = document.getElementById('btnShowUpload');
let addDialog = document.getElementById('addDialog');
let btnBrowser = document.getElementById('btnBrowser');
let spFileInfo = document.getElementById('spFileInfo');
let txtAFileinfo = document.getElementById('txtAFileinfo');
let btnAdd = document.getElementById('btnAdd');

let addDialogObj = new bootstrap.Modal(addDialog);
let file = null;

addDialog.addEventListener('hide.bs.modal', () => {
  query();
});

addDialog.addEventListener('shown.bs.modal', () => {
  txtAFileinfo.focus();
});

btnShowUpload.addEventListener('click', () => {
  file = null;
  spFileInfo.innerHTML = '';
  addDialogObj.toggle();
});

btnBrowser.addEventListener('click', () => {
  file = null;
  spFileInfo.innerHTML = '';

  tools.openFile((fileinfo) => {
    if (fileinfo) {
      file = fileinfo;
      spFileInfo.innerHTML = file.name;
    }
  });
});

btnAdd.addEventListener('click', () => {
  ajax.file(file, txtAFileinfo.value, (data) => {
    showToast(data.message);
    if (data.success) {
      file = null;
      spFileInfo.innerHTML = '';
    }
  });
});

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
