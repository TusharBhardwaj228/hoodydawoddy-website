import { loadProductFetch, getProduct} from "../data/product.js";
import { getCart, saveItem, cartQuantityFun } from "../data/cart.js";

loadProductFetch().then(()=>{
  const products = getProduct();
  let mainHtml =''
  products.forEach((product)=>{
   /* console.log(product);*/
    mainHtml += `
    <div class="grid-item">
      <div class="product-image">
      <img src="${product.image}" alt="product">
      </div>         
      <div class="product-name">
          ${product.name}
      </div>  
      <div class="ratings">
        <img class="rating-stars" src="images/ratings/rating-${product.rating.stars*10}.png" alt="stars">
        <div class="ratings-number">${product.rating.count}</div>
      </div>   
      <div class="price">${(product.priceCents/100).toFixed(2)}</div>
      <div class="select">
        <select name="quantity" class="quantity-selector js-quantity-selector-${product.id}">
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="clothing-size">
        ${clothingSize(product)}
      </div>
      <div class = 'product-spacer'></div>
      <div class="add-to-cart">
        <button class="js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      </div>   
  </div>`
  });
  function cartQuan(){
    let x = cartQuantityFun();
    cartQuantity.innerHTML = x;
  }
  document.querySelector('.js-grid-container').innerHTML = mainHtml;
  const cartQuantity = document.querySelector('.js-cart-quantity');
  document.querySelectorAll(".js-add-to-cart").forEach((button)=>{
    button.addEventListener('click', ()=>{
      const productID = button.dataset.productId;
      const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productID}`).value);
      saveItem(productID, quantitySelector);
      cartQuan();
    });
  });
  cartQuan();

  function clothingSize(product){
    if(product.type === 'clothing'){
      return `<a href ='${product.sizeChartLink}' target='_blank'> size chart </a>`;
    }
    else{
      return '';
    }
  }
})
