'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Calculator,
  BookOpen,
  Sparkles,
  AlertTriangle,
  Search,
  X,
  CheckCircle2,
  Bookmark,
  Award,
} from 'lucide-react';
import {
  ieltsAcademicDictionary,
  ieltsTopicVocabulary,
  ieltsStrategyGuides,
} from '@/data/ieltsHelperData';
import {
  calculateReadingBand,
  calculateListeningBand,
  calculateOverallBand,
  getBandDescriptorSummary,
} from '@/lib/scoring';

interface StudentHelperHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StudentHelperHub({ isOpen, onClose }: StudentHelperHubProps) {
  const [activeTab, setActiveTab] = useState<'strategies' | 'calculator' | 'vocab' | 'grammar'>('strategies');

  const [calcModule, setCalcModule] = useState<'reading_acad' | 'reading_gt' | 'listening' | 'overall'>('reading_acad');
  const [rawScore, setRawScore] = useState<number>(30);
  const [overallScores, setOverallScores] = useState({ listening: 7.0, reading: 7.0, writing: 6.5, speaking: 7.0 });

  const [vocabSearch, setVocabSearch] = useState<string>('');

  if (!isOpen) return null;

  let calculatedBand = 0;
  if (calcModule === 'reading_acad') calculatedBand = calculateReadingBand(rawScore, true);
  else if (calcModule === 'reading_gt') calculatedBand = calculateReadingBand(rawScore, false);
  else if (calcModule === 'listening') calculatedBand = calculateListeningBand(rawScore);
  else calculatedBand = calculateOverallBand(overallScores);

  const bandSummary = getBandDescriptorSummary(calculatedBand);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-gray-200 overflow-hidden max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-xs sm:text-sm shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base tracking-tight">IELTS Student Helper Hub</h3>
              <p className="text-[11px] sm:text-xs text-blue-200">Tools, Strategies, Vocabulary & Band Calculator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-gray-200 bg-gray-50 px-3 sm:px-6 gap-1 sm:gap-2 shrink-0 overflow-x-auto text-xs font-bold scrollbar-none">
          <button
            onClick={() => setActiveTab('strategies')}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 border-b-2 flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap text-[11px] sm:text-xs ${
              activeTab === 'strategies'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Strategies</span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 border-b-2 flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap text-[11px] sm:text-xs ${
              activeTab === 'calculator'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Band Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 border-b-2 flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap text-[11px] sm:text-xs ${
              activeTab === 'vocab'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vocabulary</span>
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`py-2.5 sm:py-3 px-2 sm:px-3 border-b-2 flex items-center gap-1 sm:gap-1.5 transition whitespace-nowrap text-[11px] sm:text-xs ${
              activeTab === 'grammar'
                ? 'border-[#002B49] text-[#002B49]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Grammar Traps</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm flex-1">
          {/* TAB 1: STRATEGIES */}
          {activeTab === 'strategies' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-2">
                  Reading Strategies
                </h4>
                <div className="space-y-2.5">
                  {ieltsStrategyGuides.reading.map((guide, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5">{guide.title}</h5>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] sm:text-xs text-gray-700">
                        {guide.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded inline-block mb-2">
                  Writing Blueprints
                </h4>
                <div className="space-y-2.5">
                  {ieltsStrategyGuides.writing.map((guide, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5">{guide.title}</h5>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] sm:text-xs text-gray-700">
                        {guide.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mb-2">
                  Speaking Frameworks
                </h4>
                <div className="space-y-2.5">
                  {ieltsStrategyGuides.speaking.map((guide, i) => (
                    <div key={i} className="p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <h5 className="font-bold text-gray-900 text-xs sm:text-sm mb-1.5">{guide.title}</h5>
                      <ul className="list-disc pl-4 space-y-1 text-[11px] sm:text-xs text-gray-700">
                        {guide.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'reading_acad', label: 'Acad Reading' },
                  { id: 'reading_gt', label: 'GT Reading' },
                  { id: 'listening', label: 'Listening' },
                  { id: 'overall', label: 'Overall Band' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCalcModule(item.id as any)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition ${
                      calcModule === item.id
                        ? 'bg-[#002B49] text-white border-[#002B49]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {calcModule !== 'overall' ? (
                <div className="p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-xs sm:text-sm text-gray-800">
                      Raw Score:
                    </label>
                    <span className="font-mono text-lg sm:text-xl font-black text-[#002B49]">
                      {rawScore} / 40
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={rawScore}
                    onChange={(e) => setRawScore(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />

                  <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-500 font-mono">
                    <span>0</span>
                    <span>10 (4.0)</span>
                    <span>23 (6.0)</span>
                    <span>30 (7.0)</span>
                    <span>35 (8.0)</span>
                    <span>40 (9.0)</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
                  {['listening', 'reading', 'writing', 'speaking'].map((skill) => (
                    <div key={skill} className="space-y-1">
                      <label className="text-[11px] font-bold uppercase text-gray-700 capitalize">
                        {skill}
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        max="9"
                        value={overallScores[skill as keyof typeof overallScores]}
                        onChange={(e) =>
                          setOverallScores({
                            ...overallScores,
                            [skill]: Number(e.target.value),
                          })
                        }
                        className="w-full p-2 text-xs sm:text-sm font-mono font-bold rounded border border-gray-300 bg-white"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Result Preview Box */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-900 to-[#002B49] text-white rounded-xl shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-blue-200 uppercase tracking-widest">
                    Calculated Band Score
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono mt-0.5">
                    Band {calculatedBand.toFixed(1)}
                  </div>
                  <span className="text-xs text-blue-100 flex items-center gap-1 mt-1">
                    <Award className="w-3.5 h-3.5 text-yellow-300" />
                    <span>{bandSummary.level}</span>
                  </span>
                </div>
                <div className="max-w-[200px] text-right text-xs text-blue-200 hidden sm:block">
                  {bandSummary.description}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VOCABULARY BANK */}
          {activeTab === 'vocab' && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter vocabulary words..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-5">
                {ieltsTopicVocabulary.map((topicGroup, idx) => (
                  <div key={idx} className="space-y-2.5">
                    <h4 className="font-bold text-xs sm:text-sm text-[#002B49] border-b pb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{topicGroup.topic}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {topicGroup.words
                        .filter(
                          (w) =>
                            w.word.toLowerCase().includes(vocabSearch.toLowerCase()) ||
                            w.band9Collocation.toLowerCase().includes(vocabSearch.toLowerCase())
                        )
                        .map((w, wIdx) => (
                          <div
                            key={wIdx}
                            className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-gray-900">{w.word}</span>
                              <span className="text-[10px] font-bold px-1 py-0.5 bg-blue-100 text-blue-800 rounded">
                                Band 8+
                              </span>
                            </div>
                            <p className="text-gray-600 text-[11px]">{w.definition}</p>
                            <div className="text-blue-900 font-semibold italic text-[11px]">
                              {w.band9Collocation}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GRAMMAR TRAPS */}
          {activeTab === 'grammar' && (
            <div className="space-y-3">
              {[
                {
                  rule: '1. Subject-Verb Agreement with Plural Phrases',
                  wrong: 'The number of students are increasing.',
                  correct: 'The number of students IS increasing (singular).',
                  tip: 'Focus on the true grammatical subject, not the intervening prepositional phrase.'
                },
                {
                  rule: '2. Countable vs. Uncountable Nouns',
                  wrong: 'She received many advices and informations.',
                  correct: 'She received substantial ADVICE and INFORMATION.',
                  tip: '"Advice", "information", "research", and "equipment" are strictly uncountable.'
                },
                {
                  rule: '3. Run-on Sentences & Comma Splices',
                  wrong: 'Many students study abroad, it gives them better opportunities.',
                  correct: 'Many students study abroad; it gives them better opportunities.',
                  tip: 'Do not join two independent clauses with only a comma.'
                },
                {
                  rule: '4. Overuse of Conversational Connectors',
                  wrong: 'Beside this, nowadays, furthermore, moreover in my opinion...',
                  correct: 'Furthermore, from an economic standpoint, evidence indicates...',
                  tip: 'Avoid stacking multiple linking words at the beginning of sentences.'
                }
              ].map((trap, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-1.5 text-xs">
                  <h5 className="font-bold text-gray-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{trap.rule}</span>
                  </h5>
                  <div className="line-through text-red-600 bg-red-50/50 p-1.5 rounded text-[11px]">
                    {trap.wrong}
                  </div>
                  <div className="font-semibold text-emerald-800 bg-emerald-50/50 p-1.5 rounded text-[11px]">
                    {trap.correct}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 bg-[#002B49] text-white text-xs font-bold rounded-lg hover:bg-[#003860] transition"
          >
            Close Helper
          </button>
        </div>
      </div>
    </div>
  );
}
