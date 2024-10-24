import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    token: string,
    isAuthenticated: boolean,
    email: string,
}

const initialState: AuthState = {
    token: '',
    isAuthenticated: false,
    email: '',
}

type PayloadActionType = {
    token: string,
    email: string,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<PayloadActionType>) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = '';
            state.email = '';
            state.isAuthenticated = false;
        }
    }
});

export const {logout, loginSuccess} = authSlice.actions;
export default authSlice.reducer;