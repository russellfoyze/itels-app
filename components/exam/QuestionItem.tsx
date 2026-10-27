'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Question } from '@/types/exam';
import { useExam } from '@/context/ExamContext';
import { Flag, HelpCircle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionItemProps {
  question: Question;
  showExplanation?: boolean;
}

export function QuestionItem({ question, showExplanation = false }: QuestionItemProps) {
  const { activeQuestionId, setActiveQuestionId, answers, setAnswer, flaggedQuestions, toggleFlagQuestion } = useExam();
  const [showClue, setShowClue] = useState<boolean>(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const isActive = activeQuestionId === question.id;
  const isFlagged = !!flaggedQuestions[question.id];
  const currentAnswer = answers[question.id] || '';

  // Scroll active question into view smoothly
  useEffect(() => {
    if (isActive && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isActive]);

  const handleTextChange = (val: string) => {
    setAnswer(question.id, val);
  };

  const handleRadioChange = (val: string) => {
    setAnswer(question.id, val);
  };

  // Generate an intelligent scanning clue based on question text
  const generateClue = () => {
    const promptWords = question.prompt.split(/\s+/).filter((w) => w.length > 4);
    const keyTerm = promptWords[0] || 'the main concept';
    return `Scan the passage for synonyms of "${keyTerm}" or related thematic phrases. Pay attention to qualifying words like "always", "never", "substantially", or numerical comparisons.`;
  };

  return (
    <div
      ref={itemRef}
      onClick={() => setActiveQuestionId(question.id)}
      className={`p-4 rounded-xl border transition-all mb-4 ${
        isActive
          ? 'bg-blue-50/40 border-blue-600 shadow-sm ring-1 ring-blue-500'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span
            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
              isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {question.id}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            {question.type.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Student Clue Helper Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowClue(!showClue);
            }}
            className="text-xs flex items-center gap-1 px-2 py-0.5 rounded text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition"
            title="Show scanning clue and keywords"
          >
            <Lightbulb className="w-3 h-3 text-amber-600" />
            <span>{showClue ? 'Hide Clue' : 'Hint Clue'}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFlagQuestion(question.id);
            }}
            className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded transition ${
              isFlagged ? 'bg-amber-100 text-amber-700 font-medium' : 'text-gray-400 hover:text-gray-600'
            }`}
            title="Flag question for review"
          >
            <Flag className="w-3 h-3" />
            <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>
      </div>

      {/* Strategy Clue Dropdown */}
      {showClue && (
        <div className="mb-3 p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-950 flex items-start gap-2 animate-in fade-in duration-150">
          <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Student Scanning Clue: </span>
            <span>{generateClue()}</span>
          </div>
        </div>
      )}

      {/* Prompt */}
      <div className="text-sm font-medium text-gray-800 mb-3 leading-relaxed">
        {question.prompt}
      </div>

      {/* Inputs according to Question Type */}
      {question.type === 'TRUE_FALSE_NOT_GIVEN' && (
        <div className="flex flex-wrap gap-2 pt-1">
          {['TRUE', 'FALSE', 'NOT GIVEN'].map((opt) => {
            const isSelected = typeof currentAnswer === 'string' && currentAnswer.toUpperCase() === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRadioChange(opt);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition ${
                  isSelected
                    ? 'bg-[#002B49] text-white border-[#002B49] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'YES_NO_NOT_GIVEN' && (
        <div className="flex flex-wrap gap-2 pt-1">
          {['YES', 'NO', 'NOT GIVEN'].map((opt) => {
            const isSelected = typeof currentAnswer === 'string' && currentAnswer.toUpperCase() === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRadioChange(opt);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition ${
                  isSelected
                    ? 'bg-[#002B49] text-white border-[#002B49] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {question.type === 'MULTIPLE_CHOICE' && question.options && (
        <div className="space-y-2 pt-1">
          {question.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = currentAnswer === letter || currentAnswer === opt;
            return (
              <label
                key={i}
                className={`flex items-start gap-2.5 p-2 rounded-md border cursor-pointer transition text-xs ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 font-medium text-blue-950'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-800'
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={letter}
                  checked={isSelected}
                  onChange={() => handleRadioChange(letter)}
                  className="mt-0.5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="leading-snug">{opt}</span>
              </label>
            );
          })}
        </div>
      )}

      {question.type === 'FILL_IN_BLANK' && (
        <div className="pt-1">
          <input
            type="text"
            value={(currentAnswer as string) || ''}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full max-w-md px-3 py-1.5 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
          />
        </div>
      )}

      {question.type === 'MATCHING_HEADINGS' && (
        <div className="pt-1">
          <select
            value={(currentAnswer as string) || ''}
            onChange={(e) => handleRadioChange(e.target.value)}
            className="w-full max-w-sm px-3 py-1.5 text-xs rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">-- Choose Heading --</option>
            {['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'].map((num) => (
              <option key={num} value={num}>
                Heading {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {showExplanation && question.explanation && (
        <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-900 flex items-start gap-2">
          <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Correct Answer:</strong>{' '}
            {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(' / ') : question.correctAnswer}
            <div className="mt-1 text-emerald-800">{question.explanation}</div>
          </div>
        </div>
      )}
    </div>
  );
}
