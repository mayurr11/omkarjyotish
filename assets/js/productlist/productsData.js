// productsData.js
export const products = Array.from({ length: 46 }, (_, i) => ({
  imgSrc: `../assets/images/products/${i + 1}.jpg`,
  title: `Product ${i + 1}`, // Placeholder titles
  category: ["Magic", "Attributes"], // Categories can be adjusted accordingly
  rating: (Math.random() * 5).toFixed(2), // Random rating for each product
  price: `${(Math.random() * 100).toFixed(2)}`, // Random price for each product
  // onSale: Math.random() > 0.5, // Randomly decide if it's on sale
}));

