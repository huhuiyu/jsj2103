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

function showPage() {
  console.log('分页信息：', page);
}

queryDept();
