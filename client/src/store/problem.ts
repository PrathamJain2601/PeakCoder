import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Problem, Submission, TestCase } from "@/types/problem"; 
import { useDispatch } from "react-redux";
import { logout } from "./user";

type InitState = {
  selectedProblem: Problem | null;
  problems: Problem[];
  selectedTestcase: TestCase[] | null;
  submitPending: boolean;
  activeTab: "description" | "submissions"
};

const initialState: InitState = {
  selectedProblem: null,
  problems: [], 
  selectedTestcase: null,
  submitPending: false,
  activeTab: "description"
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
    setActiveTab:(state, action: PayloadAction<"description" | "submissions">) => {
      state.activeTab = action.payload;
    },
    setSubmitPending:(state, action: PayloadAction<boolean>)=>{
      state.submitPending = action.payload;
    },
    clearProblem: (state) => {
      state.selectedProblem = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.selectedProblem = null;
      state.problems = [];
      state.selectedTestcase = null;
      state.submitPending = false;
      state.activeTab = "description";
    });
  }
});

export const { setProblem, clearProblem, setTestcase, setProblems, setSubmission, setSubmitPending, setActiveTab } = problemSlice.actions;
export default problemSlice.reducer;
