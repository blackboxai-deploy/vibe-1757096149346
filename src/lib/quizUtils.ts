'use client';

import { Quiz, QuizQuestion, QuizAttempt } from '@/types/quiz';

// Calculate quiz score
export const calculateScore = (
  quiz: Quiz, 
  answers: Record<string, any>
): { score: number; percentage: number; correctAnswers: number; totalQuestions: number } => {
  let correctAnswers = 0;
  let totalPoints = 0;

  quiz.questions.forEach((question) => {
    const userAnswer = answers[question.id];
    if (!userAnswer) return;

    let isCorrect = false;

    switch (question.type) {
      case 'multiple-choice':
      case 'true-false':
      case 'image-choice':
        isCorrect = question.options?.some(option => 
          option.id === userAnswer && option.isCorrect
        ) || false;
        break;

      case 'multiple-select':
        if (Array.isArray(userAnswer)) {
          const correctOptions = question.options?.filter(opt => opt.isCorrect).map(opt => opt.id) || [];
          isCorrect = correctOptions.length === userAnswer.length && 
                     correctOptions.every(id => userAnswer.includes(id));
        }
        break;

      case 'fill-blank':
        if (typeof question.correctAnswer === 'string') {
          isCorrect = userAnswer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
        }
        break;

      case 'rating-scale':
        // For rating scales, all answers are considered "correct" (no wrong answer)
        isCorrect = true;
        break;

      case 'drag-drop':
        // Implementation would depend on specific drag-drop logic
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer);
        break;
    }

    if (isCorrect) {
      correctAnswers++;
      totalPoints += question.points;
    }
  });

  const percentage = quiz.questions.length > 0 ? (correctAnswers / quiz.questions.length) * 100 : 0;

  return {
    score: totalPoints,
    percentage: Math.round(percentage * 100) / 100,
    correctAnswers,
    totalQuestions: quiz.questions.length
  };
};

// Check if quiz is passed
export const isQuizPassed = (quiz: Quiz, percentage: number): boolean => {
  return percentage >= quiz.passingScore;
};

// Calculate time spent
export const calculateTimeSpent = (startTime: Date, endTime: Date): number => {
  return Math.round((endTime.getTime() - startTime.getTime()) / 1000);
};

// Format time display
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// Format time for display (e.g., "5 minutes 30 seconds")
export const formatTimeVerbose = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs} second${secs !== 1 ? 's' : ''}`);

  return parts.join(', ');
};

// Shuffle array (for randomizing questions or options)
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get next question index
export const getNextQuestionIndex = (currentIndex: number, totalQuestions: number): number => {
  return Math.min(currentIndex + 1, totalQuestions - 1);
};

// Get previous question index
export const getPreviousQuestionIndex = (currentIndex: number): number => {
  return Math.max(currentIndex - 1, 0);
};

// Check if all questions are answered
export const areAllQuestionsAnswered = (quiz: Quiz, answers: Record<string, any>): boolean => {
  return quiz.questions.every(question => {
    const answer = answers[question.id];
    if (question.type === 'multiple-select') {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined && answer !== null && answer !== '';
  });
};

// Get unanswered questions
export const getUnansweredQuestions = (quiz: Quiz, answers: Record<string, any>): QuizQuestion[] => {
  return quiz.questions.filter(question => {
    const answer = answers[question.id];
    if (question.type === 'multiple-select') {
      return !Array.isArray(answer) || answer.length === 0;
    }
    return answer === undefined || answer === null || answer === '';
  });
};

// Calculate progress percentage
export const calculateProgressPercentage = (currentIndex: number, totalQuestions: number): number => {
  if (totalQuestions === 0) return 0;
  return Math.round(((currentIndex + 1) / totalQuestions) * 100);
};

// Generate quiz attempt object
export const createQuizAttempt = (
  quizId: string,
  userId: string,
  startTime: Date,
  endTime: Date,
  answers: Record<string, any>,
  quiz: Quiz
): QuizAttempt => {
  const { score, percentage } = calculateScore(quiz, answers);
  const timeSpent = calculateTimeSpent(startTime, endTime);
  const completed = areAllQuestionsAnswered(quiz, answers);
  const passed = isQuizPassed(quiz, percentage);

  return {
    id: `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    quizId,
    userId,
    startTime,
    endTime,
    answers,
    score,
    percentage,
    timeSpent,
    completed,
    passed
  };
};

// Validate answer format
export const validateAnswer = (question: QuizQuestion, answer: any): boolean => {
  if (answer === undefined || answer === null) return false;

  switch (question.type) {
    case 'multiple-choice':
    case 'true-false':
    case 'image-choice':
      return typeof answer === 'string' && answer.trim() !== '';

    case 'multiple-select':
      return Array.isArray(answer) && answer.length > 0;

    case 'fill-blank':
      return typeof answer === 'string' && answer.trim() !== '';

    case 'rating-scale':
      return typeof answer === 'string' || typeof answer === 'number';

    case 'drag-drop':
      return Array.isArray(answer) || typeof answer === 'object';

    default:
      return true;
  }
};

// Get question type display name
export const getQuestionTypeDisplayName = (type: string): string => {
  const displayNames: Record<string, string> = {
    'multiple-choice': 'Multiple Choice',
    'multiple-select': 'Multiple Select',
    'true-false': 'True/False',
    'fill-blank': 'Fill in the Blank',
    'image-choice': 'Image Choice',
    'drag-drop': 'Drag & Drop',
    'rating-scale': 'Rating Scale'
  };
  return displayNames[type] || type;
};

// Calculate quiz difficulty score based on questions
export const calculateQuizDifficultyScore = (quiz: Quiz): number => {
  const difficultyWeights = { easy: 1, medium: 2, hard: 3 };
  const totalWeight = quiz.questions.reduce((sum, q) => sum + difficultyWeights[q.difficulty], 0);
  return totalWeight / quiz.questions.length;
};

// Sort quizzes by various criteria
export const sortQuizzes = (quizzes: Quiz[], sortBy: 'title' | 'difficulty' | 'created' | 'popularity'): Quiz[] => {
  return [...quizzes].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'difficulty':
        return calculateQuizDifficultyScore(a) - calculateQuizDifficultyScore(b);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'popularity':
        // This would require attempt data to calculate
        return 0;
      default:
        return 0;
    }
  });
};

// Filter quizzes by criteria
export const filterQuizzes = (
  quizzes: Quiz[], 
  filters: {
    category?: string;
    difficulty?: string;
    searchTerm?: string;
    tags?: string[];
  }
): Quiz[] => {
  return quizzes.filter(quiz => {
    if (filters.category && quiz.category !== filters.category) return false;
    if (filters.difficulty && quiz.difficulty !== filters.difficulty) return false;
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      const matchesTitle = quiz.title.toLowerCase().includes(searchTerm);
      const matchesDescription = quiz.description.toLowerCase().includes(searchTerm);
      const matchesTags = quiz.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      if (!matchesTitle && !matchesDescription && !matchesTags) return false;
    }
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        quiz.tags.includes(tag.toLowerCase())
      );
      if (!hasMatchingTag) return false;
    }
    return true;
  });
};