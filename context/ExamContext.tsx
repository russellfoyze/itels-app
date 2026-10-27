'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorTheme = 'standard' | 'high-contrast' | 'yellow-on-black';
export type FontSize = 'standard' | 'large' | 'xlarge';

interface ExamContextType {
  activeQuestionId: number;
  setActiveQuestionId: (id: number) => void;
  answers: Record<number, string | string[]>;
  setAnswer: (questionId: number, answer: string | string[]) => void;
  flaggedQuestions: Record<number, boolean>;
  toggleFlagQuestion: (questionId: number) => void;
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  remainingSeconds: number;
  setRemainingSeconds: React.Dispatch<React.SetStateAction<number>>;
  isTimerRunning: boolean;
  setIsTimerRunning: (running: boolean) => void;
  isTimerVisible: boolean;
  setIsTimerVisible: (visible: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  isFinishModalOpen: boolean;
  setIsFinishModalOpen: (open: boolean) => void;
  resetExam: () => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export function ExamProvider({
  children,
  initialSeconds = 3600,
  storageKey = 'ielts_exam_state',
}: {
  children: React.ReactNode;
  initialSeconds?: number;
  storageKey?: string;
}) {
  const [activeQuestionId, setActiveQuestionId] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [theme, setTheme] = useState<ColorTheme>('standard');
  const [fontSize, setFontSize] = useState<FontSize>('standard');
  const [remainingSeconds, setRemainingSeconds] = useState<number>(initialSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isTimerVisible, setIsTimerVisible] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState<boolean>(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.answers) setAnswers(parsed.answers);
        if (parsed.flaggedQuestions) setFlaggedQuestions(parsed.flaggedQuestions);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.fontSize) setFontSize(parsed.fontSize);
      }
    } catch (e) {
      console.warn('Could not load exam state', e);
    }
  }, [storageKey]);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ answers, flaggedQuestions, theme, fontSize })
      );
    } catch (e) {
      console.warn('Could not save exam state', e);
    }
  }, [answers, flaggedQuestions, theme, fontSize, storageKey]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const setAnswer = (questionId: number, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const resetExam = () => {
    setAnswers({});
    setFlaggedQuestions({});
    setActiveQuestionId(1);
    setRemainingSeconds(initialSeconds);
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
  };

  return (
    <ExamContext.Provider
      value={{
        activeQuestionId,
        setActiveQuestionId,
        answers,
        setAnswer,
        flaggedQuestions,
        toggleFlagQuestion,
        theme,
        setTheme,
        fontSize,
        setFontSize,
        remainingSeconds,
        setRemainingSeconds,
        isTimerRunning,
        setIsTimerRunning,
        isTimerVisible,
        setIsTimerVisible,
        isSettingsOpen,
        setIsSettingsOpen,
        isHelpOpen,
        setIsHelpOpen,
        isFinishModalOpen,
        setIsFinishModalOpen,
        resetExam,
      }}
    >
      <div className={`theme-${theme} font-size-${fontSize} min-h-screen`}>
        {children}
      </div>
    </ExamContext.Provider>
  );
}

export function useExam() {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
}
