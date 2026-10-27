'use client';

import React from 'react';
import { useExam, ColorTheme, FontSize } from '@/context/ExamContext';
import { X, Check } from 'lucide-react';

export function SettingsModal() {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    theme,
    setTheme,
    fontSize,
    setFontSize,
  } = useExam();

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between shrink-0">
          <h3 className="font-semibold text-sm sm:text-base">Display & Accessibility</h3>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-gray-300 hover:text-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* Color Schemes */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
              Screen Contrast & Colors
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setTheme('standard')}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border text-left transition ${
                  theme === 'standard'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded border border-gray-400 bg-white shrink-0"></div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">Standard (Black on White)</div>
                    <div className="text-[11px] text-gray-500">Official default test theme</div>
                  </div>
                </div>
                {theme === 'standard' && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>

              <button
                onClick={() => setTheme('high-contrast')}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border text-left transition ${
                  theme === 'high-contrast'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded border border-gray-600 bg-black text-white text-center text-[10px] flex items-center justify-center shrink-0">
                    A
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">High Contrast (White on Black)</div>
                    <div className="text-[11px] text-gray-500">Reduces screen glare</div>
                  </div>
                </div>
                {theme === 'high-contrast' && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>

              <button
                onClick={() => setTheme('yellow-on-black')}
                className={`flex items-center justify-between p-2.5 sm:p-3 rounded-lg border text-left transition ${
                  theme === 'yellow-on-black'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded border border-amber-500 bg-black text-amber-300 text-center text-[10px] flex items-center justify-center shrink-0">
                    A
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-medium">Yellow on Black</div>
                    <div className="text-[11px] text-gray-500">High visibility</div>
                  </div>
                </div>
                {theme === 'yellow-on-black' && <Check className="w-4 h-4 text-blue-600 shrink-0" />}
              </button>
            </div>
          </div>

          {/* Font Sizes */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-800 mb-2">
              Text Font Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'standard', label: 'Standard', sub: '100%' },
                  { id: 'large', label: 'Large', sub: '120%' },
                  { id: 'xlarge', label: 'Extra Large', sub: '140%' },
                ] as { id: FontSize; label: string; sub: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFontSize(item.id)}
                  className={`p-2 rounded-lg border text-center transition ${
                    fontSize === item.id
                      ? 'border-blue-600 bg-blue-50 font-semibold ring-1 ring-blue-600 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-medium">{item.label}</div>
                  <div className="text-[10px] text-gray-500">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 sm:px-6 py-2.5 sm:py-3 border-t border-gray-200 flex justify-end shrink-0">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="w-full sm:w-auto px-4 py-2 bg-[#002B49] text-white text-xs font-bold rounded-lg hover:bg-[#003860] transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
