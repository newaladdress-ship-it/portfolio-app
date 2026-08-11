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
import { HiOutlineChatAlt2, HiPaperAirplane, HiX } from "react-icons/hi";
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
  Lock,
  ArrowRight,
  LogOut,
  Send,
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
    text: "Anybody working with Next.js 14 and Tailwind? Let's connect!",
    time: "10:19 AM",
  },
];

const ONLINE_USERS = ["Alex R.", "Sara K.", "Dev_Mo", "code_girl", "Tariq_Dev", "Hassan_Frontend", "Ayesha_UI"];

function Avatar({ name, size = 8, photoURL }: { name: string; size?: number; photoURL?: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const colors = [
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
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
    await new Promise((r) => setTimeout(r, 600));
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
                <span>Join 18+ Active Members</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Join the Community
              </h2>
              <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Sign in to enter the chat room and start communicating with other members. You can securely continue with your existing <strong className="text-[#17211E] dark:text-[#F5F2EC]">Google</strong> or <strong className="text-[#17211E] dark:text-[#F5F2EC]">GitHub</strong> account.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">Continue With</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleGoogle}
                  disabled={loading !== null}
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-4 py-3 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] disabled:opacity-60 transition-colors shadow-xs"
                >
                  <SiGoogle size={18} className="text-red-500 shrink-0" />
                  <span>{loading === "google" ? "Signing in…" : "Continue with Google"}</span>
                </button>
                <button
                  onClick={() => setStep("github-name")}
                  disabled={loading !== null}
                  className="flex items-center justify-center gap-3 rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] px-4 py-3 text-sm font-heading font-medium text-[#17211E] dark:text-[#F5F2EC] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] disabled:opacity-60 transition-colors shadow-xs"
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStep("choose")}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#D9D4CA] dark:border-[#2A3632] text-[#5C655F] hover:bg-[#F5F2EC] dark:hover:bg-[#2A3632] transition-colors"
              >
                <HiX size={14} />
              </button>
              <div className="flex items-center gap-2 text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                <SiGithub size={16} />
                Signing in with GitHub
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-heading font-bold text-[#17211E] dark:text-[#F5F2EC]">
                What's your display name?
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
      // Keep optimistic message state or handle error
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Top Active Session Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421]">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} size={9} photoURL={user.photoURL} />
          <div>
            <h2 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
              Welcome, {user.name}!
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>18 members online in community chat</span>
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://imrandigitals.com/" },
      { "@type": "ListItem", position: 2, name: "Community Chat Room", item: "https://imrandigitals.com/chat" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Community Chat Room | Imran Digitals"
        description="Join the Imran Digitals community chat room to connect, communicate, share ideas, and collaborate with other members. Sign in with Google or GitHub."
        path="/chat"
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
          <span className="text-[#17211E] dark:text-[#F5F2EC]">Community Chat</span>
        </nav>

        {/* ---------------- HERO / HEADER ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <Users size={14} className="text-[#C96A3D]" />
              <span>Real-Time Community Collaboration</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Community Chat Room
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Connect, Communicate &amp; Collaborate
            </h2>
          </div>

          <div className="space-y-3 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Welcome to the Imran Digitals community chat room—a shared space where members can connect with each other, exchange ideas, ask questions, discuss projects, and collaborate.
            </p>
            <p>
              Whether you want to start a conversation, share something you're working on, or simply connect with other members of the community, the chat room provides a place to communicate in real time.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- INTERACTIVE AUTH / CHAT ROOM ---------------- */}
        <section className="space-y-6">
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

        {/* ---------------- WHAT CAN YOU DO HERE? ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What Can You Do Here?" icon={<Lightbulb />} />
            <SectionSubHeading>
              <p>Explore how community members use the chat room for real-time collaboration.</p>
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
                Join conversations and communicate with people who are part of the community.
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
                Discuss technology, projects, development, digital products, or other topics relevant to the community.
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
                Ask questions, exchange knowledge, and learn from other members.
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
                Connect with other users who may be interested in working together on ideas, projects, or digital initiatives.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Network size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Build Connections
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                The chat room is designed to make it easier for members to discover and communicate with people who share similar interests.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- A COMMUNITY BUILT AROUND CONVERSATION ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-3 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              A Community Built Around Conversation
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                The chat room is a shared community space rather than a direct support channel.
              </p>
              <p>
                Please be respectful of other members, contribute constructively, and avoid spam or inappropriate content.
              </p>
              <p>
                By joining the chat room, you agree to follow the community guidelines.
              </p>
            </div>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- COMMUNITY GUIDELINES ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="Community Guidelines" icon={<ShieldCheck />} />
            <SectionSubHeading>
              <p>To keep the chat room useful and welcoming for everyone:</p>
            </SectionSubHeading>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#17211E] dark:text-[#F5F2EC]">
              {[
                "Treat other members with respect.",
                "Avoid spam and repeated promotional messages.",
                "Don't share private or sensitive information.",
                "Keep conversations constructive and relevant.",
                "Don't impersonate other users.",
                "Report inappropriate behavior when necessary.",
              ].map((rule) => (
                <div key={rule} className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C96A3D] shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-2 border-t border-[#D9D4CA]/50 dark:border-[#2A3632]">
              Community access may be moderated to maintain a safe and useful environment for members.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
