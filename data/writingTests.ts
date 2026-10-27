import { WritingTest } from '@/types/exam';

export const writingTests: WritingTest[] = [
  {
    id: 'ielts-writing-test-1',
    title: 'IELTS Academic Writing Test 1',
    task1: {
      taskNumber: 1,
      title: 'Academic Writing Task 1',
      type: 'academic',
      prompt: `The two maps below show road access to a city hospital in 2007 and 2010.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words. You should spend about 20 minutes on this task.`,
      imageUrl: 'https://practicepteonline.com/wp-content/uploads/2024/09/test-1-min-1.png',
      minWords: 150,
      recommendedMinutes: 20
    },
    task2: {
      taskNumber: 2,
      title: 'Writing Task 2: Essay',
      type: 'academic',
      prompt: `Living in a country where you have to speak a foreign language can cause serious social problems, as well as practical problems.

To what extent do you agree or disagree with this statement?

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words. You should spend about 40 minutes on this task.`,
      minWords: 250,
      recommendedMinutes: 40
    }
  },
  {
    id: 'ielts-writing-test-2',
    title: 'IELTS Academic Writing Test 2',
    task1: {
      taskNumber: 1,
      title: 'Academic Writing Task 1: Bar Chart',
      type: 'academic',
      prompt: `The chart below illustrates the percentage of male and female students in different faculty departments at a university in 2020.

Summarize the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
      minWords: 150,
      recommendedMinutes: 20
    },
    task2: {
      taskNumber: 2,
      title: 'Writing Task 2: Discussion Essay',
      type: 'academic',
      prompt: `Some people believe that universities should focus primarily on equipping graduates with practical skills needed for future employment. Others argue that universities should concentrate on theoretical academic knowledge regardless of career utility.

Discuss both views and give your own opinion. Write at least 250 words.`,
      minWords: 250,
      recommendedMinutes: 40
    }
  }
];
