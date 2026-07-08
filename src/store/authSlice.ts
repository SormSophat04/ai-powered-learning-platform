import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  role: 'student' | 'teacher' | 'admin';
  name: string;
  email: string;
  userId: number | null;
}

const initialState: AuthState = {
  role: 'student',
  name: '',
  email: '',
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<'student' | 'teacher' | 'admin'>) {
      state.role = action.payload;
    },
    setUser(state, action: PayloadAction<{ name: string; email: string; role: 'student' | 'teacher' | 'admin'; userId: number }>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
    },
    clearUser(state) {
      state.role = 'student';
      state.name = '';
      state.email = '';
      state.userId = null;
    },
  },
});

export const { setRole, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
