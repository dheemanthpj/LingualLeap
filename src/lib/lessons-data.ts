
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
        phrases: [
          { phrase: "¿Qué hora es?", translation: "What time is it?", pronunciation: "keh O-ra es" },
          { phrase: "¿Dónde está el baño?", translation: "Where is the bathroom?", pronunciation: "DON-deh es-TAH el BAH-nyo" },
          { phrase: "¿Cuánto cuesta?", translation: "How much does it cost?", pronunciation: "KWAN-to KWE-sta" },
          { phrase: "No entiendo", translation: "I don't understand", pronunciation: "no en-TYEN-do" }
        ],
        quiz: [
            { question: "How would you ask for the price of something?", options: ["¿Qué hora es?", "¿Cuánto cuesta?", "No entiendo"], answer: "¿Cuánto cuesta?"},
            { question: "What does '¿Dónde está el baño?' mean?", options: ["Where is the exit?", "Where is the bathroom?", "Do you have a bathroom?"], answer: "Where is the bathroom?"}
        ]
      },
      { 
        slug: "numbers-and-counting", 
        title: "Numbers and Counting", 
        completed: false,
        introduction: "Learn numbers to count and talk about age or prices.",
        phrases: [
          { phrase: "Uno, dos, tres", translation: "One, two, three", pronunciation: "OO-no, dohs, tres" },
          { phrase: "Cuatro, cinco, seis", translation: "Four, five, six", pronunciation: "KWA-tro, SEEN-ko, seys" },
          { phrase: "Siete, ocho, nueve", translation: "Seven, eight, nine", pronunciation: "SYE-te, O-cho, NWE-ve" },
          { phrase: "Diez", translation: "Ten", pronunciation: "dyeth" }
        ],
        quiz: [
          { question: "Which number comes after 'ocho'?", options: ["Siete", "Diez", "Nueve"], answer: "Nueve" }
        ]
      },
    ],
  },
  {
    title: "Intermediate: Building Confidence",
    description: "Expand your vocabulary and start forming complex sentences.",
    progress: 0,
    lessons: [
      { 
        slug: "ordering-food-and-drinks", 
        title: "Ordering Food and Drinks", 
        completed: false, 
        introduction: "Learn how to order food and drinks confidently in a restaurant.",
        phrases: [
          { phrase: "Quisiera un café, por favor.", translation: "I would like a coffee, please.", pronunciation: "kee-SYE-ra un ka-FE por fa-VOR" },
          { phrase: "La cuenta, por favor.", translation: "The bill, please.", pronunciation: "la KWEN-ta por fa-VOR" },
          { phrase: "¿Me puede traer el menú?", translation: "Can you bring me the menu?", pronunciation: "me PWE-de tra-ER el me-NU" }
        ],
        quiz: [
          { question: "How do you ask for the bill?", options: ["Quisiera un café", "La cuenta, por favor", "¿Me puede traer el menú?"], answer: "La cuenta, por favor" }
        ]
      },
      { 
        slug: "asking-for-directions", 
        title: "Asking for Directions", 
        completed: false, 
        introduction: "Navigate new places by learning to ask for and understand directions.",
        phrases: [
          { phrase: "¿Cómo llego a la estación?", translation: "How do I get to the station?", pronunciation: "KO-mo YE-go a la es-ta-SYON" },
          { phrase: "Gire a la derecha.", translation: "Turn right.", pronunciation: "HEE-re a la de-RE-cha" },
          { phrase: "Siga todo recto.", translation: "Go straight ahead.", pronunciation: "SEE-ga TO-do REK-to" }
        ],
        quiz: [
          { question: "What does 'Siga todo recto' mean?", options: ["Turn left", "Go straight ahead", "Stop here"], answer: "Go straight ahead" }
        ]
       },
      { 
        slug: "shopping-and-bargaining", 
        title: "Shopping and Bargaining", 
        completed: false, 
        introduction: "Handle shopping situations and learn the art of polite bargaining.",
        phrases: [
          { phrase: "¿Cuánto cuesta esto?", translation: "How much is this?", pronunciation: "KWAN-to KWES-ta ES-to" },
          { phrase: "Es demasiado caro.", translation: "It's too expensive.", pronunciation: "es de-ma-SYA-do KA-ro" },
          { phrase: "¿Aceptan tarjetas de crédito?", translation: "Do you accept credit cards?", pronunciation: "a-SEP-tan tar-HE-tas de KRE-di-to" }
        ],
        quiz: [
          { question: "How do you say that something is too expensive?", options: ["Es demasiado caro", "¿Cuánto cuesta esto?", "Lo compro"], answer: "Es demasiado caro" }
        ]
      },
      { 
        slug: "making-plans", 
        title: "Making Plans", 
        completed: false, 
        introduction: "Learn to make plans and arrange meetings with friends.",
        phrases: [
          { phrase: "¿Qué haces este fin de semana?", translation: "What are you doing this weekend?", pronunciation: "ke A-ses ES-te fin de se-MA-na" },
          { phrase: "¿Quieres ir al cine?", translation: "Do you want to go to the movies?", pronunciation: "KYE-res ir al SEE-ne" },
          { phrase: "Nos vemos a las ocho.", translation: "See you at eight.", pronunciation: "nos BE-mos a las O-cho" }
        ],
        quiz: [
          { question: "How do you ask a friend what they are doing this weekend?", options: ["¿Quieres ir al cine?", "¿Qué haces este fin de semana?", "Nos vemos a las ocho"], answer: "¿Qué haces este fin de semana?" }
        ]
      },
    ],
  },
  {
    title: "Advanced: Fluency Focus",
    description: "Dive into nuanced topics and perfect your accent.",
    progress: 0,
    lessons: [
      { 
        slug: "discussing-hobbies-and-interests", 
        title: "Discussing Hobbies and Interests", 
        completed: false, 
        introduction: "Talk about your hobbies and interests in detail.",
        phrases: [
          { phrase: "En mi tiempo libre, me gusta leer.", translation: "In my free time, I like to read.", pronunciation: "en mi TYEM-po LEE-bre me GOOS-ta le-ER" },
          { phrase: "Soy un gran aficionado al fútbol.", translation: "I am a big fan of soccer.", pronunciation: "soy un gran a-fi-syo-NA-do al FUT-bol" },
          { phrase: "¿Cuáles son tus pasatiempos?", translation: "What are your hobbies?", pronunciation: "KWA-les son tus pa-sa-TYEM-pos" }
        ],
        quiz: [
          { question: "How do you say 'I like to read'?", options: ["Soy aficionado al fútbol", "Me gusta leer", "¿Cuáles son tus pasatiempos?"], answer: "Me gusta leer" }
        ]
      },
      { 
        slug: "expressing-opinions", 
        title: "Expressing Opinions", 
        completed: false, 
        introduction: "Learn to express your opinions and engage in debates.",
        phrases: [
          { phrase: "En mi opinión, es una buena idea.", translation: "In my opinion, it's a good idea.", pronunciation: "en mi o-pi-NYON es OO-na BWE-na i-DE-a" },
          { phrase: "No estoy de acuerdo.", translation: "I don't agree.", pronunciation: "no es-TOY de a-KWER-do" },
          { phrase: "Creo que tienes razón.", translation: "I think you are right.", pronunciation: "KRE-o ke TYE-nes ra-SON" }
        ],
        quiz: [
          { question: "How do you say 'I don't agree'?", options: ["Creo que tienes razón", "En mi opinión...", "No estoy de acuerdo"], answer: "No estoy de acuerdo" }
        ]
      },
      { 
        slug: "understanding-cultural-nuances", 
        title: "Understanding Cultural Nuances", 
        completed: false, 
        introduction: "Explore cultural nuances to communicate more effectively.",
        phrases: [
          { phrase: "Es una costumbre local.", translation: "It's a local custom.", pronunciation: "es OO-na kos-TUM-bre lo-KAL" },
          { phrase: "Hay que tener en cuenta que...", translation: "You have to take into account that...", pronunciation: "ai ke te-NER en KWEN-ta ke" },
          { phrase: "La puntualidad es muy importante aquí.", translation: "Punctuality is very important here.", pronunciation: "la pun-twa-li-DAD es MUY im-por-TAN-te a-KI" }
        ],
        quiz: [
           { question: "What does 'La puntualidad es muy importante aquí' highlight?", options: ["A local food", "A transportation rule", "A cultural norm about being on time"], answer: "A cultural norm about being on time" }
        ]
      },
    ],
  },
];

export const allLessons = learningPaths.flatMap(path => path.lessons);
