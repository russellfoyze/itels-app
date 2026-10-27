import { listeningTests } from './listeningTests';
import { readingTests } from './readingTests';
import { writingTests } from './writingTests';
import { speakingTests } from './speakingTests';

export const allTestsCatalog = {
  listening: listeningTests.map((t) => ({
    id: t.id,
    title: t.title,
    duration: t.durationMinutes,
    questionsCount: t.totalQuestions,
    sectionsCount: t.sections.length,
    module: 'listening' as const,
  })),
  reading: readingTests.map((t) => ({
    id: t.id,
    title: t.title,
    type: t.type,
    duration: t.durationMinutes,
    questionsCount: t.totalQuestions,
    passagesCount: t.passages.length,
    module: 'reading' as const,
  })),
  writing: writingTests.map((t) => ({
    id: t.id,
    title: t.title,
    task1Title: t.task1.title,
    task2Title: t.task2.title,
    duration: 60,
    module: 'writing' as const,
  })),
  speaking: speakingTests.map((t) => ({
    id: t.id,
    title: t.title,
    part2Topic: t.part2.title,
    duration: 14,
    module: 'speaking' as const,
  })),
};
