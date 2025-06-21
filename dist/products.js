var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllProducts } from './api.js';
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search');
console.log("✅ Script loaded");
console.log("🔍 productList:", productList);
console.log("🔍 searchInput:", searchInput);
let products = [];
function renderSkeletons(count) {
    console.log("💠 Rendering skeletons...");
    productList.innerHTML = Array.from({ length: count }).map(() => `
    <div class="animate-pulse space-y-4">
      <div class="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  `).join('');
}
function renderProducts(filteredProducts) {
    console.log("🎯 Rendering products:", filteredProducts);
    const productList = document.getElementById('product-list');
    if (!productList) {
        console.error("Product list container not found!");
        return;
    }
    productList.innerHTML = filteredProducts.map(product => {
        var _a;
        return `
  <div class="flex flex-col border rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 transition hover:shadow-lg p-4">
    <div class="w-full h-40 flex justify-center items-center mb-2">
      <img src="${product.thumbnail}" alt="${product.title}" class="max-h-full object-contain" />
    </div>
    <h3 class="text-lg font-semibold mb-1 text-center">${product.title}</h3>
    <p class="text-sm text-gray-500 text-center">${(_a = product.category) !== null && _a !== void 0 ? _a : "Uncategorized"}</p>
    <p class="text-sm text-gray-600 dark:text-gray-400 text-center mb-2">$${product.price}</p>
    <div class="text-center mt-auto">
      <a  href="src/product.html?id=${product.id}" class="text-blue-600 hover:underline inline-block">View Details</a>
    </div>
  </div>
`;
    }).join('');
}
function filterProducts(term) {
    console.log("🔍 Filtering products by:", term);
    const filtered = products.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
    renderProducts(filtered);
}
function loadProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("🚀 Fetching products...");
        renderSkeletons(8);
        try {
            products = yield fetchAllProducts();
            console.log("✅ Products fetched:", products);
            renderProducts(products);
        }
        catch (error) {
            console.error("❌ Failed to load products:", error);
            productList.innerHTML = '<p class="text-red-500">Failed to load products.</p>';
        }
    });
}
searchInput.addEventListener('input', (e) => {
    filterProducts(e.target.value);
});
loadProducts();
