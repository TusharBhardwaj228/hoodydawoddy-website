let cart=JSON.parse(localStorage.getItem('cart')) || [];

export function getCart(){
  return cart;
}

function setStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}
export function saveItem(productId, quantitySelector){
  let matchingID;
  cart.forEach((cartItem)=>{
    if(cartItem.id === productId){
      matchingID = cartItem;
    }
  });
  if(matchingID){
    matchingID.quantity += quantitySelector;
  }
  else{
    cart.push({
      id : productId,
      quantity : quantitySelector
    });
  }
  setStorage();
}

export function cartQuantityFun(){
  let x  = 0;
  cart.forEach((cartItem)=>{
    x += cartItem.quantity;
  });
  return x;
}