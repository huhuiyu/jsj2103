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
