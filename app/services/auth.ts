import api from "./api";
import type { TLogIn, TRegister } from "../type";

export const getLogIn = async (data: TLogIn) => {
  try {
    const response = await api.post("/auth/signin", data);

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const getSignUp = async (data: TRegister) => {
  try {
    const response = await api.post("/auth/signup", data);

    return response.data.content;
  } catch (error) {
    console.log(error);
    return [];
  }
};
