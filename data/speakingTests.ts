import { SpeakingTest } from '@/types/exam';

export const speakingTests: SpeakingTest[] = [
  {
    id: 'ielts-speaking-test-1',
    title: 'Makkar Cue Card Test 1: Good Law',
    part1: {
      instructions: 'The examiner will introduce themselves and confirm your identity, then ask general questions on familiar topics.',
      questions: [
        'What is your full name?',
        'Do you work or are you a student?',
        'Where do you come from? Tell me about your hometown.',
        'What do you enjoy most about living in your area?',
        'Do you prefer spending your free time indoors or outdoors?'
      ]
    },
    part2: {
      title: 'Describe a good law in your country',
      cueCard: 'Candidate Task Card (You have 1 minute to take notes and prepare, then speak for 1 to 2 minutes):',
      bulletPoints: [
        'What the law is and what behavior it regulates',
        'How you first learned about this law',
        'Who it affects directly and indirectly',
        'And explain why you believe this law is beneficial for society'
      ],
      prepSeconds: 60,
      speechSeconds: 120
    },
    part3: {
      topic: 'Law Enforcement and Civic Responsibility',
      questions: [
        'Why do societies require formal legal systems rather than relying purely on moral codes?',
        'Should law enforcement officers possess the discretion to overlook minor infractions, or should rules be applied strictly?',
        'In what ways has digital technology complicated the enforcement of intellectual property laws?',
        'How can educational institutions better instill a sense of civic responsibility in young citizens?'
      ]
    }
  },
  {
    id: 'ielts-speaking-test-2',
    title: 'Makkar Cue Card Test 2: Crowded Place',
    part1: {
      instructions: 'Part 1: Interview on everyday topics.',
      questions: [
        'Do you often go to shopping malls or crowded markets?',
        'How do you feel when you are in a very noisy and crowded place?',
        'Do people in your country enjoy large festivals or celebrations?'
      ]
    },
    part2: {
      title: 'Describe a crowded place you have visited',
      bulletPoints: [
        'Where this place was and when you went there',
        'Why you decided to go to this place',
        'What kind of activities people were doing there',
        'And explain how you felt about being in that crowded environment'
      ],
      cueCard: 'Candidate Task Card (1 minute preparation, 1-2 minutes speech):',
      prepSeconds: 60,
      speechSeconds: 120
    },
    part3: {
      topic: 'Urban Density and Public Spaces',
      questions: [
        'Why do people migrate in large numbers from rural villages into densely packed cities?',
        'What infrastructure challenges do mega-cities face when handling high population density?',
        'Do you think modern cities allocate sufficient green public parks for their inhabitants?'
      ]
    }
  }
];
