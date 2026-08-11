import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Bot, Send, Loader2, Sparkles, RefreshCw, Copy, Check, Mail, CheckCircle2, HelpCircle, ArrowRight, Code2, Layers, Briefcase, Cpu } from "lucide-react";
import { INITIAL_MESSAGE, QUICK_ACTIONS, SAMPLE_PROMPTS } from "@/data/portfolioContext";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import {
  generateSessionId,
  trackAnalytics,
} from "@/lib/consultation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FALLBACK_ERROR =
  "We apologize for the inconvenience. Our AI assistant is temporarily unavailable. Please try again in a moment, or feel free to reach out directly via email at mi6062610@gmail.com.";

async function streamChat(
  messages: Message[],
  onChunk: (text: string) => void,
  onDone: () => void,
  onError: (e: string) => void
) {
  try {
    const res = await fetch("/api/smarttalk/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    if (!res.ok || !res.body) {
      onError(FALLBACK_ERROR);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        try {
          const json = JSON.parse(line.slice(6));
          if (json.done) {
            onDone();
            return;
          }
          if (json.error) {
            onError(FALLBACK_ERROR);
            return;
          }
          if (json.content) onChunk(json.content);
        } catch {}
      }
    }
    onDone();
  } catch {
    onError(FALLBACK_ERROR);
  }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] transition-all text-[#5C655F]"
      title="Copy message"
    >
      {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center shrink-0">
        <Bot size={18} />
      </div>
      <div className="px-4 py-3 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] rounded-tl-none shadow-xs">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-2 h-2 rounded-full bg-[#C96A3D] animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SmartTalkPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionId = useRef(generateSessionId());

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    textareaRef.current?.focus();
    trackAnalytics("smarttalk_page_opened", sessionId.current);
  }, []);

  const handleSend = async (userText?: string) => {
    const textToSend = (userText ?? input).trim();
    if (!textToSend || loading) return;

    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    const newMessages: Message[] = [...messages, { role: "user", content: textToSend }];
    setMessages(newMessages);
    setLoading(true);
    setIsTyping(true);

    let assistantText = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    await streamChat(
      newMessages,
      (chunk) => {
        setIsTyping(false);
        assistantText += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: assistantText };
          return updated;
        });
      },
      () => {
        setLoading(false);
        setIsTyping(false);
      },
      (errorMsg) => {
        setIsTyping(false);
        setLoading(false);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: errorMsg };
          return updated;
        });
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([{ role: "assistant", content: INITIAL_MESSAGE }]);
    setInput("");
    setLoading(false);
    setIsTyping(false);
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://imrandigitals.com/" },
      { "@type": "ListItem", position: 2, name: "SmartTalk AI", item: "https://imrandigitals.com/smarttalk" },
    ],
  };

  return (
    <>
      <SEOHead
        title="SmartTalk AI | Muhammad Imran's Portfolio Assistant"
        description="Chat with SmartTalk AI to explore Muhammad Imran's skills, projects, services, experience, and web development capabilities, or discuss your project idea."
        path="/smarttalk"
        jsonLd={[breadcrumbJsonLd]}
      />

      <div className="space-y-16 py-6 font-sans">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]"
        >
          <Link href="/" className="hover:text-[#C96A3D] transition-colors">
            Home
          </Link>
          <span className="mx-2 text-[#D9D4CA] dark:text-[#2A3632]">/</span>
          <span className="text-[#17211E] dark:text-[#F5F2EC]">SmartTalk AI</span>
        </nav>

        {/* ---------------- HERO / HEADER ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <Sparkles size={14} className="text-[#C96A3D]" />
              <span>Interactive Portfolio Assistant · Powered by Gemini AI</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              SmartTalk AI
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Ask About Muhammad Imran. Explore His Work. Plan Your Project.
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              SmartTalk is an AI assistant built into the Imran Digitals portfolio to help visitors quickly learn about Muhammad Imran's development experience, projects, services, technical skills, and professional background.
            </p>
            <p>
              You can ask questions about his work or describe what you want to build, and SmartTalk can help you find relevant information and understand which development service may fit your requirements.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- MEET SMARTTALK ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-6 shadow-xs font-sans">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Meet SmartTalk
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0]">
              Hi! I'm SmartTalk, the AI assistant for Muhammad Imran's portfolio.
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]/50">
            <h3 className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
              I can help you explore his:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
              {[
                "Web development skills",
                "React and Next.js experience",
                "MERN stack development",
                "Full-stack projects",
                "Web applications and digital tools",
                "Technical SEO and performance work",
                "Professional experience",
                "Services & engagement options",
                "Portfolio projects & case studies",
                "Development capabilities",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C96A3D] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
            You can also tell me what you're trying to build and use the conversation as a starting point for planning your project.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- WHAT WOULD YOU LIKE TO KNOW? ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What Would You Like to Know?" icon={<HelpCircle />} />
            <SectionSubHeading>
              <p>Choose a category or click a prompt to start a conversation with SmartTalk.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Explore My Projects */}
            <SpotlightCard className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Layers size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                  Explore My Projects
                </h3>
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Ask SmartTalk about Muhammad Imran's projects, the problems they solve, the technologies used, and the development work involved.
              </p>
              <button
                onClick={() => handleSend("Tell me about Muhammad Imran's recent projects.")}
                className="w-full text-left p-3 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] border border-[#D9D4CA]/60 dark:border-[#2A3632] transition-colors text-xs font-mono text-[#C96A3D] flex items-center justify-between"
              >
                <span>“Tell me about Muhammad Imran's recent projects.”</span>
                <ArrowRight size={13} />
              </button>
            </SpotlightCard>

            {/* Ask About Development Skills */}
            <SpotlightCard className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Code2 size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                  Ask About Development Skills
                </h3>
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Learn about the technologies and development areas Muhammad Imran works with, including React, Next.js, TypeScript, Node.js, MongoDB, Firebase, and full-stack development.
              </p>
              <button
                onClick={() => handleSend("What technologies does Muhammad Imran specialize in?")}
                className="w-full text-left p-3 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] border border-[#D9D4CA]/60 dark:border-[#2A3632] transition-colors text-xs font-mono text-[#C96A3D] flex items-center justify-between"
              >
                <span>“What technologies does Muhammad Imran specialize in?”</span>
                <ArrowRight size={13} />
              </button>
            </SpotlightCard>

            {/* Find the Right Service */}
            <SpotlightCard className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Briefcase size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                  Find the Right Service
                </h3>
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Describe the website, application, dashboard, or digital system you want to build and SmartTalk can help you understand which service may be relevant.
              </p>
              <button
                onClick={() => handleSend("I need a website for my business.")}
                className="w-full text-left p-3 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] border border-[#D9D4CA]/60 dark:border-[#2A3632] transition-colors text-xs font-mono text-[#C96A3D] flex items-center justify-between"
              >
                <span>“I need a website for my business.”</span>
                <ArrowRight size={13} />
              </button>
            </SpotlightCard>

            {/* Discuss a Project */}
            <SpotlightCard className="p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                  <Cpu size={20} />
                </div>
                <h3 className="font-heading font-bold text-lg text-[#17211E] dark:text-[#F5F2EC]">
                  Discuss a Project
                </h3>
              </div>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Have an idea but don't know exactly how it should be built? Describe the problem, features, or outcome you're looking for.
              </p>
              <button
                onClick={() => handleSend("I want to build a web application for managing customers.")}
                className="w-full text-left p-3 rounded-xl bg-[#F5F2EC]/80 dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] border border-[#D9D4CA]/60 dark:border-[#2A3632] transition-colors text-xs font-mono text-[#C96A3D] flex items-center justify-between"
              >
                <span>“I want to build a web application for managing customers.”</span>
                <ArrowRight size={13} />
              </button>
            </SpotlightCard>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- INTERACTIVE SMARTTALK CHAT INTERFACE ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="flex items-center justify-between">
            <SectionHeading title="Start a Conversation" icon={<Bot />} />
            {messages.length > 1 && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5C655F] hover:text-[#C96A3D] transition-colors"
              >
                <RefreshCw size={13} />
                <span>Reset Chat</span>
              </button>
            )}
          </div>

          {/* Quick Action Chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.message)}
                disabled={loading}
                className="px-3 py-1.5 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] text-xs font-mono text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] hover:border-[#C96A3D]/50 transition-colors shadow-xs"
              >
                {action.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Feed Container */}
          <SpotlightCard className="p-4 sm:p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex flex-col h-[560px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-mono text-xs font-bold ${
                      msg.role === "user"
                        ? "bg-[#17211E] dark:bg-[#F5F2EC] text-[#FFFEFA] dark:text-[#17211E]"
                        : "bg-[#C96A3D]/10 text-[#C96A3D]"
                    }`}
                  >
                    {msg.role === "user" ? "YOU" : <Bot size={16} />}
                  </div>

                  <div
                    className={`group relative max-w-[85%] sm:max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#C96A3D] text-white rounded-tr-none"
                        : "bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/60 dark:border-[#2A3632] rounded-tl-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.content}
                    {msg.role === "assistant" && msg.content && (
                      <div className="absolute top-2 right-2">
                        <CopyButton text={msg.content} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={endRef} />
            </div>

            {/* Input Bar */}
            <div className="mt-4 pt-3 border-t border-[#D9D4CA]/50 dark:border-[#2A3632] space-y-2">
              <div className="flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message SmartTalk..."
                  rows={2}
                  disabled={loading}
                  className="flex-1 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 focus:outline-none focus:border-[#C96A3D] transition-colors resize-none"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className="px-5 py-3 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm disabled:opacity-40 transition-colors shrink-0 flex items-center gap-2 shadow-xs"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  <span>Send</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] px-1">
                <span>Enter to send · Shift + Enter for a new line</span>
                <span>Verified Portfolio AI</span>
              </div>
            </div>
          </SpotlightCard>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- WHAT SMARTTALK CAN HELP WITH ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What SmartTalk Can Help With" icon={<Sparkles />} />
            <SectionSubHeading>
              <p>SmartTalk makes the portfolio easier to explore without requiring you to search through multiple pages.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Projects
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Explore development projects and understand what was built and why.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Briefcase size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Services
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Learn about website development, web applications, full-stack development, React, Next.js, dashboards, and technical SEO.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Code2 size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Experience
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Ask about his professional background, development experience, education, and certifications.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Cpu size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Technology
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Explore the technologies and tools used across his projects.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Bot size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Project Requirements
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Describe what you want to build and start a conversation about the type of solution you may need.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- NEED A REAL PROJECT BUILT? ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-6 font-sans">
          <div className="space-y-3 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Need a Real Project Built?
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              SmartTalk can help you explore the portfolio, but project discussions can also be taken directly to Muhammad Imran. If you already know what you want to build, send a project inquiry with your requirements and goals.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm transition-colors duration-200 shadow-xs"
            >
              Start a Project <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-[#17211E] dark:text-[#F5F2EC] font-heading font-medium text-sm border border-[#D9D4CA] dark:border-[#2A3632] transition-colors duration-200"
            >
              Contact Muhammad Imran
            </Link>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- ABOUT SMARTTALK ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-3">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              About SmartTalk
            </h2>
            <div className="space-y-3 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                SmartTalk is an AI-powered portfolio assistant developed for Imran Digitals. It is designed to provide a conversational way for visitors to explore information about Muhammad Imran and his development work.
              </p>
              <p>
                The assistant is intended to complement the portfolio—not replace direct communication. For project proposals, pricing, contracts, or important business decisions, contact Muhammad Imran directly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
