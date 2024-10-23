import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {GetUserResponse, User} from "../../types/User";

const baseUrl = "http://localhost:8080/users";

// Async thunk for getting users

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (): Promise<User[]> => {
        const response = await axios.get(baseUrl);
        // console.log(response.data);
        return response.data;
    }
);