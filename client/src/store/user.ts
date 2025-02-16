import { userType } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

type init = {
  user: userType
  isAuthenticated: boolean
}

const initialState:init = {
    user: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      user: (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      },
      logout: (state) => {
        state.user = null;
        state.isAuthenticated = false;
      },
    },
  });

export const { user, logout } = userSlice.actions;
export default userSlice.reducer;