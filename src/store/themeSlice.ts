import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'dark' | 'light';
}

const initialState: ThemeState = {
  theme: (localStorage.getItem('theme') as 'dark' | 'light') || 'dark',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
