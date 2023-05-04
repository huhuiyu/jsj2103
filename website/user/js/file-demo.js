import ajax from '../../js/ajax.js';
import tools from '../../js/tools.js';

let file1 = document.getElementById('file1');
let sp1 = document.getElementById('sp1');

// 过滤文件类型
file1.accept = 'image/*';
// 多选
file1.multiple = true;

file1.addEventListener('change', () => {
  // 选中的文件
  console.log('文件选择：', file1.files);
  if (file1.files.length < 1) {
    return;
  }
  let file = file1.files[0];
  sp1.innerHTML = `${file.name}/${file.size}/${file.type}`;
});

// 动态浏览
let btn1 = document.getElementById('btn1');
let sp2 = document.getElementById('sp2');

btn1.addEventListener('click', () => {
  let efile = document.createElement('input');
  efile.setAttribute('type', 'file');

  efile.addEventListener('change', () => {
    let file = efile.files[0];
    sp2.innerHTML = `${file.name}/${file.size}/${file.type}`;
  });

  efile.click();
});

let btn2 = document.getElementById('btn2');

btn2.addEventListener('click', () => {
  tools.openFile((file) => {
    console.log('选中的文件：', file);
  });
});

// 文件上传测试
let btnBrowser = document.getElementById('btnBrowser');
let txtInfo = document.getElementById('txtInfo');
let btnUpload = document.getElementById('btnUpload');
let spFile = document.getElementById('spFile');

let file = null;

btnBrowser.addEventListener('click', () => {
  // 重置状态
  file = null;
  spFile.innerHTML = '';
  // 浏览文件
  tools.openFile((fileinfo) => {
    file = fileinfo;
    spFile.innerHTML = `选中的文件：${file.name}`;
  });
});

btnUpload.addEventListener('click', () => {
  if (file == null) {
    return;
  }
  ajax.file(file, txtInfo.value, (data) => {
    alert(JSON.stringify(data, null, 2));
    if (data.success) {
      // 重置状态
      file = null;
      spFile.innerHTML = '';
    }
  });
});
