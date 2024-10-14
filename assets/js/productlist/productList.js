// // Import products from the external file (make sure the path is correct)
// import products from './productsData.js';

// // Get the product list container

// document.addEventListener('DOMContentLoaded', () => {
//     const productList = document.getElementById('product-list');

//     // Iterate over the products and dynamically generate the HTML for each product
//     products.forEach((product) => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('product'); // Same class

//         // Maintain the same structure and styling
//         productElement.innerHTML = `
//     <div class="product-inner">
//       ${product.onSale ? '<span class="onsale">Sale!</span>' : ''} <!-- Sale badge if on sale -->
//       <a href="shop-product-right.html">
//         <img src="${product.imgSrc}" alt="img"> <!-- Image source from product data -->
//       </a>
//       <div class="product-wrap">
//         <h2 class="woocommerce-loop-product__title">
//           <a href="shop-product-right.html">${product.title}</a> <!-- Product title -->
//         </h2>
//         <div class="product_meta">
//           <span class="posted_in">Categories: 
//             ${product.category.map(cat => `<a href="shop-right.html" rel="tag">${cat}</a>`).join(', ')} <!-- Categories -->
//           </span>
//         </div>
//         <div class="star-rating">
//           <span style="width:${product.rating * 20}%">Rated <strong class="rating">${product.rating.toFixed(2)}</strong> out of 5</span> <!-- Rating -->
//         </div>
//         <div class="price-wrap">
//           <span class="price">
//             <span><span>$</span>${product.price}</span> <!-- Price -->
//           </span>
//           <a rel="nofollow" href="shop-cart.html" class="button product_type_simple add_to_cart_button">Add to cart</a> <!-- Add to cart button -->
//         </div>
//       </div>
//     </div>
//   `;

//         // Append the product element to the container
//         productList.appendChild(productElement);
//     });
// });

// import { products } from './productsData.js';


// const productList = document.getElementById('product-list');

// // Replace with your desired WhatsApp number
// const whatsappNumber = '+918000583939';
// products.forEach((product) => {
//     const productElement = document.createElement('div');
//     productElement.classList.add('product');
  
//     // Create the WhatsApp message URL
//     const message = `Hello Omkar Jyotish, I want to buy "${product.title}"`;
//     const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  
//     productElement.innerHTML = `
//       <div class="product-inner">
//         ${product.onSale ? '<span class="onsale">Sale!</span>' : ''}
//         <img src="${product.imgSrc}" alt="img">
//         <div class="product-wrap">
//           <h2 class="woocommerce-loop-product__title">${product.title}</h2>
//           <div class="product_meta">
//             <span class="posted_in">Categories: 
//               ${product.category.map(cat => `<span>${cat}</span>`).join(', ')}
//             </span>
//           </div>
//           <div class="star-rating">
//             <span style="width:${product.rating * 20}%">Rated <strong class="rating">${product.rating.toFixed(2)}</strong> out of 5</span>
//           </div>
//           <div class="price-wrap">
//             <span class="price">
//               <span><span>$</span>${product.price}</span>
//             </span>
//             <a href="${whatsappLink}" class="button product_type_simple buy_button" target="_blank" rel="noopener noreferrer">
//               Buy
//             </a>
//           </div>
//         </div>
//       </div>
//     `;
    
//     productList.appendChild(productElement);
//   });


import { products } from './productsData.js';

const productList = document.getElementById('product-list');

// Replace with your desired WhatsApp number
const whatsappNumber = '+918000583939';

// Function to create product element
function createProductElement(product) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  // Create the WhatsApp message URL
  const message = `Hello Omkar Jyotish, I want to buy "${product.title}"`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  productElement.innerHTML = `
    <div class="product-inner">
      ${product.onSale ? '<span class="onsale">Sale!</span>' : ''}
      <img class="lazyload" data-src="${product.imgSrc}" alt="img">
      <div class="product-wrap">
        <h2 class="woocommerce-loop-product__title">${product.title}</h2>
        <div class="product_meta">
          <span class="posted_in">Categories: 
            ${product.category.map(cat => `<span>${cat}</span>`).join(', ')}
          </span>
        </div>
        <div class="star-rating">
          <span style="width:${product.rating * 20}%">Rated <strong class="rating">${product.rating}</strong> out of 5</span>
        </div>
        <div class="price-wrap">
          <span class="price">
            <span><span>$</span>${product.price}</span>
          </span>
          <a href="${whatsappLink}" class="button product_type_simple buy_button" target="_blank" rel="noopener noreferrer">
            Buy
          </a>
        </div>
      </div>
    </div>
  `;
  
  return productElement;
}

// Function to lazy load images
function lazyLoadImages() {
  const lazyImages = document.querySelectorAll('img.lazyload');
  lazyImages.forEach(img => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazyload');
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });
}

// Render products and lazy load images
products.forEach(product => {
  const productElement = createProductElement(product);
  productList.appendChild(productElement);
});

document.addEventListener('DOMContentLoaded', lazyLoadImages);
