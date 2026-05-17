import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Bot, Send, Loader2, Sparkles, RefreshCw, Copy, Check, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { INITIAL_MESSAGE, QUICK_ACTIONS, SAMPLE_PROMPTS } from "@/data/portfolioContext";
import {
  TOTAL_STEPS,
  detectHiringIntent,
  generateSessionId,
  buildIntroMessage,
  buildAckMessage,
  generateSummaryPrompt,
  createLeadDoc,
  updateLeadDoc,
  trackAnalytics,
  delay,
} from "@/lib/consultation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WA_TEXT = encodeURIComponent(
  "Hi Muhammad! I just completed the SmartTalk consultation on your portfolio. I'm interested in discussing my project."
);
const EMAIL_HREF =
  "mailto:mi6062610@gmail.com?subject=Project%20Enquiry%20via%20SmartTalk&body=Hi%20Muhammad%2C%0A%0AI%20completed%20the%20SmartTalk%20consultation%20on%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20my%20project.";
const FALLBACK_ERROR =
  "We apologize for the inconvenience. Our AI assistant is temporarily unavailable. Please try again in a moment, or feel free to reach out directly via WhatsApp (+92 334 5636230) or email mi6062610@gmail.com.";

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
    if (!res.ok || !res.body) { onError(FALLBACK_ERROR); return; }

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
          if (json.done) { onDone(); return; }
          if (json.error) { onError(FALLBACK_ERROR); return; }
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
      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
      title="Copy"
    >
      {copied ? (
        <Check size={12} className="text-green-500" />
      ) : (
        <Copy size={12} className="text-neutral-400" />
      )}
    </button>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-md">
        <Bot size={18} className="text-white" />
      </div>
      <div className="px-4 py-3 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-tl-sm shadow-sm">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 150, 300].map(d => (
            <span
              key={d}
              className="w-2 h-2 rounded-full bg-neutral-400 animate-bounce"
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

  const [consultMode, setConsultMode] = useState(false);
  const [consultStep, setConsultStep] = useState(0);
  const [leadAnswers, setLeadAnswers] = useState<string[]>([]);
  const [showConsultPrompt, setShowConsultPrompt] = useState(false);

  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [emailName, setEmailName] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const endRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const sessionSaved = useRef(false);
  const sessionId = useRef(generateSessionId());
  const leadDocId = useRef<string | null>(null);
  const isSendingRef = useRef(false);

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);
  useEffect(() => {
    textareaRef.current?.focus();
    trackAnalytics("smarttalk_page_opened", sessionId.current);
  }, []);

  const saveSession = async (msgs: Message[]) => {
    if (sessionSaved.current || msgs.length <= 1) return;
    try {
      await addDoc(collection(db, "chat_logs"), {
        messages: msgs,
        timestamp: new Date(),
        source: "smarttalk-page",
      });
      sessionSaved.current = true;
    } catch {}
  };

  const saveLead = async (answers: string[], step: number, complete = false) => {
    try {
      if (!leadDocId.current) {
        leadDocId.current = await createLeadDoc(sessionId.current, "smarttalk-page");
      }
      await updateLeadDoc(leadDocId.current, answers, step, complete);
    } catch {}
  };

  const pushAssistantMessage = (content: string) => {
    setMessages(prev => [...prev, { role: "assistant", content }]);
  };

  const appendLastChunk = (chunk: string) => {
    setMessages(prev => {
      const updated = [...prev];
      const last = updated[updated.length - 1];
      updated[updated.length - 1] = {
        role: "assistant",
        content: last.content + chunk,
      };
      return updated;
    });
  };

  const showDelayed = async (content: string, ms = 900) => {
    setIsTyping(true);
    await delay(ms);
    setIsTyping(false);
    pushAssistantMessage(content);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || isTyping || isSendingRef.current) return;
    isSendingRef.current = true;
    const trimmed = text.trim();

    try {
      setMessages(prev => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      if (!consultMode) {
        if (detectHiringIntent(trimmed) && !showConsultPrompt) {
          setShowConsultPrompt(true);
          await showDelayed(
            "It sounds like you're interested in getting a project built! 🎯\n\n" +
            "I can walk you through 8 quick questions to help define your project requirements. " +
            "Muhammad Imran will personally review your brief.\n\n" +
            "Would you like to start the consultation?",
            1000
          );
          return;
        }

        setLoading(true);
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);
        const history = [...messages, { role: "user", content: trimmed }] as Message[];

        await streamChat(
          history,
          appendLastChunk,
          () => {
            setLoading(false);
            setMessages(prev => { saveSession(prev); return prev; });
          },
          (err) => {
            setLoading(false);
            setMessages(prev => {
              const u = [...prev];
              u[u.length - 1] = { role: "assistant", content: err };
              return u;
            });
          }
        );
        return;
      }

      const newAnswers = [...leadAnswers, trimmed];
      setLeadAnswers(newAnswers);
      await saveLead(newAnswers, consultStep);

      if (consultStep < TOTAL_STEPS) {
        const nextStep = consultStep + 1;
        setConsultStep(nextStep);
        await showDelayed(buildAckMessage(nextStep), 800);
        return;
      }

      setConsultStep(TOTAL_STEPS + 1);
      await saveLead(newAnswers, TOTAL_STEPS, true);
      await trackAnalytics("consultation_completed", sessionId.current, {
        answers: newAnswers,
      });

      setLoading(true);
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      await streamChat(
        [{ role: "user", content: generateSummaryPrompt(newAnswers) }],
        appendLastChunk,
        () => { setLoading(false); },
        (err) => {
          setLoading(false);
          setMessages(prev => {
            const u = [...prev];
            u[u.length - 1] = { role: "assistant", content: err };
            return u;
          });
        }
      );
    } finally {
      isSendingRef.current = false;
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const sendEmailToAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailName.trim() || !emailAddr.trim() || emailSending) return;
    setEmailSending(true);
    setEmailError("");
    try {
      const res = await fetch("/api/smarttalk/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: emailName.trim(),
          email: emailAddr.trim(),
          messages,
          leadAnswers,
          sessionId: sessionId.current,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setEmailSent(true);
    } catch {
      setEmailError("Couldn't send. Please try WhatsApp or the contact form.");
    } finally {
      setEmailSending(false);
    }
  };

  const resetChat = () => {
    setMessages([{ role: "assistant", content: INITIAL_MESSAGE }]);
    sessionSaved.current = false;
    setConsultMode(false);
    setConsultStep(0);
    setLeadAnswers([]);
    setShowConsultPrompt(false);
    leadDocId.current = null;
    setInput("");
    setIsTyping(false);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const isConsultDone = consultMode && consultStep > TOTAL_STEPS && !loading;
  const progressPct =
    consultMode && consultStep <= TOTAL_STEPS
      ? Math.round(((consultStep - 1) / TOTAL_STEPS) * 100)
      : consultStep > TOTAL_STEPS
      ? 100
      : 0;

  const isDisabled = loading || isTyping || isSendingRef.current;
  const placeholder =
    consultMode && consultStep <= TOTAL_STEPS
      ? `Your answer for question ${consultStep} of ${TOTAL_STEPS}...`
      : "Ask about skills, projects, or say 'I need a website'...";

  return (
    <div className="flex flex-col" style={{ minHeight: "calc(100vh - 4rem)" }}>
      <SEOHead
        title="SmartTalk — AI Assistant by Muhammad Imran, Developer"
        description="SmartTalk is an AI-powered assistant by Muhammad Imran. Ask questions about his projects, skills, experience & web development work in real time."
        path="/smarttalk"
      />
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 text-white py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-4">
            <Sparkles size={14} />
            <span>Powered by Gemini AI</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">SmartTalk AI</h1>
          <p className="text-white/80 text-base max-w-xl mx-auto">
            {consultMode
              ? "Defining your project requirements — Muhammad Imran will review your brief personally."
              : "Ask me anything about Muhammad Imran, or tell me what project you need built."}
          </p>

          {consultMode && (
            <div className="mt-5 max-w-sm mx-auto">
              <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
                <span>
                  {isTyping
                    ? "AI is typing..."
                    : consultStep <= TOTAL_STEPS
                    ? `Question ${consultStep} of ${TOTAL_STEPS}`
                    : "All done! ✓"}
                </span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {consultStep <= TOTAL_STEPS && (
                <div className="flex justify-between mt-1.5 px-0.5">
                  {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i < consultStep - 1
                          ? "bg-white scale-100"
                          : i === consultStep - 1
                          ? "bg-yellow-300 scale-125"
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 pb-4">
        <div className="flex-1 py-6 space-y-5 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "assistant" ? (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shrink-0 shadow-md">
                  <Bot size={18} className="text-white" />
                </div>
              ) : (
                <div className="w-9 h-9 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center shrink-0 shadow-sm">
                  <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    You
                  </span>
                </div>
              )}
              <div
                className={`group max-w-[82%] flex flex-col gap-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-sm"
                      : "bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 border border-neutral-100 dark:border-neutral-700 rounded-tl-sm"
                  }`}
                >
                  {msg.content !== "" ? (
                    msg.content
                  ) : msg.role === "assistant" && loading ? (
                    <span className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
                      <Loader2 size={14} className="animate-spin" />
                      {consultStep > TOTAL_STEPS
                        ? "Generating your project brief..."
                        : "Thinking..."}
                    </span>
                  ) : null}
                </div>
                {msg.role === "assistant" && msg.content && (
                  <CopyButton text={msg.content} />
                )}
              </div>
            </div>
          ))}

          {isTyping && <TypingIndicator />}

          {showConsultPrompt && !consultMode && !loading && !isTyping && (
            <div className="flex items-center justify-center gap-3 py-3">
              <button
                onClick={async () => {
                  setShowConsultPrompt(false);
                  setConsultMode(true);
                  setConsultStep(1);
                  await saveLead([], 0);
                  await trackAnalytics("consultation_started", sessionId.current);
                  await showDelayed(buildIntroMessage(), 800);
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <Sparkles size={15} />
                Start
              </button>
              <button
                onClick={() => {
                  setShowConsultPrompt(false);
                  pushAssistantMessage(
                    "No problem! Feel free to keep chatting. You can ask me anything about Muhammad Imran's skills, projects, or experience. 😊"
                  );
                }}
                className="px-6 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all shadow-sm cursor-pointer"
              >
                Not Now
              </button>
            </div>
          )}

          {isConsultDone && (
            <div className="flex flex-col items-center gap-3 py-5 border-t border-neutral-100 dark:border-neutral-800">
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center font-medium">
                Your project brief is ready! Muhammad Imran will get back to you shortly.
              </p>
              <div className="flex gap-3 w-full max-w-sm">
                <a
                  href={`https://wa.me/923345636230?text=${WA_TEXT}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors shadow-md cursor-pointer"
                >
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="white">
                    <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.613 4.64 1.773 6.667L2.667 29.333l6.853-1.746A13.285 13.285 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24a11.28 11.28 0 0 1-5.787-1.6l-.413-.24-4.067 1.04 1.067-3.947-.267-.427A11.253 11.253 0 0 1 4.8 16c0-6.187 5.013-11.2 11.204-11.2 6.187 0 11.2 5.013 11.2 11.2 0 6.187-5.013 11.2-11.2 11.2zm6.147-8.4c-.333-.173-1.987-.987-2.293-1.093-.307-.107-.533-.16-.76.16-.227.32-.867 1.093-1.067 1.32-.2.227-.4.253-.733.08-.333-.173-1.413-.52-2.693-1.667-.987-.88-1.653-1.973-1.853-2.307-.2-.333-.02-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.68-.56-.587-.76-.587-.2 0-.427-.027-.653-.027s-.6.08-.92.413c-.32.333-1.213 1.187-1.213 2.893s1.24 3.36 1.413 3.587c.173.227 2.44 3.72 5.907 5.213.827.36 1.467.573 1.973.733.827.267 1.587.227 2.187.14.667-.107 2.053-.84 2.347-1.653.293-.813.293-1.507.2-1.653-.093-.147-.307-.227-.64-.4z" />
                  </svg>
                  WhatsApp
                </a>
                {emailSent ? (
                  <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 text-sm font-semibold shadow-md">
                    <CheckCircle2 size={15} />
                    Email Sent!
                  </div>
                ) : (
                  <button
                    onClick={() => setEmailFormOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-semibold transition-opacity shadow-md cursor-pointer"
                  >
                    <Mail size={15} />
                    Send Email
                  </button>
                )}
              </div>

              {emailFormOpen && !emailSent && (
                <form onSubmit={sendEmailToAdmin} className="w-full max-w-sm space-y-2">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={emailName}
                    onChange={e => setEmailName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={emailAddr}
                    onChange={e => setEmailAddr(e.target.value)}
                    required
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {emailError && (
                    <div className="flex items-center gap-1.5 text-xs text-red-500">
                      <AlertCircle size={13} /> {emailError}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={emailSending}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-semibold transition-opacity disabled:opacity-50 cursor-pointer"
                    >
                      {emailSending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                      {emailSending ? "Sending..." : "Send Now"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEmailFormOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-600 text-sm text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-400 text-center">Your chat transcript will be sent automatically to Muhammad.</p>
                </form>
              )}
              <Link
                href="/contact"
                className="text-xs text-neutral-400 dark:text-neutral-500 hover:underline"
              >
                Or use the contact form →
              </Link>
            </div>
          )}

          {messages.length === 1 && !consultMode && (
            <div className="pt-2 space-y-4">
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2.5 text-center font-medium">
                  Quick actions:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {QUICK_ACTIONS.map((qa, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(qa.message)}
                      disabled={isDisabled}
                      className="text-center text-xs px-2 py-3 rounded-xl border border-purple-200 dark:border-purple-800/50 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors disabled:opacity-50"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2.5 text-center">
                  Or ask a question:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SAMPLE_PROMPTS.slice(0, 4).map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(prompt)}
                      disabled={isDisabled}
                      className="text-left text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div className="sticky bottom-0 py-3 bg-neutral-50 dark:bg-neutral-950">
          <div className="flex items-end gap-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-lg px-4 py-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height =
                  Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={handleKey}
              placeholder={placeholder}
              disabled={isDisabled}
              className="flex-1 bg-transparent resize-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none max-h-[120px] min-h-[22px] disabled:opacity-60"
            />
            <div className="flex items-center gap-1 shrink-0">
              {messages.length > 1 && (
                <button
                  onClick={resetChat}
                  title="Start new chat"
                  className="p-2 rounded-xl text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <RefreshCw size={16} />
                </button>
              )}
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isDisabled}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <Send size={15} />
                )}
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-neutral-400 dark:text-neutral-600 mt-1.5">
            {consultMode
              ? `Consultation in progress · Question ${Math.min(consultStep, TOTAL_STEPS)} of ${TOTAL_STEPS} · Enter to send`
              : "Enter to send · Shift+Enter for new line"}
          </p>
        </div>
      </div>
    </div>
  );
}
