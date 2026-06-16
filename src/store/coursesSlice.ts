import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Lesson } from '../types';

interface CoursesState {
  coursesList: any[];
  selectedCourse: any;
  activeLesson: Lesson;
}

const initialState: CoursesState = {
  coursesList: [],
  selectedCourse: { id: '', title: '', progress: 0, category: '', difficulty: '', image: '', description: '', modules: [] },
  activeLesson: { id: '', title: '', duration: '', type: '' },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCoursesList(state, action: PayloadAction<any[]>) {
      state.coursesList = action.payload;
    },
    setSelectedCourse(state, action: PayloadAction<any>) {
      state.selectedCourse = action.payload;
    },
    setActiveLesson(state, action: PayloadAction<Lesson>) {
      state.activeLesson = action.payload;
    },
    updateCourseProgress(state, action: PayloadAction<{ courseId: string; progress: number }>) {
      const { courseId, progress } = action.payload;
      state.coursesList = state.coursesList.map(c =>
        c.id === courseId ? { ...c, progress } : c
      );
      if (state.selectedCourse?.id === courseId) {
        state.selectedCourse = { ...state.selectedCourse, progress };
      }
    },
  },
});

export const { setCoursesList, setSelectedCourse, setActiveLesson, updateCourseProgress } = coursesSlice.actions;
export default coursesSlice.reducer;
