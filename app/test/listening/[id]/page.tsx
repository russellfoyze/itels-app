'use client';

import React, { useState, useRef, use } from 'react';
import { listeningTests } from '@/data/listeningTests';
import { ExamProvider, useExam } from '@/context/ExamContext';
import { HeaderBar } from '@/components/exam/HeaderBar';
import { SplitPane } from '@/components/exam/SplitPane';
import { QuestionPalette } from '@/components/exam/QuestionPalette';
import { QuestionItem } from '@/components/exam/QuestionItem';
import { SettingsModal } from '@/components/exam/SettingsModal';
import { HelpModal } from '@/components/exam/HelpModal';
import { isAnswerCorrect, calculateListeningBand } from '@/lib/scoring';
import { TestResult } from '@/types/exam';
import { TestReportForm } from '@/components/trf/TestReportForm';
import confetti from 'canvas-confetti';
import { Play, Pause, Volume2, AlertCircle, Headphones } from 'lucide-react';

function ListeningTestRunner({ testId }: { testId: string }) {
  const test = listeningTests.find((t) => t.id === testId) || listeningTests[0];
  const { answers, activeQuestionId } = useExam();
  const [result, setResult] = useState<TestResult | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(80);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSection =
    test.sections.find((s) =>
      s.questions.some((q) => q.id === activeQuestionId)
    ) || test.sections[0];

  const sections = test.sections.map((s) => ({
    name: `Section ${s.sectionNumber}`,
    startId: s.questions[0].id,
    endId: s.questions[s.questions.length - 1].id,
  }));

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setAudioVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };

  const handleFinish = () => {
    let raw = 0;
    const questionResults: TestResult['questionResults'] = [];

    test.sections.forEach((s) => {
      s.questions.forEach((q) => {
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

    const band = calculateListeningBand(raw);

    const testRes: TestResult = {
      testId: test.id,
      testTitle: test.title,
      module: 'listening',
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
      <HeaderBar
        testTitle={test.title}
        showVolume={true}
        volume={audioVolume}
        onVolumeChange={handleVolumeChange}
      />

      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={test.audioUrl}
        onEnded={() => setIsPlaying(false)}
        preload="auto"
      />

      <SplitPane
        leftContent={
          <div className="space-y-6">
            {/* Audio Stream Control Box */}
            <div className="p-5 bg-gradient-to-br from-[#002B49] to-[#004273] text-white rounded-xl shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-blue-300" />
                  <span className="font-bold text-sm tracking-wide">
                    Official Listening Audio Stream
                  </span>
                </div>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-gray-200">
                  {isPlaying ? 'Playing Audio' : 'Audio Paused'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  className="px-4 py-2 bg-white text-[#002B49] rounded-lg font-bold text-xs hover:bg-gray-100 transition shadow flex items-center gap-1.5"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'Pause Audio' : 'Start Audio Track'}</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-gray-200">
                  <Volume2 className="w-4 h-4 text-gray-300" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={audioVolume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-24 h-1.5 accent-blue-400 cursor-pointer"
                  />
                  <span>{audioVolume}%</span>
                </div>
              </div>

              <p className="text-xs text-blue-200 leading-relaxed">
                Note: In the official IELTS exam, audio plays once without stopping. Adjust your headphones to a comfortable volume level before starting.
              </p>
            </div>

            {/* Section Details */}
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
              <h3 className="font-bold text-base text-gray-900">
                {currentSection.title}
              </h3>
              <p className="text-xs font-semibold text-blue-700 bg-blue-50 p-2.5 rounded border border-blue-200">
                {currentSection.instructions}
              </p>
              <div className="text-xs text-gray-600 leading-relaxed">
                Listen carefully to the audio and answer Questions {currentSection.questions[0].id} to {currentSection.questions[currentSection.questions.length - 1].id} in the right pane.
              </div>
            </div>
          </div>
        }
        rightContent={
          <div>
            <div className="mb-4 pb-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {currentSection.title} (Q{currentSection.questions[0].id} - Q
                {currentSection.questions[currentSection.questions.length - 1].id})
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {answeredCount} / {test.totalQuestions} Answered
              </span>
            </div>
            {currentSection.questions.map((q) => (
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
              <h3 className="text-lg font-bold text-gray-900">Submit Listening Test?</h3>
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

export default function ListeningPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <ExamProvider initialSeconds={1800} storageKey={`exam_listening_${resolvedParams.id}`}>
      <ListeningTestRunner testId={resolvedParams.id} />
    </ExamProvider>
  );
}
