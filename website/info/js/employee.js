import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

//#region 查询的部分=============
let tbData = document.getElementById('tbData');

let txtQName = document.getElementById('txtQName');
let txtQPhone = document.getElementById('txtQPhone');
let txtOrder = document.getElementById('txtOrder');
let btnQuery = document.getElementById('btnQuery');
let btnReset = document.getElementById('btnReset');

let page = {
  pageNumber: 1,
  pageSize: 5,
  total: 0,
  pageCount: 1,
};

let queryInfo = {
  deptId: -1,
  employeeName: '',
  orderBy: 2,
  phone: '',
};

let elist = [];

btnQuery.addEventListener('click', () => {
  queryInfo.employeeName = txtQName.value;
  queryInfo.phone = txtQPhone.value;
  queryInfo.orderBy = txtOrder.value;

  page.pageNumber = 1;
  queryEmp();
});

function queryEmp() {
  let info = tools.concatJson(queryInfo, page);
  ajax.send('/manage/employee/queryAll', info, (data) => {
    if (data.success) {
      elist = data.list;
      page = data.page;
      showEmp();
      showPage();
      return;
    }
    alert(data.message);
  });
}

function showEmp() {
  tbData.innerHTML = '';
  for (let i = 0; i < elist.length; i++) {
    const emp = elist[i];
    let tr = document.createElement('tr');
    let td;
    // 所属部门
    td = document.createElement('td');
    td.append(emp.dept.deptName);
    tr.append(td);
    // 姓名
    td = document.createElement('td');
    td.append(emp.employeeName);
    tr.append(td);
    // 手机号码
    td = document.createElement('td');
    td.append(emp.phone);
    tr.append(td);
    // 信息修改时间
    td = document.createElement('td');
    td.append(tools.formatDate(emp.lastupdate));
    tr.append(td);

    // 操作按钮部分
    td = document.createElement('td');
    let mbtn = document.createElement('button');
    mbtn.append('修改');
    td.append(mbtn);

    let dbtn = document.createElement('button');
    dbtn.append('删除');
    td.append(dbtn);

    // 修改功能
    mbtn.addEventListener('click', () => {
      showModify(emp);
    });

    tr.append(td);

    tbData.append(tr);
  }
}
//#endregion

//#region 分页的部分
let links = document.querySelectorAll('nav > a');
let sppage = document.querySelector('nav > span');
console.log('分页的元素：', links, sppage);

function showPage() {
  sppage.innerHTML = `
    记录数/当前页/总页数
    ${page.total}/${page.pageNumber}/${page.pageCount}
  `;
}

// 第一页
links[0].addEventListener('click', () => {
  if (page.pageNumber == 1) {
    return;
  }
  page.pageNumber = 1;
  queryEmp();
});

// 上一页
links[1].addEventListener('click', () => {
  page.pageNumber--;
  if (page.pageNumber < 1) {
    page.pageNumber = 1;
    return;
  }
  queryEmp();
});

// 下一页
links[2].addEventListener('click', () => {
  page.pageNumber++;
  if (page.pageNumber > page.pageCount) {
    page.pageNumber = page.pageCount;
    return;
  }
  queryEmp();
});

// 最后一页
links[3].addEventListener('click', () => {
  if (page.pageNumber == page.pageCount) {
    return;
  }
  page.pageNumber = page.pageCount;
  queryEmp();
});

//#endregion

//#region 部门选择的部分
// 部门选择对话框的选择模式，1：查询，2：添加，3：修改
let mode = 1;

let dlist = [];
let dpage = {
  pageNumber: 1,
  pageSize: 5,
};
let dquery = {
  deptName: '',
};

let txtDept = document.getElementById('txtDept');
let tbDept = document.getElementById('tbDept');
let btnDept = document.getElementById('btnDept');

let deptDialog = document.getElementById('deptDialog');
let btnQueryDept = document.getElementById('btnQueryDept');
let btnCloseDept = document.getElementById('btnCloseDept');

btnDept.addEventListener('click', () => {
  // 切换mode到查询
  mode = 1;
  queryDept();
  deptDialog.showModal();
});

btnCloseDept.addEventListener('click', () => {
  // 触发表单提交（关闭对话框）
  document.querySelector('#deptDialog form').submit();
});

function queryDept() {
  dquery.deptName = txtDept.value;
  let info = tools.concatJson(dquery, dpage);
  ajax.send('/manage/dept/queryAll', info, (data) => {
    if (data.success) {
      dpage = data.page;
      dlist = data.list;
      showDept();
      return;
    }
    alert(data.message);
  });
}

function showDept() {
  tbDept.innerHTML = '';

  for (let i = 0; i < dlist.length; i++) {
    const dept = dlist[i];
    let tr = document.createElement('tr');
    let td;
    // 部门名称
    td = document.createElement('td');
    td.append(dept.deptName);
    tr.append(td);
    // 选择操作
    td = document.createElement('td');
    let button = document.createElement('button');
    button.append('选择此部门');
    button.addEventListener('click', () => {
      // 查询模式
      if (mode == 1) {
        // 修改查询条件
        queryInfo.deptId = dept.deptId;
        // 显示选中的部门
        btnDept.innerHTML = `选中的部门：${dept.deptName}`;
      } else if (mode == 2) {
        // 添加模式
        addInfo.deptId = dept.deptId;
        btnADept.innerHTML = `选中的部门：${dept.deptName}`;
      } else if (mode == 3) {
        // 修改模式
        modifyInfo.deptId = dept.deptId;
        btnMDept.innerHTML = `所属部门：${dept.deptName}`;
      }

      // 关闭对话框
      btnCloseDept.click();
    });

    td.append(button);
    tr.append(td);

    tbDept.append(tr);
  }
}

//#endregion

//#region 添加的部分
let addDialog = document.getElementById('addDialog');
let btnADept = document.getElementById('btnADept');
let txtAName = document.getElementById('txtAName');
let txtAPhone = document.getElementById('txtAPhone');
let btnAdd = document.getElementById('btnAdd');
let btnAClose = document.getElementById('btnAClose');
let btnShowAdd = document.getElementById('btnShowAdd');

let addInfo = {};

btnShowAdd.addEventListener('click', () => {
  addDialog.showModal();
});

btnAClose.addEventListener('click', () => {
  document.querySelector('#addDialog form').submit();
});

btnADept.addEventListener('click', () => {
  // 切换到添加mode
  mode = 2;
  queryDept();
  deptDialog.showModal();
});

btnAdd.addEventListener('click', () => {
  addInfo.employeeName = txtAName.value;
  addInfo.phone = txtAPhone.value;
  ajax.send('/manage/employee/add', addInfo, (data) => {
    alert(data.message);
  });
});

addDialog.addEventListener('close', () => {
  page.pageNumber = 1;
  queryEmp();
});

//#endregion

//#region  修改的部分
let modifyDialog = document.getElementById('modifyDialog');
let btnMDept = document.getElementById('btnMDept');
let txtMName = document.getElementById('txtMName');
let txtMPhone = document.getElementById('txtMPhone');
let btnModify = document.getElementById('btnModify');
let btnMClose = document.getElementById('btnMClose');

let modifyInfo = {};

function showModify(info) {
  modifyInfo = info;
  btnMDept.innerHTML = `所属部门:${modifyInfo.dept.deptName}`;
  txtMName.value = modifyInfo.employeeName;
  txtMPhone.value = modifyInfo.phone;
  modifyDialog.showModal();
}

btnMClose.addEventListener('click', () => {
  document.querySelector('#modifyDialog form').submit();
});

btnMDept.addEventListener('click', () => {
  mode = 3;
  queryDept();
  deptDialog.showModal();
});

btnModify.addEventListener('click', () => {
  modifyInfo.employeeName = txtMName.value;
  modifyInfo.phone = txtMPhone.value;

  ajax.send('/manage/employee/update', modifyInfo, (data) => {
    alert(data.message);
  });
});

modifyDialog.addEventListener('close', () => {
  page.pageNumber = 1;
  queryEmp();
});

//#endregion
queryEmp();
