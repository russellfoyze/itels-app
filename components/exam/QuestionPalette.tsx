'use client';

import React from 'react';
import { useExam } from '@/context/ExamContext';
import { ChevronLeft, ChevronRight, Flag, CheckCircle } from 'lucide-react';

interface QuestionPaletteProps {
  totalQuestions: number;
  sections?: { name: string; startId: number; endId: number }[];
  onFinishTest: () => void;
}

export function QuestionPalette({
  totalQuestions,
  sections,
  onFinishTest,
}: QuestionPaletteProps) {
  const {
    activeQuestionId,
    setActiveQuestionId,
    answers,
    flaggedQuestions,
    toggleFlagQuestion,
  } = useExam();

  const handlePrev = () => {
    if (activeQuestionId > 1) {
      setActiveQuestionId(activeQuestionId - 1);
    }
  };

  const handleNext = () => {
    if (activeQuestionId < totalQuestions) {
      setActiveQuestionId(activeQuestionId + 1);
    }
  };

  const isCurrentFlagged = !!flaggedQuestions[activeQuestionId];

  return (
    <footer className="sticky bottom-0 z-40 bg-white border-t border-gray-300 py-2.5 px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Sections / Passage tabs */}
        {sections && sections.length > 0 && (
          <div className="hidden lg:flex items-center gap-1.5 border-r border-gray-200 pr-3">
            {sections.map((sec, idx) => {
              const isActive =
                activeQuestionId >= sec.startId && activeQuestionId <= sec.endId;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveQuestionId(sec.startId)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition ${
                    isActive
                      ? 'bg-[#002B49] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sec.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Center: Numbered 1-40 Button Matrix */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1 px-1 scrollbar-thin">
          {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((qId) => {
            const isAnswered =
              answers[qId] !== undefined &&
              answers[qId] !== '' &&
              (!Array.isArray(answers[qId]) || (answers[qId] as string[]).length > 0);
            const isActive = activeQuestionId === qId;
            const isFlagged = !!flaggedQuestions[qId];

            return (
              <button
                key={qId}
                onClick={() => setActiveQuestionId(qId)}
                className={`relative min-w-[28px] h-7 px-1 text-xs font-semibold rounded flex items-center justify-center transition-all ${
                  isActive
                    ? 'ring-2 ring-blue-600 ring-offset-1 z-10'
                    : ''
                } ${
                  isAnswered
                    ? 'bg-[#002B49] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }`}
                title={`Question ${qId}${isAnswered ? ' (Answered)' : ' (Unanswered)'}${
                  isFlagged ? ' [Flagged]' : ''
                }`}
              >
                <span>{qId}</span>
                {isFlagged && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-white"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Controls: Review Checkbox, Prev/Next, Finish */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-700 cursor-pointer hover:text-black">
            <input
              type="checkbox"
              checked={isCurrentFlagged}
              onChange={() => toggleFlagQuestion(activeQuestionId)}
              className="rounded text-amber-500 focus:ring-amber-400 w-3.5 h-3.5 cursor-pointer"
            />
            <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'text-amber-500' : 'text-gray-400'}`} />
            <span>Review</span>
          </label>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              disabled={activeQuestionId <= 1}
              className="p-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Previous Question"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={activeQuestionId >= totalQuestions}
              className="p-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              title="Next Question"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onFinishTest}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-medium text-xs rounded shadow transition flex items-center gap-1"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Finish Test</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
