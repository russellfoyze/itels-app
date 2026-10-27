'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Square, RefreshCw, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const [isSpeechRecognitionSupported, setIsSpeechRecognitionSupported] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setIsSpeechRecognitionSupported(true);
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

  // Prep timer countdown
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

  // Recording duration timer
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

      // Visualizer
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const canvas = canvasRef.current;
      if (canvas) {
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

      // MediaRecorder
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

      // Start speech recognition
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
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-5">
      {/* Timer & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          {isPrepping ? (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping"></span>
              <span className="text-sm font-bold text-amber-700">
                1-Minute Preparation Time: {prepTimeLeft}s
              </span>
            </div>
          ) : isRecording ? (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></span>
              <span className="text-sm font-bold text-red-600">
                Recording Candidate Response: {recordDuration}s / {speechSeconds}s
              </span>
            </div>
          ) : (
            <div className="text-sm font-medium text-gray-700">
              Microphone status: Ready
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isPrepping && !isRecording && (
            <button
              onClick={startPrep}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-md shadow-xs transition"
            >
              Start 1-Min Prep
            </button>
          )}

          {!isRecording ? (
            <button
              onClick={startRecording}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition flex items-center gap-1.5"
            >
              <Mic className="w-4 h-4" />
              <span>Start Speaking</span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-md shadow-xs transition flex items-center gap-1.5"
            >
              <Square className="w-4 h-4" />
              <span>Finish Speaking</span>
            </button>
          )}
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="h-14 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden p-1">
        <canvas ref={canvasRef} width={400} height={50} className="w-full h-full"></canvas>
      </div>

      {/* Audio Playback if recorded */}
      {audioUrl && (
        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-lg border border-blue-200">
          <Volume2 className="w-5 h-5 text-blue-600 shrink-0" />
          <audio controls src={audioUrl} className="w-full h-8" />
        </div>
      )}

      {/* Real-time / Editable Speech Transcript */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Candidate Speech Transcript (Auto-Generated & Editable)
          </label>
          <span className="text-xs text-gray-500">
            {transcript.trim().split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
        <textarea
          rows={5}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Speak into your microphone to record speech, or type/paste candidate speaking response here..."
          className="w-full p-3 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
        />
      </div>

      {/* Submit Evaluation */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-[#002B49] hover:bg-[#003860] text-white text-sm font-semibold rounded-lg shadow-md transition flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Score My Speaking With Gemini AI</span>
        </button>
      </div>
    </div>
  );
}
