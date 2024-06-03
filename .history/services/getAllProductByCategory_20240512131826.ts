import { api } from "@/constants/baseURL";

const getAllProductByCategory = async ({params}: {params: string}) => {
  try {
    const data = await api.get("/products/categories");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllProductByCategory;
