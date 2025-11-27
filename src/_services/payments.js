import { API } from "../_api/index";

export const getPayments = async () => {
  const { data } = await API.get("/payments", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createPayments = async (data) => {
  try {
    const response = await API.post("/payments", data, {
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

export const showPayments = async (id) => {
  try {
    const { data } = await API.get(`/payments/${id}`, {
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

export const updatePayments = async (id, data) => {
  try {
    const response = await API.post(`/payments/${id}`, data, {
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

export const deletePayments = async (id) => {
  try {
    await API.delete(`/payments/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
