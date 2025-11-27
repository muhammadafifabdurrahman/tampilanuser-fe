import { API } from "../_api/index";

export const getMenus = async () => {
  const { data } = await API.get("/menus");
  return data.data;
};

export const createMenu = async (data) => {
  try {
    const response = await API.post("/menus", data, {
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

export const showMenus = async (id) => {
  try {
    const { data } = await API.get(`/menus/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMenus = async (id, data) => {
  try {
    const response = await API.post(`/menus/${id}`, data, {
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

export const deleteMenus = async (id) => {
  try {
    await API.delete(`/menus/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
