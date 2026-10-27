'use client';

import React from 'react';
import { useExam } from '@/context/ExamContext';
import { X, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';

export function HelpModal() {
  const { isHelpOpen, setIsHelpOpen } = useExam();

  if (!isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-xl w-full border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
            <h3 className="font-semibold text-sm sm:text-base">Test Instructions & Navigation</h3>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="text-gray-300 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          <div>
            <h4 className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              General Navigation
            </h4>
            <ul className="list-disc pl-4 space-y-1 text-gray-700 text-xs">
              <li>Use the <strong>numbered buttons (1 to 40)</strong> in the bottom bar to jump to any question.</li>
              <li>On mobile devices, tap <strong>&quot;Switch to Questions&quot;</strong> or <strong>&quot;Switch to Passage&quot;</strong> to flip smoothly between text and questions.</li>
              <li>Check the <strong>Review</strong> box if you wish to mark a question to double check later.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              Highlighting and Dictionary Tool
            </h4>
            <p className="text-gray-700 text-xs leading-relaxed">
              Select or tap any passage text to highlight in bright yellow or look up academic definitions and Band 8+ synonyms.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Timing & Submission
            </h4>
            <p className="text-gray-700 text-xs leading-relaxed">
              When 10 minutes remain, the timer changes to amber. At 5 minutes, it flashes red. When time expires, answers are automatically scored.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsHelpOpen(false)}
            className="w-full sm:w-auto px-4 py-2 bg-[#002B49] text-white text-xs font-bold rounded-lg hover:bg-[#003860] transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
