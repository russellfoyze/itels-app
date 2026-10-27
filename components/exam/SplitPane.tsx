'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SplitPaneProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  initialLeftWidthPercent?: number;
}

export function SplitPane({
  leftContent,
  rightContent,
  initialLeftWidthPercent = 50,
}: SplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState<number>(initialLeftWidthPercent);
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
      className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-112px)] overflow-hidden relative"
    >
      {/* Left Pane */}
      <div
        style={{ width: `${leftWidth}%` }}
        className="w-full lg:w-auto h-1/2 lg:h-full overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-300 p-4 lg:p-6"
      >
        {leftContent}
      </div>

      {/* Draggable Divider Handle */}
      <div
        onMouseDown={startDrag}
        className="hidden lg:flex w-2.5 hover:w-3 bg-gray-200 hover:bg-blue-500 cursor-col-resize items-center justify-center transition-all select-none z-10"
        title="Drag to resize panes"
      >
        <div className="w-0.5 h-8 bg-gray-400 rounded"></div>
      </div>

      {/* Right Pane */}
      <div
        style={{ width: `${100 - leftWidth}%` }}
        className="w-full lg:w-auto h-1/2 lg:h-full overflow-y-auto p-4 lg:p-6 bg-gray-50/60"
      >
        {rightContent}
      </div>
    </div>
  );
}
