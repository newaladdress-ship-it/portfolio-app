import { useState, useRef, useEffect } from "react";
import SEOHead from "@/components/SEOHead";
import { notifyAdmin } from "@/hooks/usePushNotifications";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  collection, addDoc, serverTimestamp,
  onSnapshot, query, orderBy, limit, Timestamp
} from "firebase/firestore";
import { HiOutlineChatAlt2, HiPaperAirplane, HiX } from "react-icons/hi";
import { SiGithub, SiGoogle } from "react-icons/si";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useT } from "@/lib/i18n";

type AuthProvider = "google" | "github";

type ChatUser = {
  name: string;
  provider: AuthProvider;
  avatar: string;
  photoURL?: string;
};

type Message = {
  id: string;
  sender: "me" | "other";
  name: string;
  text: string;
  time: string;
  provider?: string;
  isAdmin?: boolean;
  fromFirestore?: boolean;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    sender: "other",
    name: "Alex R.",
    text: "Hey! Loved your portfolio. How long have you been doing web dev?",
    time: "10:12 AM",
  },
  {
    id: "init-2",
    sender: "other",
    name: "Sara K.",
    text: "That e-commerce project looks amazing! Did you use a payments API?",
    time: "10:16 AM",
  },
  {
    id: "init-3",
    sender: "other",
    name: "Alex R.",
    text: "Are you open to remote opportunities? We're looking for a React developer.",
    time: "10:19 AM",
  },
];

const ONLINE_USERS = ["Alex R.", "Sara K.", "Dev_Mo", "code_girl"];

function Avatar({ name, size = 8, photoURL }: { name: string; size?: number; photoURL?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const colors = [
    "bg-blue-500", "bg-purple-500", "bg-pink-500",
    "bg-green-500", "bg-yellow-500", "bg-orange-500",
  ];
  const color = colors[name.charCodeAt(0) % colors.length];
  const px = size * 4;
  const fs = size * 1.5;

  if (photoURL) {
    return (
      <img
        src={photoURL}
        alt={name}
        referrerPolicy="no-referrer"
        className="rounded-full shrink-0 object-cover"
        style={{ width: `${px}px`, height: `${px}px` }}
      />
    );
  }
  return (
    <div
      className={`${color} flex items-center justify-center rounded-full text-white font-semibold shrink-0`}
      style={{ width: `${px}px`, height: `${px}px`, fontSize: `${fs}px` }}
    >
      {initials}
    </div>
  );
}

function AuthGate({ onLogin }: { onLogin: (user: ChatUser) => void }) {
  const t = useT();
  const [step, setStep] = useState<"choose" | "github-name">("choose");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<AuthProvider | null>(null);
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setLoading("google");
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      onLogin({
        name: user.displayName || user.email || "Guest",
        provider: "google",
        avatar: (user.displayName || "G")[0].toUpperCase(),
        photoURL: user.photoURL || undefined,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Google sign-in failed.";
      if (!msg.includes("popup-closed")) {
        setError("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(null);
    }
  };

  const handleGithubJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading("github");
    await new Promise((r) => setTimeout(r, 600));
    onLogin({ name: name.trim(), provider: "github", avatar: name.trim()[0].toUpperCase() });
    setLoading(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <SpotlightCard className="w-full max-w-sm">
        <div className="p-8 space-y-6">
          <AnimatePresence mode="wait">
            {step === "choose" ? (
              <motion.div
                key="choose"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-500 border border-yellow-400/30">
                      <HiOutlineChatAlt2 size={28} />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{t.chat.join}</h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{t.chat.joinSub}</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleGoogle}
                    disabled={loading !== null}
                    className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-60 transition-colors shadow-sm"
                  >
                    <SiGoogle size={18} className="text-red-500 shrink-0" />
                    {loading === "google" ? "Signing in…" : t.chat.google}
                  </button>
                  <button
                    onClick={() => setStep("github-name")}
                    disabled={loading !== null}
                    className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-60 transition-colors shadow-sm"
                  >
                    <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300 shrink-0" />
                    {t.chat.github}
                  </button>
                </div>

                {error && (
                  <p className="text-center text-xs text-red-500">{error}</p>
                )}

                <p className="text-center text-[11px] text-neutral-400 dark:text-neutral-500">
                  {t.chat.guidelines}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="github-name"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep("choose")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <HiX size={14} />
                  </button>
                  <div className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    <SiGithub size={15} className="text-neutral-600 dark:text-neutral-400" />
                    Signing in with GitHub
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">{t.chat.displayName}</h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{t.chat.displaySub}</p>
                </div>

                <form onSubmit={handleGithubJoin} className="space-y-4">
                  <input
                    autoFocus
                    type="text"
                    placeholder="e.g. Alex R."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={30}
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                  />
                  <button
                    type="submit"
                    disabled={!name.trim() || loading !== null}
                    className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors"
                  >
                    {loading === "github" ? "Joining…" : t.chat.joinBtn}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>

      <div className="mt-6 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
        {ONLINE_USERS.length} people online right now
      </div>
    </div>
  );
}

function ChatRoom({ user, onLeave }: { user: ChatUser; onLeave: () => void }) {
  const t = useT();
  const [firestoreMessages, setFirestoreMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const allMessages = [...INITIAL_MESSAGES, ...firestoreMessages];

  useEffect(() => {
    const q = query(
      collection(db, "chat_messages"),
      orderBy("createdAt", "asc"),
      limit(100)
    );
    const unsub = onSnapshot(q, snap => {
      const msgs: Message[] = snap.docs.map(d => {
        const data = d.data();
        const ts = data.createdAt as Timestamp | null;
        const date = ts ? ts.toDate() : new Date();
        return {
          id: d.id,
          sender: data.name === user.name ? "me" : "other",
          name: data.name,
          text: data.text,
          time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          provider: data.provider,
          isAdmin: data.isAdmin ?? false,
          fromFirestore: true,
        };
      });
      setFirestoreMessages(msgs);
    });
    return () => unsub();
  }, [user.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages.length]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    try {
      await addDoc(collection(db, "chat_messages"), {
        name: user.name,
        text,
        provider: user.provider,
        createdAt: serverTimestamp(),
      });
      notifyAdmin(
        `💬 New Chat from ${user.name}`,
        text.slice(0, 100),
        "/admin",
        "chat-message"
      );
    } catch {
      // fallback: show locally if Firestore fails
      const now = new Date();
      setFirestoreMessages(prev => [
        ...prev,
        { id: `local-${Date.now()}`, sender: "me", name: user.name, text, time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleLeave = async () => {
    if (user.provider === "google") {
      await signOut(auth).catch(() => {});
    }
    onLeave();
  };

  const providerIcon = user.provider === "google"
    ? <SiGoogle size={10} className="text-red-500" />
    : <SiGithub size={10} className="text-neutral-500" />;

  return (
    <div className="flex gap-4 h-[520px]">
      <SpotlightCard className="hidden md:flex flex-col w-44 shrink-0 p-4 space-y-3 overflow-y-auto">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            {t.chat.online} - {ONLINE_USERS.length + 1}
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Avatar name={user.name} size={7} photoURL={user.photoURL} />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-black" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-neutral-700 dark:text-neutral-300 truncate font-medium block">You</span>
              <div className="flex items-center gap-0.5">{providerIcon}</div>
            </div>
          </div>
          {ONLINE_USERS.map((u) => (
            <div key={u} className="flex items-center gap-2">
              <div className="relative">
                <Avatar name={u} size={7} />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-black" />
              </div>
              <span className="text-xs text-neutral-700 dark:text-neutral-300 truncate">{u}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-auto">
          <button
            onClick={handleLeave}
            className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 px-2 py-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {t.chat.leaveRoom}
          </button>
        </div>
      </SpotlightCard>

      <SpotlightCard className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 p-4 shrink-0">
          <div className="flex items-center gap-3">
            <HiOutlineChatAlt2 size={18} className="text-yellow-500" />
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{t.chat.general}</p>
              <p className="text-xs text-neutral-500">{ONLINE_USERS.length + 1} {t.chat.online}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Avatar name={user.name} size={6} photoURL={user.photoURL} />
            <span className="hidden sm:block">{user.name}</span>
            {providerIcon}
            <button
              onClick={handleLeave}
              className="ml-1 flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors md:hidden"
            >
              <HiX size={13} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {allMessages.map((msg) => {
            const mentionsMe = msg.isAdmin && msg.text.toLowerCase().startsWith(`@${user.name.toLowerCase()}:`);
            return (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}
            >
              {msg.isAdmin ? (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-neutral-900 font-bold text-[10px]">
                  MI
                </div>
              ) : (
                <Avatar name={msg.name} size={8} photoURL={msg.sender === "me" ? user.photoURL : undefined} />
              )}
              <div className={`flex flex-col ${msg.sender === "me" ? "items-end" : "items-start"} max-w-[75%]`}>
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {msg.sender === "me" ? "You" : msg.name}
                  </span>
                  {msg.isAdmin && (
                    <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-yellow-400/20 text-yellow-700 dark:text-yellow-400 border border-yellow-400/30">
                      Admin
                    </span>
                  )}
                  {mentionsMe && (
                    <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-300 dark:border-blue-700 animate-pulse">
                      @ mentioned you
                    </span>
                  )}
                  <span className="text-[10px] text-neutral-400">{msg.time}</span>
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    mentionsMe
                      ? "bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-400/50 text-neutral-900 dark:text-neutral-100 rounded-tl-sm"
                      : msg.isAdmin
                        ? "bg-yellow-400/15 border border-yellow-400/30 text-neutral-900 dark:text-neutral-100 rounded-tl-sm"
                        : msg.sender === "me"
                          ? "bg-yellow-400 text-neutral-900 rounded-tr-sm"
                          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-tl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={handleSend}
          className="flex gap-2 border-t border-neutral-200 dark:border-neutral-800 p-3 shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chat.typeMsg}
            className="flex-1 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 px-4 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <HiPaperAirplane size={16} className={`-rotate-45 ${sending ? "opacity-50" : ""}`} />
          </button>
        </form>
      </SpotlightCard>
    </div>
  );
}

export default function ChatRoomPage() {
  const t = useT();
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);

  return (
    <section className="space-y-6">
      <SEOHead
        title="Live Chat Room - Muhammad Imran Web Developer Portfolio"
        description="Join the live chat room on my portfolio to connect, chat with other visitors, and discuss React, Node.js, and web development."s portfolio to connect with other visitors & discuss projects, web development, React & Node.js topics."
        path="/chat"
      />
      <div className="space-y-2">
        <SectionHeading title={t.chat.heading} icon={<HiOutlineChatAlt2 />} />
        <SectionSubHeading>
          <p>{t.chat.sub}</p>
        </SectionSubHeading>
      </div>

      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="auth"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <AuthGate onLogin={(user) => setCurrentUser(user)} />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ChatRoom user={currentUser} onLeave={() => setCurrentUser(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
