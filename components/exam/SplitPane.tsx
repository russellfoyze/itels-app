'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, HelpCircle, ArrowLeftRight } from 'lucide-react';

interface SplitPaneProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  initialLeftWidthPercent?: number;
  leftTabLabel?: string;
  rightTabLabel?: string;
}

export function SplitPane({
  leftContent,
  rightContent,
  initialLeftWidthPercent = 50,
  leftTabLabel = 'Passage / Text',
  rightTabLabel = 'Questions',
}: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState<number>(initialLeftWidthPercent);
  const [mobileActiveTab, setMobileActiveTab] = useState<'left' | 'right'>('left');
  const isDragging = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
      if (newWidth >= 25 && newWidth <= 75) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startDrag = () => {
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 h-[calc(100dvh-105px)] sm:h-[calc(100dvh-112px)] overflow-hidden relative"
    >
      {/* Mobile-Only View Switcher Tabs (< lg) */}
      <div className="lg:hidden flex items-center bg-gray-100 border-b border-gray-300 p-1.5 shrink-0 select-none">
        <button
          onClick={() => setMobileActiveTab('left')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
            mobileActiveTab === 'left'
              ? 'bg-[#002B49] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>{leftTabLabel}</span>
        </button>

        <button
          onClick={() => setMobileActiveTab('right')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition flex items-center justify-center gap-1.5 ${
            mobileActiveTab === 'right'
              ? 'bg-[#002B49] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{rightTabLabel}</span>
        </button>
      </div>

      {/* Main Panes Container */}
      <div className="flex flex-col lg:flex-row flex-1 h-full overflow-hidden relative">
        {/* Left Pane (Passage / Material) */}
        <div
          style={{ width: undefined }}
          className={`w-full lg:w-auto h-full overflow-y-auto p-3.5 sm:p-5 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-300 ${
            mobileActiveTab === 'left' ? 'block' : 'hidden lg:block'
          }`}
          ref={(el) => {
            if (el && typeof window !== 'undefined' && window.innerWidth >= 1024) {
              el.style.width = `${leftWidth}%`;
            }
          }}
        >
          {leftContent}
        </div>

        {/* Desktop Draggable Divider Handle */}
        <div
          onMouseDown={startDrag}
          className="hidden lg:flex w-2.5 hover:w-3 bg-gray-200 hover:bg-blue-500 cursor-col-resize items-center justify-center transition-all select-none z-10"
          title="Drag to resize panes"
        >
          <div className="w-0.5 h-8 bg-gray-400 rounded"></div>
        </div>

        {/* Right Pane (Questions / Worksheet) */}
        <div
          style={{ width: undefined }}
          className={`w-full lg:w-auto h-full overflow-y-auto p-3.5 sm:p-5 lg:p-6 bg-gray-50/60 ${
            mobileActiveTab === 'right' ? 'block' : 'hidden lg:block'
          }`}
          ref={(el) => {
            if (el && typeof window !== 'undefined' && window.innerWidth >= 1024) {
              el.style.width = `${100 - leftWidth}%`;
            }
          }}
        >
          {rightContent}
        </div>
      </div>

      {/* Floating One-Tap Toggle Pill on Mobile */}
      <button
        onClick={() => setMobileActiveTab(mobileActiveTab === 'left' ? 'right' : 'left')}
        className="lg:hidden fixed bottom-14 right-4 z-40 bg-[#002B49] text-white text-xs font-bold px-3 py-2 rounded-full shadow-xl border border-white/20 flex items-center gap-1.5 active:scale-95 transition"
      >
        <ArrowLeftRight className="w-3.5 h-3.5 text-yellow-300" />
        <span>Switch to {mobileActiveTab === 'left' ? rightTabLabel : leftTabLabel}</span>
      </button>
    </div>
  );
}
