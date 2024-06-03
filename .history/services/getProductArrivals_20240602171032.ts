import { api } from "@/constants/baseURL";

const getProductArrivals = async () => {
  try {
    const data = await api.get("/products?sortBy=rating&order=asc");
    return data.data.products;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getProductArrivals;
