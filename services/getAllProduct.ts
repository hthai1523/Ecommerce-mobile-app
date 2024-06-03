import { api } from "@/constants/baseURL";

const getAllProduct = async () => {
  try {
    const data = await api.get("/products");
    return data.data.products;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getAllProduct;
