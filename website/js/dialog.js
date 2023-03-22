let btnOpen = document.getElementById('btnOpen');
//  document.querySelector('#btnOpen');==document.getElementById('btnOpen');
// document.querySelector('css选择器')
// 表示获取css选择器对应的元素中的第一个
let dialog = document.querySelector('dialog');

btnOpen.addEventListener('click', () => {
  dialog.showModal();
});
