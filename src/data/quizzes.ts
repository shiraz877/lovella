import type { Quiz } from "@/types/quiz";

export const quizzes: Quiz[] = [
  // ─── Couple Compatibility ─────────────────────────────────
  {
    id: "quiz-001",
    slug: "couple-compatibility",
    title: "Couple Compatibility Test",
    description:
      "Discover how well-matched you and your partner are across love, communication, and life goals.",
    category: "couples",
    difficulty: "easy",
    emoji: "💑",
    coverGradient: "from-pink-400 to-rose-500",
    estimatedMinutes: 5,
    playCount: 84200,
    isFeatured: true,
    isTrending: true,
    tags: ["couple", "compatibility", "love", "relationship"],
    publishedAt: "2024-01-15",
    disclaimer:
      "This quiz is for entertainment purposes only. Results should not be taken as relationship advice.",
    questions: [
      {
        id: "q1",
        text: "When you and your partner disagree, what usually happens?",
        emoji: "🗣️",
        type: "single",
        options: [
          { id: "a", text: "We talk it out calmly and find a compromise", score: 3 },
          { id: "b", text: "One of us usually gives in to keep the peace", score: 2 },
          { id: "c", text: "We need some space and come back to it later", score: 2 },
          { id: "d", text: "It often turns into a bigger argument", score: 1 },
        ],
      },
      {
        id: "q2",
        text: "How do you prefer to spend a weekend together?",
        emoji: "🌅",
        type: "single",
        options: [
          { id: "a", text: "Adventures and exploring new places", score: 3, tag: "adventure" },
          { id: "b", text: "A cozy day at home, just the two of us", score: 3, tag: "cozy" },
          { id: "c", text: "Socializing with friends and family", score: 2, tag: "social" },
          { id: "d", text: "Pursuing individual hobbies", score: 2, tag: "independent" },
        ],
      },
      {
        id: "q3",
        text: "How often do you tell your partner you love them?",
        emoji: "❤️",
        type: "single",
        options: [
          { id: "a", text: "Multiple times a day — it's second nature", score: 3 },
          { id: "b", text: "At least once a day", score: 3 },
          { id: "c", text: "A few times a week", score: 2 },
          { id: "d", text: "On special occasions", score: 1 },
        ],
      },
      {
        id: "q4",
        text: "When your partner is stressed, you typically...",
        emoji: "🤗",
        type: "single",
        options: [
          { id: "a", text: "Offer a hug and actively listen without judgment", score: 3 },
          { id: "b", text: "Try to solve the problem for them", score: 2 },
          { id: "c", text: "Give them space to work through it", score: 2 },
          { id: "d", text: "Wait for them to come to you when ready", score: 1 },
        ],
      },
      {
        id: "q5",
        text: "Your partner's love language is probably...",
        emoji: "💝",
        type: "single",
        options: [
          { id: "a", text: "Physical touch — they love hugs and holding hands", score: 3 },
          { id: "b", text: "Words of affirmation — compliments mean the world", score: 3 },
          { id: "c", text: "Quality time — they want your full attention", score: 3 },
          { id: "d", text: "Acts of service — actions speak louder than words", score: 3 },
        ],
      },
      {
        id: "q6",
        text: "How aligned are you on big life goals (kids, career, location)?",
        emoji: "🗺️",
        type: "single",
        options: [
          { id: "a", text: "We want the same things — completely aligned", score: 4 },
          { id: "b", text: "Mostly aligned with a few differences we're working through", score: 3 },
          { id: "c", text: "Some significant differences but we're open to compromise", score: 2 },
          { id: "d", text: "We haven't really talked about this much", score: 1 },
        ],
      },
      {
        id: "q7",
        text: "How do you handle alone time vs. together time?",
        emoji: "⚖️",
        type: "single",
        options: [
          { id: "a", text: "We've found a perfect balance that works for both of us", score: 3 },
          { id: "b", text: "We spend most time together and are both happy with that", score: 2 },
          { id: "c", text: "We're still figuring out the right balance", score: 2 },
          { id: "d", text: "One of us wants more together time than the other", score: 1 },
        ],
      },
      {
        id: "q8",
        text: "When you imagine your future together, you feel...",
        emoji: "✨",
        type: "single",
        options: [
          { id: "a", text: "Excited and certain — this is my person", score: 4 },
          { id: "b", text: "Hopeful and optimistic about what's ahead", score: 3 },
          { id: "c", text: "Content but cautiously realistic", score: 2 },
          { id: "d", text: "Uncertain — still figuring things out", score: 1 },
        ],
      },
    ],
    results: [
      {
        id: "r1",
        minScore: 85,
        maxScore: 100,
        title: "A Match Made in Heaven ✨",
        description:
          "Your connection is deep, harmonious, and built on genuine understanding. You communicate well, share similar values, and bring out the best in each other. Keep nurturing this beautiful bond!",
        emoji: "💖",
        color: "#ec4899",
      },
      {
        id: "r2",
        minScore: 65,
        maxScore: 84,
        title: "Strong & Growing Stronger 💪",
        description:
          "You have a genuinely solid relationship with a great foundation. There are a few areas you can continue to develop together, but you clearly care deeply for each other.",
        emoji: "💗",
        color: "#f472b6",
      },
      {
        id: "r3",
        minScore: 45,
        maxScore: 64,
        title: "Good Vibes, Room to Grow 🌱",
        description:
          "You have real chemistry and affection, but there are some areas where deeper understanding could make things even better. Honest conversations and quality time together can work wonders!",
        emoji: "💛",
        color: "#fbbf24",
      },
      {
        id: "r4",
        minScore: 0,
        maxScore: 44,
        title: "Still Getting to Know Each Other 🌸",
        description:
          "Every relationship takes time and intentional effort. Focus on open conversations, learning each other's needs, and building shared experiences. Beautiful things take time to bloom!",
        emoji: "🌸",
        color: "#a78bfa",
      },
    ],
  },

  // ─── How Well Do You Know Me? ────────────────────────────
  {
    id: "quiz-002",
    slug: "how-well-do-you-know-me",
    title: "How Well Do You Know Me?",
    description:
      "The classic quiz! Answer these questions about yourself and share with your partner or BFF to see how well they know you.",
    category: "friends",
    difficulty: "easy",
    emoji: "🧠",
    coverGradient: "from-violet-400 to-purple-500",
    estimatedMinutes: 4,
    playCount: 67800,
    isFeatured: true,
    isNew: false,
    tags: ["friends", "partner", "fun", "knowledge"],
    publishedAt: "2024-02-01",
    disclaimer: "Share this with your closest ones and see who knows you best!",
    questions: [
      {
        id: "q1",
        text: "What's my coffee or tea order?",
        emoji: "☕",
        type: "single",
        options: [
          { id: "a", text: "Black coffee — no nonsense", score: 1 },
          { id: "b", text: "Oat milk latte with a little something extra", score: 1 },
          { id: "c", text: "Green tea or herbal — I'm health-conscious", score: 1 },
          { id: "d", text: "I don't really drink caffeine", score: 1 },
        ],
        correctIds: ["a"],
      },
      {
        id: "q2",
        text: "What's the first thing I do when I wake up?",
        emoji: "🌅",
        type: "single",
        options: [
          { id: "a", text: "Check my phone immediately", score: 1 },
          { id: "b", text: "Lie in bed for a while before getting up", score: 1 },
          { id: "c", text: "Head straight to the bathroom", score: 1 },
          { id: "d", text: "Get up for an early workout or walk", score: 1 },
        ],
        correctIds: ["b"],
      },
      {
        id: "q3",
        text: "If I could eat only one cuisine for the rest of my life, it would be...",
        emoji: "🍜",
        type: "single",
        options: [
          { id: "a", text: "Italian — pasta and pizza forever", score: 1 },
          { id: "b", text: "Japanese — ramen, sushi, the works", score: 1 },
          { id: "c", text: "Mexican — tacos and guacamole all day", score: 1 },
          { id: "d", text: "Indian — nothing beats a good curry", score: 1 },
        ],
        correctIds: ["b"],
      },
      {
        id: "q4",
        text: "My biggest pet peeve is...",
        emoji: "😤",
        type: "single",
        options: [
          { id: "a", text: "People being late without letting me know", score: 1 },
          { id: "b", text: "Loud chewing or eating sounds", score: 1 },
          { id: "c", text: "Leaving dishes in the sink", score: 1 },
          { id: "d", text: "People interrupting mid-sentence", score: 1 },
        ],
        correctIds: ["d"],
      },
      {
        id: "q5",
        text: "When I'm stressed, I tend to...",
        emoji: "😰",
        type: "single",
        options: [
          { id: "a", text: "Get quiet and withdraw to process alone", score: 1 },
          { id: "b", text: "Talk it out with someone I trust", score: 1 },
          { id: "c", text: "Distract myself with TV, music, or food", score: 1 },
          { id: "d", text: "Exercise to blow off steam", score: 1 },
        ],
        correctIds: ["a"],
      },
      {
        id: "q6",
        text: "My dream vacation destination would be...",
        emoji: "🌍",
        type: "single",
        options: [
          { id: "a", text: "Santorini, Greece — sunsets and sea views", score: 1 },
          { id: "b", text: "Tokyo, Japan — culture and city energy", score: 1 },
          { id: "c", text: "Maldives — overwater bungalow and pure relaxation", score: 1 },
          { id: "d", text: "New York City — museums, food, and hustle", score: 1 },
        ],
        correctIds: ["c"],
      },
    ],
    results: [
      {
        id: "r1",
        minScore: 90,
        maxScore: 100,
        title: "You Know Me SO Well! 🏆",
        description:
          "Wow, you really do know me inside and out! You pay attention to the little things and truly get who I am. That's something really special.",
        emoji: "🏆",
        color: "#f59e0b",
      },
      {
        id: "r2",
        minScore: 60,
        maxScore: 89,
        title: "Pretty Impressive! 🌟",
        description:
          "You know me better than most! There are a couple of surprises left in me, but you clearly know what matters most.",
        emoji: "🌟",
        color: "#ec4899",
      },
      {
        id: "r3",
        minScore: 30,
        maxScore: 59,
        title: "Getting There! 💡",
        description:
          "You know the basics but there's more to discover about me. We need to spend more quality time together!",
        emoji: "💡",
        color: "#8b5cf6",
      },
      {
        id: "r4",
        minScore: 0,
        maxScore: 29,
        title: "We Need More Quality Time! 😄",
        description:
          "Looks like we still have a lot to learn about each other — but that's half the fun! Let's fix that with more adventures and deep conversations.",
        emoji: "🗺️",
        color: "#06b6d4",
      },
    ],
  },

  // ─── Love Language Quiz ─────────────────────────────────
  {
    id: "quiz-003",
    slug: "love-language-quiz",
    title: "What's Your Love Language?",
    description:
      "Discover how you give and receive love most naturally. Understanding your love language can transform your relationships.",
    category: "love",
    difficulty: "easy",
    emoji: "💝",
    coverGradient: "from-rose-400 to-pink-500",
    estimatedMinutes: 3,
    playCount: 112000,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    tags: ["love language", "relationship", "self-discovery"],
    publishedAt: "2024-01-01",
    disclaimer:
      "Love language theory is a popular framework, not a clinical assessment. Results are for fun and self-reflection.",
    questions: [
      {
        id: "q1",
        text: "When your partner does something really sweet, what means the most to you?",
        emoji: "💕",
        type: "single",
        options: [
          { id: "a", text: "They say exactly how much they appreciate you", tag: "words", score: 1 },
          { id: "b", text: "They surprise you with a thoughtful gift", tag: "gifts", score: 1 },
          { id: "c", text: "They spend dedicated, uninterrupted time with you", tag: "time", score: 1 },
          { id: "d", text: "They give you a long hug out of nowhere", tag: "touch", score: 1 },
          { id: "e", text: "They take care of something you needed to do", tag: "service", score: 1 },
        ],
      },
      {
        id: "q2",
        text: "What makes you feel most appreciated in a relationship?",
        emoji: "🙏",
        type: "single",
        options: [
          { id: "a", text: "Hearing 'I love you' and genuine compliments", tag: "words", score: 1 },
          { id: "b", text: "Receiving a gift that shows they were thinking of you", tag: "gifts", score: 1 },
          { id: "c", text: "Having their full, undivided attention", tag: "time", score: 1 },
          { id: "d", text: "Spontaneous hugs, kisses, or holding hands", tag: "touch", score: 1 },
          { id: "e", text: "When they handle things without being asked", tag: "service", score: 1 },
        ],
      },
      {
        id: "q3",
        text: "After a long hard day, what helps you feel better most?",
        emoji: "🛋️",
        type: "single",
        options: [
          { id: "a", text: "Your partner telling you how proud they are of you", tag: "words", score: 1 },
          { id: "b", text: "Finding a little surprise treat waiting for you", tag: "gifts", score: 1 },
          { id: "c", text: "Sitting together and talking about your day", tag: "time", score: 1 },
          { id: "d", text: "A long cuddle on the couch", tag: "touch", score: 1 },
          { id: "e", text: "Dinner already made or chores taken care of", tag: "service", score: 1 },
        ],
      },
      {
        id: "q4",
        text: "In a new relationship, what signals to you that someone really likes you?",
        emoji: "💌",
        type: "single",
        options: [
          { id: "a", text: "They text thoughtful messages and give genuine compliments", tag: "words", score: 1 },
          { id: "b", text: "They bring small gifts or pick up your favourite snack", tag: "gifts", score: 1 },
          { id: "c", text: "They make time for you and put away their phone", tag: "time", score: 1 },
          { id: "d", text: "They're comfortable with physical closeness", tag: "touch", score: 1 },
          { id: "e", text: "They go out of their way to help you", tag: "service", score: 1 },
        ],
      },
      {
        id: "q5",
        text: "The most romantic gesture a partner could make is...",
        emoji: "🌹",
        type: "single",
        options: [
          { id: "a", text: "Writing a heartfelt note or letter about your relationship", tag: "words", score: 1 },
          { id: "b", text: "Giving you something meaningful and personal", tag: "gifts", score: 1 },
          { id: "c", text: "Planning an entire day just for the two of you", tag: "time", score: 1 },
          { id: "d", text: "A slow dance at home, no music needed", tag: "touch", score: 1 },
          { id: "e", text: "Doing something you've been putting off without being asked", tag: "service", score: 1 },
        ],
      },
    ],
    results: [
      {
        id: "words",
        minScore: 0,
        maxScore: 100,
        title: "Words of Affirmation 💬",
        description:
          "You feel most loved through verbal expressions — compliments, encouraging words, and heartfelt 'I love yous'. In relationships, verbal acknowledgment and appreciation matter deeply to you. Share how much words mean to you with your partner!",
        emoji: "💬",
        color: "#ec4899",
      },
      {
        id: "gifts",
        minScore: 0,
        maxScore: 100,
        title: "Receiving Gifts 🎁",
        description:
          "For you, it's not about the price tag — it's the thought and effort behind a gift. Meaningful tokens show you that someone was thinking of you. You appreciate when people pay attention to what you love.",
        emoji: "🎁",
        color: "#f59e0b",
      },
      {
        id: "time",
        minScore: 0,
        maxScore: 100,
        title: "Quality Time ⏰",
        description:
          "Nothing says 'I love you' like someone giving you their full, undivided attention. You thrive on meaningful one-on-one time, deep conversations, and shared experiences where your partner is truly present.",
        emoji: "⏰",
        color: "#8b5cf6",
      },
      {
        id: "touch",
        minScore: 0,
        maxScore: 100,
        title: "Physical Touch 🤗",
        description:
          "For you, physical connection is deeply meaningful. Hugs, hand-holding, and closeness communicate love in a way words sometimes can't. You feel secure and loved through nurturing physical affection.",
        emoji: "🤗",
        color: "#ef4444",
      },
      {
        id: "service",
        minScore: 0,
        maxScore: 100,
        title: "Acts of Service 🛠️",
        description:
          "Actions speak louder than words for you. When someone goes out of their way to make your life easier or lighter, you feel truly cared for. You show love through helpfulness and appreciate when others do the same.",
        emoji: "🛠️",
        color: "#10b981",
      },
    ],
  },

  // ─── Best Friend Quiz ────────────────────────────────────
  {
    id: "quiz-004",
    slug: "best-friend-quiz",
    title: "Ultimate Best Friend Quiz",
    description:
      "The ultimate test of friendship! How well do you really know your bestie? Challenge them and find out!",
    category: "friends",
    difficulty: "medium",
    emoji: "👯",
    coverGradient: "from-amber-400 to-orange-500",
    estimatedMinutes: 4,
    playCount: 45600,
    isTrending: true,
    isNew: true,
    tags: ["best friend", "friendship", "fun", "trivia"],
    publishedAt: "2024-03-10",
    questions: [
      {
        id: "q1",
        text: "Which emoji best describes your bestie's personality?",
        emoji: "😄",
        type: "single",
        options: [
          { id: "a", text: "🦋 Free-spirited and full of energy", score: 1 },
          { id: "b", text: "🦁 Bold, confident, and a natural leader", score: 1 },
          { id: "c", text: "🐨 Chill, cozy, and easy-going", score: 1 },
          { id: "d", text: "🦊 Clever, witty, and always one step ahead", score: 1 },
        ],
        correctIds: ["b"],
      },
      {
        id: "q2",
        text: "If your bestie won the lottery, what would they do first?",
        emoji: "🎰",
        type: "single",
        options: [
          { id: "a", text: "Buy their dream home immediately", score: 1 },
          { id: "b", text: "Book a spontaneous trip around the world", score: 1 },
          { id: "c", text: "Invest wisely and tell very few people", score: 1 },
          { id: "d", text: "Spoil their family and close friends", score: 1 },
        ],
        correctIds: ["d"],
      },
      {
        id: "q3",
        text: "What would your bestie order at a restaurant without looking at the menu?",
        emoji: "🍽️",
        type: "single",
        options: [
          { id: "a", text: "Whatever the waiter recommends", score: 1 },
          { id: "b", text: "Their tried-and-true favourite dish", score: 1 },
          { id: "c", text: "The most interesting thing they've never tried", score: 1 },
          { id: "d", text: "Something healthy and light", score: 1 },
        ],
        correctIds: ["b"],
      },
      {
        id: "q4",
        text: "How does your bestie handle a bad day?",
        emoji: "☁️",
        type: "single",
        options: [
          { id: "a", text: "Calls you to vent and laugh about it", score: 1 },
          { id: "b", text: "Gets their workout in to release the tension", score: 1 },
          { id: "c", text: "Curls up with comfort food and a favourite show", score: 1 },
          { id: "d", text: "Goes quiet and processes it internally", score: 1 },
        ],
        correctIds: ["a"],
      },
      {
        id: "q5",
        text: "What's their go-to for a lazy Sunday?",
        emoji: "☀️",
        type: "single",
        options: [
          { id: "a", text: "Binge-watching a new series all day", score: 1 },
          { id: "b", text: "Brunch with friends, then a long walk", score: 1 },
          { id: "c", text: "A creative project or learning something new", score: 1 },
          { id: "d", text: "Complete and total rest — no plans, no people", score: 1 },
        ],
        correctIds: ["b"],
      },
      {
        id: "q6",
        text: "If your bestie could live anywhere, they'd choose...",
        emoji: "🏡",
        type: "single",
        options: [
          { id: "a", text: "A vibrant city — the energy is everything", score: 1 },
          { id: "b", text: "A quiet countryside cottage", score: 1 },
          { id: "c", text: "Somewhere by the ocean with warm weather", score: 1 },
          { id: "d", text: "Wherever their favourite people are", score: 1 },
        ],
        correctIds: ["c"],
      },
    ],
    results: [
      {
        id: "r1",
        minScore: 90,
        maxScore: 100,
        title: "Ultimate BFF Status! 🏆",
        description:
          "You two are practically the same person! The way you know every little detail about each other is truly friendship goals. You're not just best friends — you're soulmates!",
        emoji: "👑",
        color: "#f59e0b",
      },
      {
        id: "r2",
        minScore: 60,
        maxScore: 89,
        title: "Certified Best Friend! 🌟",
        description:
          "You know your bestie really well and clearly pay attention. A few surprises remain, but your bond is clearly something special.",
        emoji: "⭐",
        color: "#ec4899",
      },
      {
        id: "r3",
        minScore: 30,
        maxScore: 59,
        title: "Good Friend, Room to Grow! 💛",
        description:
          "You know the highlights but maybe missed some details along the way. Plan a bestie day to catch up on all the things you've missed!",
        emoji: "🌻",
        color: "#fbbf24",
      },
      {
        id: "r4",
        minScore: 0,
        maxScore: 29,
        title: "New Friendship Unlocked! 🌸",
        description:
          "It looks like you're just getting started! The best part of a new friendship is all the discovering ahead. Adventures await!",
        emoji: "🌸",
        color: "#a78bfa",
      },
    ],
  },
];

export function getQuizBySlug(slug: string): Quiz | undefined {
  return quizzes.find((q) => q.slug === slug);
}

export function getQuizzesByCategory(category: string): Quiz[] {
  return quizzes.filter((q) => q.category === category);
}

export function getFeaturedQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.isFeatured);
}

export function getTrendingQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.isTrending);
}

export function getNewQuizzes(): Quiz[] {
  return quizzes.filter((q) => q.isNew);
}

export function searchQuizzes(query: string): Quiz[] {
  const q = query.toLowerCase().trim();
  if (!q) return quizzes;
  return quizzes.filter(
    (quiz) =>
      quiz.title.toLowerCase().includes(q) ||
      quiz.description.toLowerCase().includes(q) ||
      quiz.tags.some((t) => t.includes(q))
  );
}

export const CATEGORIES = [
  { id: "couples", label: "Couples", emoji: "💑", description: "For you and your partner" },
  { id: "friends", label: "Friends", emoji: "👯", description: "Challenge your bestie" },
  { id: "personality", label: "Personality", emoji: "🌟", description: "Discover yourself" },
  { id: "party", label: "Party", emoji: "🎉", description: "Games for groups" },
  { id: "love", label: "Love & Romance", emoji: "💝", description: "All about love" },
  { id: "games", label: "Games", emoji: "🎮", description: "Interactive games" },
] as const;
