let products =[];
export async function loadProductFetch(){
  const response = await fetch('https://supersimplebackend.dev/products');
  const text = await response.json();
  text.forEach((productDetails)=>{
    products.unshift(productDetails);
  })
} 

export function getProduct(){
  return products;
}

