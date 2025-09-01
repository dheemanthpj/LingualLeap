
export const learningPaths = [
  {
    title: "Beginner: The Essentials",
    description: "Start your journey by mastering the basics of the language.",
    progress: 35,
    lessons: [
      { 
        slug: "common-greetings", 
        title: "Common Greetings", 
        completed: true,
        introduction: "Let's learn some essential greetings you can use in everyday conversations. These are fundamental for starting any interaction.",
        phrases: [
          { phrase: "Hola", translation: "Hello", pronunciation: "OH-lah" },
          { phrase: "Buenos días", translation: "Good morning", pronunciation: "BWEH-nohs DEE-ahs" },
          { phrase: "¿Cómo estás?", translation: "How are you?", pronunciation: "KOH-moh es-TAHS" },
          { phrase: "Adiós", translation: "Goodbye", pronunciation: "ah-DYOHS" },
        ],
        quiz: [
          {
            question: "How do you say 'Hello'?",
            options: ["Adiós", "Hola", "Gracias"],
            answer: "Hola"
          },
          {
            question: "What does 'Buenos días' mean?",
            options: ["Good evening", "Good afternoon", "Good morning"],
            answer: "Good morning"
          }
        ]
      },
      { 
        slug: "introducing-yourself", 
        title: "Introducing Yourself", 
        completed: true,
        introduction: "Learn how to introduce yourself and share basic personal information.",
        phrases: [
          { phrase: "Me llamo...", translation: "My name is...", pronunciation: "meh YAH-moh" },
          { phrase: "Mucho gusto", translation: "Nice to meet you", pronunciation: "MOO-choh GOOS-toh" },
          { phrase: "Soy de...", translation: "I am from...", pronunciation: "soy deh" },
        ],
        quiz: [
          {
            question: "How do you say 'My name is...'?",
            options: ["Soy de...", "Me llamo...", "¿Cómo estás?"],
            answer: "Me llamo..."
          }
        ]
      },
      { 
        slug: "basic-questions-answers", 
        title: "Basic Questions & Answers", 
        completed: false,
        introduction: "Ask and answer common questions to handle simple conversations.",
        phrases: [],
        quiz: []
      },
      { 
        slug: "numbers-and-counting", 
        title: "Numbers and Counting", 
        completed: false,
        introduction: "Learn numbers to count and talk about age or prices.",
        phrases: [],
        quiz: []
      },
    ],
  },
  {
    title: "Intermediate: Building Confidence",
    description: "Expand your vocabulary and start forming complex sentences.",
    progress: 0,
    lessons: [
      { slug: "ordering-food-and-drinks", title: "Ordering Food and Drinks", completed: false, introduction: "", phrases: [], quiz: [] },
      { slug: "asking-for-directions", title: "Asking for Directions", completed: false, introduction: "", phrases: [], quiz: [] },
      { slug: "shopping-and-bargaining", title: "Shopping and Bargaining", completed: false, introduction: "", phrases: [], quiz: [] },
      { slug: "making-plans", title: "Making Plans", completed: false, introduction: "", phrases: [], quiz: [] },
    ],
  },
  {
    title: "Advanced: Fluency Focus",
    description: "Dive into nuanced topics and perfect your accent.",
    progress: 0,
    lessons: [
      { slug: "discussing-hobbies-and-interests", title: "Discussing Hobbies and Interests", completed: false, introduction: "", phrases: [], quiz: [] },
      { slug: "expressing-opinions", title: "Expressing Opinions", completed: false, introduction: "", phrases: [], quiz: [] },
      { slug: "understanding-cultural-nuances", title: "Understanding Cultural Nuances", completed: false, introduction: "", phrases: [], quiz: [] },
    ],
  },
];

export const allLessons = learningPaths.flatMap(path => path.lessons);
