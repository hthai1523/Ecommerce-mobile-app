import { api } from "@/constants/baseURL";

const getProductArrivals = async () => {
  try {
    const data = await api.get("/products?sortBy=meta.createdAt&order=asc");
    return data.data.products;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getProductArrivals;
