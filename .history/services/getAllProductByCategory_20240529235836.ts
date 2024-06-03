import axios from 'axios'; // Import axios hoặc sử dụng từ thư viện axios đã import
import { api } from "@/constants/baseURL";
const getAllProductByCategory = async ( params:string ) => {
  try {
    const response = await api.get(`/categories/findProductsByCategoryName?categoryName=${params}`);
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllProductByCategory;
