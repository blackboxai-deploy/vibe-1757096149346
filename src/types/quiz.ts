export type QuestionType = 
  | 'multiple-choice' 
  | 'multiple-select' 
  | 'true-false' 
  | 'fill-blank' 
  | 'image-choice'
  | 'drag-drop'
  | 'rating-scale';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type QuizCategory = 
  | 'mathematics'
  | 'science' 
  | 'history'
  | 'geography'
  | 'literature'
  | 'general-knowledge'
  | 'technology'
  | 'sports'
  | 'entertainment'
  | 'programming'
  | 'business'
  | 'languages'
  | 'personality'
  | 'trivia'
  | 'custom';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: QuizOption[];
  correctAnswer?: string | string[];
  explanation?: string;
  imageUrl?: string;
  points: number;
  timeLimit?: number;
  difficulty: DifficultyLevel;
  tags: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuizCategory;
  difficulty: DifficultyLevel;
  questions: QuizQuestion[];
  timeLimit?: number;
  passingScore: number;
  totalPoints: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  isPublic: boolean;
  tags: string[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  answers: Record<string, any>;
  score: number;
  percentage: number;
  timeSpent: number;
  completed: boolean;
  passed: boolean;
}

export interface QuizProgress {
  currentQuestionIndex: number;
  answers: Record<string, any>;
  startTime: Date;
  timeSpent: number;
  isPaused: boolean;
}

export interface QuizStats {
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  categoryStats: Record<QuizCategory, {
    attempted: number;
    completed: number;
    averageScore: number;
    bestScore: number;
  }>;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  score: number;
  percentage: number;
  timeSpent: number;
  completedAt: Date;
}