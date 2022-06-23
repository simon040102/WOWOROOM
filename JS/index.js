let api_path='simon040102'
let token
let data;
let list=document.querySelector('.list')
axios.get(
  `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/products`
,)
.then(function(response){
    data = response.data.products;
    allProducts();
});

//取得所有商品
function allProducts(){
    let str='';
    data.forEach(items => {
        str += `<li>
        <img src="${items.images}" alt="" />
        <a data-id="${items.id}" href="#">加入購物車</a>
        <h3>${items.title}</h3>
        <p class="line-through">NT$${items.origin_price.toLocaleString('en-US')}</p>
        <h4>NT$${items.price.toLocaleString('en-US')}</h4>
        <p class="newProduct">新品</p>
        </li>`;
    });
    list.innerHTML=str;
}

let cartList=document.querySelector('.cartList')
let total=document.querySelector('.finalTotal')
let cart='';
//取得我的購物車
renderCart();
function renderCart(){
  axios
    .get(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function (response) {
      cart = response.data;
      showCart();
    });
}
function showCart(){
    let str='';
    let ary=cart.carts
    ary.forEach(items=>{
        str += `<li>
        <div class="cartItem">
       <img src="${items.product.images}" alt="" />
       <h4>${items.product.title}</h4>
       </div>
       <p>NT$${items.product.price.toLocaleString('en-US')}</p>
       <p>${items.quantity}</p>
       <p>${(items.product.price * items.quantity).toLocaleString('en-US')}</p>
        <a  href="#"> <img data-id="${items.id}" src="images/delete_black_24dp.svg" alt="" /></a>
        </li>`;
    })
  cartList.innerHTML = str;
  total.innerHTML = `NT$${cart.finalTotal.toLocaleString('en-US')}`;
}

//選取不同商品
let products = document.querySelector('.products');
products.addEventListener('change',showChange)
function showChange(e){
   let item = e.target.value;
    if(item=="全部"){
        allProducts();
    }
    if(item=="床架"){
          let str = '';
        data.forEach(function(items,index){
            if(items.category=="床架"){
   str += `<li>
        <img src="${items.images}" alt="" />
        <a data-id="${items.id}" href="#">加入購物車</a>
        <h3>${items.title}</h3>
        <p class="line-through">NT$${items.origin_price.toLocaleString(
          'en-US'
        )}</p>
        <h4>NT$${items.price.toLocaleString('en-US')}</h4>
        <p class="newProduct">新品</p>
        </li>`;
            }
        })
        list.innerHTML = str;
    }
    if (item == '收納') {
      let str = '';
      data.forEach(function (items, index) {
        if (items.category == '收納') {
          str += `<li>
        <img src="${items.images}" alt="" />
        <a data-id="${items.id}" href="#">加入購物車</a>
        <h3>${items.title}</h3>
        <p class="line-through">NT$${items.origin_price.toLocaleString(
          'en-US'
        )}</p>
        <h4>NT$${items.price.toLocaleString('en-US')}</h4>
        <p class="newProduct">新品</p>
        </li>`;
        }
      });
      list.innerHTML = str;
    }
    if (item == '窗簾') {
      let str = '';
      data.forEach(function (items, index) {
        if (items.category == '窗簾') {
          str += `<li>
        <img src="${items.images}" alt="" />
        <a data-id="${items.id}" href="#">加入購物車</a>
        <h3>${items.title}</h3>
        <p class="line-through">NT$${items.origin_price.toLocaleString(
          'en-US'
        )}</p>
        <h4>NT$${items.price.toLocaleString('en-US')}</h4>
        <p class="newProduct">新品</p>
        </li>`;
        }
      });
      list.innerHTML = str;
    }
}

//新增購物車
list.addEventListener('click',addCart)
function addCart(e){
    e.preventDefault();
    let id = e.target.dataset.id;
    let obj = {
      data: {
        productId: id,
        quantity: 1,
      }
    };
    if(e.target.nodeName !=="A"){return}
    axios
      .post(
        `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
        obj
      )
      .then(function (response) {
        renderCart();
      });
}

//刪除單一
cartList.addEventListener('click',deleteItem)
function deleteItem(e){
    e.preventDefault();
    let id = e.target.dataset.id;
    console.log(id)
     if (e.target.nodeName !== 'IMG') {
       return;
     }
     axios.delete(
       `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${id}`
     )
     .then(function(response){
        console.log(response)
        renderCart();
     });
}

//刪除全部
let deleteAll=document.querySelector('.del')
deleteAll.addEventListener('click',deleteAllItem)
function deleteAllItem(e){
    e.preventDefault();
    axios.delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function(response){
        console.log(response)
         renderCart();
    });
}

let customerName = document.getElementById('customerName');
let customerPhone = document.getElementById('customerPhone');
let customerEmail = document.getElementById('customerEmail');
let customerAddress = document.getElementById('customerAddress');
let tradeWay = document.getElementById('tradeWay');
let submit = document.querySelector('.orderInfo-btn');
submit.addEventListener('click',sendOrder)
function sendOrder(){
    
    let obj = {
      data: {
        user: {
          name: customerName.value,
          tel: customerPhone.value,
          email: customerEmail.value,
          address: customerAddress.value,
          payment: tradeWay.value,
        },
      },
    }
    console.log(obj)
    axios.post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,obj
    )
    
    .then(function(response){
        console.log(response)
       renderCart();
        alert('送出成功')
    })
    .catch(function(error){
        alert(error.response.data.message);
        console.log(error.response.data)
    })
    
}