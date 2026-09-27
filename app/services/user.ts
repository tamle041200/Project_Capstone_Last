import api from "./api";

export const getUsers = async () => {
  try {
    const response = await api.get("/users");

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/users?id=${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getUserById = async (id: number) => {
  try {
    const response = await api.get(`/users/${id}`);

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const updateUser = async (id: number, data: any) => {
  try {
    const response = await api.put(`/users/${id}`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addUser = async (data: any) => {
  try {
    const response = await api.post("/users", data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
