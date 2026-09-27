import api from "./api";
import type { TBookingRequest } from "../type";

export const getBookingByUser = async (maNguoiDung: number) => {
  try {
    const response = await api.get(
      `/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`,
    );

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const createBooking = async (data: TBookingRequest) => {
  try {
    const response = await api.post("/dat-phong", data);
    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const deleteBooking = async (id: number) => {
  try {
    const response = await api.delete(`/dat-phong/${id}`);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const updateBooking = async (id: number, data: TBookingRequest) => {
  try {
    const response = await api.put(`/dat-phong/${id}`, data);

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
