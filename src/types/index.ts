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
