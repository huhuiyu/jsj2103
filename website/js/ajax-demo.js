import ajax from './ajax.js';

let txtEcho = document.getElementById('txtEcho');
let btnSend = document.getElementById('btnSend');
let spResult = document.getElementById('spResult');

btnSend.addEventListener('click', () => {
  ajax.send(
    '/',
    {
      echo: txtEcho.value,
    },
    (data) => {
      spResult.innerHTML = JSON.stringify(data);
    },
    'get'
  );
});

// 校验码的部分
let imgCode = document.getElementById('imgCode');
let acode = document.getElementById('acode');
let txtCode = document.getElementById('txtCode');
let btnCode = document.getElementById('btnCode');

function loadImgCode() {
  ajax.send('/tool/getImageCode', {}, (data) => {
    imgCode.setAttribute('src', data.message);
  });
}

loadImgCode();

imgCode.addEventListener('click', loadImgCode);
acode.addEventListener('click', loadImgCode);

btnCode.addEventListener('click', () => {
  ajax.send(
    '/tool/checkImageCode',
    {
      code: txtCode.value,
    },
    (data) => {
      alert(data.message);
    }
  );
});
