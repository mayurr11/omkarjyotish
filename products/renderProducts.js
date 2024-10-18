import { products } from '../assets/js/productlist/productsData.js';

export const productsPerPage = 12; // Number of products per page

// Function to create a product element dynamically
export function createProductElement(product, index) {
    const whatsappNumber = '+918000583939';
    const message = `Hello Omkar Jyotish, I want to buy "${product.title}"`;
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    return `
        <li class="product">
            <div class="product-inner">
                <a href="#">
                    <img src="${index < 4 ? product.imgSrc : ''}" data-src="${index >= 4 ? product.imgSrc : ''}" alt="${product.title}" class="${index >= 4 ? 'lazyload' : ''}">
                </a>
                <div class="product-wrap">
                    <h2 class="woocommerce-loop-product__title">
                        <a href="#">${product.title}</a>
                    </h2>
                    <!--<div class="product_meta">
                        <span class="posted_in">Categories: 
                            ${product.category.map(cat => `<a href="#">${cat}</a>`).join(', ')}
                        </span>
                    </div>
                    <div class="star-rating">
                        <span style="width:${product.rating * 20}%">Rated <strong class="rating">${product.rating}</strong> out of 5</span>
                    </div>-->
                    <div class="price-wrap">
                        <span class="price">
                            <span>
                                <span>₹</span>${product.price}
                            </span>
                        </span>
                        <a href="${whatsappLink}" class="button product_type_simple buy_button mb-4 w-100" target="_blank" rel="noopener noreferrer">
                          Buy
                        </a>
                    </div>
                </div>
            </div>
        </li>
    `;
}

// Function to render products based on the current page
export function renderProducts(productListContainer, page = 1) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    productListContainer.innerHTML = ''; // Clear the container
    paginatedProducts.forEach((product, index) => {
        productListContainer.innerHTML += createProductElement(product, index);
    });

    lazyLoadImages(); // Call lazy load function after rendering products
}

// Function to lazy load images
function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazyload');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazyload');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
}
