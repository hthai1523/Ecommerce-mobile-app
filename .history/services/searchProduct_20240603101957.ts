import { api } from "@/constants/baseURL";

const searchProduct = async (input: string) => {
  try {
    const data = await api.get("/products/search", {
      params: {
        q: input,
      },
    });
    return data.data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default searchProduct;
