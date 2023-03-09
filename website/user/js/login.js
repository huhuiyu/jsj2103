import ajax from '../../js/ajax.js';
import md5 from '../../libs/md5.min.js';

let txtUsername = document.getElementById('txtUsername');
let txtPwd = document.getElementById('txtPwd');
let btnLogin = document.getElementById('btnLogin');
let spResult = document.getElementById('spResult');

btnLogin.addEventListener('click', () => {
  let user = {
    username: txtUsername.value,
    password: md5.hash(txtPwd.value),
  };
  ajax.send('/user/auth/login', user, (data) => {
    if (!data.success) {
      spResult.innerHTML = data.message;
      return;
    }
    // 成功跳转页面
    location.href = './main.html';
  });
});
