import { products } from './productsData.js';

const productList = document.getElementById('product-list');

// Replace with your desired WhatsApp number
const whatsappNumber = '+918000583939';

// Function to create product element
function createProductElement(product, index) {
  const productElement = document.createElement('div');
  productElement.classList.add('product');

  // Create the WhatsApp message URL
  const message = `Hello Omkar Jyotish, I want to buy "${product.title}"`;
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // For the first 4 products, load images normally; for others, use lazy loading
  const imgElement = index < 4
    ? `<img src="${product.imgSrc}" alt="img">`  // Fast load for first 4
    : `<img class="lazyload" data-src="${product.imgSrc}" alt="img">`;  // Lazy load for others

  productElement.innerHTML = `
    <div class="product-inner">
      ${product.onSale ? '<span class="onsale">Sale!</span>' : ''}
      ${imgElement}
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
            <span><span>₹</span>${product.price}</span>
          </span>
          <a href="${whatsappLink}" class="button product_type_simple buy_button mb-4 w-100" target="_blank" rel="noopener noreferrer">
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
products.forEach((product, index) => {
  const productElement = createProductElement(product, index);
  productList.appendChild(productElement);
});

document.addEventListener('DOMContentLoaded', lazyLoadImages);



