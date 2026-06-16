import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  quizTopic: string;
  quizDifficulty: string;
  quizCount: number;
  quizRunning: boolean;
  currentQuiz: any;
  quizCurrentIndex: number;
  quizSelectedAnswer: number | null;
  quizAnswersRecord: (number | null)[];
  quizTimer: number;
  quizScore: number | null;
  quizCompleted: boolean;
}

const initialState: QuizState = {
  quizTopic: 'Java OOP',
  quizDifficulty: 'Medium',
  quizCount: 5,
  quizRunning: false,
  currentQuiz: null,
  quizCurrentIndex: 0,
  quizSelectedAnswer: null,
  quizAnswersRecord: [],
  quizTimer: 0,
  quizScore: null,
  quizCompleted: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuizTopic(state, action: PayloadAction<string>) {
      state.quizTopic = action.payload;
    },
    setQuizDifficulty(state, action: PayloadAction<string>) {
      state.quizDifficulty = action.payload;
    },
    setQuizCount(state, action: PayloadAction<number>) {
      state.quizCount = action.payload;
    },
    startQuiz(state, action: PayloadAction<any>) {
      state.currentQuiz = action.payload;
      state.quizCurrentIndex = 0;
      state.quizSelectedAnswer = null;
      state.quizAnswersRecord = [];
      state.quizTimer = 0;
      state.quizScore = null;
      state.quizCompleted = false;
      state.quizRunning = true;
    },
    selectQuizAnswer(state, action: PayloadAction<number | null>) {
      state.quizSelectedAnswer = action.payload;
    },
    nextQuizQuestion(state) {
      const newRecord = [...state.quizAnswersRecord];
      newRecord[state.quizCurrentIndex] = state.quizSelectedAnswer;
      const nextIndex = state.quizCurrentIndex + 1;
      state.quizAnswersRecord = newRecord;
      state.quizCurrentIndex = nextIndex;
      state.quizSelectedAnswer = newRecord[nextIndex] !== undefined ? newRecord[nextIndex] : null;
    },
    prevQuizQuestion(state) {
      if (state.quizCurrentIndex > 0) {
        const prevIndex = state.quizCurrentIndex - 1;
        state.quizCurrentIndex = prevIndex;
        state.quizSelectedAnswer = state.quizAnswersRecord[prevIndex];
      }
    },
    incrementTimer(state) {
      state.quizTimer += 1;
    },
    resetQuiz(state) {
      state.quizRunning = false;
      state.currentQuiz = null;
      state.quizCompleted = false;
    },
    finishQuiz(state, action: PayloadAction<{ score: number; answersRecord: (number | null)[]; result: any }>) {
      state.quizAnswersRecord = action.payload.answersRecord;
      state.quizScore = action.payload.score;
      state.quizCompleted = true;
    },
  },
});

export const {
  setQuizTopic, setQuizDifficulty, setQuizCount, startQuiz,
  selectQuizAnswer, nextQuizQuestion, prevQuizQuestion,
  incrementTimer, resetQuiz, finishQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
