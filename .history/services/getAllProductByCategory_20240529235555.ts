import axios from 'axios'; // Import axios hoặc sử dụng từ thư viện axios đã import
import { api } from "@/constants/baseURL";
const getAllProductByCategory = async ({ params }: { params: string }) => {
  try {
    const response = await api.get(`/products/category/${params}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllProductByCategory;
