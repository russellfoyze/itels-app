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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-900 rounded-lg shadow-2xl max-w-md w-full border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#002B49] text-white px-5 py-3.5 flex items-center justify-between">
          <h3 className="font-semibold text-base">Display & Accessibility Settings</h3>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="text-gray-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Color Schemes */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2.5">
              Screen Contrast & Colors
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                onClick={() => setTheme('standard')}
                className={`flex items-center justify-between p-3 rounded border text-left transition ${
                  theme === 'standard'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded border border-gray-400 bg-white"></div>
                  <div>
                    <div className="text-sm">Standard (Black on White)</div>
                    <div className="text-xs text-gray-500">Official default test colors</div>
                  </div>
                </div>
                {theme === 'standard' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => setTheme('high-contrast')}
                className={`flex items-center justify-between p-3 rounded border text-left transition ${
                  theme === 'high-contrast'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded border border-gray-600 bg-black text-white text-center text-xs flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <div className="text-sm">High Contrast (White on Black)</div>
                    <div className="text-xs text-gray-500">Reduces screen glare</div>
                  </div>
                </div>
                {theme === 'high-contrast' && <Check className="w-4 h-4 text-blue-600" />}
              </button>

              <button
                onClick={() => setTheme('yellow-on-black')}
                className={`flex items-center justify-between p-3 rounded border text-left transition ${
                  theme === 'yellow-on-black'
                    ? 'border-blue-600 bg-blue-50/50 font-semibold ring-1 ring-blue-600'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded border border-amber-500 bg-black text-amber-300 text-center text-xs flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <div className="text-sm">Yellow on Black</div>
                    <div className="text-xs text-gray-500">High visibility for low light</div>
                  </div>
                </div>
                {theme === 'yellow-on-black' && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            </div>
          </div>

          {/* Font Sizes */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2.5">
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
                  className={`p-2.5 rounded border text-center transition ${
                    fontSize === item.id
                      ? 'border-blue-600 bg-blue-50 font-semibold ring-1 ring-blue-600 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="text-sm">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="px-4 py-2 bg-[#002B49] text-white text-sm font-medium rounded hover:bg-[#003860] transition"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
}
