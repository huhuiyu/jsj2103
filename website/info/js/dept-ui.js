import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

console.log(tools.formatDate(new Date(), 'yyyy-MM-dd yyyy年'));
console.log(tools.formatDate(new Date()));

let tbDept = document.getElementById('tbDept');
let txtDeptName = document.getElementById('txtDeptName');
let btnQuery = document.getElementById('btnQuery');
let btnReset = document.getElementById('btnReset');

let dlist = [];

let page = {
  pageNumber: 1,
  pageSize: 5,
};

let queryInfo = {
  deptName: '',
};

function queryDept() {
  let param = tools.concatJson(queryInfo, page);
  console.log('合并的json:', param);

  ajax.send('/manage/dept/queryAll', param, (data) => {
    if (data.success) {
      dlist = data.list;
      showDept();
      // 分页信息更新为服务器端的返回值
      page = data.page;
      showPage();
      return;
    }
    alert(data.message);
  });
}

function showDept() {
  console.log('部门信息:', dlist, page);
  tbDept.innerHTML = '';
  for (let i = 0; i < dlist.length; i++) {
    let dept = dlist[i];
    let tr = document.createElement('tr');
    let td;
    // 部门编号
    td = document.createElement('td');
    td.append(dept.deptId);
    tr.append(td);
    // 部门编号
    td = document.createElement('td');
    td.append(dept.deptName);
    tr.append(td);
    // 部门信息
    td = document.createElement('td');
    td.append(dept.deptInfo);
    tr.append(td);
    // 信息最后修改时间
    td = document.createElement('td');
    td.append(tools.formatDate(dept.lastupdate));
    tr.append(td);

    // 操作按钮
    // 修改按钮
    td = document.createElement('td');
    let btn01 = document.createElement('button');
    btn01.append('修改');
    btn01.addEventListener('click', () => {
      showModify(dept);
    });
    // 附加bootstrap的样式
    btn01.classList.add('btn', 'btn-primary', 'btn-sm', 'me-1');
    td.append(btn01);
    // 删除按钮
    let btn02 = document.createElement('button');
    btn02.append('删除');
    btn02.addEventListener('click', () => {
      del(dept);
    });
    btn02.classList.add('btn', 'btn-danger', 'btn-sm', 'me-1');

    td.append(btn02);

    tr.append(td);

    tbDept.append(tr);
  }
}

btnQuery.addEventListener('click', () => {
  // 更新查询条件
  queryInfo.deptName = txtDeptName.value;
  // 切换到第一页
  page.pageNumber = 1;
  // 查询
  queryDept();
});

btnReset.addEventListener('click', () => {
  txtDeptName.value = '';
  btnQuery.click();
});

// 分页的部分 ====================================
let spans = document.querySelectorAll('#divPage > span');
console.log('通过css选择器获取页面一组元素', spans);

function showPage() {
  console.log('分页信息：', page);
  // `模板字符串，可以通过${变量表达式注入变量值}`
  spans[1].innerHTML = `
  记录总数/当前页/总页数:
  ${page.total}/${page.pageNumber}/${page.pageCount}
  `;
}

// document.querySelector('#divPage > span:nth-of-type(3)')
// 下一页
spans[2].addEventListener('click', () => {
  page.pageNumber++;
  if (page.pageNumber > page.pageCount) {
    page.pageNumber = page.pageCount;
    return;
  }
  queryDept();
});

// 上一页
spans[0].addEventListener('click', () => {
  page.pageNumber--;
  if (page.pageNumber < 1) {
    page.pageNumber = 1;
    return;
  }
  queryDept();
});

// 添加的部分 =================================================
let dialogAdd = document.getElementById('dialogAdd');
let txtAName = document.getElementById('txtAName');
let txtAInfo = document.getElementById('txtAInfo');
let btnAdd = document.getElementById('btnAdd');

btnAdd.addEventListener('click', () => {
  let info = {
    deptInfo: txtAInfo.value,
    deptName: txtAName.value,
  };

  ajax.send('/manage/dept/add', info, (data) => {
    showToast(data.message);
    if (data.success) {
      txtAInfo.value = '';
      txtAName.value = '';
    }
  });
});

dialogAdd.addEventListener('hide.bs.modal', () => {
  page.pageNumber = 1;
  queryDept();
});

//#region 公用的轻提示对话框
let liveToast = document.getElementById('liveToast');
let liveToastMessing = document.querySelector('#liveToast .toast-body');

const toast = new bootstrap.Toast(liveToast);

function showToast(message) {
  liveToastMessing.innerHTML = message;
  toast.show();
}
//#endregion

queryDept();
