import { api } from "@/constants/baseURL";
const getAllProductByCategory = async ( params:string ) => {
  try {
    const response = await api.get('/products/');
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getAllProductByCategory;
