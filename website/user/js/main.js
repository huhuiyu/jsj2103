import ajax from '../../js/ajax.js';
// null , 404 , undefined
let spName = document.getElementById('spName');
let spNick = document.getElementById('spNick');
let divInfo = document.getElementById('divInfo');

let tbUser = {};
let tbUserInfo = {};
let userOtherInfo = {};

function queryUserInfo() {
  ajax.send('/user/auth/getUserInfo', {}, (data) => {
    if (data.success) {
      tbUser = data.tbUser;
      tbUserInfo = data.tbUserInfo;
      userOtherInfo = data.userOtherInfo;
      showUser();
    } else {
      alert('用户未登录');
    }
  });
}

function showUser() {
  spName.innerHTML = tbUser.nickname;
  spNick.innerHTML = tbUser.username;

  divInfo.append(JSON.stringify(tbUser));
  divInfo.append(document.createElement('hr'));
  divInfo.append(JSON.stringify(tbUserInfo));
  divInfo.append(document.createElement('hr'));
  divInfo.append(JSON.stringify(userOtherInfo));
}

let alogout = document.getElementById('alogout');

alogout.addEventListener('click', () => {
  ajax.send('/user/auth/logout', {}, () => {
    location.href = 'login.html';
  });
});

queryUserInfo();
