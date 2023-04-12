import ajax from '../../js/ajax.js';

//#region 登录用户信息查询

let tbUser = {};
let tbUserInfo = {};
let userOtherInfo = {};

let spUserName = document.getElementById('spUserName');
let spUser = document.getElementById('spUser');

function queryUserInfo() {
  ajax.send('/user/auth/getUserInfo', {}, (data) => {
    if (data.success) {
      tbUser = data.tbUser;
      tbUserInfo = data.tbUserInfo;
      userOtherInfo = data.userOtherInfo;
      showUser();
    } else {
      showToast('用户未登录');
    }
  });
}

function showUser() {
  spUserName.innerHTML = tbUser.username;
  spUser.innerHTML = `${tbUser.nickname}(${tbUser.role})`;

  txtNickname.value = tbUser.nickname;

  txtImg.value = tbUserInfo.img;
  txtInfo.value = tbUserInfo.info;
  txtQq.value = tbUserInfo.qq;
  txtWechat.value = tbUserInfo.wechat;
  // 性别显示
  if ('m' == tbUserInfo.sex) {
    sexm.checked = true;
  } else if ('f' == tbUserInfo.sex) {
    sexf.checked = true;
  } else if ('n' == tbUserInfo.sex) {
    sexn.checked = true;
  }
}

//#endregion

//#region 用户信息修改
let userDialog = document.getElementById('userDialog');
let txtImg = document.getElementById('txtImg');
let txtInfo = document.getElementById('txtInfo');
let txtNickname = document.getElementById('txtNickname');
let txtQq = document.getElementById('txtQq');
let txtWechat = document.getElementById('txtWechat');
let sexm = document.getElementById('sexm');
let sexf = document.getElementById('sexf');
let sexn = document.getElementById('sexn');
let btnSave = document.getElementById('btnSave');

//#endregion

//#region 安全退出
let spExit = document.getElementById('spExit');

spExit.addEventListener('click', () => {
  ajax.send('/user/auth/logout', {}, () => {
    location.href = 'login.html';
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

queryUserInfo();
