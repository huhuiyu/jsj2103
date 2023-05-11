import ajax from '../../js/ajax.js';

//#region 登录用户信息查询

let tbUser = {};
let tbUserInfo = {};
let userOtherInfo = {};

let spUserName = document.getElementById('spUserName');
let spUser = document.getElementById('spUser');
let imgLogo = document.getElementById('imgLogo');

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

  // 处理用户头像
  if (tbUserInfo.img != '') {
    imgLogo.setAttribute('src', tbUserInfo.img);
  }
  let sex = '保密';
  if (tbUserInfo.sex == 'm') {
    sex = '男神';
  } else if (tbUserInfo.sex == 'f') {
    sex = '女神';
  }
  // 显示信息的部分
  divShowInfo.innerHTML = `
    描述：${tbUserInfo.info}<br>
    性别：${sex}<br>
    QQ：${tbUserInfo.qq}<br>
    微信：${tbUserInfo.wechat}<br>
    手机号：${tbUserInfo.phone}<br>
    邮箱：${tbUserInfo.email}<br>
    注册天数：${userOtherInfo.regDays}天<br>
  `;
}

//#endregion

//#region 用户信息修改
// https://service.huhuiyu.top/teach_project_service/user/file/download?fid=2
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

let divModify = document.getElementById('divModify');
let divShowInfo = document.getElementById('divShowInfo');
let btnChange = document.getElementById('btnChange');

btnChange.addEventListener('click', () => {
  if ('编辑' == btnChange.innerText) {
    btnChange.innerText = '返回';
    divShowInfo.style.display = 'none';
    divModify.style.display = 'block';
    btnSave.classList.remove('disabled');
  } else {
    btnChange.innerText = '编辑';
    divShowInfo.style.display = 'block';
    divModify.style.display = 'none';
    btnSave.classList.add('disabled');
  }
});

btnSave.addEventListener('click', () => {
  let info = {
    img: txtImg.value,
    info: txtInfo.value,
    nickname: txtNickname.value,
    qq: txtQq.value,
    wechat: txtWechat.value,
    sex: 'n',
  };
  // 处理性别
  if (sexm.checked) {
    info.sex = 'm';
  } else if (sexf.checked) {
    info.sex = 'f';
  }
  // 保存修改
  ajax.send('/user/auth/updateUserInfo', info, (data) => {
    showToast(data.message);
  });
});

// 关闭时要重新查询用户信息
userDialog.addEventListener('hide.bs.modal', () => {
  queryUserInfo();
});

//#endregion

//#region 安全退出
let spExit = document.getElementById('spExit');

spExit.addEventListener('click', () => {
  ajax.send('/user/auth/logout', {}, () => {
    location.href = 'login.html';
  });
});

//#endregion

//#region 邮箱修改
let txtEmail = document.getElementById('txtEmail');
let txtEmailCode = document.getElementById('txtEmailCode');
let btnEmailCode = document.getElementById('btnEmailCode');
let btnEmail = document.getElementById('btnEmail');

// 获取邮箱验证码
btnEmailCode.addEventListener('click', () => {
  let info = {
    email: txtEmail.value,
  };
  ajax.send('/tool/sendEmailCode', info, (data) => {
    showToast(data.message);
  });
});

// 修改邮箱
btnEmail.addEventListener('click', () => {
  let info = {
    email: txtEmail.value,
    code: txtEmailCode.value,
  };
  ajax.send('/user/auth/updateUserEmail', info, (data) => {
    showToast(data.message);
    if (data.success) {
      queryUserInfo();
    }
  });
});

//#endregion

//#region 菜单列表
let divMenu = document.getElementById('divMenu');
let menus = [
  { title: '用户记事本', icon: '&#xe655;', href: 'notepad.html' },
  { title: '用户文件管理', icon: '&#xe62f;', href: 'file.html' },
  { title: '黑暗骑士的网站', icon: '&#xe667;', href: 'https://huhuiyu.top' },
];

function showMenus() {
  divMenu.innerHTML = '';
  // 数组的forEach循环
  menus.forEach((item) => {
    let div1 = document.createElement('div');
    let i1 = document.createElement('i');
    div1.append(i1);
    i1.innerHTML = item.icon;
    i1.classList.add('iconfont');

    let div2 = document.createElement('div');
    div2.append(item.title);
    div1.append(div2);

    div1.addEventListener('click', () => {
      // location.href = item.href;
      window.open(item.href);
    });

    divMenu.append(div1);
  });
}

showMenus();

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
