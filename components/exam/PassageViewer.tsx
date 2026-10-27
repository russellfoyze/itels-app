'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Highlighter,
  StickyNote,
  Volume2,
  Play,
  Pause,
  Square,
  BookOpen,
  X,
  Languages,
} from 'lucide-react';
import { ieltsAcademicDictionary } from '@/data/ieltsHelperData';

interface PassageViewerProps {
  title: string;
  subtitle?: string;
  content: string;
}

interface WordToken {
  id: number;
  word: string;
  charStart: number;
  charEnd: number;
  cleanWord: string;
}

export function PassageViewer({ title, subtitle, content }: PassageViewerProps) {
  // Selection and Annotation State
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [activeDictionaryWord, setActiveDictionaryWord] = useState<string | null>(null);

  // Text to Speech (TTS) Read-Text State
  const [isReading, setIsReading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const activeWordSpanRef = useRef<HTMLSpanElement | null>(null);

  // Tokenize content into paragraphs and word tokens
  const tokenizedParagraphs = useMemo(() => {
    let globalCharIndex = 0;
    let globalWordId = 0;

    return content.split('\n\n').map((paragraphText) => {
      const wordsInPara: WordToken[] = [];
      const rawWords = paragraphText.split(/(\s+)/);

      for (let i = 0; i < rawWords.length; i++) {
        const item = rawWords[i];
        if (!item) continue;

        if (/^\s+$/.test(item)) {
          globalCharIndex += item.length;
        } else {
          const start = globalCharIndex;
          const end = start + item.length;
          globalCharIndex = end;

          const clean = item.toLowerCase().replace(/[^a-z]/gi, '');
          wordsInPara.push({
            id: globalWordId++,
            word: item,
            charStart: start,
            charEnd: end,
            cleanWord: clean,
          });
        }
      }
      return wordsInPara;
    });
  }, [content]);

  const allWordTokens = useMemo(() => {
    return tokenizedParagraphs.flat();
  }, [tokenizedParagraphs]);

  // Load available speech voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices().filter((v) =>
        v.lang.startsWith('en')
      );
      setAvailableVoices(voices);

      const british = voices.find((v) => v.lang === 'en-GB' || v.name.includes('British') || v.name.includes('UK'));
      if (british) {
        setSelectedVoiceName(british.name);
      } else if (voices.length > 0) {
        setSelectedVoiceName(voices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Scroll active spoken word into view smoothly
  useEffect(() => {
    if (activeWordIndex !== null && activeWordSpanRef.current) {
      activeWordSpanRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, [activeWordIndex]);

  const startReading = (startIndex: number = 0) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-Speech is not supported by your browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const wordsToSpeak = allWordTokens.slice(startIndex);
    const textToSpeak = wordsToSpeak.map((w) => w.word).join(' ');

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    if (selectedVoiceName) {
      const voice = availableVoices.find((v) => v.name === selectedVoiceName);
      if (voice) utterance.voice = voice;
    }

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIdx = event.charIndex;
        let currentPos = 0;
        for (let i = 0; i < wordsToSpeak.length; i++) {
          const w = wordsToSpeak[i];
          if (charIdx >= currentPos && charIdx < currentPos + w.word.length + 1) {
            setActiveWordIndex(w.id);
            break;
          }
          currentPos += w.word.length + 1;
        }
      }
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
      setActiveWordIndex(null);
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      setIsReading(false);
      setIsPaused(false);
      setActiveWordIndex(null);
    };

    window.speechSynthesis.speak(utterance);
    setIsReading(true);
    setIsPaused(false);
  };

  const pauseReading = () => {
    if (window.speechSynthesis && isReading) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeReading = () => {
    if (window.speechSynthesis && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      startReading(activeWordIndex || 0);
    }
  };

  const stopReading = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsReading(false);
    setIsPaused(false);
    setActiveWordIndex(null);
  };

  const handleSpeedChange = (newRate: number) => {
    setSpeechRate(newRate);
    if (isReading) {
      startReading(activeWordIndex || 0);
    }
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      setTooltipPos(null);
      return;
    }

    const text = selection.toString().trim();
    if (text.length > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedWord(text);
      // Clamp coordinates within screen
      const x = Math.max(80, Math.min(window.innerWidth - 80, rect.left + rect.width / 2));
      const y = Math.max(50, rect.top - 45);
      setTooltipPos({ x, y });
    } else {
      setTooltipPos(null);
    }
  };

  const applyHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement('mark');
    span.className = 'ielts-highlight';
    span.appendChild(range.extractContents());
    range.insertNode(span);
    selection.removeAllRanges();
    setTooltipPos(null);
  };

  const addNote = () => {
    const noteText = prompt('Enter your note:');
    if (noteText) {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.className = 'ielts-note-badge';
      span.title = noteText;
      span.innerText = `[Note: ${noteText}]`;
      range.insertNode(span);
      selection.removeAllRanges();
    }
    setTooltipPos(null);
  };

  const openDictionaryForSelection = () => {
    const clean = selectedWord.toLowerCase().replace(/[^a-z]/gi, '');
    setActiveDictionaryWord(clean);
    setTooltipPos(null);
  };

  const handleWordClick = (wordToken: WordToken) => {
    if (wordToken.cleanWord) {
      setActiveDictionaryWord(wordToken.cleanWord);
    }
  };

  const activeDictData = activeDictionaryWord
    ? ieltsAcademicDictionary[activeDictionaryWord] || {
        word: activeDictionaryWord.charAt(0).toUpperCase() + activeDictionaryWord.slice(1),
        pos: 'academic term',
        cefr: 'B2/C1',
        definition: `Formal academic term used in scientific and sociological IELTS passages.`,
        synonyms: ['concept', 'phenomenon', 'principle'],
        ieltsExample: `Careful analysis of this concept is essential for accurate reading comprehension.`,
        topic: 'IELTS Academic Vocabulary'
      }
    : null;

  return (
    <div ref={containerRef} onMouseUp={handleMouseUp} className="relative select-text">
      {/* 1. READ TEXT CONTROL BAR (RESPONSIVE) */}
      <div className="sticky top-0 z-30 mb-4 sm:mb-6 bg-gradient-to-r from-blue-900 to-[#002B49] text-white p-2.5 sm:p-3 rounded-xl shadow-lg border border-blue-700/50 flex flex-wrap items-center justify-between gap-2">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isReading ? (
            <button
              onClick={() => startReading(0)}
              className="px-2.5 sm:px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1"
              title="Start Read Aloud (Points out each word as spoken)"
            >
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Read Text</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={resumeReading}
              className="px-2.5 sm:px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Resume</span>
            </button>
          ) : (
            <button
              onClick={pauseReading}
              className="px-2.5 sm:px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] sm:text-xs font-bold rounded-lg shadow-sm transition flex items-center gap-1"
            >
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span>Pause</span>
            </button>
          )}

          {isReading && (
            <button
              onClick={stopReading}
              className="px-2 py-1.5 bg-red-600/90 hover:bg-red-600 text-white text-[11px] sm:text-xs font-semibold rounded-lg transition flex items-center gap-1"
              title="Stop reading aloud"
            >
              <Square className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Stop</span>
            </button>
          )}
        </div>

        {/* Speed Adjustment Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-xs">
          <div className="flex items-center bg-black/30 rounded-lg p-0.5 border border-white/10">
            {[0.75, 1.0, 1.25].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-1.5 sm:px-2 py-1 rounded text-[11px] sm:text-xs font-semibold transition ${
                  speechRate === speed
                    ? 'bg-blue-500 text-white shadow-xs'
                    : 'text-gray-300 hover:text-white'
                }`}
                title={`Set speed to ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {availableVoices.length > 0 && (
            <div className="hidden md:flex items-center gap-1 bg-black/30 px-2 py-1 rounded-lg border border-white/10 text-xs">
              <Languages className="w-3.5 h-3.5 text-blue-300" />
              <select
                value={selectedVoiceName}
                onChange={(e) => setSelectedVoiceName(e.target.value)}
                className="bg-transparent text-white text-xs focus:outline-none cursor-pointer max-w-[110px] truncate"
              >
                {availableVoices.map((v) => (
                  <option key={v.name} value={v.name} className="bg-gray-900 text-white">
                    {v.name.replace(/Microsoft|Google/gi, '').trim()}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Floating Selection Tooltip */}
      {tooltipPos && (
        <div
          style={{ top: tooltipPos.y, left: tooltipPos.x, transform: 'translateX(-50%)' }}
          className="fixed z-50 bg-[#002B49] text-white shadow-2xl rounded-lg px-2.5 sm:px-3 py-1.5 flex items-center gap-1.5 sm:gap-2 text-xs border border-white/20 animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            onClick={applyHighlight}
            className="flex items-center gap-1 hover:text-yellow-300 font-medium px-1 py-0.5 rounded hover:bg-white/10 transition"
          >
            <Highlighter className="w-3 h-3 text-yellow-300" />
            <span className="text-[11px]">Highlight</span>
          </button>
          <div className="w-px h-3.5 bg-white/20"></div>
          <button
            onClick={addNote}
            className="flex items-center gap-1 hover:text-amber-300 font-medium px-1 py-0.5 rounded hover:bg-white/10 transition"
          >
            <StickyNote className="w-3 h-3 text-amber-300" />
            <span className="text-[11px]">Note</span>
          </button>
          <div className="w-px h-3.5 bg-white/20"></div>
          <button
            onClick={openDictionaryForSelection}
            className="flex items-center gap-1 hover:text-blue-300 font-medium px-1 py-0.5 rounded hover:bg-white/10 transition"
          >
            <BookOpen className="w-3 h-3 text-blue-300" />
            <span className="text-[11px]">Define</span>
          </button>
        </div>
      )}

      {/* Instant Academic Dictionary Popover - Mobile Safe Bounds */}
      {activeDictionaryWord && activeDictData && (
        <div className="fixed bottom-16 sm:bottom-20 inset-x-3 sm:inset-x-auto sm:left-6 sm:max-w-sm w-auto sm:w-full z-50 bg-white text-gray-900 p-3.5 sm:p-4 rounded-xl shadow-2xl border-2 border-blue-600 animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between pb-2 border-b border-gray-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black text-[#002B49]">
                  {activeDictData.word}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded">
                  {activeDictData.pos}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                  {activeDictData.cefr}
                </span>
              </div>
              <span className="text-[11px] text-gray-500 font-medium">
                Topic: {activeDictData.topic}
              </span>
            </div>
            <button
              onClick={() => setActiveDictionaryWord(null)}
              className="text-gray-400 hover:text-gray-700 transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 space-y-1.5 text-xs">
            <p className="text-gray-800 leading-relaxed">
              <strong>Definition:</strong> {activeDictData.definition}
            </p>
            {activeDictData.synonyms.length > 0 && (
              <div>
                <strong className="text-blue-900">Band 8+ Synonyms:</strong>{' '}
                <span className="text-blue-700 italic">
                  {activeDictData.synonyms.join(', ')}
                </span>
              </div>
            )}
            <div className="p-2 bg-blue-50/60 rounded border border-blue-200 text-blue-950 italic">
              &quot;{activeDictData.ieltsExample}&quot;
            </div>
          </div>
        </div>
      )}

      {/* Title & Subtitle */}
      <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mb-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm italic text-gray-600 font-serif">
            {subtitle}
          </p>
        )}
      </div>

      {/* Main Passage Text */}
      <div className="space-y-4 sm:space-y-5 text-gray-800 leading-relaxed font-sans text-justify text-sm sm:text-base">
        {tokenizedParagraphs.map((paragraphWords, pIdx) => (
          <p key={pIdx} className="leading-relaxed">
            {paragraphWords.map((token) => {
              const isSpoken = activeWordIndex === token.id;
              return (
                <span
                  key={token.id}
                  ref={isSpoken ? activeWordSpanRef : null}
                  onClick={() => handleWordClick(token)}
                  className={`inline cursor-pointer transition-all duration-150 ${
                    isSpoken
                      ? 'bg-blue-600 text-white font-bold px-1 py-0.5 rounded shadow-md ring-2 ring-blue-400 scale-105'
                      : 'hover:bg-blue-50 hover:text-blue-900'
                  }`}
                  title="Click for dictionary definition"
                >
                  {token.word}{' '}
                </span>
              );
            })}
          </p>
        ))}
      </div>
    </div>
  );
}
