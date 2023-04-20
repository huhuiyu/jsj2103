//#region js导入

import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';
import md5 from '../../libs/md5.min.js';

//#endregion

//#region 页面元素

let txtName = document.getElementById('txtName');
let txtCode = document.getElementById('txtCode');
let btnCode = document.getElementById('btnCode');
let txtPwd = document.getElementById('txtPwd');
let btnOk = document.getElementById('btnOk');

btnCode.addEventListener('click', () => {
  ajax.send(
    '/tool/sendUserEmailCode',
    {
      username: txtName.value,
    },
    (data) => {
      showToast(data.message);
    }
  );
});

btnOk.addEventListener('click', () => {
  if (txtPwd.value.trim() == '') {
    showToast('新密码不能为空');
    return;
  }

  let info = {
    username: txtName.value,
    code: txtCode.value,
    password: md5.hash(txtPwd.value),
  };

  ajax.send('/user/auth/findPwdByEmail', info, (data) => {
    showToast(data.message);
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
