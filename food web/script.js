const btnCart=document.querySelector('#cart-icon');
const cart =document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');
const placeOrder = document.querySelector('.btn-buy');

///Place your order

placeOrder.addEventListener('click',()=>{
    alert("Booking Confirmed");
})

///click to open cart menu/////
btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
}   
);

///////click to close cart menu//////

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
}
   
);

//////its duty is how to remove the order////

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood()
{
    loadContent();
}

function loadContent()
{
    //Remove Food Items From Cart

    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>
    {
        btn.addEventListener('click',removeItem);

    });

    //Product item change Event//

    let qtyElements = document.querySelectorAll('.cart-quantity');
    qtyElements.forEach((input)=>
    {
        input.addEventListener('click',changeQty);

    });

    //product cart  Sir num: 9043017689//

    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });

    updateTotal();

}

function removeItem(){
    if(confirm('Are you sure to Remove')){
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(el=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }
    
}

function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
     loadContent();
}

let itemList = [];

////Add Cart///////////

function addCart(){
    let food = this.parentElement;
    let title= food.querySelector('.food-title').innerHTML;
    let price= food.querySelector('.food-price').innerHTML;
    let imgSrc =  food.querySelector('.food-img').src;

    let newProduct={title,price,imgSrc}

    ///check the produt already exists in cart

    if(itemList.find((el)=>el.title==newProduct.title))
    {
        alert("This Product is already in Cart");
        return;
    }
    else{
        itemList.push(newProduct);
    }

    let newProductElement= createCartProduct(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();

   
}

function createCartProduct(title,price,imgSrc){

    return `<div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
    </div>
    <ion-icon name="close-circle-outline" class="cart-remove"></ion-icon>
</div>`;
}

///total amount///

function updateTotal()
{
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total=0;
     
    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty)
        product.querySelector('.cart-amt').innerText="Rs."+(price*qty);
    });

    totalValue.innerHTML="Rs."+total;

    //  Add product in Cart Icon

    const CartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    CartCount.innerHTML=count;

    if(count===0){
        CartCount.style.display="none";
    }
    else
    {
        CartCount.style.display="block";
    }
}