import assert from 'assert';
import {
  normalizeAnswer,
  isAnswerCorrect,
  calculateReadingBand,
  calculateListeningBand,
  calculateOverallBand,
} from '../lib/scoring.ts';
import { readingTests } from '../data/readingTests.ts';
import { listeningTests } from '../data/listeningTests.ts';
import { writingTests } from '../data/writingTests.ts';
import { speakingTests } from '../data/speakingTests.ts';

console.log('🧪 RUNNING COMPREHENSIVE SQA AUTOMATED TEST SUITE...\n');

let passedTests = 0;
let totalTests = 0;

function test(description, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ PASS: ${description}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${description}`);
    console.error(err);
  }
}

// 1. Scoring & Normalization SQA Tests
test('Answer Normalization - Case and Punctuation Stripping', () => {
  assert.strictEqual(normalizeAnswer('  Tidal Power!  '), 'tidal power');
  assert.strictEqual(normalizeAnswer('State-Of-The-Art'), 'state of the art');
  assert.strictEqual(normalizeAnswer('A. Three hundred'), 'three hundred');
});

test('Answer Tolerance - Plural Variations e.g. forest(s)', () => {
  assert.strictEqual(isAnswerCorrect('forest', 'forest(s)'), true);
  assert.strictEqual(isAnswerCorrect('forests', 'forest(s)'), true);
  assert.strictEqual(isAnswerCorrect('desert', 'forest(s)'), false);
});

test('Answer Tolerance - True / False Shortcuts', () => {
  assert.strictEqual(isAnswerCorrect('TRUE', 'true'), true);
  assert.strictEqual(isAnswerCorrect('T', 'TRUE'), true);
  assert.strictEqual(isAnswerCorrect('f', 'FALSE'), true);
  assert.strictEqual(isAnswerCorrect('ng', 'NOT GIVEN'), true);
  assert.strictEqual(isAnswerCorrect('y', 'YES'), true);
});

test('Reading Band Calculation - Academic Scale', () => {
  assert.strictEqual(calculateReadingBand(40, true), 9.0);
  assert.strictEqual(calculateReadingBand(39, true), 9.0);
  assert.strictEqual(calculateReadingBand(35, true), 8.0);
  assert.strictEqual(calculateReadingBand(30, true), 7.0);
  assert.strictEqual(calculateReadingBand(23, true), 6.0);
  assert.strictEqual(calculateReadingBand(15, true), 5.0);
  assert.strictEqual(calculateReadingBand(0, true), 0.0);
});

test('Reading Band Calculation - General Training Scale', () => {
  assert.strictEqual(calculateReadingBand(40, false), 9.0);
  assert.strictEqual(calculateReadingBand(39, false), 8.5);
  assert.strictEqual(calculateReadingBand(34, false), 7.0);
  assert.strictEqual(calculateReadingBand(30, false), 6.0);
});

test('Listening Band Calculation - Official Scale', () => {
  assert.strictEqual(calculateListeningBand(40), 9.0);
  assert.strictEqual(calculateListeningBand(35), 8.0);
  assert.strictEqual(calculateListeningBand(30), 7.0);
  assert.strictEqual(calculateListeningBand(23), 6.0);
  assert.strictEqual(calculateListeningBand(16), 5.0);
});

test('Overall Band Calculation - Official Rounding Rules', () => {
  // Average 6.25 -> rounds up to 6.5
  assert.strictEqual(calculateOverallBand({ listening: 6.5, reading: 6.5, writing: 6.0, speaking: 6.0 }), 6.5);
  // Average 6.75 -> rounds up to 7.0
  assert.strictEqual(calculateOverallBand({ listening: 7.0, reading: 7.0, writing: 6.5, speaking: 6.5 }), 7.0);
  // Average 6.125 -> rounds down to 6.0
  assert.strictEqual(calculateOverallBand({ listening: 6.5, reading: 6.0, writing: 6.0, speaking: 6.0 }), 6.0);
  // Average 6.375 -> rounds up to 6.5
  assert.strictEqual(calculateOverallBand({ listening: 6.5, reading: 6.5, writing: 6.5, speaking: 6.0 }), 6.5);
});

// 2. Data Integrity SQA Tests
test('Reading Tests Catalog Integrity', () => {
  assert.ok(readingTests.length > 0, 'Must have at least 1 reading test');
  readingTests.forEach((t) => {
    assert.strictEqual(t.totalQuestions, 40, `Reading test ${t.id} must have 40 questions`);
    let qCount = 0;
    t.passages.forEach((p) => {
      assert.ok(p.content.length > 200, `Passage ${p.passageNumber} must have substantial text`);
      p.questions.forEach((q) => {
        assert.ok(q.prompt, `Question ${q.id} missing prompt`);
        assert.ok(q.correctAnswer, `Question ${q.id} missing correctAnswer`);
        qCount++;
      });
    });
    assert.strictEqual(qCount, 40, `Passages must contain exactly 40 questions total`);
  });
});

test('Listening Tests Catalog Integrity', () => {
  assert.ok(listeningTests.length > 0, 'Must have at least 1 listening test');
  listeningTests.forEach((t) => {
    assert.strictEqual(t.totalQuestions, 40, `Listening test ${t.id} must have 40 questions`);
    assert.ok(t.audioUrl, `Listening test ${t.id} must have valid audio stream URL`);
    let qCount = 0;
    t.sections.forEach((s) => {
      s.questions.forEach((q) => {
        assert.ok(q.prompt, `Listening question ${q.id} missing prompt`);
        assert.ok(q.correctAnswer, `Listening question ${q.id} missing correctAnswer`);
        qCount++;
      });
    });
    assert.strictEqual(qCount, 40, `Listening sections must contain exactly 40 questions total`);
  });
});

test('Writing Tests Catalog Integrity', () => {
  assert.ok(writingTests.length > 0, 'Must have at least 1 writing test');
  writingTests.forEach((t) => {
    assert.strictEqual(t.task1.minWords, 150, 'Task 1 must require min 150 words');
    assert.strictEqual(t.task2.minWords, 250, 'Task 2 must require min 250 words');
    assert.ok(t.task1.prompt, 'Task 1 must have prompt');
    assert.ok(t.task2.prompt, 'Task 2 must have prompt');
  });
});

test('Speaking Tests Catalog Integrity', () => {
  assert.ok(speakingTests.length > 0, 'Must have at least 1 speaking test');
  speakingTests.forEach((t) => {
    assert.ok(t.part1.questions.length >= 3, 'Part 1 must have at least 3 questions');
    assert.ok(t.part2.bulletPoints.length >= 3, 'Part 2 Cue card must have bullet points');
    assert.ok(t.part3.questions.length >= 3, 'Part 3 must have at least 3 discussion questions');
  });
});

console.log(`\n========================================`);
console.log(`📊 SQA RESULTS: ${passedTests} / ${totalTests} TESTS PASSED`);
console.log(`========================================\n`);

if (passedTests !== totalTests) {
  process.exit(1);
}
