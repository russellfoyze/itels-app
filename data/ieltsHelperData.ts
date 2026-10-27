export interface IeltsVocabItem {
  word: string;
  pos: string; // part of speech
  cefr: string; // C1, C2, B2
  definition: string;
  synonyms: string[];
  ieltsExample: string;
  topic: string;
}

export const ieltsAcademicDictionary: Record<string, IeltsVocabItem> = {
  turbines: {
    word: 'Turbine',
    pos: 'noun',
    cefr: 'C1',
    definition: 'A machine for producing continuous power in which a wheel or rotor is made to revolve by a fast-moving flow of water, steam, gas, or air.',
    synonyms: ['generator', 'rotor engine', 'impeller'],
    ieltsExample: 'Undersea turbines are poised to revolutionize sustainable renewable energy generation.',
    topic: 'Environment & Energy'
  },
  renewable: {
    word: 'Renewable',
    pos: 'adjective',
    cefr: 'B2',
    definition: 'Capable of being replenished naturally or not depleted by use.',
    synonyms: ['sustainable', 'inexhaustible', 'ecological', 'regenerative'],
    ieltsExample: 'Governments should allocate substantial funding to renewable power infrastructures.',
    topic: 'Environment & Energy'
  },
  predictable: {
    word: 'Predictable',
    pos: 'adjective',
    cefr: 'B2',
    definition: 'Able to be foretold or declared in advance with high certainty.',
    synonyms: ['foreseeable', 'calculable', 'anticipated', 'reliable'],
    ieltsExample: 'Unlike solar radiation, oceanic tidal currents are entirely predictable.',
    topic: 'Environment & Energy'
  },
  ecosystems: {
    word: 'Ecosystem',
    pos: 'noun',
    cefr: 'B2',
    definition: 'A biological community of interacting organisms and their physical environment.',
    synonyms: ['biome', 'ecological niche', 'habitat', 'biosphere'],
    ieltsExample: 'Marine barrages can disrupt delicate estuarine ecosystems and fish migratory routes.',
    topic: 'Environment & Energy'
  },
  corrosion: {
    word: 'Corrosion',
    pos: 'noun',
    cefr: 'C1',
    definition: 'The gradual destruction of materials by chemical or electrochemical reaction with their environment.',
    synonyms: ['deterioration', 'degradation', 'oxidation', 'rust'],
    ieltsExample: 'Submerged components must be engineered to resist extreme saltwater corrosion.',
    topic: 'Science & Technology'
  },
  fidelity: {
    word: 'Fidelity',
    pos: 'noun',
    cefr: 'C2',
    definition: 'The degree of exactness with which something is copied or reproduced.',
    synonyms: ['accuracy', 'precision', 'authenticity', 'veracity'],
    ieltsExample: 'The deep-space radio transmission was reconstructed with immaculate fidelity.',
    topic: 'Science & Technology'
  },
  exponentially: {
    word: 'Exponentially',
    pos: 'adverb',
    cefr: 'C1',
    definition: 'At a very rapid and increasingly accelerated rate.',
    synonyms: ['dramatically', 'substantially', 'precipitously'],
    ieltsExample: 'Global data traffic has expanded exponentially over the preceding decade.',
    topic: 'Science & Technology'
  },
  underpins: {
    word: 'Underpin',
    pos: 'verb',
    cefr: 'C1',
    definition: 'To provide a solid basis, foundation, or support for an argument or system.',
    synonyms: ['buttress', 'corroborate', 'substantiate', 'reinforce'],
    ieltsExample: 'Claude Shannon\'s mathematical insights underpin all modern wireless infrastructure.',
    topic: 'Academic Discourse'
  },
  heuristics: {
    word: 'Heuristic',
    pos: 'noun',
    cefr: 'C2',
    definition: 'A practical cognitive mental shortcut that allows people to solve problems and make judgments quickly.',
    synonyms: ['rule of thumb', 'cognitive shortcut', 'intuitive calculation'],
    ieltsExample: 'Human decision-making relies extensively on heuristics rather than purely rational calculations.',
    topic: 'Psychology & Society'
  },
  ubiquitous: {
    word: 'Ubiquitous',
    pos: 'adjective',
    cefr: 'C1',
    definition: 'Present, appearing, or found everywhere at the same time.',
    synonyms: ['omnipresent', 'pervasive', 'universal', 'prevalent'],
    ieltsExample: 'Smartphone usage has become ubiquitous among secondary school students.',
    topic: 'Society & Technology'
  },
  mitigate: {
    word: 'Mitigate',
    pos: 'verb',
    cefr: 'C1',
    definition: 'To make something less severe, harmful, or painful.',
    synonyms: ['alleviate', 'attenuate', 'diminish', 'palliate', 'moderate'],
    ieltsExample: 'Instituting blind reviews helps mitigate unconscious demographic bias.',
    topic: 'Academic Discourse'
  },
  disparity: {
    word: 'Disparity',
    pos: 'noun',
    cefr: 'C1',
    definition: 'A noticeable and often unfair difference between people or things.',
    synonyms: ['discrepancy', 'imbalance', 'inequality', 'divergence'],
    ieltsExample: 'There remains a pronounced disparity between urban and rural educational resources.',
    topic: 'Society & Economics'
  },
  infrastructure: {
    word: 'Infrastructure',
    pos: 'noun',
    cefr: 'B2',
    definition: 'The basic physical and organizational structures and facilities needed for the operation of a society.',
    synonyms: ['framework', 'public works', 'facilities', 'foundations'],
    ieltsExample: 'Investing in public transit infrastructure reduces traffic gridlock significantly.',
    topic: 'Urban Planning'
  },
  segregation: {
    word: 'Segregation',
    pos: 'noun',
    cefr: 'C1',
    definition: 'The action or state of setting someone or something apart from others.',
    synonyms: ['separation', 'partition', 'isolation', 'demarcation'],
    ieltsExample: 'The hospital redesigned its layout to ensure the segregation of staff and visitor parking.',
    topic: 'Urban Planning'
  },
  indispensable: {
    word: 'Indispensable',
    pos: 'adjective',
    cefr: 'C1',
    definition: 'Absolutely necessary or essential.',
    synonyms: ['imperative', 'paramount', 'vital', 'crucial', 'essential'],
    ieltsExample: 'A rich vocabulary is indispensable for attaining Band 8.0 in IELTS Writing.',
    topic: 'Education'
  }
};

export const ieltsTopicVocabulary = [
  {
    topic: 'Environment & Climate Change',
    words: [
      { word: 'Degradation', definition: 'The process of decaying or deterioration.', band9Collocation: 'Environmental degradation' },
      { word: 'Deplete', definition: 'To use up the supply of resources.', band9Collocation: 'Deplete natural reserves' },
      { word: 'Catastrophic', definition: 'Involving or causing sudden great damage.', band9Collocation: 'Catastrophic consequences' },
      { word: 'Sustainable', definition: 'Conserving an ecological balance.', band9Collocation: 'Sustainable agricultural practices' },
      { word: 'Biodiversity', definition: 'The variety of plant and animal life in a habitat.', band9Collocation: 'Preserve terrestrial biodiversity' }
    ]
  },
  {
    topic: 'Technology & Artificial Intelligence',
    words: [
      { word: 'Ubiquitous', definition: 'Present or found everywhere.', band9Collocation: 'Ubiquitous connectivity' },
      { word: 'Automate', definition: 'To convert to largely automatic operation.', band9Collocation: 'Automate repetitive workflows' },
      { word: 'Unprecedented', definition: 'Never done or known before.', band9Collocation: 'At an unprecedented velocity' },
      { word: 'Obsolescence', definition: 'The process of becoming obsolete or outdated.', band9Collocation: 'Rapid technological obsolescence' },
      { word: 'Surveillance', definition: 'Close observation, especially of a suspected person.', band9Collocation: 'Pervasive digital surveillance' }
    ]
  },
  {
    topic: 'Education & Career Development',
    words: [
      { word: 'Pedagogical', definition: 'Relating to teaching methods.', band9Collocation: 'Innovative pedagogical techniques' },
      { word: 'Acquisition', definition: 'The learning or developing of a skill.', band9Collocation: 'Second language acquisition' },
      { word: 'Curriculum', definition: 'The subjects comprising a course of study.', band9Collocation: 'Well-rounded academic curriculum' },
      { word: 'Aptitude', definition: 'A natural ability to do something.', band9Collocation: 'Demonstrate technical aptitude' },
      { word: 'Prerequisite', definition: 'A thing required as a prior condition.', band9Collocation: 'Indispensable prerequisite' }
    ]
  },
  {
    topic: 'Society, Culture & Urbanization',
    words: [
      { word: 'Cohesion', definition: 'The action or state of sticking together.', band9Collocation: 'Foster social cohesion' },
      { word: 'Demographics', definition: 'Statistical data relating to the population.', band9Collocation: 'Shifting demographic trends' },
      { word: 'Marginalized', definition: 'Treated as insignificant or peripheral.', band9Collocation: 'Marginalized socioeconomic groups' },
      { word: 'Alienation', definition: 'The state or experience of being isolated.', band9Collocation: 'Feelings of cultural alienation' },
      { word: 'Cosmopolitan', definition: 'Familiar with and at ease in many different countries.', band9Collocation: 'Vibrant cosmopolitan metropolis' }
    ]
  }
];

export const ieltsStrategyGuides = {
  reading: [
    {
      title: 'True / False / Not Given Mastery',
      steps: [
        'TRUE means the passage directly agrees with and confirms the statement.',
        'FALSE means the passage directly contradicts the statement (the opposite is stated).',
        'NOT GIVEN means the information cannot be found or confirmed anywhere in the passage.',
        'Golden Rule: If you find yourself guessing or making assumptions based on outside knowledge, it is almost certainly NOT GIVEN.'
      ]
    },
    {
      title: 'Matching Headings Technique (Paragraph Titles)',
      steps: [
        'Always read the headings list FIRST and underline key distinguishing terms.',
        'Read the first sentence, second sentence, and concluding sentence of the paragraph carefully.',
        'Beware of distractors: headings often repeat a single keyword from a paragraph to trap careless readers. Look for the CENTRAL IDEA, not just matching words.'
      ]
    },
    {
      title: 'Summary & Cloze Completion',
      steps: [
        'Check the word count limit strictly (e.g. "NO MORE THAN TWO WORDS").',
        'Predict the grammatical part of speech before looking: does the blank need a noun, adjective, or verb?',
        'Look for synonyms in the passage. The prompt will rarely use identical wording.'
      ]
    }
  ],
  listening: [
    {
      title: 'The 30-Second Pre-Listening Scan',
      steps: [
        'Use the time given before each audio section to underline keywords in questions.',
        'Anticipate the kind of answer: Is it a person\'s surname? A phone number? A date? A location?',
        'Look ahead to the next 2-3 questions so you never lose your place if the speaker moves quickly.'
      ]
    },
    {
      title: 'Avoiding Audio Distractors',
      steps: [
        'Speakers in Section 1 and 2 almost always correct themselves (e.g., "We will meet on Tuesday... oh wait, sorry, the room is booked, let\'s make it Wednesday").',
        'Never write the very first number or day you hear without listening to the confirmation.'
      ]
    }
  ],
  writing: [
    {
      title: 'Task 1: Academic 4-Paragraph Blueprint',
      steps: [
        'Paragraph 1: Paraphrase the prompt in 1-2 sentences.',
        'Paragraph 2: The OVERVIEW (Crucial for Band 7+). State 2-3 key overall trends without specific figures.',
        'Paragraph 3: Key Feature 1 in detail with precise comparative data and percentages.',
        'Paragraph 4: Key Feature 2 in detail with remaining data comparisons.'
      ]
    },
    {
      title: 'Task 2: Essay 4-Paragraph Formula',
      steps: [
        'Introduction: Hook/Paraphrase the topic + Clear thesis statement + Outline your opinion.',
        'Body Paragraph 1: Topic sentence + Main reason + Specific evidence/example + Impact conclusion.',
        'Body Paragraph 2: Counter-argument or Second major reason + Development + Concrete example.',
        'Conclusion: Restate thesis in new words + Summarize core points + Final thought/recommendation.'
      ]
    }
  ],
  speaking: [
    {
      title: 'The Past-Present-Future Framework',
      steps: [
        'When asked any question in Part 1 or Part 3, structure your answer across time to naturally demonstrate complex tenses: "In the past I used to... however nowadays I tend to... and looking ahead I will probably..."'
      ]
    },
    {
      title: 'Cue Card (Part 2) 1-Minute Note-Taking',
      steps: [
        'Divide your scratch paper into 4 quadrants matching the 4 bullet points on the card.',
        'Write 2-3 keywords per quadrant, NOT full sentences.',
        'Include at least 2 Band 8 adjectives and 1 idiomatic collocation in your notes.'
      ]
    }
  ]
};
