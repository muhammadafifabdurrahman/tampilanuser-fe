import { API } from "../_api/index";

export const getCategories = async () => {
  const { data } = await API.get("/categories");
  return data.data;
};

export const createCategories = async (data) => {
  try {
    const response = await API.post("/categories", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showCategories = async (id) => {
  try {
    const { data } = await API.get(`/categories/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateCategories = async (id, data) => {
  try {
    const response = await API.post(`/categories/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCategories = async (id) => {
  try {
    await API.delete(`/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
