'use client';

import React, { useState, use } from 'react';
import { readingTests } from '@/data/readingTests';
import { ExamProvider, useExam } from '@/context/ExamContext';
import { HeaderBar } from '@/components/exam/HeaderBar';
import { SplitPane } from '@/components/exam/SplitPane';
import { PassageViewer } from '@/components/exam/PassageViewer';
import { QuestionPalette } from '@/components/exam/QuestionPalette';
import { QuestionItem } from '@/components/exam/QuestionItem';
import { SettingsModal } from '@/components/exam/SettingsModal';
import { HelpModal } from '@/components/exam/HelpModal';
import { isAnswerCorrect, calculateReadingBand } from '@/lib/scoring';
import { TestResult } from '@/types/exam';
import { TestReportForm } from '@/components/trf/TestReportForm';
import confetti from 'canvas-confetti';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

function ReadingTestRunner({ testId }: { testId: string }) {
  const test = readingTests.find((t) => t.id === testId) || readingTests[0];
  const { answers, activeQuestionId, setActiveQuestionId } = useExam();
  const [result, setResult] = useState<TestResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Determine which passage corresponds to active question
  const currentPassage =
    test.passages.find((p) =>
      p.questions.some((q) => q.id === activeQuestionId)
    ) || test.passages[0];

  const sections = test.passages.map((p, idx) => ({
    name: `Passage ${p.passageNumber}`,
    startId: p.questions[0].id,
    endId: p.questions[p.questions.length - 1].id,
  }));

  const handleFinish = () => {
    // Calculate raw score
    let raw = 0;
    const questionResults: TestResult['questionResults'] = [];

    test.passages.forEach((p) => {
      p.questions.forEach((q) => {
        const userAns = answers[q.id];
        const isCorrect = isAnswerCorrect(userAns, q.correctAnswer);
        if (isCorrect) raw += 1;

        questionResults.push({
          id: q.id,
          userAnswer: Array.isArray(userAns) ? userAns.join(', ') : (userAns as string) || '',
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        });
      });
    });

    const band = calculateReadingBand(raw, test.type === 'academic');

    const testRes: TestResult = {
      testId: test.id,
      testTitle: test.title,
      module: 'reading',
      date: new Date().toLocaleDateString('en-GB'),
      rawScore: raw,
      totalQuestions: test.totalQuestions,
      bandScore: band,
      userAnswers: answers,
      questionResults,
    };

    setResult(testRes);
    setShowConfirmModal(false);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {}
  };

  const answeredCount = Object.keys(answers).filter(
    (k) => answers[Number(k)] && answers[Number(k)] !== ''
  ).length;

  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <TestReportForm result={result} onRetake={() => setResult(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderBar testTitle={test.title} />

      <SplitPane
        leftContent={
          <PassageViewer
            title={`Passage ${currentPassage.passageNumber}: ${currentPassage.title}`}
            subtitle={currentPassage.subtitle}
            content={currentPassage.content}
          />
        }
        rightContent={
          <div>
            <div className="mb-4 pb-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Passage {currentPassage.passageNumber} Questions (Q
                {currentPassage.questions[0].id} - Q
                {currentPassage.questions[currentPassage.questions.length - 1].id})
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {answeredCount} / {test.totalQuestions} Answered
              </span>
            </div>
            {currentPassage.questions.map((q) => (
              <QuestionItem key={q.id} question={q} />
            ))}
          </div>
        }
      />

      <QuestionPalette
        totalQuestions={test.totalQuestions}
        sections={sections}
        onFinishTest={() => setShowConfirmModal(true)}
      />

      <SettingsModal />
      <HelpModal />

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 text-gray-900 border border-gray-200">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-gray-900">Finish and Score Test?</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              You have answered <strong>{answeredCount}</strong> out of{' '}
              <strong>{test.totalQuestions}</strong> questions.
              {test.totalQuestions - answeredCount > 0 && (
                <span className="block mt-1 text-red-600 font-medium">
                  Warning: You have {test.totalQuestions - answeredCount} unanswered questions!
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50 transition"
              >
                Review More
              </button>
              <button
                onClick={handleFinish}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md text-sm shadow transition"
              >
                Yes, Submit and Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <ExamProvider initialSeconds={3600} storageKey={`exam_reading_${resolvedParams.id}`}>
      <ReadingTestRunner testId={resolvedParams.id} />
    </ExamProvider>
  );
}
