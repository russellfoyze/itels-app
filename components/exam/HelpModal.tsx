'use client';

import React from 'react';
import { useExam } from '@/context/ExamContext';
import { X, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';

export function HelpModal() {
  const { isHelpOpen, setIsHelpOpen } = useExam();

  if (!isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-900 rounded-lg shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Test Instructions & Navigation Guide</h3>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              General Test Navigation
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-700">
              <li>
                Use the <strong>numbered buttons (1 to 40)</strong> in the bottom toolbar to navigate directly to any question.
              </li>
              <li>
                <strong>Solid dark background</strong> indicates a question you have answered.
              </li>
              <li>
                Check the <strong>Review</strong> box if you want to flag a question to revisit later. A flag icon will appear on the button.
              </li>
              <li>
                You can move to the previous or next question using the <strong>Back</strong> and <strong>Next</strong> arrows.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Highlighting and Notes Feature
            </h4>
            <p className="text-gray-700 leading-relaxed">
              You can select any passage text with your mouse. A popup menu will appear allowing you to:
            </p>
            <ul className="list-disc pl-5 mt-1.5 space-y-1 text-gray-700">
              <li><strong>Highlight:</strong> Marks the text in bright yellow.</li>
              <li><strong>Add Note:</strong> Attaches a private sticky note to the selection.</li>
              <li><strong>Clear:</strong> Removes the highlight or note.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              Timing & Submission
            </h4>
            <p className="text-gray-700 leading-relaxed">
              The clock in the top bar counts down your remaining time. When 10 minutes remain, the timer changes color. When 5 minutes remain, the timer flashes as a final alert. When time expires, your responses will be submitted automatically.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsHelpOpen(false)}
            className="px-5 py-2 bg-[#002B49] text-white text-sm font-medium rounded hover:bg-[#003860] transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
