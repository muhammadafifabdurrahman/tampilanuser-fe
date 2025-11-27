import { API } from "../_api";

export const getUsers = async () => {
  const { data } = await API.get("/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data.data;
};

export const createusers = async (data) => {
      try {
            const response = await API.post("/users", data)
            return response.data
      } catch (error){
            console.log(error);
            throw error
      }
}

export const showusers = async (id) => {
      try {
            const { data } = await API.get(`/users/${id}`)
            return data.data
      } catch (error) {
            console.log(error)
            throw error
      }
}

export const updateusers = async (id, data) => {
      try {
            const response = await API.put(`/users/${id}?_method=PUT`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
      } catch (error){
            console.log(error)
            throw error
      }
}     

export const deleteUser = async (id) => {
  const { data } = await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return data;
};
