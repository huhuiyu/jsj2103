import ajax from '../../js/ajax.js';

let tbDept = document.getElementById('tbDept');

let dlist = [];
let page = {};

function queryDept() {
  ajax.send('/manage/dept/queryAll', {}, (data) => {
    if (data.success) {
      dlist = data.list;
      showDept();
      return;
    }
    alert(data.message);
  });
}

function showDept() {
  console.log('部门信息:', dlist, page);
}

queryDept();
