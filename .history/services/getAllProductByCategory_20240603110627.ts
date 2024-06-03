import { api } from "@/constants/baseURL";
const getAllProductByCategory = async ( params:string ) => {
  try {
    const response = await api.get(`/products/category/${params}`);
    return response.data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllProductByCategory;
