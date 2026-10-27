'use client';

import React, { useState, use } from 'react';
import { writingTests } from '@/data/writingTests';
import { ExamProvider, useExam } from '@/context/ExamContext';
import { HeaderBar } from '@/components/exam/HeaderBar';
import { SettingsModal } from '@/components/exam/SettingsModal';
import { HelpModal } from '@/components/exam/HelpModal';
import { TestReportForm } from '@/components/trf/TestReportForm';
import { WritingEvaluationResult, TestResult } from '@/types/exam';
import confetti from 'canvas-confetti';
import { Sparkles, AlertTriangle, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';

function WritingTestRunner({ testId }: { testId: string }) {
  const test = writingTests.find((t) => t.id === testId) || writingTests[0];
  const [activeTask, setActiveTask] = useState<1 | 2>(1);
  const [task1Text, setTask1Text] = useState<string>('');
  const [task2Text, setTask2Text] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const task1Words = task1Text.trim().split(/\s+/).filter(Boolean).length;
  const task2Words = task2Text.trim().split(/\s+/).filter(Boolean).length;

  const currentTask = activeTask === 1 ? test.task1 : test.task2;
  const currentWords = activeTask === 1 ? task1Words : task2Words;
  const minRequired = currentTask.minWords;

  const handleEvaluate = async () => {
    if (task1Words < 30 && task2Words < 30) {
      alert('Please write your response for Task 1 and/or Task 2 before requesting evaluation.');
      return;
    }

    setIsEvaluating(true);
    try {
      let task1Eval: WritingEvaluationResult | undefined;
      let task2Eval: WritingEvaluationResult | undefined;

      // Evaluate Task 1
      if (task1Words > 10) {
        const res1 = await fetch('/api/evaluate/writing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskType: 'task1',
            taskPrompt: test.task1.prompt,
            candidateSubmission: task1Text,
          }),
        });
        if (res1.ok) {
          task1Eval = await res1.json();
        }
      }

      // Evaluate Task 2
      if (task2Words > 10) {
        const res2 = await fetch('/api/evaluate/writing', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            taskType: 'task2',
            taskPrompt: test.task2.prompt,
            candidateSubmission: task2Text,
          }),
        });
        if (res2.ok) {
          task2Eval = await res2.json();
        }
      }

      // Overall Writing Band: Task 2 has double the weight of Task 1 in official IELTS
      let finalBand = 6.0;
      if (task1Eval && task2Eval) {
        finalBand = Math.round(((task1Eval.overallBand + task2Eval.overallBand * 2) / 3) * 2) / 2;
      } else if (task2Eval) {
        finalBand = task2Eval.overallBand;
      } else if (task1Eval) {
        finalBand = task1Eval.overallBand;
      }

      const testRes: TestResult = {
        testId: test.id,
        testTitle: test.title,
        module: 'writing',
        date: new Date().toLocaleDateString('en-GB'),
        bandScore: finalBand,
        writingEvaluation: {
          task1: task1Eval,
          task2: task2Eval,
        },
      };

      setResult(testRes);
      try {
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err) {
      console.error('Writing evaluation error:', err);
      alert('Failed to evaluate submission. Please check your network connection.');
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
    <div className="flex flex-col min-h-screen bg-white">
      <HeaderBar testTitle={test.title} />

      {/* Task Selector Tabs */}
      <div className="bg-gray-100 border-b border-gray-300 px-6 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTask(1)}
            className={`px-4 py-2 text-xs font-bold rounded-t-md transition flex items-center gap-1.5 ${
              activeTask === 1
                ? 'bg-white text-[#002B49] border-t-2 border-[#002B49] shadow-xs'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Task 1 ({task1Words} words)</span>
          </button>
          <button
            onClick={() => setActiveTask(2)}
            className={`px-4 py-2 text-xs font-bold rounded-t-md transition flex items-center gap-1.5 ${
              activeTask === 2
                ? 'bg-white text-[#002B49] border-t-2 border-[#002B49] shadow-xs'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Task 2 Essay ({task2Words} words)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded ${
              currentWords < minRequired
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            Word Count: {currentWords} / {minRequired} min
          </span>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="px-4 py-1.5 bg-[#002B49] hover:bg-[#003860] text-white text-xs font-bold rounded shadow transition flex items-center gap-1.5 disabled:opacity-50"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating With Gemini...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Submit & Get AI Score</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Dual Pane */}
      <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-140px)] overflow-hidden">
        {/* Left Pane: Task Prompt & Image */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-300 p-6 space-y-4">
          <div className="pb-3 border-b border-gray-200">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded">
              {currentTask.title}
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-2">
              {activeTask === 1 ? 'Report / Summary Task' : 'Discursive Essay Task'}
            </h2>
          </div>

          <div className="text-sm font-medium text-gray-800 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg border border-gray-200">
            {currentTask.prompt}
          </div>

          {currentTask.imageUrl && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col items-center">
              <img
                src={currentTask.imageUrl}
                alt="IELTS Writing Task visual data"
                className="max-h-[340px] object-contain rounded"
              />
              <span className="text-xs text-gray-400 mt-2">Figure 1: Task Reference Visual</span>
            </div>
          )}
        </div>

        {/* Right Pane: Candidate Textarea */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col p-6 bg-gray-50/50">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Candidate Response Workspace
            </label>
            <span
              className={`text-xs ${
                currentWords < minRequired ? 'text-amber-600 font-medium' : 'text-emerald-700 font-semibold'
              }`}
            >
              {currentWords < minRequired
                ? `${minRequired - currentWords} more words needed`
                : 'Requirement satisfied'}
            </span>
          </div>

          <textarea
            value={activeTask === 1 ? task1Text : task2Text}
            onChange={(e) => {
              if (activeTask === 1) setTask1Text(e.target.value);
              else setTask2Text(e.target.value);
            }}
            placeholder={
              activeTask === 1
                ? 'Begin your Task 1 report here (Overview, Key Trends, Data comparisons)...'
                : 'Begin your Task 2 essay here (Introduction, Body Paragraph 1, Body Paragraph 2, Conclusion)...'
            }
            className="flex-1 w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white font-mono text-sm leading-relaxed resize-none"
          />

          <div className="mt-2 text-xs text-gray-500 flex justify-between">
            <span>Spell check and auto-correct are disabled to mirror CD-IELTS conditions.</span>
            <span>Recommended time: {currentTask.recommendedMinutes} mins</span>
          </div>
        </div>
      </div>

      <SettingsModal />
      <HelpModal />
    </div>
  );
}

export default function WritingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return (
    <ExamProvider initialSeconds={3600} storageKey={`exam_writing_${resolvedParams.id}`}>
      <WritingTestRunner testId={resolvedParams.id} />
    </ExamProvider>
  );
}
