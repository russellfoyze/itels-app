# IELTS Master Online - Computer-Delivered Mock Testing & AI Scoring App

An authentic, production-ready **Computer-Delivered IELTS (CD-IELTS)** Mock Testing & Evaluation platform built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Google Gemini API**. Curated from materials on `practicepteonline.com` (IELTS Master).

## 🚀 Key Features

### 1. Authentic Computer-Delivered (CD-IELTS) Interface
- **Dual-Pane Resizable Split-Screen**: Read passages/charts on the left with draggable divider handle and answer questions on the right.
- **In-Text Yellow Highlighter & Sticky Notes**: Select text in the passage to highlight or add sticky notes.
- **Synchronized Read-Text (Text-to-Speech)**: Listen to passages with synchronized word-by-word tracking, adjustable voice speeds (0.75x, 1.0x, 1.25x, 1.5x), and British/American/Australian accents.
- **Instant Academic Dictionary Popover**: Double-click any word or click "Define" to view CEFR level, definitions, Band 8+ synonyms, and example sentences.
- **Question Navigation Dock (1 to 40)**: Numbered button palette with Answered, Unanswered, and Review Flag states.
- **Official Countdown Timer**: Real-time timer with 10-minute warning (amber) and 5-minute alert (flashing red).
- **Accessibility & Contrast Modes**: Standard, High Contrast (White on Black), and Yellow on Black, plus 3 font sizing levels.

### 2. Comprehensive Exam Modules
- **Academic Reading**: 3 authentic academic passages, 40 questions (T/F/NG, Y/N/NG, Matching Headings, Cloze, MCQs).
- **Listening**: 4 sections with embedded audio track, volume controls, and 40 questions.
- **Academic Writing**: Task 1 (visual chart/map descriptions) and Task 2 (discursive essays) with live word counter and underlength warnings.
- **Speaking**: Part 1 interview, Part 2 Makkar Cue Card with 1-min prep / 2-min speech countdowns, in-browser microphone waveform visualizer, and real-time speech-to-text transcript.

### 3. Scoring & Student Helper System
- **Objective Scoring**: Instant automated grading for Reading and Listening converted to the official Cambridge **9.0 Band Scale**.
- **Gemini AI Subjective Evaluation**: Writing and Speaking scored across the 4 official Cambridge criteria with sentence corrections, Band 8+ vocabulary upgrades, and Band 9 model answers.
- **IELTS Student Helper Hub**: Interactive Band Score Calculator, official exam strategies, Band 8+ topic vocabulary bank, and common grammar traps guide.
- **Official Test Report Form (TRF)**: Authentic score certificate with CEFR level and diagnostic question reviews.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/russellfoyze/itels-app.git
cd itels-app

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables (Optional)
To enable live Gemini AI evaluations, copy `.env.local.example` to `.env.local`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(The app also includes a built-in Cambridge diagnostic heuristic engine that scores submissions even without an API key).*
