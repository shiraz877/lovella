import type { WouldYouRatherQuestion, TruthOrDareItem, ThisOrThatItem, WhoIsMoreLikelyItem } from "@/types/quiz";

// ─── Would You Rather ──────────────────────────────────────
export const wouldYouRatherQuestions: WouldYouRatherQuestion[] = [
  { id: "wyr-1", optionA: "Always be 10 minutes late", optionB: "Always be 20 minutes early", category: "lifestyle" },
  { id: "wyr-2", optionA: "Have unlimited money but no true love", optionB: "Have true love but always struggle financially", category: "love" },
  { id: "wyr-3", optionA: "Know when you'll die", optionB: "Know how you'll die", category: "deep" },
  { id: "wyr-4", optionA: "Be famous for something embarrassing", optionB: "Be anonymous but accomplished", category: "life" },
  { id: "wyr-5", optionA: "Live without music for a year", optionB: "Live without your phone for a year", category: "lifestyle" },
  { id: "wyr-6", optionA: "Always say what's on your mind", optionB: "Never be able to speak your mind", category: "deep" },
  { id: "wyr-7", optionA: "Have your dream relationship with average finances", optionB: "Be wealthy but perpetually single", category: "love" },
  { id: "wyr-8", optionA: "Travel the world for a year solo", optionB: "Stay home with your favourite person forever", category: "love" },
  { id: "wyr-9", optionA: "Reread your favourite book forever but read nothing new", optionB: "Read new books but never revisit favourites", category: "lifestyle" },
  { id: "wyr-10", optionA: "Have a photographic memory", optionB: "Be able to forget anything you choose", category: "superpower" },
  { id: "wyr-11", optionA: "Only eat sweet food for the rest of your life", optionB: "Only eat savoury food for the rest of your life", category: "food" },
  { id: "wyr-12", optionA: "Know all languages fluently", optionB: "Play every musical instrument perfectly", category: "superpower" },
  { id: "wyr-13", optionA: "Live in a city you love but see your partner less", optionB: "Live somewhere you dislike but with your partner always", category: "love" },
  { id: "wyr-14", optionA: "Have your first date go perfectly but not lead anywhere", optionB: "Have a rough first date that leads to your soulmate", category: "love" },
  { id: "wyr-15", optionA: "Never feel physical pain again", optionB: "Never feel heartbreak or loneliness again", category: "deep" },
];

// ─── Truth or Dare ──────────────────────────────────────────
export const truthOrDareItems: TruthOrDareItem[] = [
  // Truths - Mild
  { id: "tod-t1", type: "truth", text: "What's the most embarrassing thing you've done on a date?", intensity: "mild" },
  { id: "tod-t2", type: "truth", text: "What's a habit you have that you'd be embarrassed if others found out?", intensity: "mild" },
  { id: "tod-t3", type: "truth", text: "Who was your first celebrity crush?", intensity: "mild" },
  { id: "tod-t4", type: "truth", text: "What's the silliest reason you've ever cried?", intensity: "mild" },
  { id: "tod-t5", type: "truth", text: "What's a lie you told to get out of plans?", intensity: "mild" },
  // Truths - Medium
  { id: "tod-t6", type: "truth", text: "What's something you've never told your best friend?", intensity: "medium" },
  { id: "tod-t7", type: "truth", text: "Have you ever had feelings for a friend's partner?", intensity: "medium" },
  { id: "tod-t8", type: "truth", text: "What's the most rebellious thing you've ever done?", intensity: "medium" },
  { id: "tod-t9", type: "truth", text: "What's a recurring dream you have?", intensity: "medium" },
  { id: "tod-t10", type: "truth", text: "What's something you're secretly proud of but haven't told anyone?", intensity: "medium" },
  // Truths - Spicy
  { id: "tod-t11", type: "truth", text: "What's the most romantic thing you've ever done for someone?", intensity: "spicy" },
  { id: "tod-t12", type: "truth", text: "Who in this room would you swap lives with and why?", intensity: "spicy" },
  { id: "tod-t13", type: "truth", text: "What's something you find attractive that might surprise people?", intensity: "spicy" },
  // Dares - Mild
  { id: "tod-d1", type: "dare", text: "Send a voice message to the last person you texted saying 'I appreciate you'", intensity: "mild" },
  { id: "tod-d2", type: "dare", text: "Do your best impression of someone in the group — they have to guess who", intensity: "mild" },
  { id: "tod-d3", type: "dare", text: "Text your crush (or partner) a cheesy pick-up line right now", intensity: "mild" },
  { id: "tod-d4", type: "dare", text: "Show the last photo you took on your phone", intensity: "mild" },
  { id: "tod-d5", type: "dare", text: "Speak in an accent for the next 3 rounds", intensity: "mild" },
  // Dares - Medium
  { id: "tod-d6", type: "dare", text: "Call a family member and tell them you love them", intensity: "medium" },
  { id: "tod-d7", type: "dare", text: "Let someone post a photo of you to your Instagram story", intensity: "medium" },
  { id: "tod-d8", type: "dare", text: "Write a compliment for each person here and read them aloud", intensity: "medium" },
  { id: "tod-d9", type: "dare", text: "Dance to a song chosen by the group for 30 seconds", intensity: "medium" },
  // Dares - Spicy
  { id: "tod-d10", type: "dare", text: "Send a voice note to your ex or an old friend you've lost touch with", intensity: "spicy" },
  { id: "tod-d11", type: "dare", text: "Let the group post a story to your account — they choose the caption", intensity: "spicy" },
  { id: "tod-d12", type: "dare", text: "Compliment every person here on something specific and genuine", intensity: "spicy" },
];

// ─── This or That ───────────────────────────────────────────
export const thisOrThatItems: ThisOrThatItem[] = [
  { id: "tot-1", optionA: "Coffee", optionB: "Tea", emojiA: "☕", emojiB: "🍵", category: "drinks" },
  { id: "tot-2", optionA: "Beach", optionB: "Mountains", emojiA: "🏖️", emojiB: "🏔️", category: "travel" },
  { id: "tot-3", optionA: "Introvert", optionB: "Extrovert", emojiA: "📚", emojiB: "🎉", category: "personality" },
  { id: "tot-4", optionA: "Morning person", optionB: "Night owl", emojiA: "🌅", emojiB: "🌙", category: "lifestyle" },
  { id: "tot-5", optionA: "Cats", optionB: "Dogs", emojiA: "🐱", emojiB: "🐶", category: "pets" },
  { id: "tot-6", optionA: "Movies", optionB: "TV Shows", emojiA: "🎬", emojiB: "📺", category: "entertainment" },
  { id: "tot-7", optionA: "Sweet", optionB: "Savoury", emojiA: "🍰", emojiB: "🍕", category: "food" },
  { id: "tot-8", optionA: "City life", optionB: "Country life", emojiA: "🏙️", emojiB: "🌾", category: "lifestyle" },
  { id: "tot-9", optionA: "Summer", optionB: "Winter", emojiA: "☀️", emojiB: "❄️", category: "seasons" },
  { id: "tot-10", optionA: "Text", optionB: "Call", emojiA: "💬", emojiB: "📞", category: "communication" },
  { id: "tot-11", optionA: "Cooking at home", optionB: "Going out to eat", emojiA: "👨‍🍳", emojiB: "🍽️", category: "food" },
  { id: "tot-12", optionA: "Road trip", optionB: "Flight trip", emojiA: "🚗", emojiB: "✈️", category: "travel" },
  { id: "tot-13", optionA: "Big social gatherings", optionB: "Intimate dinner parties", emojiA: "🎊", emojiB: "🕯️", category: "social" },
  { id: "tot-14", optionA: "Reading", optionB: "Listening to podcasts", emojiA: "📖", emojiB: "🎧", category: "hobbies" },
  { id: "tot-15", optionA: "Spontaneous plans", optionB: "Planned schedules", emojiA: "⚡", emojiB: "📅", category: "lifestyle" },
];

// ─── Who Is More Likely To? ──────────────────────────────────
export const whoIsMoreLikelyItems: WhoIsMoreLikelyItem[] = [
  { id: "wiml-1", prompt: "Get lost without GPS", emoji: "🗺️" },
  { id: "wiml-2", prompt: "Start a random conversation with a stranger", emoji: "💬" },
  { id: "wiml-3", prompt: "Cry at a movie", emoji: "🎬" },
  { id: "wiml-4", prompt: "Order the same thing every time at a restaurant", emoji: "🍽️" },
  { id: "wiml-5", prompt: "Forget an important anniversary", emoji: "📅" },
  { id: "wiml-6", prompt: "Be the last one to leave a party", emoji: "🎉" },
  { id: "wiml-7", prompt: "Adopt a stray animal they just met", emoji: "🐾" },
  { id: "wiml-8", prompt: "Go on a spontaneous trip with no plan", emoji: "✈️" },
  { id: "wiml-9", prompt: "Stress-clean the entire house", emoji: "🧹" },
  { id: "wiml-10", prompt: "Pull an all-nighter for fun", emoji: "🌙" },
  { id: "wiml-11", prompt: "Start their own business", emoji: "💼" },
  { id: "wiml-12", prompt: "Accidentally send a message to the wrong person", emoji: "😬" },
  { id: "wiml-13", prompt: "Splurge on something completely unnecessary", emoji: "💸" },
  { id: "wiml-14", prompt: "Win an argument by being too logical", emoji: "🧠" },
  { id: "wiml-15", prompt: "Be the first to say 'I love you'", emoji: "💕" },
];
