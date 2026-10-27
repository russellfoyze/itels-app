'use client';

import React, { useState } from 'react';
import { useExam } from '@/context/ExamContext';
import { Clock, Eye, EyeOff, Settings, HelpCircle, Volume2, GraduationCap, Sparkles } from 'lucide-react';
import { StudentHelperHub } from '@/components/help/StudentHelperHub';

interface HeaderBarProps {
  testTitle: string;
  candidateName?: string;
  candidateNumber?: string;
  showVolume?: boolean;
  volume?: number;
  onVolumeChange?: (vol: number) => void;
}

export function HeaderBar({
  testTitle,
  candidateName = 'Test Candidate',
  candidateNumber = 'IELTS-89214',
  showVolume = false,
  volume = 80,
  onVolumeChange,
}: HeaderBarProps) {
  const {
    remainingSeconds,
    isTimerVisible,
    setIsTimerVisible,
    setIsSettingsOpen,
    setIsHelpOpen,
  } = useExam();

  const [isHelperOpen, setIsHelperOpen] = useState<boolean>(false);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLowTime = remainingSeconds <= 600; // 10 mins
  const isCriticalTime = remainingSeconds <= 300; // 5 mins

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#002B49] text-white border-b border-gray-700 select-none shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          {/* Candidate Info */}
          <div className="flex flex-col">
            <div className="text-sm font-semibold tracking-wide flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>{candidateName}</span>
              <span className="text-gray-400 text-xs font-mono">({candidateNumber})</span>
            </div>
            <div className="text-xs text-gray-300 font-medium">{testTitle}</div>
          </div>

          {/* Center: Countdown Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono text-base font-bold tracking-wider transition-colors ${
                isCriticalTime
                  ? 'bg-red-600 text-white animate-pulse'
                  : isLowTime
                  ? 'bg-amber-500 text-black'
                  : 'bg-black/40 text-gray-100 border border-white/20'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isTimerVisible ? timeFormatted : '--:--'}</span>
            </div>
            <button
              onClick={() => setIsTimerVisible(!isTimerVisible)}
              className="text-xs flex items-center gap-1 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-1.5 rounded transition"
              title={isTimerVisible ? 'Hide Clock' : 'Show Clock'}
            >
              {isTimerVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isTimerVisible ? 'Hide' : 'Show'}</span>
            </button>
          </div>

          {/* Right: Audio Volume + Helper Hub + Settings & Help */}
          <div className="flex items-center gap-2.5">
            {/* Student Helper Hub Button */}
            <button
              onClick={() => setIsHelperOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white transition flex items-center gap-1.5 text-xs font-bold shadow-xs"
              title="Open IELTS Student Helper: Band Calculator, Strategies & Vocabulary"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden md:inline">Student Helper</span>
            </button>

            {showVolume && onVolumeChange && (
              <div className="hidden md:flex items-center gap-2 bg-white/10 px-2.5 py-1 rounded">
                <Volume2 className="w-4 h-4 text-gray-300" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => onVolumeChange(Number(e.target.value))}
                  className="w-16 h-1.5 accent-blue-400 cursor-pointer"
                />
              </div>
            )}

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-1.5 rounded hover:bg-white/15 text-gray-200 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
              title="Display and Contrast Settings"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </button>

            <button
              onClick={() => setIsHelpOpen(true)}
              className="p-1.5 rounded hover:bg-white/15 text-gray-200 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
              title="Exam Instructions and Help"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Helper Modal Drawer */}
      <StudentHelperHub isOpen={isHelperOpen} onClose={() => setIsHelperOpen(false)} />
    </>
  );
}
