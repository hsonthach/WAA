import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    token: string,
    isAuthenticated: boolean,
}

const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state, action) => {
            state.token = '';
            state.isAuthenticated = false;
        }
    }
});

export const {logout, loginSuccess} = authSlice.actions;
export default authSlice.reducer;