var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllProducts } from './api';
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');
let products = [];
function renderSkeletons(count) {
    productList.innerHTML = Array.from({ length: count }).map(() => `
    <div class="animate-pulse space-y-4">
      <div class="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  `).join('');
}
function renderProducts(filteredProducts) {
    productList.innerHTML = filteredProducts.map(product => `
    <div class="border rounded p-4 shadow hover:shadow-lg bg-white dark:bg-gray-800">
      <img src="${product.image}" alt="${product.title}" class="h-40 object-contain w-full mb-2" />
      <h3 class="text-lg font-semibold">${product.title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">$${product.price}</p>
      <a href="product.html?id=${product.id}" class="text-blue-600 hover:underline mt-2 inline-block">View Details</a>
    </div>
  `).join('');
}
function filterProducts(term) {
    const filtered = products.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
    renderProducts(filtered);
}
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        renderSkeletons(8);
        try {
            products = yield fetchAllProducts();
            renderProducts(products);
        }
        catch (error) {
            productList.innerHTML = '<p class="text-red-500">Failed to load products.</p>';
        }
    });
}
searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});
loadProducts();
