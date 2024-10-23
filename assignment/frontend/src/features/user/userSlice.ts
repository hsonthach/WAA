import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../types/User";
import {getUsers} from "./functions";

interface UserState {
    users: User[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                // console.log("loading users");
                state.status = "loading";
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                console.log("loaded users successfully", action.meta.arg);
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                // console.log("loading users failed");
                state.status = "failed";
                state.error = action.error.message || "Failed to get todos";
            });
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;