import { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Bot, Send, Minimize2, Loader2, Sparkles, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { INITIAL_MESSAGE, QUICK_ACTIONS } from "../../data/portfolioContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";
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
} from "../../lib/consultation";

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

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-1.5 mt-0.5 shrink-0">
        <Bot size={12} className="text-white" />
      </div>
      <div className="px-3 py-2.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 rounded-tl-sm">
        <div className="flex gap-1 items-center h-4">
          {[0, 150, 300].map(d => (
            <span
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [pathname] = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INITIAL_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hasNew, setHasNew] = useState(false);

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionSaved = useRef(false);
  const sessionId = useRef(generateSessionId());
  const leadDocId = useRef<string | null>(null);
  const isSendingRef = useRef(false);
  const hasTrackedOpen = useRef(false);

  const isSmartTalkPage = pathname === "/smarttalk";

  const scrollToBottom = () =>
    endRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("toggle-smarttalk", handler);
    return () => window.removeEventListener("toggle-smarttalk", handler);
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      if (!hasTrackedOpen.current) {
        hasTrackedOpen.current = true;
        trackAnalytics("chatbot_opened", sessionId.current);
      }
    }
  }, [open]);

  useEffect(() => {
    if (open) scrollToBottom();
  }, [messages, isTyping]);

  if (isSmartTalkPage) return null;

  const saveSession = async (msgs: Message[]) => {
    if (sessionSaved.current || msgs.length <= 1) return;
    try {
      await addDoc(collection(db, "chat_logs"), {
        messages: msgs,
        page: pathname,
        timestamp: new Date(),
        source: "widget",
      });
      sessionSaved.current = true;
    } catch {}
  };

  const saveLead = async (answers: string[], step: number, complete = false) => {
    try {
      if (!leadDocId.current) {
        leadDocId.current = await createLeadDoc(sessionId.current, "widget");
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
          if (!open) setHasNew(true);
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
            if (!open) setHasNew(true);
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
        if (!open) setHasNew(true);
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
        () => {
          setLoading(false);
          if (!open) setHasNew(true);
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
      ? `Answer for question ${consultStep}...`
      : "Ask me anything...";

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[59] sm:hidden bg-black/20"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed z-[60] flex flex-col transition-all duration-300 ${
          open
            ? "inset-x-3 bottom-20 top-16 sm:inset-x-auto sm:top-auto sm:bottom-24 sm:right-4 sm:w-96 sm:h-[580px] sm:max-h-[84vh]"
            : "w-0 h-0 overflow-hidden pointer-events-none bottom-24 right-4"
        }`}
      >
        {open && (
          <div className="flex flex-col h-full rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="shrink-0 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm leading-tight">SmartTalk AI</p>
                    <p className="text-xs text-white/70">
                      {isTyping
                        ? "AI is typing..."
                        : consultMode && consultStep <= TOTAL_STEPS
                        ? `Step ${consultStep} of ${TOTAL_STEPS}`
                        : consultStep > TOTAL_STEPS
                        ? "Summary Ready ✓"
                        : "Portfolio Assistant"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                  title="Minimize"
                >
                  <Minimize2 size={15} />
                </button>
              </div>

              {consultMode && (
                <div className="mt-2.5">
                  <div className="h-1 rounded-full bg-white/20 overflow-hidden">
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
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i < consultStep - 1
                              ? "bg-white"
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

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scroll-smooth">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center mr-1.5 mt-0.5 shrink-0">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-sm"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 rounded-tl-sm"
                    } ${
                      msg.role === "assistant" && msg.content === "" && loading
                        ? "animate-pulse w-16 h-5"
                        : ""
                    }`}
                  >
                    {msg.content || (msg.role === "assistant" && loading ? "..." : "")}
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}

              {showConsultPrompt && !consultMode && !loading && !isTyping && (
                <div className="flex items-center justify-center gap-2 py-2 pl-7">
                  <button
                    onClick={async () => {
                      setShowConsultPrompt(false);
                      setConsultMode(true);
                      setConsultStep(1);
                      await saveLead([], 0);
                      await trackAnalytics("consultation_started", sessionId.current);
                      await showDelayed(buildIntroMessage(), 800);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold transition-all shadow-md cursor-pointer"
                  >
                    <Sparkles size={13} />
                    Start
                  </button>
                  <button
                    onClick={() => {
                      setShowConsultPrompt(false);
                      pushAssistantMessage(
                        "No problem! Feel free to keep chatting. You can ask me anything about Muhammad Imran's skills, projects, or experience. 😊"
                      );
                    }}
                    className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all cursor-pointer"
                  >
                    Not Now
                  </button>
                </div>
              )}

              {isConsultDone && (
                <div className="pl-7 space-y-2 pt-1">
                  <a
                    href={`https://wa.me/923019316123?text=${WA_TEXT}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    <svg viewBox="0 0 32 32" width="15" height="15" fill="white">
                      <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.347.613 4.64 1.773 6.667L2.667 29.333l6.853-1.746A13.285 13.285 0 0 0 16.004 29.333C23.36 29.333 29.333 23.36 29.333 16S23.36 2.667 16.004 2.667zm0 24a11.28 11.28 0 0 1-5.787-1.6l-.413-.24-4.067 1.04 1.067-3.947-.267-.427A11.253 11.253 0 0 1 4.8 16c0-6.187 5.013-11.2 11.204-11.2 6.187 0 11.2 5.013 11.2 11.2 0 6.187-5.013 11.2-11.2 11.2zm6.147-8.4c-.333-.173-1.987-.987-2.293-1.093-.307-.107-.533-.16-.76.16-.227.32-.867 1.093-1.067 1.32-.2.227-.4.253-.733.08-.333-.173-1.413-.52-2.693-1.667-.987-.88-1.653-1.973-1.853-2.307-.2-.333-.02-.507.147-.68.16-.16.333-.413.507-.613.173-.2.227-.347.333-.573.107-.227.053-.427-.027-.6-.08-.173-.76-1.84-1.04-2.52-.28-.68-.56-.587-.76-.587-.2 0-.427-.027-.653-.027s-.6.08-.92.413c-.32.333-1.213 1.187-1.213 2.893s1.24 3.36 1.413 3.587c.173.227 2.44 3.72 5.907 5.213.827.36 1.467.573 1.973.733.827.267 1.587.227 2.187.14.667-.107 2.053-.84 2.347-1.653.293-.813.293-1.507.2-1.653-.093-.147-.307-.227-.64-.4z" />
                    </svg>
                    Contact on WhatsApp
                  </a>

                  {emailSent ? (
                    <div className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 text-sm font-semibold">
                      <CheckCircle2 size={14} />
                      Email sent! Muhammad will reply soon.
                    </div>
                  ) : emailFormOpen ? (
                    <form onSubmit={sendEmailToAdmin} className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={emailName}
                        onChange={e => setEmailName(e.target.value)}
                        required
                        className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-xs text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      <input
                        type="email"
                        placeholder="Your email address"
                        value={emailAddr}
                        onChange={e => setEmailAddr(e.target.value)}
                        required
                        className="w-full rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-3 py-2 text-xs text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 outline-none focus:ring-2 focus:ring-purple-400"
                      />
                      {emailError && (
                        <div className="flex items-center gap-1.5 text-xs text-red-500">
                          <AlertCircle size={12} /> {emailError}
                        </div>
                      )}
                      <div className="flex gap-1.5">
                        <button
                          type="submit"
                          disabled={emailSending}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold transition-opacity disabled:opacity-50 cursor-pointer"
                        >
                          {emailSending ? <Loader2 size={12} className="animate-spin" /> : <Mail size={12} />}
                          {emailSending ? "Sending..." : "Send"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEmailFormOpen(false)}
                          className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 text-xs text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setEmailFormOpen(true)}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white text-sm font-semibold transition-opacity cursor-pointer"
                    >
                      <Mail size={14} />
                      Send Email
                    </button>
                  )}

                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block text-center text-xs text-neutral-400 dark:text-neutral-500 hover:underline pt-0.5"
                  >
                    Or use the contact form →
                  </Link>
                </div>
              )}

              {messages.length === 1 && !consultMode && (
                <div className="space-y-1.5 mt-2">
                  {QUICK_ACTIONS.map((qa, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(qa.message)}
                      disabled={isDisabled}
                      className="block w-full text-left text-xs px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-100 dark:border-purple-800/40 disabled:opacity-50"
                    >
                      {qa.label}
                    </button>
                  ))}
                </div>
              )}

              <div ref={endRef} />
            </div>

            <div className="shrink-0 px-3 pb-3 pt-1.5">
              <div className="flex items-end gap-2 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 px-3 py-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={placeholder}
                  disabled={isDisabled}
                  className="flex-1 bg-transparent resize-none text-sm text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 outline-none max-h-20 min-h-[20px] disabled:opacity-60"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isDisabled}
                  className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
                >
                  {loading ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Send size={13} />
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-neutral-400 dark:text-neutral-600 mt-1.5">
                {consultMode
                  ? `Consultation · Step ${Math.min(consultStep, TOTAL_STEPS)} of ${TOTAL_STEPS}`
                  : "SmartTalk knows Muhammad Imran's portfolio"}
              </p>
            </div>
          </div>
        )}
      </div>

      {hasNew && !open && (
        <span className="fixed bottom-[148px] md:bottom-[76px] right-[14px] z-[61] w-3 h-3 rounded-full bg-red-500 animate-pulse pointer-events-none" />
      )}
    </>
  );
}
