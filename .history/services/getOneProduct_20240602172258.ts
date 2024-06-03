import { api } from "@/constants/baseURL";

const getOneProduct = async (id:number) => {
  try {
    const data = await api.get(`/products/${id}`);
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getOneProduct;
