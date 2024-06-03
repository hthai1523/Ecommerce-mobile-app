import { api } from "@/constants/baseURL";

const getAllCategories = async () => {
  try {
    const data = await api.get("/categories");
    return data.data;
  } catch (error) {
    console.error(error);
    throw error;

  }
};

export default getAllCategories;
