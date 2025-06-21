var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchProduct } from './api.js';
const productDetailEl = document.getElementById('productDetail');
const loadingSkeleton = document.getElementById('loadingSkeleton');
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
function renderProduct(product) {
    productDetailEl.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <img src="${product.images[0]}" alt="${product.title}" class="w-full rounded shadow" />
      <div>
        <h2 class="text-3xl font-bold mb-2">${product.title}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">${product.description}</p>
        <p class="text-2xl font-semibold mb-4">$${product.price}</p>
        <a href="../products.html" class="text-blue-600 hover:underline">← Back to products</a>
      </div>
    </div>
  `;
}
function loadProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const id = getProductIdFromURL();
        if (!id) {
            productDetailEl.innerHTML = '<p class="text-red-500 text-center">Product ID is missing.</p>';
            return;
        }
        loadingSkeleton.style.display = 'block';
        productDetailEl.innerHTML = '';
        try {
            const product = yield fetchProduct(id);
            loadingSkeleton.style.display = 'none';
            renderProduct(product);
        }
        catch (error) {
            console.error('Error fetching product details:', error);
            loadingSkeleton.style.display = 'none';
            productDetailEl.innerHTML = '<p class="text-red-500 text-center">Failed to load product data.</p>';
        }
    });
}
document.addEventListener('DOMContentLoaded', loadProduct);
