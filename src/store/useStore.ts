import { create } from 'zustand';
import { 
  initialStudentStats, courses, mockQuizzes, initialAssignments, 
  learningAnalytics, learningPath, teacherDashboardData, adminDashboardData 
} from '../mockData';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: string;
  url?: string;
  active?: boolean;
}

export interface Module {
  id: string;
  title: string;
  completed: boolean;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  category: string;
  difficulty: string;
  image: string;
  description: string;
  modules: Module[];
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: string;
  score: number | null;
  feedback: {
    grammar: number;
    logic: number;
    completeness: number;
    text: string;
  } | null;
  file: string | null;
}

export interface ChatMessage {
  id: number;
  sender: 'student' | 'ai';
  text: string;
}

interface AppStore {
  // Global Layout State
  theme: 'dark' | 'light';
  role: 'student' | 'teacher' | 'admin';
  toggleTheme: () => void;
  setRole: (role: 'student' | 'teacher' | 'admin') => void;

  // Courses & Active Learning State
  coursesList: Course[];
  selectedCourse: Course;
  activeLesson: Lesson;
  setSelectedCourse: (course: Course) => void;
  setActiveLesson: (lesson: Lesson) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;

  // AI Tutor State
  chatHistory: ChatMessage[];
  chatConversations: { id: number; title: string }[];
  activeChatId: number;
  aiTyping: boolean;
  setActiveChatId: (id: number) => void;
  setAiTyping: (typing: boolean) => void;
  addChatMessage: (msg: ChatMessage) => void;
  setChatHistory: (history: ChatMessage[]) => void;

  // Quiz State
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
  setQuizTopic: (topic: string) => void;
  setQuizDifficulty: (diff: string) => void;
  setQuizCount: (count: number) => void;
  startQuiz: (quiz: any) => void;
  selectQuizAnswer: (idx: number | null) => void;
  nextQuizQuestion: () => void;
  prevQuizQuestion: () => void;
  incrementTimer: () => void;
  resetQuiz: () => void;

  // Assignment State
  assignments: Assignment[];
  activeAssignmentId: string;
  uploadedFile: string | null;
  uploadProgress: number;
  aiFeedback: any | null;
  setActiveAssignmentId: (id: string) => void;
  setUploadedFile: (file: string | null) => void;
  setUploadProgress: (progress: number) => void;
  setAiFeedback: (feedback: any) => void;
  submitAssignment: (asgId: string, file: string, feedback: any) => void;
}

export const useStore = create<AppStore>((set) => ({
  // Global Layout
  theme: 'light',
  role: 'student',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setRole: (role) => set({ role }),

  // Courses
  coursesList: courses,
  selectedCourse: courses[0],
  activeLesson: courses[0].modules[2].lessons[0],
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setActiveLesson: (lesson) => set({ activeLesson: lesson }),
  updateCourseProgress: (courseId, progress) => set((state) => ({
    coursesList: state.coursesList.map(c => c.id === courseId ? { ...c, progress } : c),
    selectedCourse: state.selectedCourse.id === courseId ? { ...state.selectedCourse, progress } : state.selectedCourse
  })),

  // AI Tutor
  chatHistory: [
    { id: 1, sender: 'ai', text: "Hello! I am EduMind AI, your personal tutor. Ask me anything about your current courses or paste a topic you want explained." }
  ],
  chatConversations: [
    { id: 1, title: 'Java OOP Principles' },
    { id: 2, title: 'Database Normalization' },
    { id: 3, title: 'Recursion explanation' }
  ],
  activeChatId: 1,
  aiTyping: false,
  setActiveChatId: (id) => set({ activeChatId: id }),
  setAiTyping: (aiTyping) => set({ aiTyping }),
  addChatMessage: (msg) => set((state) => ({ chatHistory: [...state.chatHistory, msg] })),
  setChatHistory: (chatHistory) => set({ chatHistory }),

  // Quiz
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
  setQuizTopic: (quizTopic) => set({ quizTopic }),
  setQuizDifficulty: (quizDifficulty) => set({ quizDifficulty }),
  setQuizCount: (quizCount) => set({ quizCount }),
  startQuiz: (quiz) => set({
    currentQuiz: quiz,
    quizCurrentIndex: 0,
    quizSelectedAnswer: null,
    quizAnswersRecord: [],
    quizTimer: 0,
    quizScore: null,
    quizCompleted: false,
    quizRunning: true
  }),
  selectQuizAnswer: (idx) => set({ quizSelectedAnswer: idx }),
  nextQuizQuestion: () => set((state) => {
    const newRecord = [...state.quizAnswersRecord];
    newRecord[state.quizCurrentIndex] = state.quizSelectedAnswer;
    
    const isLastQuestion = state.quizCurrentIndex + 1 >= state.currentQuiz.questions.length;
    if (isLastQuestion) {
      // Calculate final score
      let correctCount = 0;
      state.currentQuiz.questions.forEach((q: any, idx: number) => {
        if (newRecord[idx] === q.answer) correctCount++;
      });
      const percent = Math.round((correctCount / state.currentQuiz.questions.length) * 100);
      return {
        quizAnswersRecord: newRecord,
        quizScore: percent,
        quizCompleted: true
      };
    } else {
      const nextIndex = state.quizCurrentIndex + 1;
      return {
        quizAnswersRecord: newRecord,
        quizCurrentIndex: nextIndex,
        quizSelectedAnswer: newRecord[nextIndex] !== undefined ? newRecord[nextIndex] : null
      };
    }
  }),
  prevQuizQuestion: () => set((state) => {
    if (state.quizCurrentIndex > 0) {
      const prevIndex = state.quizCurrentIndex - 1;
      return {
        quizCurrentIndex: prevIndex,
        quizSelectedAnswer: state.quizAnswersRecord[prevIndex]
      };
    }
    return {};
  }),
  incrementTimer: () => set((state) => ({ quizTimer: state.quizTimer + 1 })),
  resetQuiz: () => set({ quizRunning: false, currentQuiz: null, quizCompleted: false }),

  // Assignments
  assignments: initialAssignments as Assignment[],
  activeAssignmentId: 'asg-1',
  uploadedFile: null,
  uploadProgress: 0,
  aiFeedback: null,
  setActiveAssignmentId: (activeAssignmentId) => set({ activeAssignmentId }),
  setUploadedFile: (uploadedFile) => set({ uploadedFile }),
  setUploadProgress: (uploadProgress) => set({ uploadProgress }),
  setAiFeedback: (aiFeedback) => set({ aiFeedback }),
  submitAssignment: (asgId, file, feedback) => set((state) => ({
    assignments: state.assignments.map(a => 
      a.id === asgId 
        ? { ...a, status: 'Submitted', file, feedback }
        : a
    )
  }))
}));
