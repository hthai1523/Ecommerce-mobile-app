import { api } from "@/constants/baseURL";

const getAllCategories = async () => {
  try {
    const data = await api.get("/products/categories");
    return data.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllCategories;
