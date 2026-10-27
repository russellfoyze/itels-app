'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { allTestsCatalog } from '@/data/testsCatalog';
import {
  BookOpen,
  Headphones,
  PenTool,
  Mic,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  CheckCircle2,
  Zap,
  GraduationCap,
  Volume2,
} from 'lucide-react';
import { StudentHelperHub } from '@/components/help/StudentHelperHub';

export default function HomePage() {
  const [isHelperOpen, setIsHelperOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Top Banner Bar */}
      <div className="bg-[#002B49] text-white py-2.5 px-4 text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Official Computer-Delivered IELTS Simulation & AI Scoring Engine</span>
          </div>
          <span className="text-gray-300 hidden sm:inline">
            Materials Curated from practicepteonline.com (IELTS Master)
          </span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg tracking-wider shadow">
              IELTS
            </div>
            <div>
              <div className="text-lg font-black text-[#002B49] tracking-tight">
                IELTS MASTER
              </div>
              <div className="text-xs text-gray-500 font-medium">
                Official CD-IELTS Mock Testing & Evaluation
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsHelperOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Helper Hub</span>
            </button>

            <Link
              href="/test/reading/ielts-reading-test-1"
              className="px-4 py-2 bg-[#002B49] hover:bg-[#003860] text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
            >
              <span>Quick Test 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 px-4 border-b border-gray-200">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Scoring • Read-Text Voice Speed Control • Word Pointing</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#002B49] tracking-tight leading-tight">
            Practice Real Computer-Delivered IELTS Under Authentic Exam Conditions
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the authentic British Council / IDP CD-IELTS environment. Includes word-by-word synchronized text-to-speech reading with adjustable speed, instant scoring, and comprehensive AI band evaluations.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setIsHelperOpen(true)}
              className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-red-600" />
              <span>Explore Student Helper (Calculator & Strategies)</span>
            </button>
            <Link
              href="/test/reading/ielts-reading-test-1"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Try Read-Text in Reading Test</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Core 4 Test Modules Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full flex-1">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-[#002B49] tracking-tight">
            IELTS Test Modules
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Choose a module to start full practice with real-time scoring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Academic Reading */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  With Read-Text & Word Pointer
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Academic Reading</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  3 authentic passages, 40 questions (T/F/NG, Headings, Cloze). Synchronized word-by-word read-aloud with speed adjustment (0.75x - 1.5x) and instant dictionary.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 60 Mins
                </span>
                <span>•</span>
                <span>40 Questions</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/test/reading/ielts-reading-test-1"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Start Reading (Read-Text)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 2. Listening */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  208+ Audio Tests
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">IELTS Listening</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  4 audio sections, 40 questions. Form filling, MCQs, and map labeling with exact Cambridge scoring and plural/singular tolerance.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 30 Mins
                </span>
                <span>•</span>
                <span>40 Questions</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/test/listening/ielts-listening-test-1"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Start Listening Test 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3. Academic Writing */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                  132+ Prompts & AI Feedback
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">Academic Writing</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Task 1 visual charts/maps & Task 2 discursive essays. Live word counter with Gemini AI evaluations (TR, CC, LR, GRA) and sentence corrections.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 60 Mins
                </span>
                <span>•</span>
                <span>2 Tasks</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/test/writing/ielts-writing-test-1"
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Start Writing Test 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 4. Speaking (Makkar Cue Cards) */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                  201+ Makkar Cue Cards
                </span>
                <h3 className="text-lg font-bold text-gray-900 mt-1">IELTS Speaking</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  Part 1 Interview, Part 2 Makkar Cue Card with 1-min prep / 2-min recording, Part 3 discussion. In-browser audio visualizer and AI fluency analysis.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 14 Mins
                </span>
                <span>•</span>
                <span>3 Parts</span>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/test/speaking/ielts-speaking-test-1"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Start Speaking Test 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Highlights Banner */}
        <div className="mt-14 p-8 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Official Cambridge Conversion</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Objective 40-mark scales converted into official IELTS 9-band scores with exact rounding logic.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">AI Suggestions & Band 9 Models</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Sentence-level corrections, Band 8+ vocabulary upgrades, and benchmark model answers powered by Gemini.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">Pixel-Perfect CD-IELTS UX</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Full 1-40 question palette, review flagging, highlighting tool, font scaling, and color scheme modes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} IELTS Master Online. Designed for authentic CD-IELTS preparation.</span>
          <span className="text-gray-400">Scraped & Modeled from practicepteonline.com</span>
        </div>
      </footer>

      {/* Student Helper Hub Modal */}
      <StudentHelperHub isOpen={isHelperOpen} onClose={() => setIsHelperOpen(false)} />
    </div>
  );
}
