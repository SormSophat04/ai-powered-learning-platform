import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Assignment } from '../types';

interface AssignmentsState {
  assignments: Assignment[];
  activeAssignmentId: string;
  uploadedFile: string | null;
  uploadProgress: number;
  aiFeedback: any | null;
}

const initialState: AssignmentsState = {
  assignments: [],
  activeAssignmentId: '',
  uploadedFile: null,
  uploadProgress: 0,
  aiFeedback: null,
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setAssignments(state, action: PayloadAction<Assignment[]>) {
      state.assignments = action.payload;
    },
    setActiveAssignmentId(state, action: PayloadAction<string>) {
      state.activeAssignmentId = action.payload;
    },
    setUploadedFile(state, action: PayloadAction<string | null>) {
      state.uploadedFile = action.payload;
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
    setAiFeedback(state, action: PayloadAction<any>) {
      state.aiFeedback = action.payload;
    },
    submitAssignment(state, action: PayloadAction<{ asgId: string; file: string; feedback: any }>) {
      const { asgId, file, feedback } = action.payload;
      state.assignments = state.assignments.map(a =>
        a.id === asgId ? { ...a, status: 'Submitted', file, feedback } : a
      );
    },
  },
});

export const {
  setAssignments, setActiveAssignmentId, setUploadedFile,
  setUploadProgress, setAiFeedback, submitAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
