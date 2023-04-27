import { ajax } from './ajax.js';
import { tools } from './tools.js';

console.log('导入的js：', ajax, tools);

//#region  查询的部分
let queryInfo = {
  deptId: -1,
  employeeName: '',
  orderBy: 2,
  phone: '',
};

let page = {
  pageNumber: 1,
  pageSize: 5,
  pageCount: 0,
  total: 0,
};

/**
 * 员工列表
 */
let list = [];

/**
 * 查询员工的方法
 */
function query() {
  let info = tools.concatJson(queryInfo, page);
  ajax.send('/manage/employee/queryAll', info, (data) => {
    if (data.success) {
      list = data.list;
      page = data.page;
      showData();
      showPage();
      return;
    }
    showToast(data.message);
  });
}

/**
 * 显示员工数据到表格
 */
function showData() {}

/**
 * 显示员工数据分页信息
 */
function showPage() {}

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

query();
