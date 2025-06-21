declare const axios: any; // If using CDN, keep this

const BASE_URL = 'https://dummyjson.com/products';

export async function fetchAllProducts(): Promise<any[]> {
  const response = await axios.get(BASE_URL);
  return response.data.products; // Note: the array is inside `.products`
}

export async function fetchProduct(id: string): Promise<any> {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}
