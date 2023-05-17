import { ajax } from '../../js/ajax.js';

//#region 门户信息查询
let preData = document.getElementById('preData');
function query() {
  ajax.send('/portable/message/queryUserAll', {}, (data) => {
    preData.innerHTML = JSON.stringify(data, null, 2);
  });
}

query();
//#endregion

//#region 添加门户信息的部分
let txt01 = document.getElementById('txt01');
let txt02 = document.getElementById('txt02');
let txt03 = document.getElementById('txt03');
let btn1 = document.getElementById('btn1');

btn1.addEventListener('click', () => {
  ajax.send(
    '/portable/message/add',
    {
      message: txt01.value,
      messageGroup: txt02.value,
      messageKey: txt03.value,
    },
    (data) => {
      alert(data.message);
    }
  );
});

//#endregion
