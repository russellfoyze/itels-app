import { ListeningTest } from '@/types/exam';

export const listeningTests: ListeningTest[] = [
  {
    id: 'ielts-listening-test-1',
    title: 'IELTS Listening Practice Test 1',
    durationMinutes: 30,
    totalQuestions: 40,
    audioUrl: 'https://practicepteonline.com/wp-content/uploads/audio/1_we.mp3',
    sections: [
      {
        sectionNumber: 1,
        title: 'Section 1: Holiday Accommodation Booking',
        instructions: 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
        questions: [
          { id: 1, type: 'FILL_IN_BLANK', prompt: 'Distance to coastal beach: ________ meters', correctAnswer: '300' },
          { id: 2, type: 'FILL_IN_BLANK', prompt: 'Visitors advised to pack their own: ________', correctAnswer: 'sunshade' },
          { id: 3, type: 'FILL_IN_BLANK', prompt: 'Master bedroom includes access to a private: ________', correctAnswer: 'balcony' },
          { id: 4, type: 'FILL_IN_BLANK', prompt: 'Property is surrounded by dense: ________', correctAnswer: ['forests', 'forest'] },
          { id: 5, type: 'FILL_IN_BLANK', prompt: 'Assigned booking confirmation code: ________', correctAnswer: '319' },
          { id: 6, type: 'FILL_IN_BLANK', prompt: 'Estimated annual visitors to the valley: ________', correctAnswer: ['10,000', '10000'] },
          { id: 7, type: 'FILL_IN_BLANK', prompt: 'Discount available if staying with an existing: ________', correctAnswer: 'relative' },
          { id: 8, type: 'FILL_IN_BLANK', prompt: 'Original departure flight was unfortunately: ________', correctAnswer: 'missed' },
          { id: 9, type: 'FILL_IN_BLANK', prompt: 'Extra fee charged for each oversized luggage: ________', correctAnswer: 'item' },
          { id: 10, type: 'FILL_IN_BLANK', prompt: 'Family surname on booking record: ________', correctAnswer: 'Ludlow' }
        ]
      },
      {
        sectionNumber: 2,
        title: 'Section 2: Community Park & Nature Reserve Tour',
        instructions: 'Choose the correct letter, A, B, or C.',
        questions: [
          {
            id: 11,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Why was the bird sanctuary relocated last autumn?',
            options: ['A. Heavy flooding along the riverbanks', 'B. Vandalism from adjacent roadways', 'C. To expand public educational access'],
            correctAnswer: 'C'
          },
          {
            id: 12,
            type: 'MULTIPLE_CHOICE',
            prompt: 'At what time does the weekend heritage tram depart?',
            options: ['A. 09:30 AM', 'B. 10:15 AM', 'C. 11:00 AM'],
            correctAnswer: 'A'
          },
          {
            id: 13,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Children under 12 receive free entry during which period?',
            options: ['A. Weekday mornings', 'B. Public bank holidays', 'C. School vacation months'],
            correctAnswer: 'C'
          },
          {
            id: 14,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Which amenity is situated adjacent to the eastern botanical pavilion?',
            options: ['A. Bicycle rental kiosk', 'B. Visitor café', 'C. Picnic playground', 'D. First aid station', 'E. Herb garden'],
            correctAnswer: 'E'
          },
          {
            id: 15,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Where are lost property inquiries handled?',
            options: ['F. Park ranger station', 'G. Souvenir boutique', 'H. Central information desk'],
            correctAnswer: 'H'
          },
          {
            id: 16,
            type: 'FILL_IN_BLANK',
            prompt: 'The total walking loop around the lake covers ________ km.',
            correctAnswer: ['4.5', 'four and a half'],
          },
          {
            id: 17,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What equipment is provided free of charge for guided twilight walks?',
            options: ['A. Trekking poles', 'B. Waterproof jackets', 'C. High-powered flashlights'],
            correctAnswer: 'C'
          },
          {
            id: 18,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Volunteers for tree planting must sign up before which day?',
            options: ['E. Tuesday', 'F. Thursday', 'G. Friday'],
            correctAnswer: 'G'
          },
          {
            id: 19,
            type: 'FILL_IN_BLANK',
            prompt: 'Maximum number of participants allowed per tour group: ________',
            correctAnswer: '120'
          },
          {
            id: 20,
            type: 'FILL_IN_BLANK',
            prompt: 'Target age bracket for junior ranger weekend workshops: ________ years old',
            correctAnswer: ['5-12', '5 to 12']
          }
        ]
      },
      {
        sectionNumber: 3,
        title: 'Section 3: Academic Project Consultation',
        instructions: 'Complete the notes below with NO MORE THAN TWO WORDS.',
        questions: [
          { id: 21, type: 'FILL_IN_BLANK', prompt: 'Research focus centers on sustainability in the: ________', correctAnswer: 'fishing industry' },
          { id: 22, type: 'FILL_IN_BLANK', prompt: 'Tutor suggests collecting additional regional economic: ________', correctAnswer: 'statistics' },
          { id: 23, type: 'FILL_IN_BLANK', prompt: 'Student acknowledges difficulties with consistent lecture: ________', correctAnswer: 'note-taking' },
          { id: 24, type: 'FILL_IN_BLANK', prompt: 'Group presentation practice helped boost student: ________', correctAnswer: 'confidence' },
          { id: 25, type: 'FILL_IN_BLANK', prompt: 'Draft literature review needs clearer synthesis of core: ________', correctAnswer: 'ideas' },
          { id: 26, type: 'FILL_IN_BLANK', prompt: 'Campus office recommended for time-management guidance: ________', correctAnswer: 'student support' },
          { id: 27, type: 'FILL_IN_BLANK', prompt: 'Survey questionnaires should target coastal town: ________', correctAnswer: 'places' },
          { id: 28, type: 'FILL_IN_BLANK', prompt: 'Initial questionnaire questions should begin with more: ________ inquiries', correctAnswer: 'general' },
          { id: 29, type: 'FILL_IN_BLANK', prompt: 'Pilot survey will be reviewed with advisor: ________ weekly', correctAnswer: ['3 times', 'three times'] },
          { id: 30, type: 'FILL_IN_BLANK', prompt: 'Total sample target for preliminary study: ________ respondents', correctAnswer: '25' }
        ]
      },
      {
        sectionNumber: 4,
        title: 'Section 4: Architecture Lecture - Sustainable Building Materials',
        instructions: 'Complete the summary notes below. Write ONE WORD ONLY for each answer.',
        questions: [
          {
            id: 31,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What is the primary ecological advantage of modern hempcrete blocks?',
            options: ['A. Extreme tensile resistance', 'B. Exceptional carbon capture performance', 'C. Complete resistance to earthquake tremors'],
            correctAnswer: 'B'
          },
          {
            id: 32,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Which country pioneered large-scale commercial cross-laminated timber buildings?',
            options: ['A. Austria', 'B. Canada', 'C. Japan'],
            correctAnswer: 'A'
          },
          { id: 33, type: 'FILL_IN_BLANK', prompt: 'Recycled cullet is commonly combined with sand to manufacture energy-efficient: ________', correctAnswer: 'glass' },
          { id: 34, type: 'FILL_IN_BLANK', prompt: 'Sheep wool offers superior natural thermal: ________ in roofing spaces', correctAnswer: 'insulation' },
          { id: 35, type: 'FILL_IN_BLANK', prompt: 'Passive solar orientation optimizes natural illumination through southern: ________', correctAnswer: 'windows' },
          { id: 36, type: 'FILL_IN_BLANK', prompt: 'Rooftop photovoltaic arrays drastically cut reliance on grid: ________', correctAnswer: 'electricity' },
          { id: 37, type: 'FILL_IN_BLANK', prompt: 'Polished bamboo is frequently chosen as a sustainable finish for interior: ________', correctAnswer: ['floors', 'floor'] },
          { id: 38, type: 'FILL_IN_BLANK', prompt: 'Gray water filtration systems prevent potable water: ________', correctAnswer: 'waste' },
          { id: 39, type: 'FILL_IN_BLANK', prompt: 'Geopolymer binders can successfully replace traditional Portland: ________', correctAnswer: 'concrete' },
          { id: 40, type: 'FILL_IN_BLANK', prompt: 'Target lifespan before major structural renovation: ________', correctAnswer: ['15 years', 'fifteen years'] }
        ]
      }
    ]
  }
];
