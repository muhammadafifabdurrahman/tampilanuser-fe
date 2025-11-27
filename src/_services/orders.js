import { API } from "../_api/index";

export const getOrders = async () => {
  const { data } = await API.get("/orders", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createOrders = async (data) => {
  try {
    const response = await API.post("/orders", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showOrders = async (id) => {
  try {
    const { data } = await API.get(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateOrders = async (id, data) => {
  try {
    const response = await API.post(`/orders/${id}`, data, {
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

export const deleteOrders = async (id) => {
  try {
    await API.delete(`/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
