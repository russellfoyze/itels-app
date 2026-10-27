'use client';

import React, { useEffect, useRef } from 'react';
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll the active question button into view smoothly on mobile/desktop
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeQuestionId]);

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
    <footer className="sticky bottom-0 z-40 bg-white border-t border-gray-300 py-1.5 sm:py-2 px-2 sm:px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.06)] select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-1.5 sm:gap-2">
        {/* Top: Numbered 1-40 Question Palette */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-1 overflow-x-auto max-w-full py-0.5 px-0.5 scrollbar-none scroll-smooth"
        >
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
                ref={isActive ? activeBtnRef : null}
                onClick={() => setActiveQuestionId(qId)}
                className={`relative min-w-[30px] sm:min-w-[28px] h-7 sm:h-7 px-1 text-xs font-semibold rounded flex items-center justify-center transition-all shrink-0 ${
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

        {/* Bottom Controls Row: Section tabs + Review + Arrows + Finish */}
        <div className="flex items-center justify-between gap-1 sm:gap-3 text-xs">
          {/* Section / Passage Jump Tabs */}
          {sections && sections.length > 0 ? (
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {sections.map((sec, idx) => {
                const isActive =
                  activeQuestionId >= sec.startId && activeQuestionId <= sec.endId;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveQuestionId(sec.startId)}
                    className={`px-2 py-1 text-[11px] sm:text-xs font-semibold rounded transition shrink-0 ${
                      isActive
                        ? 'bg-[#002B49] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {sec.name.replace('Passage ', 'P').replace('Section ', 'S')}
                  </button>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}

          {/* Right Navigation & Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            <label className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-700 cursor-pointer hover:text-black">
              <input
                type="checkbox"
                checked={isCurrentFlagged}
                onChange={() => toggleFlagQuestion(activeQuestionId)}
                className="rounded text-amber-500 focus:ring-amber-400 w-3.5 h-3.5 cursor-pointer"
              />
              <Flag className={`w-3.5 h-3.5 ${isCurrentFlagged ? 'text-amber-500' : 'text-gray-400'}`} />
              <span className="hidden sm:inline">Review</span>
            </label>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={handlePrev}
                disabled={activeQuestionId <= 1}
                className="p-1 sm:p-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Previous Question"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeQuestionId >= totalQuestions}
                className="p-1 sm:p-1.5 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                title="Next Question"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onFinishTest}
              className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] sm:text-xs rounded shadow transition flex items-center gap-1"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Finish</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
