import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Problem, Submission, TestCase } from "@/types/problem"; 

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
    setSubmission: (state, action: PayloadAction<Submission>) => {
      if(state.selectedProblem?.submissions){
        state.selectedProblem.submissions.push(action.payload);
      }
    },
    clearProblem: (state) => {
      state.selectedProblem = null;
    },
  },
});

export const { setProblem, clearProblem, setTestcase, setProblems, setSubmission } = problemSlice.actions;
export default problemSlice.reducer;
