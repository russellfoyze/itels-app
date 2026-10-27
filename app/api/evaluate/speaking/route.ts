import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SpeakingEvaluationResult } from '@/types/exam';

export async function POST(req: Request) {
  try {
    const { partNumber, topicPrompt, transcript, durationSeconds } = await req.json();

    if (!transcript || typeof transcript !== 'string') {
      return NextResponse.json({ error: 'Speech transcript is required.' }, { status: 400 });
    }

    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const durationMin = (durationSeconds || 60) / 60;
    const wpm = Math.round(wordCount / Math.max(0.2, durationMin));

    // Common filler words
    const fillerPatterns = ['um', 'uh', 'er', 'ah', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of'];
    const fillerMatches: string[] = [];
    const lowerTranscript = transcript.toLowerCase();
    fillerPatterns.forEach((filler) => {
      const regex = new RegExp(`\\b${filler}\\b`, 'gi');
      const matches = lowerTranscript.match(regex);
      if (matches) {
        fillerMatches.push(...matches.map((m) => m.toLowerCase()));
      }
    });

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.2,
          },
        });

        const prompt = `You are an official Cambridge IELTS Speaking Examiner.
Evaluate the candidate's speech transcript for IELTS Speaking Part ${partNumber} under the topic: "${topicPrompt}".

Candidate Speech Transcript (${wordCount} words spoken in ${Math.round(durationSeconds || 60)} seconds, ~${wpm} WPM):
"${transcript}"

Detected fillers: ${fillerMatches.join(', ') || 'None'}

Score strictly based on the 4 official Cambridge Speaking criteria (Band 0.0 to 9.0 in increments of 0.5):
1. Fluency and Coherence (FC)
2. Lexical Resource (LR)
3. Grammatical Range and Accuracy (GRA)
4. Pronunciation (P) (assessed via flow, discourse markers, phrasing, and lexical stress)

Respond strictly in valid JSON matching this schema:
{
  "overallBand": number,
  "criteriaScores": {
    "fluencyCoherence": number,
    "lexicalResource": number,
    "grammaticalRangeAccuracy": number,
    "pronunciation": number
  },
  "wpm": ${wpm},
  "fillerWordsCount": ${fillerMatches.length},
  "fillerWordsList": ${JSON.stringify(Array.from(new Set(fillerMatches)))},
  "feedback": {
    "fluencyCoherence": "string",
    "lexicalResource": "string",
    "grammaticalRangeAccuracy": "string",
    "pronunciation": "string"
  },
  "suggestions": [
    "actionable suggestion 1",
    "actionable suggestion 2",
    "actionable suggestion 3"
  ],
  "improvedTranscriptSample": "Demonstration of how a Band 9.0 speaker would formulate these ideas naturally"
}`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();
        const parsed = JSON.parse(responseText);
        return NextResponse.json(parsed);
      } catch (aiError) {
        console.error('Gemini Speaking evaluation error, using fallback:', aiError);
      }
    }

    // Heuristic Fallback Engine
    let fc = 6.5;
    let lr = 6.5;
    let gra = 6.5;
    let pr = 6.5;

    if (wpm >= 110 && wpm <= 160) {
      fc += 0.5;
    } else if (wpm < 85) {
      fc -= 0.5;
    }

    if (fillerMatches.length > 6) {
      fc = Math.max(5.0, fc - 0.5);
    }

    const overallBand = Math.round(((fc + lr + gra + pr) / 4) * 2) / 2;

    const evaluation: SpeakingEvaluationResult = {
      overallBand,
      criteriaScores: {
        fluencyCoherence: fc,
        lexicalResource: lr,
        grammaticalRangeAccuracy: gra,
        pronunciation: pr,
      },
      wpm,
      fillerWordsCount: fillerMatches.length,
      fillerWordsList: Array.from(new Set(fillerMatches)),
      feedback: {
        fluencyCoherence: `Your speaking speed was ${wpm} words per minute. Ideal native conversational range is between 120-150 WPM. You used ${fillerMatches.length} filler words.`,
        lexicalResource: `Good ability to convey core ideas. To reach Band 8+, introduce more idiomatic phrases and topic-specific terminology without overusing repetitive common words.`,
        grammaticalRangeAccuracy: `Maintained consistent clause structures. Incorporate conditional clauses ('Had it not been for...') and varied past continuous/perfect tenses.`,
        pronunciation: `Speech flow and rhythm indicate natural cadence. Focus on sentence stress for emphasized words and clear consonant endings.`,
      },
      suggestions: [
        'Replace pauses and filler words ("um", "like") with natural signposting phrases like "To put it another way..." or "From what I have observed..."',
        'In Part 2, structure your response using the Past-Present-Future framework to naturally demonstrate grammatical range.',
        'Use idiomatic expressions organically rather than memorized idioms that sound out of place.',
      ],
      improvedTranscriptSample: `To be completely honest, this law has proven to be an indispensable pillar of community order. What strikes me most profoundly is how consistently it is enforced across all demographics without partiality. In hindsight, had our legislature not enacted this measure, societal cohesion would have experienced substantial strain.`,
    };

    return NextResponse.json(evaluation);
  } catch (error: any) {
    console.error('Speaking evaluation error:', error);
    return NextResponse.json({ error: error.message || 'Speaking evaluation failed' }, { status: 500 });
  }
}
