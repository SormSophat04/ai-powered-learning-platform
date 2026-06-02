// EduMind AI Mock Data

export const initialStudentStats = {
  coursesEnrolled: 12,
  assignmentsPending: 4,
  currentGPA: 3.7,
  learningStreak: 18,
  recentActivity: [
    { id: 1, type: 'quiz', text: 'Scored 85% in Java OOP Quiz', time: '2 hours ago', icon: 'Award' },
    { id: 2, type: 'assignment', text: 'Submitted Data Structures Report', time: '5 hours ago', icon: 'FileText' },
    { id: 3, type: 'course', text: 'Completed lesson "Interface & Abstract Classes"', time: 'Yesterday', icon: 'BookOpen' },
    { id: 4, type: 'ai', text: 'Generated study plan with AI Tutor', time: '2 days ago', icon: 'Cpu' },
  ]
};

export const courses = [
  {
    id: 'java-prog',
    title: 'Java Programming',
    progress: 80,
    category: 'Computer Science',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
    description: 'Learn object-oriented programming in Java, including inheritance, interfaces, polymorphism, and memory management.',
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: Java Basics',
        completed: true,
        lessons: [
          { id: 'les-1-1', title: 'Introduction to Java Virtual Machine (JVM)', duration: '12 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'les-1-2', title: 'Variables, Data Types, and Operators', duration: '18 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'les-1-3', title: 'Control Flow: Switch & Loops', duration: '15 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      },
      {
        id: 'mod-2',
        title: 'Module 2: Object-Oriented Design',
        completed: true,
        lessons: [
          { id: 'les-2-1', title: 'Classes, Objects, and Constructors', duration: '20 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'les-2-2', title: 'Understanding Inheritance in Java', duration: '22 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'les-2-3', title: 'Polymorphism: Overloading & Overriding', duration: '25 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      },
      {
        id: 'mod-3',
        title: 'Module 3: Advanced Concepts',
        completed: false,
        lessons: [
          { id: 'les-3-1', title: 'Interfaces and Abstract Classes', duration: '24 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', active: true },
          { id: 'les-3-2', title: 'Exceptions: Try, Catch, and Finally', duration: '18 mins', type: 'reading' },
          { id: 'les-3-3', title: 'Java Collections Framework Overview', duration: '30 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      }
    ]
  },
  {
    id: 'db-systems',
    title: 'Database Management Systems',
    progress: 45,
    category: 'Information Tech',
    difficulty: 'Medium',
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=400&q=80',
    description: 'Relational database concepts, SQL queries, normalization, indexing, and transactional processing mechanisms.',
    modules: [
      {
        id: 'db-mod-1',
        title: 'Module 1: Relational Model & SQL',
        completed: true,
        lessons: [
          { id: 'db-1-1', title: 'Introduction to Relational Databases', duration: '15 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'db-1-2', title: 'SQL Basics: SELECT, WHERE, JOINs', duration: '30 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      },
      {
        id: 'db-mod-2',
        title: 'Module 2: Database Design',
        completed: false,
        lessons: [
          { id: 'db-2-1', title: 'Entity-Relationship Diagrams (ERDs)', duration: '22 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'db-2-2', title: 'Functional Dependencies & Normalization', duration: '28 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & ML',
    progress: 15,
    category: 'Advanced Science',
    difficulty: 'Hard',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=400&q=80',
    description: 'Fundamentals of machine learning algorithms, deep learning models, neural networks, and decision tree engines.',
    modules: [
      {
        id: 'ai-mod-1',
        title: 'Module 1: AI Fundamentals',
        completed: false,
        lessons: [
          { id: 'ai-1-1', title: 'What is Artificial Intelligence?', duration: '14 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
          { id: 'ai-1-2', title: 'Linear Regression and Cost Functions', duration: '25 mins', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        ]
      }
    ]
  }
];

export const mockQuizzes = {
  'java-oop': {
    title: 'Java Object-Oriented Programming Quiz',
    topic: 'Java OOP Basics',
    questions: [
      {
        id: 1,
        question: 'Which OOP concept allows a sub-class to provide a specific implementation of a method that is already defined in its super-class?',
        options: [
          'Method Overriding (Polymorphism)',
          'Encapsulation',
          'Data Abstraction',
          'Multiple Inheritance'
        ],
        answer: 0,
        explanation: 'Method overriding happens when a subclass defines a method with the same signature as a method in its superclass, allowing dynamic polymorphism.'
      },
      {
        id: 2,
        question: 'Which of the following is true about abstract classes in Java?',
        options: [
          'They cannot contain concrete methods.',
          'They can be instantiated using the "new" keyword.',
          'They can contain both abstract and concrete methods.',
          'They do not support inheritance.'
        ],
        answer: 2,
        explanation: 'Abstract classes in Java can have abstract methods (without bodies) as well as concrete methods (with bodies). They cannot be instantiated directly.'
      },
      {
        id: 3,
        question: 'What is the default access modifier of interface variables in Java?',
        options: [
          'private final',
          'public static final',
          'protected static',
          'package-private'
        ],
        answer: 1,
        explanation: 'All variables declared inside a Java interface are implicitly public, static, and final.'
      },
      {
        id: 4,
        question: 'Which keyword is used to refer to a direct parent class member (variable or method)?',
        options: [
          'this',
          'parent',
          'super',
          'base'
        ],
        answer: 2,
        explanation: 'The "super" keyword is used to call parent class constructors and invoke parent class methods or variables.'
      },
      {
        id: 5,
        question: 'Which of the following prevents a class from being inherited in Java?',
        options: [
          'Declaring class as static',
          'Declaring class as abstract',
          'Declaring class as final',
          'Declaring class as sealed with no permissions'
        ],
        answer: 2,
        explanation: 'A final class cannot be subclassed (inherited). For example, Java\'s String class is final.'
      }
    ]
  }
};

export const initialAssignments = [
  {
    id: 'asg-1',
    title: 'Data Structures Report',
    course: 'Java Programming',
    dueDate: '2026-06-08',
    status: 'Pending',
    score: null,
    feedback: null,
    file: null
  },
  {
    id: 'asg-2',
    title: 'SQL Normalization Assignment',
    course: 'Database Management Systems',
    dueDate: '2026-05-28',
    status: 'Submitted',
    score: null,
    feedback: {
      grammar: 92,
      logic: 85,
      completeness: 90,
      text: 'Good understanding of 3NF and BCNF. Your schema decomposition is correct, though double-check the dependency preservation on customer table.'
    },
    file: 'sql_schema_design.sql'
  },
  {
    id: 'asg-3',
    title: 'Neural Network Implementation',
    course: 'Artificial Intelligence & ML',
    dueDate: '2026-05-15',
    status: 'Graded',
    score: 95,
    feedback: {
      grammar: 98,
      logic: 95,
      completeness: 93,
      text: 'Outstanding backpropagation implementation in vanilla Python. Matrix multiplications are optimized and convergence graphs are well presented.'
    },
    file: 'backprop_neural_net.ipynb'
  }
];

export const learningAnalytics = {
  performanceHistory: [
    { week: 'W1', score: 65, avg: 60 },
    { week: 'W2', score: 70, avg: 62 },
    { week: 'W3', score: 68, avg: 63 },
    { week: 'W4', score: 75, avg: 65 },
    { week: 'W5', score: 82, avg: 67 },
    { week: 'W6', score: 80, avg: 68 },
    { week: 'W7', score: 85, avg: 69 },
    { week: 'W8', score: 88, avg: 70 },
    { week: 'W9', score: 85, avg: 72 },
    { week: 'W10', score: 90, avg: 73 },
    { week: 'W11', score: 92, avg: 74 },
    { week: 'W12', score: 94, avg: 75 },
  ],
  subjectStrengths: [
    { subject: 'Java Programming', score: 92, limit: 100 },
    { subject: 'Database Systems', score: 78, limit: 100 },
    { subject: 'Artificial Intel', score: 65, limit: 100 },
    { subject: 'Networking', score: 82, limit: 100 },
    { subject: 'Web Dev', score: 88, limit: 100 }
  ],
  studyHours: [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 4.0 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 1.5 },
    { day: 'Fri', hours: 5.0 },
    { day: 'Sat', hours: 6.2 },
    { day: 'Sun', hours: 4.5 }
  ],
  aiPrediction: {
    grade: 'A',
    confidence: 89,
    insights: [
      'Focus on recursion and memory allocation in Java. You scored 45% in past practices for these modules.',
      'Strong performance in OOP principles. Maintain your study streak of 18 days to secure an A-grade.'
    ]
  }
};

export const learningPath = [
  { id: 'lp-1', title: 'Java Basics', status: 'completed', time: '10 hrs', difficulty: 'Easy', completion: 100, focus: 'Variables, arrays & simple flow controls.' },
  { id: 'lp-2', title: 'OOP Principles', status: 'completed', time: '15 hrs', difficulty: 'Medium', completion: 100, focus: 'Classes, Inheritance & Dynamic Polymorphism.' },
  { id: 'lp-3', title: 'Collections & Generics', status: 'current', time: '12 hrs', difficulty: 'Medium', completion: 45, focus: 'Lists, Maps, Sets & Safe Type structures.' },
  { id: 'lp-4', title: 'Spring Boot Framework', status: 'locked', time: '25 hrs', difficulty: 'Hard', completion: 0, focus: 'REST APIs, dependency injection & MVC patterns.' },
  { id: 'lp-5', title: 'Microservices with Spring Cloud', status: 'locked', time: '30 hrs', difficulty: 'Hard', completion: 0, focus: 'Discovery service, API Gateway & Eureka server structures.' }
];

export const teacherDashboardData = {
  widgets: {
    totalStudents: 148,
    totalCourses: 6,
    assignmentsPendingReview: 28,
    averageGrade: 'B+ (84.2%)'
  },
  aiInsights: [
    { id: 1, text: '32 students are struggling with Java OOP Polymorphism.', severity: 'high' },
    { id: 2, text: 'Quiz scores for Relational Algebra dropped by 12% in Database course.', severity: 'medium' },
    { id: 3, text: 'Study times drop mid-week (Wednesday). Recommendation: Schedule reminder pushes.', severity: 'low' }
  ],
  students: [
    { id: 'st-01', name: 'Alice Vance', email: 'alice@university.edu', course: 'Java Programming', grade: 'A', progress: 95, lastActive: '2 hrs ago' },
    { id: 'st-02', name: 'Benjamin Carter', email: 'ben@university.edu', course: 'Java Programming', grade: 'B-', progress: 78, lastActive: '5 hrs ago' },
    { id: 'st-03', name: 'Chloe Miller', email: 'chloe@university.edu', course: 'Database Management Systems', grade: 'A-', progress: 85, lastActive: '1 day ago' },
    { id: 'st-04', name: 'Daniel Brooks', email: 'daniel@university.edu', course: 'Artificial Intelligence & ML', grade: 'C+', progress: 42, lastActive: '3 days ago' },
    { id: 'st-05', name: 'Emma Watson', email: 'emma@university.edu', course: 'Java Programming', grade: 'A+', progress: 100, lastActive: '1 hr ago' },
  ],
  submissionQueue: [
    { id: 'sub-01', studentName: 'Benjamin Carter', assignmentTitle: 'Data Structures Report', courseName: 'Java Programming', date: 'Today', status: 'Needs Review' },
    { id: 'sub-02', studentName: 'Daniel Brooks', assignmentTitle: 'SQL Normalization Design', courseName: 'Database Management Systems', date: 'Yesterday', status: 'Needs Review' }
  ]
};

export const adminDashboardData = {
  stats: {
    totalActiveUsers: 1850,
    activeServers: 4,
    systemUptime: '99.98%',
    cpuUsage: 34,
    memoryUsage: 58,
    aiRequestsToday: 12450
  },
  roleDistribution: [
    { role: 'Student', count: 1620, color: '#4F46E5' },
    { role: 'Teacher', count: 180, color: '#06B6D4' },
    { role: 'Admin', count: 50, color: '#10B981' }
  ],
  activityLogs: [
    { id: 1, user: 'Admin (System)', action: 'Automatic backup executed successfully', time: '10 mins ago', type: 'system' },
    { id: 2, user: 'Dr. Jane Foster (Teacher)', action: 'Created new course "Advanced Algorithms"', time: '42 mins ago', type: 'course' },
    { id: 3, user: 'Sam Wilson (Student)', action: 'API usage burst: generated 15 AI flashcards', time: '1 hour ago', type: 'alert' },
    { id: 4, user: 'Admin (M)', action: 'Updated subscription plans in production', time: '3 hours ago', type: 'admin' },
  ],
  aiUsageStats: [
    { time: '09:00', requests: 450 },
    { time: '11:00', requests: 920 },
    { time: '13:00', requests: 1200 },
    { time: '15:00', requests: 1100 },
    { time: '17:00', requests: 850 },
    { time: '19:00', requests: 1400 },
    { time: '21:00', requests: 1800 },
    { time: '23:00', requests: 1150 }
  ]
};
