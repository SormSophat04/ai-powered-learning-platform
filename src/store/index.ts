import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import authReducer from './authSlice';
import coursesReducer from './coursesSlice';
import chatReducer from './chatSlice';
import quizReducer from './quizSlice';
import assignmentsReducer from './assignmentsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    courses: coursesReducer,
    chat: chatReducer,
    quiz: quizReducer,
    assignments: assignmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
