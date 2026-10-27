'use client';

import React, { useState, use } from 'react';
import { speakingTests } from '@/data/speakingTests';
import { ExamProvider } from '@/context/ExamContext';
import { HeaderBar } from '@/components/exam/HeaderBar';
import { VoiceRecorder } from '@/components/exam/VoiceRecorder';
import { TestReportForm } from '@/components/trf/TestReportForm';
import { SpeakingEvaluationResult, TestResult } from '@/types/exam';
import { SettingsModal } from '@/components/exam/SettingsModal';
import { HelpModal } from '@/components/exam/HelpModal';
import confetti from 'canvas-confetti';
import { Mic, UserCheck, MessageSquare, Loader2, Sparkles } from 'lucide-react';

function SpeakingTestRunner({ testId }: { testId: string }) {
  const test = speakingTests.find((t) => t.id === testId) || speakingTests[0];
  const [activePart, setActivePart] = useState<1 | 2 | 3>(2);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleTranscriptReady = async (transcript: string, durationSeconds: number) => {
    setIsEvaluating(true);
    try {
      const topic =
        activePart === 2
          ? test.part2.title
          : activePart === 1
          ? 'Introduction and Interview'
          : test.part3.topic;

      const res = await fetch('/api/evaluate/speaking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partNumber: activePart,
          topicPrompt: topic,
          transcript,
          durationSeconds,
        }),
      });

      if (!res.ok) {
        throw new Error('Evaluation request failed');
      }

      const evalData: SpeakingEvaluationResult = await res.json();

      const testRes: TestResult = {
        testId: test.id,
        testTitle: test.title,
        module: 'speaking',
        date: new Date().toLocaleDateString('en-GB'),
        bandScore: evalData.overallBand,
        speakingEvaluation: evalData,
      };

      setResult(testRes);
      try {
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err) {
      console.error('Speaking evaluation failed:', err);
      alert('Could not complete AI evaluation. Please verify your connection.');
    } finally {
      setIsEvaluating(false);
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <TestReportForm result={result} onRetake={() => setResult(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <HeaderBar testTitle={test.title} />

      {/* Part Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePart(1)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded transition ${
              activePart === 1
                ? 'bg-[#002B49] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Part 1: Interview
          </button>
          <button
            onClick={() => setActivePart(2)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded transition ${
              activePart === 2
                ? 'bg-[#002B49] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Part 2: Makkar Cue Card
          </button>
          <button
            onClick={() => setActivePart(3)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded transition ${
              activePart === 3
                ? 'bg-[#002B49] text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Part 3: Discussion
          </button>
        </div>

        <span className="text-xs font-semibold text-gray-500">
          Official Speaking Test Simulation
        </span>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full p-4 md:p-6 space-y-6">
        {/* Part 1 Content */}
        {activePart === 1 && (
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Part 1: Introduction and Interview (4-5 Minutes)
              </h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {test.part1.instructions}
            </p>
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Examiner Questions:
              </h3>
              <ul className="space-y-2">
                {test.part1.questions.map((q, idx) => (
                  <li
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-800"
                  >
                    {idx + 1}. {q}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Part 2 Content: Makkar Cue Card */}
        {activePart === 2 && (
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded">
                  Makkar Cue Card
                </span>
                <h2 className="text-xl font-black text-gray-900 mt-2">
                  {test.part2.title}
                </h2>
              </div>
            </div>

            <div className="p-5 bg-blue-50/60 rounded-xl border border-blue-200 space-y-3">
              <p className="text-xs font-bold text-blue-900">
                {test.part2.cueCard}
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm font-medium text-blue-950">
                {test.part2.bulletPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Part 3 Content: Discussion */}
        {activePart === 3 && (
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
              <MessageSquare className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Part 3: Two-Way In-Depth Discussion (4-5 Minutes)
              </h2>
            </div>
            <div className="text-xs font-semibold text-purple-700 bg-purple-50 p-2.5 rounded border border-purple-200">
              Topic: {test.part3.topic}
            </div>
            <div className="space-y-2 pt-2">
              {test.part3.questions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm font-medium text-gray-800"
                >
                  {idx + 1}. {q}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voice Recorder & Evaluation Component */}
        <VoiceRecorder
          onTranscriptReady={handleTranscriptReady}
          prepSeconds={test.part2.prepSeconds}
          speechSeconds={test.part2.speechSeconds}
        />

        {isEvaluating && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-blue-900 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>Gemini AI is analyzing your pronunciation, grammar, and fluency...</span>
          </div>
        )}
      </div>

      <SettingsModal />
      <HelpModal />
    </div>
  );
}

export default function SpeakingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <ExamProvider initialSeconds={840} storageKey={`exam_speaking_${resolvedParams.id}`}>
      <SpeakingTestRunner testId={resolvedParams.id} />
    </ExamProvider>
  );
}
