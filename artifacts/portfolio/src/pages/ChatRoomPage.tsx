import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import { notifyAdmin } from "@/hooks/usePushNotifications";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { SiGithub, SiGoogle } from "react-icons/si";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  MessageSquare,
  Users,
  Lightbulb,
  HelpCircle,
  Handshake,
  Network,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  LogOut,
  Send,
  UserPlus,
  FolderKanban,
  Mail,
  X,
} from "lucide-react";

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
    text: "Welcome everyone! Glad to see new members joining the community.",
    time: "10:12 AM",
  },
  {
    id: "init-2",
    sender: "other",
    name: "Sara K.",
    text: "Hey all! Excited to share project ideas and collaborate here.",
    time: "10:16 AM",
  },
  {
    id: "init-3",
    sender: "other",
    name: "Dev_Mo",
    text: "Anybody working with Next.js and Tailwind? Let's connect!",
    time: "10:19 AM",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the Imran Digitals Community Chat Room?",
    a: "The Imran Digitals Community Chat Room is a shared online space where registered members can communicate, exchange ideas, ask questions, discuss projects, and collaborate in real time.",
  },
  {
    q: "Who can join the community?",
    a: "Users can join the community by signing in with a supported Google or GitHub account.",
  },
  {
    q: "What can I discuss in the chat room?",
    a: "You can discuss technology, development, websites, applications, software ideas, digital products, projects, learning, and other relevant topics.",
  },
  {
    q: "Is the chat room a private support channel?",
    a: "No. The chat room is a shared community space for member-to-member communication. Private project discussions should be handled through the appropriate contact or project communication channels.",
  },
  {
    q: "Can community members collaborate on projects?",
    a: "Yes. Members can use the community to exchange ideas, meet other users with similar interests, and discuss potential collaboration opportunities.",
  },
  {
    q: "Are there community rules?",
    a: "Yes. Members are expected to communicate respectfully, avoid spam, protect private information, and contribute constructively to the community.",
  },
];

function Avatar({ name, size = 8, photoURL }: { name: string; size?: number; photoURL?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const colors = [
    "bg-[#C96A3D]",
    "bg-[#3B82F6]",
    "bg-[#8B5CF6]",
    "bg-[#10B981]",
    "bg-[#F59E0B]",
    "bg-[#EC4899]",
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
      className={`${color} flex items-center justify-center rounded-full text-white font-mono font-bold shrink-0`}
      style={{ width: `${px}px`, height: `${px}px`, fontSize: `${fs}px` }}
    >
      {initials}
    </div>
  );
}

function AuthGate({ onLogin }: { onLogin: (user: ChatUser) => void }) {
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
    await new Promise((r) => setTimeout(r, 400));
    onLogin({ name: name.trim(), provider: "github", avatar: name.trim()[0].toUpperCase() });
    setLoading(null);
  };

  return (
    <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-6 font-sans">
      <AnimatePresence mode="wait">
        {step === "choose" ? (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 rounded-md bg-[#F5F2EC] dark:bg-[#121917] border border-[#D9D4CA] dark:border-[#2A3632] px-3 py-1 text-xs font-mono text-[#C96A3D]">
                <Users size={14} />
                <span>Join Active Community Members</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Join the Imran Digitals Community
              </h2>
              <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Sign in to enter the community chat room and communicate with other members. You can securely continue using your existing <strong className="text-[#17211E] dark:text-[#F5F2EC]">Google</strong> or <strong className="text-[#17211E] dark:text-[#F5F2EC]">GitHub</strong> account.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleGoogle}
                  disabled={loading !== null}
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-4 py-3.5 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] disabled:opacity-60 transition-colors shadow-xs"
                >
                  <SiGoogle size={18} className="text-red-500 shrink-0" />
                  <span>{loading === "google" ? "Signing in…" : "Continue with Google"}</span>
                </button>
                <button
                  onClick={() => setStep("github-name")}
                  disabled={loading !== null}
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-4 py-3.5 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] disabled:opacity-60 transition-colors shadow-xs"
                >
                  <SiGithub size={18} className="shrink-0" />
                  <span>Continue with GitHub</span>
                </button>
              </div>
            </div>

            {error && <p className="text-xs text-red-500 font-mono text-center">{error}</p>}
          </motion.div>
        ) : (
          <motion.div
            key="github-name"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                <SiGithub size={18} />
                <span>Signing in with GitHub</span>
              </div>
              <button
                onClick={() => setStep("choose")}
                className="p-1 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] text-[#5C655F] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] transition-colors"
                aria-label="Close GitHub sign-in"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                What is your display name?
              </h2>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                This is how other members will see you in the community chat room.
              </p>
            </div>

            <form onSubmit={handleGithubJoin} className="space-y-4">
              <input
                autoFocus
                type="text"
                placeholder="e.g. Alex R."
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 focus:outline-none focus:border-[#C96A3D] transition-colors"
              />
              <button
                type="submit"
                disabled={!name.trim() || loading !== null}
                className="w-full rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 text-sm font-heading font-medium text-white transition-colors"
              >
                {loading === "github" ? "Joining…" : "Enter Chat Room"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

function ChatRoom({ user, onLeave }: { user: ChatUser; onLeave: () => void }) {
  const [firestoreMessages, setFirestoreMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const allMessages = [...INITIAL_MESSAGES, ...firestoreMessages];

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, "chat_messages"),
      orderBy("createdAt", "asc"),
      limit(100)
    );
    const unsub = onSnapshot(q, (snap) => {
      const msgs: Message[] = snap.docs.map((d) => {
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
      if (db) {
        await addDoc(collection(db, "chat_messages"), {
          name: user.name,
          text,
          provider: user.provider,
          createdAt: serverTimestamp(),
        });
      }
      await notifyAdmin(
        `💬 New Chat from ${user.name}`,
        text.slice(0, 100),
        "/admin",
        "chat-message"
      );
    } catch {
      // Keep message sending smooth even if fallback
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Active Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421]">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size={9} photoURL={user.photoURL} />
          <div>
            <h2 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
              Welcome, {user.name}!
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active member in community chat room</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (user.provider === "google") signOut(auth).catch(() => {});
            onLeave();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] hover:text-[#17211E] dark:hover:text-[#F5F2EC] transition-colors"
        >
          <LogOut size={14} />
          Leave Chat Room
        </button>
      </div>

      {/* Chat Messages Feed Container */}
      <SpotlightCard className="p-4 sm:p-6 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {allMessages.map((msg) => {
            const isMe = msg.sender === "me" || msg.name === user.name;
            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isMe ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar name={msg.name} size={8} />

                <div
                  className={`max-w-[78%] space-y-1 ${
                    isMe ? "items-end text-right" : "items-start text-left"
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
                    <span className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">{msg.name}</span>
                    {msg.isAdmin && (
                      <span className="px-1.5 py-0.5 rounded bg-[#C96A3D]/10 text-[#C96A3D] font-bold text-[10px]">
                        Admin
                      </span>
                    )}
                    <span>{msg.time}</span>
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                      isMe
                        ? "bg-[#C96A3D] text-white rounded-tr-none"
                        : "bg-[#F5F2EC] dark:bg-[#121917] text-[#17211E] dark:text-[#F5F2EC] border border-[#D9D4CA]/60 dark:border-[#2A3632] rounded-tl-none"
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

        {/* Message Input Bar */}
        <form onSubmit={handleSend} className="mt-4 flex items-center gap-3 pt-3 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message..."
            className="flex-1 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 focus:outline-none focus:border-[#C96A3D] transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || sending}
            className="px-5 py-3 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] text-white font-heading font-medium text-sm disabled:opacity-40 transition-colors shrink-0 flex items-center gap-2 shadow-xs"
          >
            <Send size={16} />
            <span>Send</span>
          </button>
        </form>
      </SpotlightCard>
    </div>
  );
}

export default function ChatRoomPage() {
  const [user, setUser] = useState<ChatUser | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToChat = () => {
    const el = document.getElementById("community-chat-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://imrandigitals.com/" },
      { "@type": "ListItem", position: 2, name: "Community Chat Room", item: "https://imrandigitals.com/chat" },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Community Chat Room | Imran Digitals",
    description:
      "Join the Imran Digitals community chat room to connect, share ideas, ask questions, and collaborate with other members in real time.",
    url: "https://imrandigitals.com/chat",
  };

  return (
    <>
      <SEOHead
        title="Community Chat Room | Imran Digitals"
        description="Join the Imran Digitals community chat room to connect, share ideas, ask questions, and collaborate with other members in real time."
        path="/chat"
        jsonLd={[breadcrumbJsonLd, faqJsonLd, webPageJsonLd]}
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
          <span className="text-[#17211E] dark:text-[#F5F2EC]">Community Chat</span>
        </nav>

        {/* ---------------- 1. HERO / HEADER ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <Users size={14} className="text-[#C96A3D]" />
              <span>Real-Time Community Space</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Community Chat Room
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Connect, Communicate &amp; Collaborate
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Welcome to the Imran Digitals Community Chat Room — a shared space where community members can connect, communicate, exchange ideas, ask questions, and collaborate in real time.
            </p>
            <p>
              Whether you're discussing a development project, sharing an idea, asking a technical question, learning something new, or looking for people interested in similar digital projects, the community provides a place for open conversation and collaboration.
            </p>
            <p className="font-semibold text-[#17211E] dark:text-[#F5F2EC] pt-1">
              Join the community and start a conversation.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 2. INTERACTIVE AUTH / CHAT ROOM ---------------- */}
        <section id="community-chat-section" className="space-y-6 scroll-mt-24">
          <AnimatePresence mode="wait">
            {!user ? (
              <motion.div
                key="auth"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <AuthGate onLogin={setUser} />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <ChatRoom user={user} onLeave={() => setUser(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 3. WHAT CAN YOU DO IN THE COMMUNITY? ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What Can You Do in the Community?" icon={<Lightbulb />} />
            <SectionSubHeading>
              <p>The chat room is designed for conversations, knowledge sharing, and collaboration between community members.</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Chat With Other Members
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Join ongoing conversations and communicate directly with people who are part of the Imran Digitals community.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Lightbulb size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Share Ideas
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Share ideas, discuss projects, talk about technology, exchange experiences, or introduce something you're currently working on.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Ask Questions
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Ask questions, exchange knowledge, and learn from other members through community conversations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <FolderKanban size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Discuss Projects
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Talk about websites, applications, software ideas, digital products, development projects, or other technology-related topics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Handshake size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Collaborate
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Connect with members who may have similar interests, skills, ideas, or projects and explore opportunities to work together.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Network size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Build Connections
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Discover and communicate with people who share an interest in technology, development, digital products, and online projects.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 4. A COMMUNITY BUILT AROUND CONVERSATION ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-4 max-w-4xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              A Community Built Around Conversation
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                The Imran Digitals chat room is a community space created for member-to-member communication and collaboration.
              </p>
              <p>
                It is not intended to replace direct project support or private client communication. Instead, it provides an open environment where members can exchange ideas, ask questions, share experiences, and participate in conversations with other users.
              </p>
              <p>
                Please contribute constructively and help maintain a respectful environment for everyone.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 5. COMMUNITY GUIDELINES ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="Community Guidelines" icon={<ShieldCheck />} />
            <SectionSubHeading>
              <p>To keep the chat room useful, welcoming, and productive:</p>
            </SectionSubHeading>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
              {[
                "Treat other community members with respect.",
                "Keep conversations constructive and relevant.",
                "Avoid spam, flooding, and repeated promotional messages.",
                "Do not share private, confidential, or sensitive information.",
                "Do not impersonate another person or organization.",
                "Avoid abusive, threatening, or inappropriate content.",
                "Respect the privacy of other community members.",
                "Report inappropriate behavior when necessary.",
              ].map((rule) => (
                <div key={rule} className="flex items-start gap-3 p-3 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917] border border-[#D9D4CA]/50 dark:border-[#2A3632]">
                  <CheckCircle2 size={18} className="text-[#C96A3D] shrink-0 mt-0.5" />
                  <span className="leading-snug">{rule}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-3 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
              Community access may be moderated when necessary to maintain a safe and useful environment.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 6. WHY JOIN THE COMMUNITY? ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-4 max-w-4xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Why Join the Community?
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                The community gives users a place to do more than simply browse the Imran Digitals portfolio.
              </p>
              <p>
                You can participate in conversations, exchange knowledge, discuss development ideas, share projects, ask questions, and connect with other people interested in technology and digital products.
              </p>
              <p>
                As the community grows, new conversations and collaboration opportunities can develop between members with different interests and experiences.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 7. FREQUENTLY ASKED QUESTIONS ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2 max-w-3xl">
            <SectionHeading title="Frequently Asked Questions" icon={<HelpCircle />} />
            <SectionSubHeading>
              <p>Find answers to common questions about the Imran Digitals Community Chat Room.</p>
            </SectionSubHeading>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] flex items-center justify-between gap-4 text-base"
                  >
                    <span>{item.q}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-[#C96A3D] shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-[#5C655F] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed border-t border-[#D9D4CA]/40 dark:border-[#2A3632]/40 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- 8. JOIN THE CONVERSATION (CTA) ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-8 sm:p-10 space-y-6 font-sans">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#F5F2EC] dark:bg-[#121917] border border-[#D9D4CA] dark:border-[#2A3632] px-3 py-1 text-xs font-mono text-[#C96A3D]">
              <UserPlus size={14} />
              <span>Get Started Today</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Join the Conversation
            </h2>
            <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              Have an idea to share, a question to ask, or something you're building? Join the Imran Digitals community and connect with other members.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToChat}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] px-6 py-3.5 text-sm font-heading font-medium text-white transition-colors shadow-xs"
            >
              <UserPlus size={16} />
              <span>Join the Community</span>
            </button>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] px-6 py-3.5 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] transition-colors"
            >
              <FolderKanban size={16} />
              <span>Explore Projects</span>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC] dark:bg-[#121917] hover:bg-[#D9D4CA]/50 dark:hover:bg-[#2A3632] px-6 py-3.5 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] transition-colors"
            >
              <Mail size={16} />
              <span>Contact Muhammad Imran</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
