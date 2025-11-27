import { API } from "../_api/index"

export const getTransactions = async () => {
      const {data} = await API.get("/payments");
      return data.data
}

export const createTransaction = async (data) => {
      try {
            const response = await API.post("/payments", data)
            return response.data
      } catch (error){
            console.log(error);
            throw error
      }
}

export const showTransaction = async (id) => {
      try {
            const { data } = await API.get(`/payments/${id}`)
            return data.data
      } catch (error) {
            console.log(error)
            throw error
      }
}

export const updateTransaction = async (id, data) => {
      try {
            const response = await API.put(`/payments/${id}?_method=PUT`, data, {
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

export const deleteTransaction = async (id) => {
      try {
            await API.delete(`/payments/${id}`)
      } catch(error){
            console.log(error)
            throw error
      }
}