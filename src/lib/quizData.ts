import { Quiz, QuizCategory } from '@/types/quiz';

export const sampleQuizzes: Quiz[] = [
  {
    id: 'math-basics-1',
    title: 'Mathematics Basics',
    description: 'Test your fundamental math skills with arithmetic, algebra, and geometry questions.',
    category: 'mathematics',
    difficulty: 'easy',
    timeLimit: 600, // 10 minutes
    passingScore: 70,
    totalPoints: 100,
    imageUrl: 'https://placehold.co/400x300?text=Mathematics+Quiz+with+formulas+and+equations',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    tags: ['arithmetic', 'algebra', 'geometry'],
    questions: [
      {
        id: 'math-q1',
        type: 'multiple-choice',
        question: 'What is the result of 15 × 8?',
        options: [
          { id: 'a', text: '120', isCorrect: true },
          { id: 'b', text: '118', isCorrect: false },
          { id: 'c', text: '125', isCorrect: false },
          { id: 'd', text: '115', isCorrect: false }
        ],
        explanation: '15 × 8 = 120. This is a basic multiplication problem.',
        points: 10,
        difficulty: 'easy',
        tags: ['multiplication', 'arithmetic']
      },
      {
        id: 'math-q2',
        type: 'fill-blank',
        question: 'Solve for x: 3x + 7 = 22. x = ___',
        correctAnswer: '5',
        explanation: '3x + 7 = 22, so 3x = 15, therefore x = 5',
        points: 15,
        difficulty: 'medium',
        tags: ['algebra', 'equations']
      },
      {
        id: 'math-q3',
        type: 'true-false',
        question: 'The area of a circle with radius 5 is 25π.',
        options: [
          { id: 'true', text: 'True', isCorrect: true },
          { id: 'false', text: 'False', isCorrect: false }
        ],
        explanation: 'Area = πr² = π(5)² = 25π',
        points: 10,
        difficulty: 'medium',
        tags: ['geometry', 'circles']
      },
      {
        id: 'math-q4',
        type: 'multiple-select',
        question: 'Which of the following are prime numbers?',
        options: [
          { id: 'a', text: '17', isCorrect: true },
          { id: 'b', text: '21', isCorrect: false },
          { id: 'c', text: '23', isCorrect: true },
          { id: 'd', text: '25', isCorrect: false }
        ],
        explanation: '17 and 23 are prime numbers (only divisible by 1 and themselves). 21 = 3×7 and 25 = 5×5.',
        points: 20,
        difficulty: 'medium',
        tags: ['prime numbers', 'number theory']
      }
    ]
  },
  {
    id: 'science-general-1',
    title: 'General Science',
    description: 'Explore physics, chemistry, and biology concepts in this comprehensive science quiz.',
    category: 'science',
    difficulty: 'medium',
    timeLimit: 900, // 15 minutes
    passingScore: 75,
    totalPoints: 120,
    imageUrl: 'https://placehold.co/400x300?text=Science+Laboratory+with+beakers+and+microscope',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    tags: ['physics', 'chemistry', 'biology'],
    questions: [
      {
        id: 'sci-q1',
        type: 'multiple-choice',
        question: 'What is the chemical symbol for gold?',
        options: [
          { id: 'a', text: 'Go', isCorrect: false },
          { id: 'b', text: 'Au', isCorrect: true },
          { id: 'c', text: 'Ag', isCorrect: false },
          { id: 'd', text: 'Gd', isCorrect: false }
        ],
        explanation: 'Au comes from the Latin word "aurum" meaning gold.',
        points: 10,
        difficulty: 'easy',
        tags: ['chemistry', 'periodic table']
      },
      {
        id: 'sci-q2',
        type: 'image-choice',
        question: 'Which planet is shown in this image?',
        imageUrl: 'https://placehold.co/300x300?text=Saturn+with+visible+rings+in+space',
        options: [
          { id: 'a', text: 'Jupiter', isCorrect: false },
          { id: 'b', text: 'Saturn', isCorrect: true },
          { id: 'c', text: 'Uranus', isCorrect: false },
          { id: 'd', text: 'Neptune', isCorrect: false }
        ],
        explanation: 'Saturn is easily recognizable by its distinctive ring system.',
        points: 15,
        difficulty: 'easy',
        tags: ['astronomy', 'planets']
      },
      {
        id: 'sci-q3',
        type: 'true-false',
        question: 'Mitochondria are known as the powerhouse of the cell.',
        options: [
          { id: 'true', text: 'True', isCorrect: true },
          { id: 'false', text: 'False', isCorrect: false }
        ],
        explanation: 'Mitochondria produce ATP, which provides energy for cellular processes.',
        points: 10,
        difficulty: 'easy',
        tags: ['biology', 'cell biology']
      }
    ]
  },
  {
    id: 'history-world-1',
    title: 'World History',
    description: 'Journey through major historical events, figures, and civilizations.',
    category: 'history',
    difficulty: 'medium',
    timeLimit: 1200, // 20 minutes
    passingScore: 70,
    totalPoints: 150,
    imageUrl: 'https://placehold.co/400x300?text=Ancient+civilization+monuments+and+historical+artifacts',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    tags: ['ancient history', 'modern history', 'civilizations'],
    questions: [
      {
        id: 'hist-q1',
        type: 'multiple-choice',
        question: 'In which year did World War II end?',
        options: [
          { id: 'a', text: '1944', isCorrect: false },
          { id: 'b', text: '1945', isCorrect: true },
          { id: 'c', text: '1946', isCorrect: false },
          { id: 'd', text: '1947', isCorrect: false }
        ],
        explanation: 'World War II ended in 1945 with the surrender of Japan in September.',
        points: 10,
        difficulty: 'easy',
        tags: ['world war', '20th century']
      },
      {
        id: 'hist-q2',
        type: 'fill-blank',
        question: 'The ancient wonder of the world, the Colossus of _______ was located in Greece.',
        correctAnswer: 'Rhodes',
        explanation: 'The Colossus of Rhodes was a giant statue that stood in the ancient Greek city of Rhodes.',
        points: 15,
        difficulty: 'medium',
        tags: ['ancient wonders', 'greece']
      }
    ]
  },
  {
    id: 'tech-programming-1',
    title: 'Programming Fundamentals',
    description: 'Test your knowledge of programming concepts, languages, and best practices.',
    category: 'programming',
    difficulty: 'medium',
    timeLimit: 1800, // 30 minutes
    passingScore: 80,
    totalPoints: 200,
    imageUrl: 'https://placehold.co/400x300?text=Code+editor+with+colorful+syntax+highlighting',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    tags: ['javascript', 'algorithms', 'data structures'],
    questions: [
      {
        id: 'prog-q1',
        type: 'multiple-choice',
        question: 'Which of the following is NOT a JavaScript data type?',
        options: [
          { id: 'a', text: 'string', isCorrect: false },
          { id: 'b', text: 'boolean', isCorrect: false },
          { id: 'c', text: 'integer', isCorrect: true },
          { id: 'd', text: 'undefined', isCorrect: false }
        ],
        explanation: 'JavaScript uses "number" for all numeric values, not "integer" specifically.',
        points: 10,
        difficulty: 'easy',
        tags: ['javascript', 'data types']
      },
      {
        id: 'prog-q2',
        type: 'multiple-select',
        question: 'Which of the following are valid array methods in JavaScript?',
        options: [
          { id: 'a', text: 'push()', isCorrect: true },
          { id: 'b', text: 'pop()', isCorrect: true },
          { id: 'c', text: 'add()', isCorrect: false },
          { id: 'd', text: 'filter()', isCorrect: true }
        ],
        explanation: 'push(), pop(), and filter() are built-in array methods. add() is not a standard array method.',
        points: 20,
        difficulty: 'medium',
        tags: ['javascript', 'arrays', 'methods']
      }
    ]
  },
  {
    id: 'personality-introvert-1',
    title: 'Personality Type Assessment',
    description: 'Discover your personality traits and characteristics through this comprehensive assessment.',
    category: 'personality',
    difficulty: 'easy',
    timeLimit: 900, // 15 minutes
    passingScore: 0, // No pass/fail for personality tests
    totalPoints: 100,
    imageUrl: 'https://placehold.co/400x300?text=Diverse+group+of+people+showing+different+personalities',
    createdAt: new Date(),
    updatedAt: new Date(),
    isPublic: true,
    tags: ['personality', 'psychology', 'self-assessment'],
    questions: [
      {
        id: 'pers-q1',
        type: 'rating-scale',
        question: 'I enjoy being the center of attention at parties.',
        options: [
          { id: '1', text: 'Strongly Disagree', isCorrect: false },
          { id: '2', text: 'Disagree', isCorrect: false },
          { id: '3', text: 'Neutral', isCorrect: false },
          { id: '4', text: 'Agree', isCorrect: false },
          { id: '5', text: 'Strongly Agree', isCorrect: false }
        ],
        points: 10,
        difficulty: 'easy',
        tags: ['extroversion', 'social']
      },
      {
        id: 'pers-q2',
        type: 'multiple-choice',
        question: 'When making decisions, you typically:',
        options: [
          { id: 'a', text: 'Rely on logic and facts', isCorrect: false },
          { id: 'b', text: 'Trust your gut feelings', isCorrect: false },
          { id: 'c', text: 'Ask others for advice', isCorrect: false },
          { id: 'd', text: 'It depends on the situation', isCorrect: false }
        ],
        explanation: 'All options are valid approaches depending on your personality type.',
        points: 10,
        difficulty: 'easy',
        tags: ['decision making', 'thinking style']
      }
    ]
  }
];

export const getQuizzesByCategory = (category: QuizCategory): Quiz[] => {
  return sampleQuizzes.filter(quiz => quiz.category === category);
};

export const getQuizById = (id: string): Quiz | undefined => {
  return sampleQuizzes.find(quiz => quiz.id === id);
};

export const getAllCategories = (): QuizCategory[] => {
  const categories = Array.from(new Set(sampleQuizzes.map(quiz => quiz.category)));
  return categories as QuizCategory[];
};

export const getCategoryDisplayName = (category: QuizCategory): string => {
  const displayNames: Record<QuizCategory, string> = {
    'mathematics': 'Mathematics',
    'science': 'Science',
    'history': 'History',
    'geography': 'Geography',
    'literature': 'Literature',
    'general-knowledge': 'General Knowledge',
    'technology': 'Technology',
    'sports': 'Sports',
    'entertainment': 'Entertainment',
    'programming': 'Programming',
    'business': 'Business',
    'languages': 'Languages',
    'personality': 'Personality',
    'trivia': 'Trivia',
    'custom': 'Custom'
  };
  return displayNames[category] || category;
};

export const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  const colors = {
    'easy': 'text-green-600 bg-green-100',
    'medium': 'text-yellow-600 bg-yellow-100',
    'hard': 'text-red-600 bg-red-100'
  };
  return colors[difficulty];
};