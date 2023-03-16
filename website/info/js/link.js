import ajax from '../../js/ajax.js';

let selProvince = document.getElementById('selProvince');
let selCity = document.getElementById('selCity');

// 省份列表
let plist = [];
// 城市列表
let clist = [];

// 查询省份信息
function queryProvince() {
  ajax.send('/linkinfo/queryAllProvince', {}, (data) => {
    if (data.success) {
      plist = data.list;
      showProvince();
      return;
    }
    alert(data.message);
  });
}

// 显示省份信息
function showProvince() {
  console.log('省份列表：', plist);
  for (let i = 0; i < plist.length; i++) {
    let p = plist[i];
    // 生成option放到省份列表中
    let op = document.createElement('option');
    op.setAttribute('value', p.pid);
    op.append(p.province);
    selProvince.append(op);
  }

  if (plist.length > 0) {
    selProvince.selectedIndex = parseInt(plist.length / 2);
    // 数据变化触发联动
    queryCity();
  }
}

// 联动查询城市信息
function queryCity() {
  // 选中的省份编号
  let pid = selProvince.value;
  // 查询对应城市
  ajax.send(
    '/linkinfo/queryCityByProvince',
    {
      pid: pid,
    },
    (data) => {
      if (data.success) {
        clist = data.list;
        showCity();
        return;
      }
      alert(data.message);
    }
  );
}

function showCity() {
  // 先要清除原有的城市
  selCity.innerHTML = '';
  // 添加
  for (let i = 0; i < clist.length; i++) {
    let c = clist[i];
    let op = document.createElement('option');
    op.setAttribute('value', c.cid);
    op.append(c.city);
    selCity.append(op);
  }

  if (clist.length > 0) {
    selCity.selectedIndex = 0;
  }
}

// 联动的事件
selProvince.addEventListener('change', queryCity);

queryProvince();

// 显示选中值
let btnOk = document.getElementById('btnOk');
let spInfo = document.getElementById('spInfo');

btnOk.addEventListener('click', () => {
  spInfo.innerHTML = '';
  let pindex = selProvince.selectedIndex;
  if (pindex > -1) {
    let p = plist[pindex];
    spInfo.append(p.province);
  }

  let cindex = selCity.selectedIndex;
  if (cindex > -1) {
    let c = clist[cindex];
    spInfo.append(c.city);
  }
});

// 作业：完成部门和员工的联动效果，以及班级和学生的联动效果
