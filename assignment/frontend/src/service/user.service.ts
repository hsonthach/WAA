import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../types/User";
import axios from "axios";

const baseUrl = "http://localhost:8080/users";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (): Promise<User[]> => {
    const response = await axios.get(baseUrl);
    return response.data;
  }
);

export const login = async (formData: {email: string, password: string}) => {
  return await axios("http://localhost:8080/auth/login", {
    method: "POST",
    data: formData,
  });
};
