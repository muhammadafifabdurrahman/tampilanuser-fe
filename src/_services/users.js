import { API } from "../_api";

export const getUsers = async () => {
  const { data } = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createUsers = async (data) => {
  try {
    const response = await API.post("/users", data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const showUsers = async (id) => {
  try {
    const { data } = await API.get(`/users/${id}`, {
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

export const updateUsers = async (id, data) => {
  try {
    const response = await API.put(`/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
};

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
