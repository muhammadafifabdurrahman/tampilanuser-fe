import { API } from "../_api/index";

export const getOrdersItems = async () => {
  const { data } = await API.get("/order_items", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const create_itemsItems = async (data) => {
  try {
    const response = await API.post("/order_items", data, {
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

export const showOrdersItems = async (id) => {
  try {
    const { data } = await API.get(`/order_items/${id}`);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateOrdersItems = async (id, data) => {
  try {
    const response = await API.put(`/order_items/${id}?_method=PUT`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteOrdersItems = async (id) => {
  try {
    await API.delete(`/order_items/${id}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
