import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  role: 'student' | 'teacher' | 'admin';
}

const initialState: AuthState = {
  role: 'student',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<'student' | 'teacher' | 'admin'>) {
      state.role = action.payload;
    },
  },
});

export const { setRole } = authSlice.actions;
export default authSlice.reducer;
