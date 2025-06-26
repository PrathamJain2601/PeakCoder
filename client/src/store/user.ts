import { Leaderboard, RecentSubmissions, Statistics, userType } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';

type InitState = {
  user: userType | null;
  statistics: Statistics | null;
  recentSubmissions: RecentSubmissions[] | null;
  leaderboard: Leaderboard[] | null
};

const initialState: InitState = {
  user: null,
  statistics: null,
  recentSubmissions: null,
  leaderboard: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      user: (state, action) => {
        state.user = action.payload;
      },
      setRecentSubmission: (state, action) => {
        state.recentSubmissions = action.payload
      },
      setStatistics: (state, action) => {
        state.statistics = action.payload
      },
      setLeaderboard: (state, action) => {
        state.leaderboard = action.payload
      },
      logout: (state) => {
        state.leaderboard = null;
        state.recentSubmissions = null;
        state.statistics = null;
        state.user = null
      },
    },
  });

export const { user, logout, setStatistics, setRecentSubmission, setLeaderboard } = userSlice.actions;
export default userSlice.reducer;