import { fetchProduct} from './api';

const productDetailEl = document.getElementById('productDetail') as HTMLElement;
const loadingSkeleton = document.getElementById('loadingSkeleton') as HTMLElement;

function getProductIdFromURL(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderProduct(product: any) {
  productDetailEl.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">
      <img src="${product.image}" alt="${product.title}" class="w-full rounded shadow" />
      <div>
        <h2 class="text-3xl font-bold mb-2">${product.title}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">${product.description}</p>
        <p class="text-2xl font-semibold mb-4">$${product.price}</p>
        <a href="products.html" class="text-blue-600 hover:underline">← Back to products</a>
      </div>
    </div>
  `;
}

async function loadProduct() {
  const id = getProductIdFromURL();
  if (!id) {
    productDetailEl.innerHTML = '<p class="text-red-500">Product ID is missing.</p>';
    return;
  }

  try {
    const product = await fetchProduct(id);
    loadingSkeleton.style.display = 'none';
    renderProduct(product);
  } catch (error) {
    productDetailEl.innerHTML = '<p class="text-red-500">Failed to load product data.</p>';
  }
}

loadProduct();
