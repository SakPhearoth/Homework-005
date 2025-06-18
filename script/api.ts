// api.ts
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export async function fetchAllProducts(): Promise<any[]> {
  const response = await axios.get(BASE_URL);
  return response.data;
}

export async function fetchProduct(id: string): Promise<any> {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
}