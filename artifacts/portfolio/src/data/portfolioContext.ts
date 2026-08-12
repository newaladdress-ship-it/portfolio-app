export const SAMPLE_PROMPTS = [
  "What technologies does Muhammad Imran specialize in?",
  "What AI solutions can Muhammad Imran build?",
  "Tell me about the ToolSpark Store project",
  "How can I contact Muhammad Imran?",
  "Tell me about his web development experience",
  "What services does he offer?",
  "I need an AI-powered web application for my business",
];

export const INITIAL_MESSAGE =
  "Hi! I'm SmartTalk, Muhammad Imran's AI portfolio assistant. Ask me about his projects, development skills, AI capabilities, experience, services, or tell me what you're looking to build. I'll help you find the most relevant information.";

export const QUICK_ACTIONS = [
  { label: "🗂️ View Projects", message: "Tell me about your recent projects" },
  { label: "🌐 I Need a Website", message: "I need a website built for my business" },
  { label: "💻 I Need a Web App", message: "I want to build a custom web application" },
  { label: "🤖 I Need an AI Solution", message: "What AI solutions can Muhammad Imran build?" },
  { label: "✉️ How Can I Contact Him?", message: "How can I contact Muhammad Imran?" },
] as const;

export const SYSTEM_PROMPT_TRUTHFULNESS_INSTRUCTION =
  "Only answer questions about Muhammad Imran using verified portfolio data, projects, services, experience, education, certifications, and other approved knowledge sources. If information is unavailable or unverified in the portfolio, clearly state that it is not currently documented rather than inventing or guessing answers.";

