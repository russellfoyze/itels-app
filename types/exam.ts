export type QuestionType =
  | 'TRUE_FALSE_NOT_GIVEN'
  | 'YES_NO_NOT_GIVEN'
  | 'MULTIPLE_CHOICE'
  | 'MULTIPLE_CHOICE_MULTI'
  | 'FILL_IN_BLANK'
  | 'MATCHING_HEADINGS'
  | 'MATCHING_FEATURES'
  | 'SUMMARY_COMPLETION';

export interface Question {
  id: number;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string | string[]; // Can be string or array of acceptable answers
  explanation?: string;
  headingOptions?: { label: string; text: string }[];
}

export interface ReadingPassage {
  passageNumber: number;
  title: string;
  subtitle?: string;
  content: string; // Plain text or HTML with paragraphs
  paragraphs?: { label: string; text: string }[];
  questions: Question[];
}

export interface ReadingTest {
  id: string;
  title: string;
  type: 'academic' | 'general';
  durationMinutes: number; // 60
  totalQuestions: number; // 40
  passages: ReadingPassage[];
}

export interface ListeningSection {
  sectionNumber: number;
  title: string;
  instructions: string;
  questions: Question[];
}

export interface ListeningTest {
  id: string;
  title: string;
  durationMinutes: number; // 30-40
  totalQuestions: number; // 40
  audioUrl: string;
  sections: ListeningSection[];
}

export interface WritingTask {
  taskNumber: 1 | 2;
  title: string;
  type: 'academic' | 'general';
  prompt: string;
  imageUrl?: string;
  minWords: number;
  recommendedMinutes: number;
}

export interface WritingTest {
  id: string;
  title: string;
  task1: WritingTask;
  task2: WritingTask;
}

export interface SpeakingTest {
  id: string;
  title: string;
  part1: {
    instructions: string;
    questions: string[];
  };
  part2: {
    title: string;
    cueCard: string;
    bulletPoints: string[];
    prepSeconds: number; // 60
    speechSeconds: number; // 120
  };
  part3: {
    topic: string;
    questions: string[];
  };
}

export interface WritingEvaluationResult {
  overallBand: number;
  criteriaScores: {
    taskAchievementOrResponse: number;
    coherenceCohesion: number;
    lexicalResource: number;
    grammaticalRangeAccuracy: number;
  };
  wordCount: number;
  underlengthPenalty: boolean;
  detailedFeedback: {
    taskAchievementOrResponse: string;
    coherenceCohesion: string;
    lexicalResource: string;
    grammaticalRangeAccuracy: string;
  };
  sentenceCorrections: {
    original: string;
    correction: string;
    explanation: string;
  }[];
  vocabularyEnhancements: {
    originalPhrase: string;
    recommendedBand9Alternatives: string[];
    contextualExample: string;
  }[];
  band9ModelAnswer: string;
}

export interface SpeakingEvaluationResult {
  overallBand: number;
  criteriaScores: {
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRangeAccuracy: number;
    pronunciation: number;
  };
  wpm: number;
  fillerWordsCount: number;
  fillerWordsList: string[];
  feedback: {
    fluencyCoherence: string;
    lexicalResource: string;
    grammaticalRangeAccuracy: string;
    pronunciation: string;
  };
  suggestions: string[];
  improvedTranscriptSample: string;
}

export interface TestResult {
  testId: string;
  testTitle: string;
  module: 'listening' | 'reading' | 'writing' | 'speaking' | 'full';
  date: string;
  rawScore?: number;
  totalQuestions?: number;
  bandScore: number;
  userAnswers?: Record<number, string | string[]>;
  questionResults?: {
    id: number;
    userAnswer: string;
    correctAnswer: string | string[];
    isCorrect: boolean;
    explanation?: string;
  }[];
  writingEvaluation?: {
    task1?: WritingEvaluationResult;
    task2?: WritingEvaluationResult;
  };
  speakingEvaluation?: SpeakingEvaluationResult;
}
