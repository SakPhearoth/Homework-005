// script/productDetails.ts
import { fetchProduct } from './api.js';

const productDetailEl = document.getElementById('productDetail') as HTMLElement;
const loadingSkeleton = document.getElementById('loadingSkeleton') as HTMLElement;

function getProductIdFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProduct(product: any) {
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

async function loadProduct() {
  const id = getProductIdFromURL();
  if (!id) {
    productDetailEl.innerHTML = '<p class="text-red-500 text-center">Product ID is missing.</p>';
    return;
  }

  // Ensure loading skeleton is visible
  loadingSkeleton.style.display = 'block';
  productDetailEl.innerHTML = ''; // Clear any previous content

  try {
    const product = await fetchProduct(id);
    loadingSkeleton.style.display = 'none'; // Hide skeleton on success
    renderProduct(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    loadingSkeleton.style.display = 'none'; // Hide skeleton on error
    productDetailEl.innerHTML = '<p class="text-red-500 text-center">Failed to load product data.</p>';
  }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', loadProduct);