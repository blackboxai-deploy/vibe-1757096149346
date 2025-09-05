'use client';

import { QuizAttempt, QuizProgress, QuizStats, UserPreferences } from '@/types/quiz';
import { User } from '@/types/user';

const STORAGE_KEYS = {
  USER_PROFILE: 'quiz_user_profile',
  QUIZ_ATTEMPTS: 'quiz_attempts',
  QUIZ_PROGRESS: 'quiz_progress',
  USER_PREFERENCES: 'user_preferences',
  QUIZ_STATS: 'quiz_stats',
  CURRENT_SESSION: 'current_quiz_session'
};

// Helper function to safely parse JSON from localStorage
const safeJsonParse = <T>(key: string, defaultValue: T): T => {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error parsing localStorage key ${key}:`, error);
    return defaultValue;
  }
};

// Helper function to safely set JSON to localStorage
const safeJsonSet = (key: string, value: any): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key ${key}:`, error);
  }
};

// User Profile Management
export const getUserProfile = (): User | null => {
  return safeJsonParse<User | null>(STORAGE_KEYS.USER_PROFILE, null);
};

export const setUserProfile = (user: User): void => {
  safeJsonSet(STORAGE_KEYS.USER_PROFILE, user);
};

export const clearUserProfile = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  }
};

// Quiz Attempts Management
export const getQuizAttempts = (): QuizAttempt[] => {
  return safeJsonParse<QuizAttempt[]>(STORAGE_KEYS.QUIZ_ATTEMPTS, []);
};

export const saveQuizAttempt = (attempt: QuizAttempt): void => {
  const attempts = getQuizAttempts();
  const existingIndex = attempts.findIndex(a => a.id === attempt.id);
  
  if (existingIndex >= 0) {
    attempts[existingIndex] = attempt;
  } else {
    attempts.push(attempt);
  }
  
  safeJsonSet(STORAGE_KEYS.QUIZ_ATTEMPTS, attempts);
};

export const getQuizAttemptsByQuizId = (quizId: string): QuizAttempt[] => {
  return getQuizAttempts().filter(attempt => attempt.quizId === quizId);
};

export const getQuizAttemptsByUserId = (userId: string): QuizAttempt[] => {
  return getQuizAttempts().filter(attempt => attempt.userId === userId);
};

// Quiz Progress Management (for current active quiz)
export const getQuizProgress = (quizId: string): QuizProgress | null => {
  const allProgress = safeJsonParse<Record<string, QuizProgress>>(STORAGE_KEYS.QUIZ_PROGRESS, {});
  return allProgress[quizId] || null;
};

export const saveQuizProgress = (quizId: string, progress: QuizProgress): void => {
  const allProgress = safeJsonParse<Record<string, QuizProgress>>(STORAGE_KEYS.QUIZ_PROGRESS, {});
  allProgress[quizId] = progress;
  safeJsonSet(STORAGE_KEYS.QUIZ_PROGRESS, allProgress);
};

export const clearQuizProgress = (quizId: string): void => {
  const allProgress = safeJsonParse<Record<string, QuizProgress>>(STORAGE_KEYS.QUIZ_PROGRESS, {});
  delete allProgress[quizId];
  safeJsonSet(STORAGE_KEYS.QUIZ_PROGRESS, allProgress);
};

export const clearAllQuizProgress = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
  }
};

// User Preferences Management
export const getUserPreferences = (): UserPreferences => {
  return safeJsonParse<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES, {
    theme: 'light',
    soundEnabled: true,
    autoSubmit: false,
    showExplanations: true,
    defaultDifficulty: 'medium',
    preferredCategories: []
  });
};

export const setUserPreferences = (preferences: UserPreferences): void => {
  safeJsonSet(STORAGE_KEYS.USER_PREFERENCES, preferences);
};

export const updateUserPreference = <K extends keyof UserPreferences>(
  key: K, 
  value: UserPreferences[K]
): void => {
  const preferences = getUserPreferences();
  preferences[key] = value;
  setUserPreferences(preferences);
};

// Quiz Statistics Management
export const getQuizStats = (): QuizStats => {
  return safeJsonParse<QuizStats>(STORAGE_KEYS.QUIZ_STATS, {
    totalQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0,
    categoryStats: {}
  });
};

export const updateQuizStats = (attempt: QuizAttempt): void => {
  const stats = getQuizStats();
  
  stats.totalQuizzes++;
  if (attempt.completed) {
    stats.completedQuizzes++;
  }
  
  stats.totalTimeSpent += attempt.timeSpent;
  stats.bestScore = Math.max(stats.bestScore, attempt.percentage);
  stats.averageScore = (stats.averageScore * (stats.completedQuizzes - 1) + attempt.percentage) / stats.completedQuizzes;
  
  // Update category stats would require quiz category info
  // This would be updated when we have the full quiz data
  
  safeJsonSet(STORAGE_KEYS.QUIZ_STATS, stats);
};

// Current Session Management
export const getCurrentSession = (): any => {
  return safeJsonParse(STORAGE_KEYS.CURRENT_SESSION, null);
};

export const setCurrentSession = (sessionData: any): void => {
  safeJsonSet(STORAGE_KEYS.CURRENT_SESSION, sessionData);
};

export const clearCurrentSession = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
  }
};

// Utility functions
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateAttemptId = (): string => {
  return `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Clear all data (useful for reset functionality)
export const clearAllData = (): void => {
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};

// Export all data (useful for backup)
export const exportAllData = (): Record<string, any> => {
  const data: Record<string, any> = {};
  if (typeof window !== 'undefined') {
    Object.values(STORAGE_KEYS).forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          data[key] = JSON.parse(value);
        } catch (error) {
          data[key] = value;
        }
      }
    });
  }
  return data;
};

// Import all data (useful for restore)
export const importAllData = (data: Record<string, any>): void => {
  if (typeof window !== 'undefined') {
    Object.entries(data).forEach(([key, value]) => {
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      } catch (error) {
        console.error(`Error importing data for key ${key}:`, error);
      }
    });
  }
};