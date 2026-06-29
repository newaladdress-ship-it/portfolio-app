import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const TOTAL_STEPS = 8;

export const CONSULTATION_STEPS: string[] = [
  "What type of project do you need?\n(e.g. website, mobile app, or software)",
  "What is the main purpose or goal of your project?",
  "How many pages or features do you need approximately?",
  "Do you need an admin panel or dashboard?",
  "Do you have any reference websites or apps you like?\n(or type 'no')",
  "What is your expected timeline for completion?",
  "Do you have content ready (text, images, logos), or should Muhammad Imran handle that too?",
  "Do you have a budget range in mind?\n(optional - type 'skip' if you prefer not to share)",
];

export const STEP_LABELS: string[] = [
  "Project Type",
  "Purpose",
  "Pages / Features",
  "Admin Panel",
  "References",
  "Timeline",
  "Content Ready",
  "Budget",
];

const ACK_PHRASES = [
  "Got it, that helps 👍",
  "Perfect, noted! 👍",
  "Great, thank you 👍",
  "Understood, noted 👍",
  "That's useful to know 👍",
  "Noted! 👍",
  "Got it 👍",
];

const HIRING_PATTERNS: RegExp[] = [
  /\b(want|need|looking for|hire|get)\s.{0,30}\b(website|web app|app|application|software|developer|dev)\b/i,
  /\b(build|create|make|develop)\s.{0,30}\b(website|app|software|system|platform)\b/i,
  /\b(i need|i want|i'd like|i would like)\s.{0,40}\b(website|app|software|project|developer)\b/i,
  /\bhire\s.{0,20}\byou\b/i,
  /\bdo you (take|accept|do) (freelance|projects|work|commissions)\b/i,
  /\b(quote|price|cost|how much).{0,30}\b(website|app|project|build)\b/i,
  /\b(work together|collaborate|work with you)\b/i,
  /\bneed a (web|mobile|app|software|developer|dev)\b/i,
];

export function detectHiringIntent(text: string): boolean {
  return HIRING_PATTERNS.some(p => p.test(text));
}

export function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function buildIntroMessage(): string {
  return (
    `Great! I'd love to help you define your project requirements.\n\n` +
    `Muhammad Imran will review your brief personally. ` +
    `I'll ask you ${TOTAL_STEPS} quick questions - one at a time.\n\n` +
    `Question 1 of ${TOTAL_STEPS}:\n${CONSULTATION_STEPS[0]}`
  );
}

export function buildStepMessage(step: number): string {
  return `Question ${step} of ${TOTAL_STEPS}:\n${CONSULTATION_STEPS[step - 1]}`;
}

export function buildAckMessage(nextStep: number): string {
  const ack = ACK_PHRASES[(nextStep - 2) % ACK_PHRASES.length];
  return `${ack}\n\n${buildStepMessage(nextStep)}`;
}

export function generateSummaryPrompt(answers: string[]): string {
  const details = STEP_LABELS
    .map((label, i) => `${label}: ${answers[i] ?? "not specified"}`)
    .join("\n");

  return (
    `A potential client has submitted a project consultation. Create a professional project brief summary.\n\n` +
    `CLIENT ANSWERS:\n${details}\n\n` +
    `FORMAT YOUR RESPONSE EXACTLY LIKE THIS:\n` +
    `📋 PROJECT BRIEF\n\n` +
    `Project Type: [value]\n` +
    `Purpose: [value]\n` +
    `Key Features: [value]\n` +
    `Timeline: [value]\n` +
    `Content Ready: [value]\n` +
    `Budget: [value]\n\n` +
    `Assessment:\n[Write 2 concise sentences about the project scope and how Muhammad Imran can help.]\n\n` +
    `This looks great. Let's discuss this further to finalize details.`
  );
}

export async function createLeadDoc(
  sessionId: string,
  source: string
): Promise<string> {
  const ref = await addDoc(collection(db, "client_leads"), {
    sessionId,
    answers: [],
    currentStep: 0,
    complete: false,
    source,
    createdAt: new Date(),
  });
  return ref.id;
}

export async function updateLeadDoc(
  docId: string,
  answers: string[],
  currentStep: number,
  complete = false
): Promise<void> {
  await updateDoc(doc(db, "client_leads", docId), {
    answers,
    currentStep,
    complete,
    updatedAt: new Date(),
  });
}

export async function trackAnalytics(
  event: string,
  sessionId: string,
  extra: Record<string, unknown> = {}
): Promise<void> {
  try {
    await addDoc(collection(db, "chat_analytics"), {
      event,
      sessionId,
      ...extra,
      timestamp: new Date(),
    });
  } catch {}
}
