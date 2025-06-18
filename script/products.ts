// products.ts
import { fetchAllProducts } from './api';

const productList = document.getElementById('productList') as HTMLElement;
const searchInput = document.getElementById('searchInput') as HTMLInputElement;

let products: any[] = [];

function renderSkeletons(count: number) {
  productList.innerHTML = Array.from({ length: count }).map(() => `
    <div class="animate-pulse space-y-4">
      <div class="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
    </div>
  `).join('');
}

function renderProducts(filteredProducts: any[]) {
  productList.innerHTML = filteredProducts.map(product => `
    <div class="border rounded p-4 shadow hover:shadow-lg bg-white dark:bg-gray-800">
      <img src="${product.image}" alt="${product.title}" class="h-40 object-contain w-full mb-2" />
      <h3 class="text-lg font-semibold">${product.title}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">$${product.price}</p>
      <a href="product.html?id=${product.id}" class="text-blue-600 hover:underline mt-2 inline-block">View Details</a>
    </div>
  `).join('');
}

function filterProducts(term: string) {
  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(term.toLowerCase())
  );
  renderProducts(filtered);
}

async function loadProducts() {
  renderSkeletons(8);
  try {
    products = await fetchAllProducts();
    renderProducts(products);
  } catch (error) {
    productList.innerHTML = '<p class="text-red-500">Failed to load products.</p>';
  }
}

searchInput.addEventListener('input', (e) => {
  filterProducts((e.target as HTMLInputElement).value);
});

loadProducts();
