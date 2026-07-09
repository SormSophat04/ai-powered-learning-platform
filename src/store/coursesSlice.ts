import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Lesson, Course } from '../types';

interface CoursesState {
  selectedCourse: Partial<Course>;
  activeLesson: Lesson;
}

const initialState: CoursesState = {
  selectedCourse: { id: '', title: '', progress: 0, category: '', difficulty: '', image: '', description: '', modules: [] },
  activeLesson: { id: '', title: '', duration: '', type: '' },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setSelectedCourse(state, action: PayloadAction<Partial<Course>>) {
      state.selectedCourse = action.payload;
    },
    setActiveLesson(state, action: PayloadAction<Lesson>) {
      state.activeLesson = action.payload;
    },
  },
});

export const { setSelectedCourse, setActiveLesson } = coursesSlice.actions;
export default coursesSlice.reducer;
