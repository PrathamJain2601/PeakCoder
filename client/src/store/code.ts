import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 
import { Languages } from "@/lib/languages";
import { runResult } from "@/types/problem";
import { logout } from "./user";


type InitState = {
  run: runResult[],
  code: string,
  Language: string,
};

const initialState: InitState = {
  run: [],
  code: Languages[0].boilerplate || "",
  Language: Languages[0].name,
};

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.Language = action.payload;
    },
    setRunResult: (state, action: PayloadAction<runResult[]>) => {
      state.run = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.run = [];
      state.code = "";
      state.Language = "C++"
    });
  }
});

export const { setCode, setLanguage, setRunResult } = codeSlice.actions;
export default codeSlice.reducer;
