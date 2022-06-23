let config = {
  headers: { Authorization: ' 9rmd5UQNKuRMXAybVDB1ygWAbOT2' },
};
let api_path = 'simon040102';
let data;

render();
function render() {
axios
  .get(
    `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
    config
  )
  .then(function (response) {
    data = response.data.orders;
    showData();
  });
  }
//顯示資料
let orderStatus = '';
let orderList = document.querySelector('.orderList');
function showData() {
  let str = '';
  data.forEach(function (items) {
    str += `<tr>
        <th>${items.id}</th>
        <th>${items.user.name}<br>${items.user.tel}</th>
        <th>${items.user.address}</th>
        <th>${items.user.email}</th>
        <th>${getTitle(items.products)}</th>
        <th>${items.createdAt}</th>
       <td >
       <a class="orderStatus" data-id="${items.id}" data-paid="${
      items.paid
    }" href="#">
       ${items.paid ? '已處理' : '未處理'}
       </a>
       </td>
       <td><input type="button" data-id="${
         items.id
       }" class="delSingleOrder-Btn" value="刪除"></td>
        </tr>`;
  });
  orderList.innerHTML = str;
}
function getTitle(list) {
  let str = '';
  list.forEach(function (items) {
    str += `<p>${items.title}</p>`;
  });
  return str;
}

//點擊處理
let orderPage = document.querySelector('.orderPage-table');
orderPage.addEventListener('click', orderClick);
function orderClick(e) {
  e.preventDefault();
  let id = e.target.dataset.id;
  if (e.target.nodeName == 'A') {
    let obj = {
      data: {
        id: id,
        paid: true,
      },
    };
    console.log(obj)
    axios.put(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,
      obj,
      config
    )
    .then(function(response){
        render();
    });
  }
  else if(e.target.nodeName == 'INPUT'){
    axios.delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders/${id}`,config
    ).then(function(response){
        render();
    });
    
  }
}

//清除全部
let clearAll = document.querySelector('.back-clear');
clearAll.addEventListener('click',clearOrder)
function clearOrder(e){
    e.preventDefault();
    axios.delete(`https://livejs-api.hexschool.io/api/livejs/v1/admin/${api_path}/orders`,config)
    .then(function(response){
        console.log(response)
        render();
    })
}