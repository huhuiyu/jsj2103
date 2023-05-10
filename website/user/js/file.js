import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

//#region 公用方法部分

// 判断文件是否可以被预览
function isPreview(fileinfo) {
  return (
    fileinfo.contentType.startsWith('image/') ||
    fileinfo.contentType.startsWith('audio/') ||
    fileinfo.contentType.startsWith('video/')
  );
}

function isImage(fileinfo) {
  return fileinfo.contentType.startsWith('image/');
}

function isAudio(fileinfo) {
  return fileinfo.contentType.startsWith('audio/');
}

function isVideo(fileinfo) {
  return fileinfo.contentType.startsWith('video/');
}

//#endregion

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

    // 操作的部分
    td = document.createElement('td');
    tr.append(td);
    // 预览按钮
    if (isPreview(info)) {
      let btn1 = document.createElement('span');
      btn1.append('预览');
      btn1.classList.add('btn', 'btn-primary', 'btn-sm', 'me-1');
      td.append(btn1);

      btn1.addEventListener('click', () => {
        showPreview(info);
      });
    }
    // 下载按钮
    let btn2 = document.createElement('span');
    btn2.append('下载');
    btn2.classList.add('btn', 'btn-info', 'btn-sm', 'me-1');
    td.append(btn2);

    btn2.addEventListener('click', () => {
      let url = ajax.getFileUrl(info.fid);
      console.log(url, ajax.isFileUrl(url), ajax.getUrlFid(url));
      window.open(url);
    });

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
  if (!file || file.size > 2 * 1000 * 1000) {
    showToast('文件必须选择且不能超过2mb大小');
    return;
  }
  btnAdd.innerHTML = '上传中...';
  btnAdd.classList.add('disabled');
  ajax.file(file, txtAFileinfo.value, (data) => {
    btnAdd.classList.remove('disabled');
    btnAdd.innerHTML = '上传';
    showToast(data.message);
    if (data.success) {
      file = null;
      spFileInfo.innerHTML = '';
    }
  });
});

//#endregion

//#region 预览的部分

let previewDialog = document.getElementById('previewDialog');
let previewDialogObj = new bootstrap.Modal(previewDialog);
let previewDialogBody = document.querySelector(
  '#previewDialog .modal-body > div'
);

function showPreview(info) {
  let ele;
  // 判定预览的元素
  if (isImage(info)) {
    ele = document.createElement('img');
    ele.setAttribute('src', ajax.getFileUrl(info.fid));
  }
  if (isAudio(info)) {
    ele = document.createElement('audio');
    ele.setAttribute('src', ajax.getFileUrl(info.fid));
    ele.setAttribute('controls', '');
  }
  if (isVideo(info)) {
    ele = document.createElement('video');
    ele.setAttribute('src', ajax.getFileUrl(info.fid));
    ele.setAttribute('controls', '');
  }

  // 创建预览元素并添加到对话框的body中
  previewDialogBody.innerHTML = '';
  previewDialogBody.append(ele);
  previewDialogObj.toggle();
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
