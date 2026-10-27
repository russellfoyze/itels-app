'use client';

import React from 'react';
import { TestResult } from '@/types/exam';
import { getBandDescriptorSummary } from '@/lib/scoring';
import { Award, CheckCircle2, XCircle, Printer, Download, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface TestReportFormProps {
  result: TestResult;
  onRetake?: () => void;
}

export function TestReportForm({ result, onRetake }: TestReportFormProps) {
  const bandSummary = getBandDescriptorSummary(result.bandScore);

  const getCefrLevel = (band: number): string => {
    if (band >= 8.5) return 'C2 (Mastery)';
    if (band >= 7.0) return 'C1 (Effective Operational Proficiency)';
    if (band >= 5.5) return 'B2 (Vantage)';
    if (band >= 4.0) return 'B1 (Threshold)';
    return 'A2 / Waystage';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 md:p-8 bg-white border border-gray-300 shadow-xl rounded-xl font-sans print:border-none print:shadow-none print:my-0">
      {/* TRF Top Header */}
      <div className="border-b-2 border-[#002B49] pb-5 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-red-600 text-white font-extrabold text-xs tracking-wider rounded">
              IELTS
            </span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Official Diagnostic Test Report
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#002B49] tracking-tight">
            IELTS Master Test Report Form
          </h1>
          <p className="text-xs text-gray-600">
            Assessed according to Cambridge International Assessment & IELTS Band Descriptors
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-md border border-gray-300 flex items-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print TRF</span>
          </button>
          {onRetake && (
            <button
              onClick={onRetake}
              className="px-4 py-2 bg-[#002B49] hover:bg-[#003860] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition"
            >
              <span>Retake Test</span>
            </button>
          )}
        </div>
      </div>

      {/* Candidate Profile Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6 text-xs">
        <div>
          <div className="text-gray-500 font-medium">Candidate Name</div>
          <div className="text-sm font-bold text-gray-900">Student Candidate</div>
        </div>
        <div>
          <div className="text-gray-500 font-medium">Candidate Number</div>
          <div className="text-sm font-bold font-mono text-gray-900">IELTS-90342</div>
        </div>
        <div>
          <div className="text-gray-500 font-medium">Test Module</div>
          <div className="text-sm font-bold uppercase text-gray-900">{result.module}</div>
        </div>
        <div>
          <div className="text-gray-500 font-medium">Examination Date</div>
          <div className="text-sm font-bold text-gray-900">{result.date}</div>
        </div>
      </div>

      {/* Main Band Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Raw Score */}
        {result.rawScore !== undefined && result.totalQuestions && (
          <div className="p-5 bg-blue-50/60 rounded-xl border border-blue-200 flex flex-col justify-between">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
              Raw Score
            </span>
            <div className="my-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-blue-950 font-mono">
                {result.rawScore}
              </span>
              <span className="text-sm text-blue-800 font-semibold font-mono">
                / {result.totalQuestions}
              </span>
            </div>
            <span className="text-xs text-blue-700">
              {Math.round((result.rawScore / result.totalQuestions) * 100)}% accuracy
            </span>
          </div>
        )}

        {/* IELTS Band Score */}
        <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-300 flex flex-col justify-between">
          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
            IELTS Band Score
          </span>
          <div className="my-2 flex items-baseline gap-1">
            <span className="text-5xl font-black text-emerald-950 font-mono">
              {result.bandScore.toFixed(1)}
            </span>
            <span className="text-sm text-emerald-800 font-semibold">/ 9.0</span>
          </div>
          <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            <span>{bandSummary.level}</span>
          </span>
        </div>

        {/* CEFR Level */}
        <div className="p-5 bg-purple-50/60 rounded-xl border border-purple-200 flex flex-col justify-between">
          <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
            CEFR Benchmark
          </span>
          <div className="my-2">
            <span className="text-2xl font-extrabold text-purple-950">
              {getCefrLevel(result.bandScore)}
            </span>
          </div>
          <span className="text-xs text-purple-700">
            Internationally recognized language tier
          </span>
        </div>
      </div>

      {/* Band Descriptor Evaluation Commentary */}
      <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-lg mb-8">
        <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
          Examiner Competency Summary
        </h4>
        <p className="text-sm text-amber-950 leading-relaxed">
          {bandSummary.description}
        </p>
      </div>

      {/* Writing AI Evaluation Details */}
      {result.writingEvaluation && (
        <div className="space-y-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-200">
            Gemini AI Writing Assessment Breakdown
          </h3>
          {Object.entries(result.writingEvaluation).map(([key, ev]) => {
            if (!ev) return null;
            return (
              <div key={key} className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 uppercase text-xs tracking-wider">
                    {key.toUpperCase()} - Band {ev.overallBand.toFixed(1)} ({ev.wordCount} words)
                  </h4>
                  {ev.underlengthPenalty && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">
                      Underlength Penalty Applied
                    </span>
                  )}
                </div>

                {/* 4 Criteria Scores */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 bg-white rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Task Achievement</div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      {ev.criteriaScores.taskAchievementOrResponse.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Coherence & Cohesion</div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      {ev.criteriaScores.coherenceCohesion.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Lexical Resource</div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      {ev.criteriaScores.lexicalResource.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded border border-gray-200">
                    <div className="text-xs text-gray-500">Grammar & Accuracy</div>
                    <div className="text-lg font-bold text-gray-900 font-mono">
                      {ev.criteriaScores.grammaticalRangeAccuracy.toFixed(1)}
                    </div>
                  </div>
                </div>

                {/* Suggestions and Corrections */}
                {ev.sentenceCorrections && ev.sentenceCorrections.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-gray-800 uppercase">
                      Targeted Sentence Corrections:
                    </h5>
                    {ev.sentenceCorrections.map((corr, idx) => (
                      <div key={idx} className="p-3 bg-white rounded border border-gray-200 text-xs space-y-1">
                        <div className="line-through text-red-600">{corr.original}</div>
                        <div className="font-semibold text-emerald-700">{corr.correction}</div>
                        <div className="text-gray-500 italic">{corr.explanation}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Model Answer */}
                {ev.band9ModelAnswer && (
                  <div className="p-4 bg-emerald-50/40 border border-emerald-200 rounded-lg">
                    <h5 className="text-xs font-bold text-emerald-900 uppercase mb-2">
                      Band 9.0 Benchmark Model Response:
                    </h5>
                    <p className="text-xs text-emerald-950 whitespace-pre-line leading-relaxed font-serif">
                      {ev.band9ModelAnswer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Speaking AI Evaluation Details */}
      {result.speakingEvaluation && (
        <div className="space-y-4 mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-200">
            Gemini AI Speaking Assessment (Band {result.speakingEvaluation.overallBand.toFixed(1)})
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 bg-white rounded border">
              <div className="text-gray-500">Fluency & Coherence</div>
              <div className="text-lg font-bold text-gray-900 font-mono">
                {result.speakingEvaluation.criteriaScores.fluencyCoherence.toFixed(1)}
              </div>
            </div>
            <div className="p-2.5 bg-white rounded border">
              <div className="text-gray-500">Lexical Resource</div>
              <div className="text-lg font-bold text-gray-900 font-mono">
                {result.speakingEvaluation.criteriaScores.lexicalResource.toFixed(1)}
              </div>
            </div>
            <div className="p-2.5 bg-white rounded border">
              <div className="text-gray-500">Grammar & Accuracy</div>
              <div className="text-lg font-bold text-gray-900 font-mono">
                {result.speakingEvaluation.criteriaScores.grammaticalRangeAccuracy.toFixed(1)}
              </div>
            </div>
            <div className="p-2.5 bg-white rounded border">
              <div className="text-gray-500">Pronunciation</div>
              <div className="text-lg font-bold text-gray-900 font-mono">
                {result.speakingEvaluation.criteriaScores.pronunciation.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs bg-white p-3 rounded border">
            <div>
              <span className="text-gray-500 font-medium">Speech Rate: </span>
              <span className="font-bold text-gray-900">{result.speakingEvaluation.wpm} Words Per Minute</span>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Filler Word Count: </span>
              <span className="font-bold text-gray-900">{result.speakingEvaluation.fillerWordsCount}</span>
            </div>
          </div>

          {result.speakingEvaluation.suggestions && (
            <div className="space-y-1.5 pt-2">
              <h5 className="text-xs font-bold text-gray-800 uppercase">
                Examiner Action Plan for Higher Band Score:
              </h5>
              <ul className="list-disc pl-5 text-xs space-y-1 text-gray-700">
                {result.speakingEvaluation.suggestions.map((sug, idx) => (
                  <li key={idx}>{sug}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Question-by-Question Diagnostic Review */}
      {result.questionResults && result.questionResults.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900 pb-2 border-b border-gray-200">
            Question-by-Question Diagnostic Review
          </h3>
          <div className="space-y-2">
            {result.questionResults.map((q) => (
              <div
                key={q.id}
                className={`p-3 rounded-lg border text-xs flex flex-col md:flex-row md:items-center justify-between gap-2 ${
                  q.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {q.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-gray-900">Question {q.id}:</span>{' '}
                    <span className="text-gray-700">Your answer: </span>
                    <span className={`font-semibold ${q.isCorrect ? 'text-emerald-800' : 'text-red-700 line-through'}`}>
                      {q.userAnswer || '(blank)'}
                    </span>
                    {!q.isCorrect && (
                      <span className="ml-2 text-emerald-800 font-semibold">
                        [Correct: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(' / ') : q.correctAnswer}]
                      </span>
                    )}
                    {q.explanation && (
                      <div className="text-gray-500 italic mt-0.5">{q.explanation}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Navigation Link */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <span>&larr; Back to Test Catalog</span>
        </Link>
      </div>
    </div>
  );
}
