import { getCart, cartQuantityFun, deleteCartItem } from "../data/cart.js";
import { getProduct, loadProductFetch } from "../data/product.js";

function renderItems(){
  loadProductFetch().then(()=>{
    const cartProducts = getCart();
    const products= getProduct();
    let bodyHtml='';
    let matchingProduct;
    cartProducts.forEach((cartItem)=>{
      products.forEach((product)=>{
        if(cartItem.id === product.id){
          matchingProduct = product;
        }
      });
      console.log(matchingProduct);
      bodyHtml += `
      <div class="card">
        <div class="delivery-date">Delivery date: Tuesday, June 4</div>
        <div class="item-details">
          <div class="image-container">
            <img src="${matchingProduct.image}" alt="img">
          </div>
          <div class="item-name-price">
            <div class="item-name">${matchingProduct.name}</div>
            <div class="price-checkout">$${(matchingProduct.priceCents/100).toFixed(2)}</div>
            <div class="quantity">Quantity: ${cartItem.quantity} <span class="update">Update </span> <span class="delete js-delete-button" data-product-id="${matchingProduct.id}">Delete</span></div>
          </div>
          <div class="delivery-options">
            <div class="option-txt">Choose a delivery option:</div>
            <div class="delivery-options-button">
              <input class="radio" type="radio" id="date1" name="option-${matchingProduct.id}" checked>
              <div class="radio-options">
                <label class="date-color" for="date1">Tuesday, June 4</label>
                <label class="shipping-text" for="date1">Free Shipping</label>
              </div>
            </div>
            <div class="delivery-options-button">
              <input class="radio" type="radio" id="date2" name="option-${matchingProduct.id}">
              <div class="radio-options">
                <label class="date-color" for="date2">Wednesday, May 31</label>
                <label class="shipping-text" for="date2">$4.99 Shipping</label>
              </div>
            </div>    
            <div class="delivery-options-button">
              <input class="radio" type="radio" id="date3" name="option-${matchingProduct.id}">
              <div class="radio-options">
                <label class="date-color" for="date3">Saturday, May 27</label>
                <label class="shipping-text" for="date3">$9.99 Shipping</label>
              </div>
            </div>             
          </div>
        </div>
      </div>`
    });  
    document.querySelector('.js-checkout-item-container').innerHTML = bodyHtml;
     document.querySelectorAll('.js-delete-button').forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        console.log(deleteCartItem(productId));
        renderItems();
      })
    })
  });

}
renderItems();



