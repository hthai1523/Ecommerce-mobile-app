import { api } from "@/constants/baseURL";

const searchProduct = async (data:string) => {
  try {
    const data = await api.get("/products/search", {
        params: {
          search: data,
        },
  
    });
    return data.data.products;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default searchProduct;
