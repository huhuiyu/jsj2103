import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

//#region 查询的部分=============
let tbData = document.getElementById('tbData');

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

queryEmp();
