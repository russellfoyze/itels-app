import { ReadingTest } from '@/types/exam';

export const readingTests: ReadingTest[] = [
  {
    id: 'ielts-reading-test-1',
    title: 'IELTS Academic Reading Test 1',
    type: 'academic',
    durationMinutes: 60,
    totalQuestions: 40,
    passages: [
      {
        passageNumber: 1,
        title: 'Tidal Power',
        subtitle: 'The energy potential of marine tidal streams',
        content: `Undersea turbines which produce electricity from the tides are set to become an important source of renewable energy for Britain. It is still too early to predict the extent of the impact they may have, but all the signs are that they may play a significant role in the future.

Operating on the same principle as wind turbines, the underwater engines consist of a tower fixed to the sea bed with two or three blades rotating at the top. The motion of the tides forces the blades to rotate, which drives a generator to produce electricity. Unlike wind turbines, tidal turbines operate underwater, where the density of water is roughly 800 times greater than air. This means that a much smaller turbine can produce the same power as a huge windmill.

Tidal power has several key advantages over other renewable resources. First, it is completely predictable. Tides can be calculated years in advance, unlike wind or solar radiation which vary unpredictably with meteorological conditions. Second, undersea turbines cause minimal visual pollution since they are submerged out of sight beneath the surface. Furthermore, environmentalists believe they are much safer for marine wildlife than underwater barrages, which can disrupt delicate coastal and estuarine ecosystems.

However, technical challenges remain. The harsh marine environment means that components must withstand severe saltwater corrosion and tremendous mechanical stresses from storm surges. Maintenance work is also hazardous and costly because divers or specialized vessels are required. Despite these obstacles, prototype tests off the coast of Devon and in the Orkney Islands have demonstrated promising results, paving the way for commercial tidal arrays in the coming decades.`,
        questions: [
          {
            id: 1,
            type: 'YES_NO_NOT_GIVEN',
            prompt: 'Undersea turbines operate using a mechanism similar to wind turbines.',
            correctAnswer: 'yes',
            explanation: 'Paragraph 2 confirms: "Operating on the same principle as wind turbines..."'
          },
          {
            id: 2,
            type: 'YES_NO_NOT_GIVEN',
            prompt: 'Air is denser than water.',
            correctAnswer: 'no',
            explanation: 'Paragraph 2 states: "the density of water is roughly 800 times greater than air."'
          },
          {
            id: 3,
            type: 'YES_NO_NOT_GIVEN',
            prompt: 'Tidal movements can be accurately forecasted well into the future.',
            correctAnswer: 'yes',
            explanation: 'Paragraph 3 states: "Tides can be calculated years in advance..."'
          },
          {
            id: 4,
            type: 'YES_NO_NOT_GIVEN',
            prompt: 'Britain currently generates more electricity from tidal power than from solar power.',
            correctAnswer: 'not given',
            explanation: 'The text compares predictability, but does not provide statistical generation comparisons.'
          },
          {
            id: 5,
            type: 'YES_NO_NOT_GIVEN',
            prompt: 'Underwater barrages have a greater potential to harm marine habitats than tidal turbines.',
            correctAnswer: 'yes',
            explanation: 'Paragraph 3: environmentalists believe turbines are safer than barrages which disrupt ecosystems.'
          },
          {
            id: 6,
            type: 'FILL_IN_BLANK',
            prompt: 'Water has a density approximately ________ times that of air.',
            correctAnswer: '800',
            explanation: 'Paragraph 2 explicitly mentions "roughly 800 times greater than air."'
          },
          {
            id: 7,
            type: 'FILL_IN_BLANK',
            prompt: 'Undersea turbines cause very little ________ pollution because they are submerged.',
            correctAnswer: 'visual',
            explanation: 'Paragraph 3 states: "undersea turbines cause minimal visual pollution..."'
          },
          {
            id: 8,
            type: 'FILL_IN_BLANK',
            prompt: 'Turbine parts must be engineered to resist damage from saltwater ________.',
            correctAnswer: 'corrosion',
            explanation: 'Paragraph 4: "components must withstand severe saltwater corrosion..."'
          },
          {
            id: 9,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What is mentioned as a major difficulty with maintaining underwater turbines?',
            options: [
              'A. The lack of qualified engineering personnel',
              'B. The need for specialized vessels and dangerous diving work',
              'C. The constant threat of marine mammal collisions',
              'D. Opposition from commercial fishing fleets'
            ],
            correctAnswer: 'B',
            explanation: 'Paragraph 4: "Maintenance work is also hazardous and costly because divers or specialized vessels are required."'
          },
          {
            id: 10,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Where have prototype tidal tests recently taken place according to the passage?',
            options: [
              'A. Off the coast of Cornwall and Scotland',
              'B. In the North Sea and English Channel',
              'C. Off Devon and in the Orkney Islands',
              'D. Along the Welsh coastline'
            ],
            correctAnswer: 'C',
            explanation: 'Paragraph 4 states: "tests off the coast of Devon and in the Orkney Islands have demonstrated promising results."'
          },
          {
            id: 11,
            type: 'FILL_IN_BLANK',
            prompt: 'Commercial tidal ________ are expected to be deployed in future decades.',
            correctAnswer: ['arrays', 'array'],
            explanation: 'Paragraph 4 concludes: "...paving the way for commercial tidal arrays..."'
          },
          {
            id: 12,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Underwater turbines require strong wind currents to begin turning.',
            correctAnswer: 'FALSE',
            explanation: 'They are driven by tidal currents, not wind currents.'
          },
          {
            id: 13,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'The blades of the tidal turbine rotate at the base of the tower.',
            correctAnswer: 'FALSE',
            explanation: 'Paragraph 2 states the blades rotate at the top of the tower.'
          }
        ]
      },
      {
        passageNumber: 2,
        title: 'Information Theory – The Big Idea',
        subtitle: 'Claude Shannon and the digital revolution',
        content: `In April 2002 an event took place which demonstrated one of the twentieth century's greatest scientific discoveries. NASA's Voyager 1 space probe, launched in 1977, was billions of kilometers from Earth in interstellar space. It transmitted a radio signal across the void that traveled over 12 hours at the speed of light to reach ground antennas. Despite being infinitesimally faint—less than a billionth of a trillionth of a watt—the signal was decoded with absolute fidelity. The message was crisp, clear, and perfectly error-free.

This remarkable achievement was made possible by Information Theory, a breakthrough conceptualized in 1948 by an unassuming American mathematician named Claude Shannon. Before Shannon's landmark paper, "A Mathematical Theory of Communication", engineers believed that if noise in a channel increased, transmission errors were unavoidable unless transmission power was raised exponentially.

Shannon stunned the scientific world by proving this assumption wrong. He showed that all communication channels have an absolute maximum capacity for transmitting data, now known universally as the Shannon Limit. Crucially, he proved that as long as the transmission rate stays below this theoretical limit, it is mathematically possible to transmit information with near-zero error, regardless of how much background noise interferes with the channel.

Shannon achieved this by stripping information down to its purest essence: the binary digit, or 'bit'. By encoding data with redundant checksums and mathematical error-correcting codes, any noise-induced bit-flips can be automatically detected and rectified at the receiver. Today, Shannon's insight underpins the modern world: from mobile phone networks and fiber optic cables to satellite navigation, streaming video, and space exploration.`,
        questions: [
          {
            id: 14,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'The Voyager 1 space probe was launched in the 1970s.',
            correctAnswer: 'TRUE',
            explanation: 'Paragraph 1 confirms: "NASA\'s Voyager 1 space probe, launched in 1977..."'
          },
          {
            id: 15,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'The Voyager signal received in 2002 contained noticeable audio distortion.',
            correctAnswer: 'FALSE',
            explanation: 'Paragraph 1 confirms: "The message was crisp, clear, and perfectly error-free."'
          },
          {
            id: 16,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Claude Shannon published his groundbreaking paper in 1948.',
            correctAnswer: 'TRUE',
            explanation: 'Paragraph 2 states Shannon conceptualized Information Theory in 1948.'
          },
          {
            id: 17,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Shannon worked exclusively for NASA throughout his academic career.',
            correctAnswer: 'NOT GIVEN',
            explanation: 'The passage does not state where Shannon was employed throughout his career.'
          },
          {
            id: 18,
            type: 'FILL_IN_BLANK',
            prompt: 'Prior to Shannon, engineers believed higher ________ was needed to overcome channel noise.',
            correctAnswer: ['power', 'transmission power'],
            explanation: 'Paragraph 2: "...unless transmission power was raised exponentially."'
          },
          {
            id: 19,
            type: 'FILL_IN_BLANK',
            prompt: 'The maximum data carrying capacity of a channel is known as the ________ Limit.',
            correctAnswer: 'Shannon',
            explanation: 'Paragraph 3: "...known universally as the Shannon Limit."'
          },
          {
            id: 20,
            type: 'FILL_IN_BLANK',
            prompt: 'Shannon defined the fundamental unit of digital information as the ________.',
            correctAnswer: 'bit',
            explanation: 'Paragraph 4: "...the binary digit, or \'bit\'."'
          },
          {
            id: 21,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What did Shannon prove regarding communication below the channel limit?',
            options: [
              'A. Data can be transmitted with almost zero errors despite noise',
              'B. Power consumption is reduced to zero',
              'C. Transmission speed becomes infinitely fast',
              'D. Radio waves travel faster than light'
            ],
            correctAnswer: 'A',
            explanation: 'Paragraph 3 confirms it is possible to transmit information with near-zero error.'
          },
          {
            id: 22,
            type: 'MULTIPLE_CHOICE',
            prompt: 'How does modern error-correcting technology handle corrupted bits?',
            options: [
              'A. It discards the entire file and requests a reboot',
              'B. It detects and rectifies bit-flips using mathematical codes',
              'C. It boosts antenna voltage automatically',
              'D. It converts analog waves into microwave pulses'
            ],
            correctAnswer: 'B',
            explanation: 'Paragraph 4: "...any noise-induced bit-flips can be automatically detected and rectified..."'
          },
          {
            id: 23,
            type: 'FILL_IN_BLANK',
            prompt: 'The radio signal from Voyager 1 took more than ________ hours to arrive on Earth.',
            correctAnswer: ['12', 'twelve'],
            explanation: 'Paragraph 1: "...traveled over 12 hours at the speed of light..."'
          },
          {
            id: 24,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Shannon\'s theories are still applied to modern wireless networks.',
            correctAnswer: 'TRUE',
            explanation: 'Paragraph 4 concludes that Shannon\'s insight underpins mobile networks today.'
          },
          {
            id: 25,
            type: 'FILL_IN_BLANK',
            prompt: 'Information Theory relies heavily on data redundancy and ________ codes.',
            correctAnswer: ['error-correcting', 'error correcting'],
            explanation: 'Paragraph 4 mentions "mathematical error-correcting codes".'
          },
          {
            id: 26,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What was the title of Claude Shannon\'s landmark 1948 paper?',
            options: [
              'A. The Architecture of Binary Machines',
              'B. Principles of Modern Computing',
              'C. A Mathematical Theory of Communication',
              'D. Limits of Transmission Channels'
            ],
            correctAnswer: 'C',
            explanation: 'Paragraph 2 mentions: "A Mathematical Theory of Communication".'
          }
        ]
      },
      {
        passageNumber: 3,
        title: 'The Psychology of Decision Making',
        subtitle: 'Cognitive biases and intuitive thinking in human judgment',
        content: `Human judgment was long assumed to be predominantly rational. Classical economic models operated on the axiom of the 'homo economicus'—an idealized decision-maker who calculates probabilities accurately, evaluates costs and benefits objectively, and selects choices that maximize utility. Over the past five decades, however, research in behavioral economics spearheaded by Daniel Kahneman and Amos Tversky has dismantled this foundation, revealing that real human cognition is rife with systematic shortcuts known as heuristics.

Kahneman proposed a dual-process model of cognition consisting of System 1 and System 2. System 1 operates automatically and swiftly, with little or no conscious effort. It handles routine tasks like recognizing facial expressions, detecting hostility in a tone of voice, or swerving to avoid an obstacle while driving. System 2, by contrast, allocates attention to effortful mental activities, including complex calculations, logical reasoning, and critical self-monitoring.

While System 1 is astonishingly efficient, it is vulnerable to predictable cognitive biases. One prominent example is the availability heuristic, where people assess the frequency or likelihood of an event based on how easily examples spring to mind. Highly publicized airplane crashes, for instance, lead many to overestimate the danger of flying compared to driving, despite statistical evidence proving aviation is vastly safer.

Another ubiquitous phenomenon is the anchoring effect. When individuals are presented with an arbitrary initial number, that figure exerts an unconscious gravitational pull on subsequent estimates. In real-estate negotiations or salary discussions, the opening offer consistently serves as an anchor that influences the final settlement, even when the participants believe they are being entirely objective.

Understanding these psychological traps does not eliminate them, but it provides decision-makers with tools to recognize when slow, deliberate System 2 thinking should override rapid intuition. Organizations that institute structured review procedures, diverse deliberation teams, and blind assessments are far better equipped to mitigate the cost of biased judgment.`,
        questions: [
          {
            id: 27,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Classical economics assumed individuals make rational decisions to maximize utility.',
            correctAnswer: 'TRUE',
            explanation: 'Paragraph 1 confirms: classical models assumed an idealized rational decision-maker.'
          },
          {
            id: 28,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'System 1 requires intense mental concentration and effort.',
            correctAnswer: 'FALSE',
            explanation: 'Paragraph 2 states System 1 operates automatically and swiftly with little or no effort.'
          },
          {
            id: 29,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'System 2 is responsible for performing complex mathematical calculations.',
            correctAnswer: 'TRUE',
            explanation: 'Paragraph 2 explains System 2 allocates attention to complex calculations.'
          },
          {
            id: 30,
            type: 'FILL_IN_BLANK',
            prompt: 'Cognitive mental shortcuts used by the brain are known as ________.',
            correctAnswer: 'heuristics',
            explanation: 'Paragraph 1: "...systematic shortcuts known as heuristics."'
          },
          {
            id: 31,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What causes people to overestimate the danger of flying?',
            options: [
              'A. The complexity of airport security systems',
              'B. The availability heuristic due to heavily publicized crashes',
              'C. A failure of System 1 to recognize danger',
              'D. Anchoring on airline ticket prices'
            ],
            correctAnswer: 'B',
            explanation: 'Paragraph 3 explicitly discusses how the availability heuristic makes airplane crashes readily memorable.'
          },
          {
            id: 32,
            type: 'FILL_IN_BLANK',
            prompt: 'The tendency for an initial number to skew subsequent estimates is called the ________ effect.',
            correctAnswer: 'anchoring',
            explanation: 'Paragraph 4 introduces the "anchoring effect".'
          },
          {
            id: 33,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Which two researchers spearheaded the behavioral revolution against rational economic theory?',
            options: [
              'A. Claude Shannon and Alan Turing',
              'B. Daniel Kahneman and Amos Tversky',
              'C. Adam Smith and John Maynard Keynes',
              'D. Herbert Simon and Milton Friedman'
            ],
            correctAnswer: 'B',
            explanation: 'Paragraph 1: "...spearheaded by Daniel Kahneman and Amos Tversky..."'
          },
          {
            id: 34,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Simply knowing about cognitive biases makes a person completely immune to them.',
            correctAnswer: 'FALSE',
            explanation: 'Paragraph 5 states: "Understanding these psychological traps does not eliminate them..."'
          },
          {
            id: 35,
            type: 'FILL_IN_BLANK',
            prompt: 'System 1 is described as being remarkably ________ in handling everyday reactions.',
            correctAnswer: 'efficient',
            explanation: 'Paragraph 3: "While System 1 is astonishingly efficient..."'
          },
          {
            id: 36,
            type: 'MULTIPLE_CHOICE',
            prompt: 'Which organizational practice helps mitigate cognitive bias according to the conclusion?',
            options: [
              'A. Relying strictly on senior executive instincts',
              'B. Eliminating all quantitative review stages',
              'C. Instituting blind assessments and diverse deliberation teams',
              'D. Speeding up the decision-making cycle'
            ],
            correctAnswer: 'C',
            explanation: 'Paragraph 5 mentions structured reviews, diverse teams, and blind assessments.'
          },
          {
            id: 37,
            type: 'FILL_IN_BLANK',
            prompt: 'In salary negotiations, the opening proposal acts as an ________ that shapes the outcome.',
            correctAnswer: 'anchor',
            explanation: 'Paragraph 4: "...the opening offer consistently serves as an anchor..."'
          },
          {
            id: 38,
            type: 'TRUE_FALSE_NOT_GIVEN',
            prompt: 'Amos Tversky won the Nobel Prize in Physics for his work on System 2.',
            correctAnswer: 'NOT GIVEN',
            explanation: 'The passage does not mention awards received by Tversky.'
          },
          {
            id: 39,
            type: 'FILL_IN_BLANK',
            prompt: 'Critical self-monitoring is governed by ________ 2 thinking.',
            correctAnswer: 'System',
            explanation: 'Paragraph 2 notes System 2 handles logical reasoning and critical self-monitoring.'
          },
          {
            id: 40,
            type: 'MULTIPLE_CHOICE',
            prompt: 'What is the main theme of the passage?',
            options: [
              'A. Why statistical analysis is superior to human experience',
              'B. How dual cognitive systems produce systematic patterns of bias in human judgment',
              'C. Why airline travel is safer than road transport',
              'D. The mathematical foundation of economic markets'
            ],
            correctAnswer: 'B',
            explanation: 'The entire text explains how System 1 and System 2 create heuristics and predictable cognitive biases.'
          }
        ]
      }
    ]
  }
];
