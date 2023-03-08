import ajax from '../../js/ajax.js';
import md5 from '../../libs/md5.min.js';

let txtUsername = document.getElementById('txtUsername');
let txtPwd = document.getElementById('txtPwd');
let txtNickname = document.getElementById('txtNickname');
let btnReg = document.getElementById('btnReg');
let spResult = document.getElementById('spResult');

btnReg.addEventListener('click', () => {
  let user = {
    username: txtUsername.value.trim(),
    password: txtPwd.value.trim(),
    nickname: txtNickname.value.trim(),
  };
  // 密码校验
  if (user.password == '') {
    alert('密码必须填写');
    return;
  }
  user.password = md5.hash(user.password);
  // 注册
  ajax.send('/user/auth/reg', user, (data) => {
    spResult.innerHTML = data.message;
  });
});
