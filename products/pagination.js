import { products } from '../assets/js/productlist/productsData.js';
import { productsPerPage, renderProducts } from './renderProducts.js';

export function renderPagination(paginationContainer, currentPage, productListContainer) {
    paginationContainer.innerHTML = ''; // Clear existing pagination

    const totalPages = Math.ceil(products.length / productsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const isCurrent = i === currentPage;
        const paginationItem = `
            <li>
                <a href="#" class="page-numbers ${isCurrent ? 'current' : ''}" data-page="${i}">${i}</a>
            </li>
        `;
        paginationContainer.innerHTML += paginationItem;
    }

    // Add next button if not on the last page
    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `
            <li>
                <a href="#" class="next page-numbers" data-page="${currentPage + 1}">→</a>
            </li>
        `;
    }

    // Add event listeners to pagination links
    document.querySelectorAll('.page-numbers').forEach(paginationLink => {
        paginationLink.addEventListener('click', (event) => {
            event.preventDefault();
            const page = parseInt(event.target.getAttribute('data-page'));
            if (!isNaN(page)) {
                renderProducts(productListContainer, page);
                renderPagination(paginationContainer, page, productListContainer);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.querySelector('.products');
    const paginationContainer = document.querySelector('.woocommerce-pagination .page-numbers'); // Ensure you select the right element
    const initialPage = 1;

    renderProducts(productListContainer, initialPage); // Load the first page of products
    renderPagination(paginationContainer, initialPage, productListContainer); // Load pagination
});
