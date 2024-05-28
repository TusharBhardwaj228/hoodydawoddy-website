import { getCart, cartQuantityFun, deleteCartItem, saveItem } from "../data/cart.js";
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
            <div class="quantity">Quantity: ${cartItem.quantity} 
            <div class="update-div">
              <span class="update js-update-button" data-product-id="${matchingProduct.id}">Update</span> 
              <div class="save-div js-save-${matchingProduct.id}">
                <input class="update-input js-update-input-${matchingProduct.id}" type="text">
                <span class="save js-save-button-${matchingProduct.id}">Save</span> 
              </div>
            </div>
            <span class="delete js-delete-button" data-product-id="${matchingProduct.id}">Delete</span></div>
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
    const quantity = cartQuantityFun();
    document.querySelector('.js-checkout-item-quantity').innerHTML = `(${quantity} item)`;

    document.querySelectorAll('.js-update-button').forEach((button)=>{
      button.addEventListener('click', ()=>{
        const productId = button.dataset.productId;
        button.classList.add('update-visibilty');
        document.querySelector(`.js-save-${productId}`).classList.add('save-visibility');
        const saveButton  = document.querySelector(`.js-save-button-${productId}`);
        saveButton.addEventListener('click', ()=>{
          button.classList.remove('update-visibilty');
          document.querySelector(`.js-save-${productId}`).classList.remove('save-visibility');
          const quant = Number(document.querySelector(`.js-update-input-${productId}`).value);
          saveItem(productId, quant);
          renderItems();
        })
    })
  })
  });

  
}
renderItems();



