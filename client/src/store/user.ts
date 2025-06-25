import { userType } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

type InitState = {
  user: userType | null;
};

const initialState: InitState = {
  user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      user: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });

export const { user, logout } = userSlice.actions;
export default userSlice.reducer;