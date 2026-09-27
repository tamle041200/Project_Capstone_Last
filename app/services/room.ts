import { log } from "console";
import api from "./api";

export const getRooms = async () => {
  try {
    const response = await api.get("/phong-thue");

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRoomById = async (id: string) => {
  try {
    const response = await api.get(`/phong-thue/${id}`);
    const result = await response.data;
    return result.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLocations = async () => {
  try {
    const response = await api.get("/vi-tri");

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getRoomsByLocation = async (location: number) => {
  try {
    const response = await api.get(
      `/phong-thue/lay-phong-theo-vi-tri?maViTri=${location}`,
    );

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deleteRoom = async (id: number) => {
  try {
    const response = await api.delete(`/phong-thue/${id}`);
    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const updateRoom = async (id: string | number, data: any) => {
  try {
    const response = await api.put(`/phong-thue/${id}`, data);
    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const addRoom = async (data: any) => {
  try {
    const response = await api.post("/phong-thue", data);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
