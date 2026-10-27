# MASTER PROMPT FOR GEMINI 3.8: BUILD A FULL-SCALE COMPUTER-DELIVERED IELTS MOCK TEST & AI SCORING WEB APP (NEXT.JS)

> **Instructions for Gemini 3.8**:
> Act as an elite Principal Full-Stack Engineer, EdTech Architect, and Cambridge IELTS Assessment Specialist.
> Your task is to build a production-ready, feature-complete, highly authentic **Computer-Delivered IELTS (CD-IELTS) Mock Testing & Scoring Web Application** using **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Gemini API**.
>
> The application replicates the official computer-delivered test environment (matching IDP / British Council CD-IELTS) and integrates the rich question materials, tests, and feedback rubrics scraped from **`https://practicepteonline.com/` (IELTS MASTER)**.

---

## 1. APPLICATION VISION & CORE CAPABILITIES

The application, named **IELTS Master Online**, is an authentic simulation of the official Computer-Delivered IELTS examination. It enables students worldwide to:
1. **Take Full Authentic Mock Tests** under strict official conditions (Listening 30m + Reading 60m + Writing 60m + Speaking ~14m).
2. **Take Sectional Practice Tests** across any specific skill (Listening, Academic Reading, General Training Reading, Writing Task 1, Writing Task 2, Speaking Part 1/2/3).
3. **Experience True CD-IELTS Exam UI**: Split-screen reading/questions, highlight text tool, sticky notes, bottom question navigation bar (1-40) with answered/flagged indicators, countdown timer with 10m/5m warnings, font size and high-contrast color scheme switchers.
4. **Get Instant Objective Scoring** for Listening and Reading (40 questions graded automatically against official answer keys with tolerance for singular/plural, digits/words, and case insensitivity) converted to the official **IELTS 9-Band Scale**.
5. **Get Real-time AI Subjective Scoring** powered by **Gemini 3.8**:
   - **Writing Evaluation**: Instant Band 0.0 - 9.0 assessment based on official Cambridge criteria: Task Achievement / Response (TR), Coherence & Cohesion (CC), Lexical Resource (LR), Grammatical Range & Accuracy (GRA), with paragraph-by-paragraph feedback, sentence-level error corrections, Band 8+ vocabulary suggestions, and an improved benchmark rewrite.
   - **Speaking Evaluation**: Candidate speech recorded in-browser with live audio waveform, transcribed via Speech-to-Text, and graded by Gemini across Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation, tracking speech rate (WPM) and filler words.
6. **Official Test Report Form (TRF)**: Downloadable/printable scorecard with Overall Band (calculated with official IELTS rounding rules) and individual skill breakdown.

---

## 2. MATERIAL REPOSITORY & TAXONOMY (SCRAPED FROM PRACTICEPTEONLINE.COM)

The system incorporates the complete curriculum and test structures from `practicepteonline.com`:

### 2.1 Test Catalog Inventory
| Module | Total Tests | Description & Structure |
| :--- | :--- | :--- |
| **IELTS Listening** | **208+ Tests** | 4 Sections, 40 questions per test. Audio stream (MP3/YouTube embed), Cloze forms, Table/Note completion, MCQs, Map labelling, Matching (A-H). Full answer keys included. |
| **IELTS Academic Reading** | **319+ Tests** | 3 Academic Passages (2,000–2,750 words total), 40 questions per test. T/F/NG, Y/N/NG, Matching Headings, Summary completion with/without word box, Diagram/Table completion. |
| **IELTS General Training Reading** | **122+ Tests** | 3 Sections: Section 1 (Social Survival - Notices/Ads), Section 2 (Workplace Survival - Job contracts/Training), Section 3 (General Reading - Extended text). 40 questions. |
| **IELTS Academic Writing** | **132+ Tests** | Task 1: Visual data descriptions (Bar charts, Line graphs, Pie charts, Tables, Process diagrams, Before/After Maps) - Min 150 words. Task 2: Opinion/Discussion/Advantage-Disadvantage/Problem-Solution essays - Min 250 words. |
| **IELTS GT Writing** | **50+ Tests** | Task 1: Formal, Semi-formal, and Informal letters (Complaints, Requests, Invitations, Inquiries). Task 2: Standard essays. |
| **Makkar Speaking Cue Cards** | **201+ Cards** | Part 1: Intro questions. Part 2: Latest Makkar Cue Card prompt with bullet points + 1 min prep countdown + 2 min speech. Part 3: Deep thematic follow-up questions. |
| **Official Cambridge IELTS** | **Books 1 to 21** | Complete authentic past exam papers from Cambridge IELTS 1 through Cambridge IELTS 21. |

---

## 3. COMPUTER-DELIVERED IELTS (CD-IELTS) UI/UX SPECIFICATIONS

Gemini, implement the UI with exact pixel-fidelity to the British Council & IDP CD-IELTS interface:

### 3.1 Layout Architecture
- **Header Bar (Sticky)**:
  - Left: Candidate Name (`John Doe - Candidate #104928`), Test Module Title (`IELTS Academic Reading - Test 1`).
  - Center: Countdown Timer (`00:59:45`) with `Hide / Show` toggle.
    - Turns Amber when $\le 10:00$.
    - Flashes Red with soft alert when $\le 05:00$.
    - Auto-submits when timer reaches `00:00`.
  - Right:
    - Audio Volume Slider (Listening test).
    - Accessibility Settings Modal (Font Size: Standard, Large, Extra Large; Color Schemes: Standard Black on White, High Contrast White on Black, Yellow on Black).
    - Help Modal (Official candidate instructions).

- **Split-Screen Workspace (Resizable)**:
  - Left Pane (50% default width, draggable divider):
    - Reading: Passage text formatted with clear paragraph labels (A, B, C, D...).
    - Listening: Audio player status, section intro text, reference diagrams.
    - Writing: Task prompt, instructions, charts/diagrams images.
    - Speaking: Cue card card with bullet points and live audio visualizer.
  - Right Pane (50% default width):
    - Interactive questions rendered according to type.

- **In-Text Highlight & Note-Taking Utility**:
  - Selecting any text in the left passage renders a floating action tooltip:
    - `Highlight`: Wraps selected text in `<mark class="bg-yellow-200 text-black">`.
    - `Note`: Adds an inline sticky note icon. Clicking opens an expandable note textarea.
    - `Clear`: Removes highlight/note from the active selection.

- **Bottom Navigation Dock (Sticky)**:
  - Left: Passage/Part Tabs (`Passage 1 (Q 1-13)`, `Passage 2 (Q 14-26)`, `Passage 3 (Q 27-40)`).
  - Center: Scrollable button palette (`1` to `40`):
    - `Unattempted`: Standard grey button with border.
    - `Attempted`: Solid dark navy background with bold white text (or underlined badge).
    - `Flagged for Review`: Small circular blue/amber dot badge in upper-right corner.
  - Right:
    - `Review` Checkbox: Flags the currently selected question.
    - `Back` ($\leftarrow$) and `Next` ($\rightarrow$) Navigation Buttons.
    - Keyboard Navigation: Left/Right arrow keys navigate questions; `Tab` jumps between inputs.
    - `Finish Test` Button: Triggers confirmation modal displaying unattempted questions count before final scoring.

---

## 4. QUESTION TYPES & INTERACTION TAXONOMY

Support all IELTS question types with reactive validation:

1. **Fill-in-the-Blank (Cloze / Note / Table / Flowchart Completion)**:
   - Inline `<input type="text" />` placed directly inside sentence flow or table cells.
   - Word count constraint enforced (e.g. `NO MORE THAN TWO WORDS AND/OR A NUMBER`).
2. **True / False / Not Given & Yes / No / Not Given**:
   - Radio pill buttons (`TRUE`, `FALSE`, `NOT GIVEN` or `YES`, `NO`, `NOT GIVEN`) with instant keyboard hotkeys (`T`, `F`, `N` / `Y`, `N`, `NG`).
3. **Multiple Choice (Single Answer)**:
   - Radio button group with options (A, B, C, D).
4. **Multiple Choice (Multiple Answers)**:
   - Checkbox group (e.g. "Choose TWO letters, A-E") with auto-disable when max selection is reached.
5. **Matching Headings**:
   - Dropdown select `(i, ii, iii, iv, v, vi, vii, viii, ix, x)` for each paragraph (A, B, C...).
6. **Matching Features / Names (A-G to Statements)**:
   - Compact radio matrix or letter selection buttons.
7. **Summary Completion with Word Box**:
   - Click-to-place or Drag-and-Drop tokens from word box into numbered blank slots.
8. **Writing Task 1 & Task 2 Textarea**:
   - Split view with rich textarea, live word counter indicator:
     - Task 1: warns if $< 150$ words.
     - Task 2: warns if $< 250$ words.
9. **Speaking Voice Recorder**:
   - Browser `MediaRecorder` API recording with real-time waveform visualizer using Web Audio API `AnalyserNode`.
   - Countdown timer for 1-minute prep time followed by 2-minute recording limit.

---

## 5. SCORING & EVALUATION ENGINE ARCHITECTURE

### 5.1 Objective Scoring Engine (Listening & Reading)
Grades responses against official answer keys:
- **Normalization Rules**:
  - Case insensitive: `"Tidal Power" === "tidal power"`.
  - Punctuation stripped: `"state-of-the-art" === "state of the art"`.
  - Optional plural handling: `"forest(s)"` matches both `"forest"` and `"forests"`.
  - Numeric equivalences: `"15"` matches `"fifteen"`, `"$300"` matches `"300 dollars"`.
- **Band Score Conversion Algorithm**:
```typescript
export function calculateReadingBand(rawScore: number, isAcademic: boolean = true): number {
  if (isAcademic) {
    if (rawScore >= 39) return 9.0;
    if (rawScore >= 37) return 8.5;
    if (rawScore >= 35) return 8.0;
    if (rawScore >= 33) return 7.5;
    if (rawScore >= 30) return 7.0;
    if (rawScore >= 27) return 6.5;
    if (rawScore >= 23) return 6.0;
    if (rawScore >= 19) return 5.5;
    if (rawScore >= 15) return 5.0;
    if (rawScore >= 13) return 4.5;
    if (rawScore >= 10) return 4.0;
    if (rawScore >= 8)  return 3.5;
    if (rawScore >= 6)  return 3.0;
    if (rawScore >= 4)  return 2.5;
    return 0.0;
  } else {
    // General Training Reading
    if (rawScore === 40) return 9.0;
    if (rawScore === 39) return 8.5;
    if (rawScore >= 37) return 8.0;
    if (rawScore === 36) return 7.5;
    if (rawScore >= 34) return 7.0;
    if (rawScore >= 32) return 6.5;
    if (rawScore >= 30) return 6.0;
    if (rawScore >= 27) return 5.5;
    if (rawScore >= 23) return 5.0;
    if (rawScore >= 19) return 4.5;
    if (rawScore >= 15) return 4.0;
    return 0.0;
  }
}

export function calculateListeningBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 32) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 26) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 18) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 8)  return 3.5;
  if (rawScore >= 6)  return 3.0;
  return 0.0;
}

export function calculateOverallBand(l: number, r: number, w: number, s: number): number {
  const avg = (l + r + w + s) / 4;
  const decimal = avg - Math.floor(avg);
  if (decimal < 0.25) return Math.floor(avg);
  if (decimal < 0.75) return Math.floor(avg) + 0.5;
  return Math.ceil(avg);
}
```

### 5.2 Gemini 3.8 AI Evaluation Engine (Writing Module)
Evaluates candidate essay or report against Cambridge IELTS Descriptors.

**System Prompt for Gemini Evaluation API Route (`/api/evaluate/writing`)**:
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { taskType, taskPrompt, candidateSubmission } = await req.json();

  const systemInstruction = `You are a Senior Cambridge IELTS Examiner assessing an Academic / General Writing submission.
Score strictly according to the Official IELTS Writing Band Descriptors (Band 0 to 9.0 in increments of 0.5).
Criteria:
1. Task Achievement (Task 1) or Task Response (Task 2)
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy

Evaluate the candidate's work and return strict JSON in the following schema:
{
  "overall_band": number,
  "criteria_scores": {
    "task_achievement_or_response": number,
    "coherence_cohesion": number,
    "lexical_resource": number,
    "grammatical_range_accuracy": number
  },
  "word_count": number,
  "underlength_penalty_applied": boolean,
  "detailed_feedback": {
    "task_achievement_or_response": string,
    "coherence_cohesion": string,
    "lexical_resource": string,
    "grammatical_range_accuracy": string
  },
  "sentence_corrections": [
    {
      "original": string,
      "correction": string,
      "explanation": string
    }
  ],
  "vocabulary_enhancements": [
    {
      "original_phrase": string,
      "recommended_band9_alternatives": string[],
      "contextual_example": string
    }
  ],
  "band9_model_answer": string
}`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash', // Or gemini-3.8-flash
    contents: [
      { role: 'user', parts: [{ text: `Task Type: ${taskType}\nTask Prompt: ${taskPrompt}\n\nCandidate Submission:\n${candidateSubmission}` }] }
    ],
    config: {
      systemInstruction,
      responseMimeType: 'application/json',
      temperature: 0.2
    }
  });

  return new Response(response.text(), { headers: { 'Content-Type': 'application/json' } });
}
```

### 5.3 Gemini 3.8 AI Evaluation Engine (Speaking Module)
Evaluates speech transcripts or audio recordings against Cambridge Speaking Descriptors:
- **Fluency and Coherence**: Speech rate (WPM), speech continuity, connective usage, hesitation analysis.
- **Lexical Resource**: Idiomatic vocabulary, topical collocations, paraphrasing ability.
- **Grammatical Range and Accuracy**: Complex clause structures, tense accuracy.
- **Pronunciation / Delivery**: Intonation, syllable stress notes based on phonetic transcription.

---

## 6. COMPLETE SEEDED DATASET (AUTHENTIC FROM PRACTICEPTEONLINE.COM)

Provide pre-packaged seed datasets for the initial mock tests so the application runs immediately without external database dependencies:

### 6.1 Seed Test 1: Academic Reading ("Tidal Power" & "Information Theory")
```typescript
export const SEED_ACADEMIC_READING_TEST_1 = {
  id: "ielts-reading-test-1",
  title: "IELTS Academic Reading Test 1",
  passages: [
    {
      passageNumber: 1,
      title: "Tidal Power",
      content: `Undersea turbines which produce electricity from the tides are set to become an important source of renewable energy for Britain. It is still too early to predict the extent of the impact they may have, but all the signs are that they may play a significant role in the future.

Operating on the same principle as wind turbines, the underwater engines consist of a tower fixed to the sea bed with two or three blades rotating at the top. The motion of the tides forces the blades to rotate, which drives a generator to produce electricity. Unlike wind turbines, tidal turbines operate underwater, where the density of water is roughly 800 times greater than air. This means that a much smaller turbine can produce the same power as a huge windmill.

Tidal power has several key advantages over other renewable resources. First, it is completely predictable. Tides can be calculated years in advance, unlike wind or solar radiation. Second, undersea turbines cause minimal visual pollution since they are submerged out of sight. Furthermore, environmentalists believe they are much safer for marine wildlife than underwater barrages, which can disrupt delicate coastal ecosystems.`,
      questions: [
        {
          id: 1,
          type: "TRUE_FALSE_NOT_GIVEN",
          prompt: "Undersea turbines are already generating most of Britain's electricity.",
          correctAnswer: "FALSE",
          explanation: "The text says they 'are set to become an important source', not that they already generate most."
        },
        {
          id: 2,
          type: "TRUE_FALSE_NOT_GIVEN",
          prompt: "Water is significantly denser than air.",
          correctAnswer: "TRUE",
          explanation: "The text states 'the density of water is roughly 800 times greater than air'."
        },
        {
          id: 3,
          type: "TRUE_FALSE_NOT_GIVEN",
          prompt: "Underwater barrages are considered more environmentally friendly than tidal turbines.",
          correctAnswer: "FALSE",
          explanation: "The text states that tidal turbines are 'much safer for marine wildlife than underwater barrages'."
        },
        {
          id: 4,
          type: "FILL_IN_BLANK",
          prompt: "Unlike wind power, the occurrence of tides is completely ________.",
          correctAnswer: "predictable",
          explanation: "Paragraph 3: 'First, it is completely predictable.'"
        }
      ]
    }
  ]
};
```

### 6.2 Seed Test 1: Listening Test (Audio + Form Completion)
```typescript
export const SEED_LISTENING_TEST_1 = {
  id: "ielts-listening-test-1",
  title: "IELTS Listening Practice Test 1",
  audioUrl: "https://practicepteonline.com/wp-content/uploads/audio/1_we.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Section 1: Holiday Accommodation Booking",
      instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
      questions: [
        { id: 1, prompt: "Distance from beach: ________ meters", correctAnswer: "300" },
        { id: 2, prompt: "Must bring own: ________", correctAnswer: "sunshade" },
        { id: 3, prompt: "Apartment has a private: ________", correctAnswer: "balcony" },
        { id: 4, prompt: "Surrounded by ancient: ________", correctAnswer: "forest(s)" },
        { id: 5, prompt: "Room number allocated: ________", correctAnswer: "319" }
      ]
    }
  ]
};
```

### 6.3 Seed Test 1: Academic Writing (Hospital Road Maps + Language Barriers)
```typescript
export const SEED_WRITING_TEST_1 = {
  id: "ielts-writing-test-1",
  task1: {
    title: "Academic Writing Task 1",
    imageUrl: "https://practicepteonline.com/wp-content/uploads/2024/09/test-1-min-1.png",
    prompt: "The two maps below show road access to a city hospital in 2007 and 2010. Summarize the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
    minWords: 150,
    timeMinutes: 20
  },
  task2: {
    title: "Writing Task 2 Essay",
    prompt: "Living in a country where you have to speak a foreign language can cause serious social problems, as well as practical problems. To what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
    minWords: 250,
    timeMinutes: 40
  }
};
```

### 6.4 Seed Test 1: Makkar Speaking Cue Card
```typescript
export const SEED_SPEAKING_CUE_CARD_1 = {
  id: "makkar-speaking-1",
  part1: [
    "What is your full name?",
    "Do you work or are you a student?",
    "Do you like your hometown? Why or why not?"
  ],
  part2: {
    title: "Describe a good law in your country",
    cueCard: `You should say:
• What the law is
• How you first learned about it
• Who it affects
And explain why you think this is a good law.`
  },
  part3: [
    "Why do you think laws are necessary in society?",
    "Should police officers be strict or lenient when enforcing minor traffic laws?",
    "Do people generally obey laws more today than in the past?"
  ]
};
```

---

## 7. PROJECT DIRECTORY & IMPLEMENTATION MAP

Build the project adhering to standard Next.js App Router best practices:

```
├── app/
│   ├── layout.tsx                     # Root layout with font, theme provider, and analytics
│   ├── page.tsx                       # Landing page with test catalog & quick-start CTA
│   ├── test/
│   │   ├── full-mock/                 # Full back-to-back 4-skill exam simulator
│   │   ├── listening/[id]/page.tsx    # Dedicated CD-IELTS Listening test engine
│   │   ├── reading/[id]/page.tsx      # Dedicated CD-IELTS Reading test engine
│   │   ├── writing/[id]/page.tsx      # Dedicated CD-IELTS Writing editor & evaluator
│   │   └── speaking/[id]/page.tsx     # Dedicated CD-IELTS Speaking audio recorder
│   ├── results/[testId]/page.tsx      # Score report, TRF card, and deep analytics
│   └── api/
│       ├── evaluate/
│       │   ├── writing/route.ts       # Gemini API Writing Evaluation
│       │   └── speaking/route.ts      # Gemini API Speaking Evaluation
│       └── tests/route.ts             # Test fetch & pagination API
├── components/
│   ├── exam/
│   │   ├── HeaderBar.tsx              # Candidate details, countdown timer, settings
│   │   ├── SplitPane.tsx              # Resizable left/right dual-view workspace
│   │   ├── PassageViewer.tsx          # Text viewer with highlight & sticky note tools
│   │   ├── QuestionPalette.tsx        # Numbered bottom bar (1-40) with states
│   │   ├── QuestionTypes/
│   │   │   ├── ClozeInput.tsx         # Inline text completion
│   │   │   ├── TrueFalseRadio.tsx     # T/F/NG pill buttons
│   │   │   ├── MultipleChoice.tsx     # Single & Multi MCQs
│   │   │   └── MatchingHeadings.tsx   # Headings dropdown/drag
│   │   ├── AudioPlayer.tsx            # Non-pausable exam audio stream
│   │   └── VoiceRecorder.tsx          # Web Audio recorder with visualizer
│   ├── settings/
│   │   └── ExamSettingsModal.tsx      # High-contrast colors & font sizing
│   └── trf/
│       └── TestReportForm.tsx         # Official Cambridge TRF scorecard
├── stores/
│   └── useExamStore.ts                # Zustand store managing answers, flags, timer, state
├── lib/
│   ├── scoring.ts                     # Band calculation formulas & answer key matcher
│   ├── audio.ts                       # Audio recorder & waveform processing
│   └── seed-data/                     # Scraped practicepteonline test datasets
└── types/
    └── exam.ts                        # TypeScript interfaces for tests, questions, scores
```

---

## 8. STEP-BY-STEP GENERATION INSTRUCTIONS

When asked to generate the app:
1. **Initialize Next.js with Tailwind CSS & Lucide Icons**.
2. **Implement Zustand State Store (`useExamStore.ts`)** to manage candidate inputs, flags, current active question, countdown timer, font size, and color themes with automatic `localStorage` recovery.
3. **Build the CD-IELTS Layout**: Implement the `SplitPane` with draggable divider, `PassageViewer` with text highlighting and sticky note popups, and the `QuestionPalette` bottom toolbar.
4. **Build the Deterministic Scoring Utility (`scoring.ts`)** with tolerant regex matching for Listening and Reading.
5. **Implement the Gemini 3.8 Evaluator API Routes** for Writing and Speaking returning structured JSON.
6. **Provide the Seed Test Datasets** so the user can test the app immediately out of the box.

*Ensure all code is written in clean, modern, fully typed TypeScript with no placeholders or missing imports.*
