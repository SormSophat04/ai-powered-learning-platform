import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AssignmentsState {
  activeAssignmentId: string;
  uploadedFile: string | null;
  uploadProgress: number;
}

const initialState: AssignmentsState = {
  activeAssignmentId: '',
  uploadedFile: null,
  uploadProgress: 0,
};

const assignmentsSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    setActiveAssignmentId(state, action: PayloadAction<string>) {
      state.activeAssignmentId = action.payload;
    },
    setUploadedFile(state, action: PayloadAction<string | null>) {
      state.uploadedFile = action.payload;
    },
    setUploadProgress(state, action: PayloadAction<number>) {
      state.uploadProgress = action.payload;
    },
  },
});

export const {
  setActiveAssignmentId, setUploadedFile, setUploadProgress,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
