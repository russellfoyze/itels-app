'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Volume2, Sparkles } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscriptReady: (transcript: string, durationSeconds: number) => void;
  prepSeconds?: number;
  speechSeconds?: number;
}

export function VoiceRecorder({
  onTranscriptReady,
  prepSeconds = 60,
  speechSeconds = 120,
}: VoiceRecorderProps) {
  const [prepTimeLeft, setPrepTimeLeft] = useState<number>(prepSeconds);
  const [isPrepping, setIsPrepping] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordDuration, setRecordDuration] = useState<number>(0);
  const [transcript, setTranscript] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = 'en-US';

        recog.onresult = (event: any) => {
          let full = '';
          for (let i = 0; i < event.results.length; i++) {
            full += event.results[i][0].transcript + ' ';
          }
          setTranscript(full.trim());
        };

        recognitionRef.current = recog;
      }
    }
  }, []);

  useEffect(() => {
    if (!isPrepping) return;
    const interval = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsPrepping(false);
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPrepping]);

  useEffect(() => {
    if (!isRecording) return;
    const interval = setInterval(() => {
      setRecordDuration((prev) => {
        if (prev >= speechSeconds) {
          stopRecording();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecording, speechSeconds]);

  const startPrep = () => {
    setPrepTimeLeft(prepSeconds);
    setIsPrepping(true);
  };

  const startRecording = async () => {
    try {
      setIsPrepping(false);
      audioChunksRef.current = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (canvas) {
        // Adjust canvas width to container width
        canvas.width = canvas.parentElement?.clientWidth || 320;
        const ctx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
          animationFrameRef.current = requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 1.5;
            let x = 0;
            for (let i = 0; i < bufferLength; i++) {
              const barHeight = (dataArray[i] / 255) * canvas.height;
              ctx.fillStyle = `rgb(37, 99, 235)`;
              ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
              x += barWidth + 2;
            }
          }
        };
        draw();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        if (audioContextRef.current) audioContextRef.current.close();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };

      mediaRecorder.start(250);
      setIsRecording(true);
      setRecordDuration(0);

      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access is required to record your speaking response. You can also type or paste your speech transcript manually.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  const handleSubmit = () => {
    if (!transcript.trim()) {
      alert('Please speak or type your speech transcript before scoring.');
      return;
    }
    onTranscriptReady(transcript, recordDuration || 60);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3.5 sm:p-5 shadow-sm space-y-4">
      {/* Timer & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          {isPrepping ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-xs sm:text-sm font-bold text-amber-700">
                1-Min Prep: {prepTimeLeft}s
              </span>
            </div>
          ) : isRecording ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold text-red-600">
                Recording: {recordDuration}s / {speechSeconds}s
              </span>
            </div>
          ) : (
            <div className="text-xs sm:text-sm font-medium text-gray-700">
              Mic Status: Ready
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isPrepping && !isRecording && (
            <button
              onClick={startPrep}
              className="px-2.5 sm:px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-md shadow-xs transition"
            >
              1-Min Prep
            </button>
          )}

          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-3 sm:px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition flex items-center gap-1"
            >
              <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Record</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-3 sm:px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md shadow-xs transition flex items-center gap-1"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Done</span>
            </button>
          )}
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="h-12 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden p-1 w-full">
        <canvas ref={canvasRef} height={48} className="w-full h-full"></canvas>
      </div>

      {/* Audio Playback */}
      {audioUrl && (
        <div className="flex items-center gap-2.5 p-2.5 bg-blue-50/50 rounded-lg border border-blue-200">
          <Volume2 className="w-4 h-4 text-blue-600 shrink-0" />
          <audio controls src={audioUrl} className="w-full h-8" />
        </div>
      )}

      {/* Transcript Textarea */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            Speech Transcript
          </label>
          <span className="text-[11px] text-gray-500">
            {transcript.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
        <textarea
          rows={4}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Speak into microphone or type/paste your speech transcript..."
          className="w-full p-3 text-xs sm:text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      </div>

      {/* Submit Evaluation */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#002B49] hover:bg-[#003860] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Score My Speaking With AI</span>
        </button>
      </div>
    </div>
  );
}
