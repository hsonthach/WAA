import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducer/todoSlice";
import authReducer from "./reducer/authSlice";
import userReducer from "./reducer/userSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
