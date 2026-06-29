export const SAMPLE_PROMPTS = [
  "What technologies does Muhammad Imran specialize in?",
  "Tell me about the ToolSpark Store project",
  "How can I hire Muhammad Imran?",
  "What mobile apps has he built?",
  "What is his experience with React and Node.js?",
  "What services does he offer?",
];

export const INITIAL_MESSAGE =
  "Hi! 👋 I'm SmartTalk, Muhammad Imran's AI assistant.\n\n" +
  "I can answer questions about his skills, projects, experience, and services - or help you plan a project. What would you like to know?";

export const QUICK_ACTIONS = [
  { label: "🗂️ View My Projects", message: "Tell me about your projects" },
  { label: "🌐 I need a Website", message: "I need a website built" },
  { label: "📱 I need an App", message: "I need a mobile app built" },
] as const;
