import { api } from "@/constants/baseURL";

const getOneProduct = async () => {
  try {
    const data = await api.get("/products");
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getOneProduct;
