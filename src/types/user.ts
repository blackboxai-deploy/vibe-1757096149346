export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  lastLogin: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  soundEnabled: boolean;
  autoSubmit: boolean;
  showExplanations: boolean;
  defaultDifficulty: 'easy' | 'medium' | 'hard';
  preferredCategories: string[];
}

export interface UserStats {
  totalQuizzesTaken: number;
  totalQuestionsAnswered: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  streak: number;
  longestStreak: number;
  achievements: Achievement[];
  level: number;
  experience: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: Date;
  category: string;
}

export interface UserSession {
  isLoggedIn: boolean;
  user: User | null;
  token?: string;
}