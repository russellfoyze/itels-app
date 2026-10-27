export function normalizeAnswer(ans: string): string {
  if (!ans) return '';
  return ans
    .toLowerCase()
    .trim()
    .replace(/^[a-z]\.\s*/i, '') // remove "A. " prefixes if present
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '') // remove punctuation
    .replace(/\s+/g, ' '); // collapse whitespace
}

export function isAnswerCorrect(userAns: string | string[] | undefined, correctAns: string | string[]): boolean {
  if (!userAns) return false;

  // Single choice or string answer
  if (typeof userAns === 'string') {
    const userNorm = normalizeAnswer(userAns);
    if (!userNorm) return false;

    // Correct answer can be array of acceptable answers
    const acceptable = Array.isArray(correctAns) ? correctAns : [correctAns];

    return acceptable.some((target) => {
      // Split target alternatives like "forest / forests" or "forest(s)"
      const cleanTarget = target.toLowerCase();
      // Handle parentheses like "forest(s)" -> matches "forest" or "forests"
      if (cleanTarget.includes('(') && cleanTarget.includes(')')) {
        const withoutParen = cleanTarget.replace(/\(|\)/g, '');
        const withBase = cleanTarget.replace(/\([^)]*\)/g, '');
        if (normalizeAnswer(withoutParen) === userNorm || normalizeAnswer(withBase) === userNorm) {
          return true;
        }
      }

      // Handle slash alternatives like "300 / three hundred"
      const slashParts = cleanTarget.split('/').map((s) => normalizeAnswer(s));
      if (slashParts.includes(userNorm)) {
        return true;
      }

      // Direct normalized match
      if (normalizeAnswer(target) === userNorm) {
        return true;
      }

      // True/False/Not Given shortcuts
      if (userNorm === 't' && normalizeAnswer(target) === 'true') return true;
      if (userNorm === 'f' && normalizeAnswer(target) === 'false') return true;
      if (userNorm === 'ng' && normalizeAnswer(target) === 'not given') return true;
      if (userNorm === 'y' && normalizeAnswer(target) === 'yes') return true;
      if (userNorm === 'n' && normalizeAnswer(target) === 'no') return true;

      return false;
    });
  }

  // Multi-choice array
  if (Array.isArray(userAns)) {
    const acceptable = Array.isArray(correctAns) ? correctAns : [correctAns];
    const userSorted = userAns.map(normalizeAnswer).sort();
    const correctSorted = acceptable.map(normalizeAnswer).sort();
    return JSON.stringify(userSorted) === JSON.stringify(correctSorted);
  }

  return false;
}

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
    if (rawScore >= 8) return 3.5;
    if (rawScore >= 6) return 3.0;
    if (rawScore >= 4) return 2.5;
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
    if (rawScore >= 12) return 3.5;
    if (rawScore >= 9) return 3.0;
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
  if (rawScore >= 8) return 3.5;
  if (rawScore >= 6) return 3.0;
  if (rawScore >= 4) return 2.5;
  return 0.0;
}

export function calculateOverallBand(scores: { listening?: number; reading?: number; writing?: number; speaking?: number }): number {
  const presentScores = [scores.listening, scores.reading, scores.writing, scores.speaking].filter(
    (s): s is number => typeof s === 'number' && s > 0
  );

  if (presentScores.length === 0) return 0;

  const avg = presentScores.reduce((a, b) => a + b, 0) / presentScores.length;
  const decimal = avg - Math.floor(avg);

  if (decimal < 0.25) {
    return Math.floor(avg);
  } else if (decimal < 0.75) {
    return Math.floor(avg) + 0.5;
  } else {
    return Math.ceil(avg);
  }
}

export function getBandDescriptorSummary(band: number): { level: string; description: string } {
  if (band >= 8.5) {
    return {
      level: 'Expert User',
      description: 'You have full operational command of the language: appropriate, accurate and fluent with complete understanding.',
    };
  } else if (band >= 7.5) {
    return {
      level: 'Very Good User',
      description: 'You have fully operational command of the language with only occasional unsystematic inaccuracies and inappropriacies.',
    };
  } else if (band >= 6.5) {
    return {
      level: 'Competent User',
      description: 'You generally have effective command of the language despite some inaccuracies, inappropriacies and misunderstandings.',
    };
  } else if (band >= 5.5) {
    return {
      level: 'Modest User',
      description: 'You have partial command of the language, coping with overall meaning in most situations, though likely to make many mistakes.',
    };
  } else {
    return {
      level: 'Developing User',
      description: 'Basic competence is limited to familiar situations. Frequent problems in understanding and expression occur.',
    };
  }
}
