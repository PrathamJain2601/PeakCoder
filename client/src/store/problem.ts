import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Problem, TestCase } from "@/types/problem"; 

type InitState = {
  selectedProblem: Problem | null;
  problems: Problem[];
  selectedTestcase: TestCase[] | null;
};

const initialState: InitState = {
  selectedProblem: null,
  problems: [], 
  selectedTestcase: null
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    setProblems: (state, action: PayloadAction<Problem[]>) => {
      state.problems = action.payload || []; 
    },
    setProblem: (state, action: PayloadAction<Problem | null>) => {
      state.selectedProblem = action.payload;
    },
    setTestcase: (state, action: PayloadAction<TestCase[]>) => {
      state.selectedTestcase = action.payload || null;
    },
    clearProblem: (state) => {
      state.selectedProblem = null;
    },
  },
});

export const { setProblem, clearProblem, setTestcase, setProblems } = problemSlice.actions;
export default problemSlice.reducer;
