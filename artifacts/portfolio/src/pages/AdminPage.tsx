import { useState, useEffect, useRef, useCallback } from "react";
import SEOHead from "@/components/SEOHead";
import { usePushNotifications, notifyVisitors } from "@/hooks/usePushNotifications";
import {
  collection, onSnapshot, query, orderBy,
  deleteDoc, doc, addDoc, serverTimestamp, Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  HiOutlineLockClosed, HiOutlineMail, HiOutlineChatAlt2,
  HiOutlineTrash, HiOutlineLogout, HiOutlineRefresh,
  HiPaperAirplane, HiStar, HiOutlineBell, HiX, HiReply, HiOutlineCog
} from "react-icons/hi";
import { SiGoogle, SiGithub } from "react-icons/si";

const ADMIN_PASSWORD = "Xp9!#qR2*T&5vL@8z";
const ADMIN_NAME = "Muhammad Imran";

type ContactMessage = {
  id: string; name: string; email: string; message: string; createdAt: Timestamp | null;
};
type ChatMessage = {
  id: string; name: string; text: string; provider: string; isAdmin?: boolean; createdAt: Timestamp | null;
};
type FeedbackReview = {
  id: string; name: string; provider: string; photoURL?: string; rating: number; review: string; createdAt: Timestamp | null;
};
type Toast = { id: number; title: string; body: string; type: "chat" | "contact" | "feedback" };

function timeStr(ts: Timestamp | null): string {
  if (!ts) return "-";
  return ts.toDate().toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <HiStar key={s} size={14} className={s <= rating ? "text-yellow-400" : "text-neutral-200 dark:text-neutral-700"} />
      ))}
      <span className="ml-1 text-[11px] text-neutral-500 dark:text-neutral-400">{rating}/5</span>
    </div>
  );
}

function Badge({ text, color }: { text: string; color: string }) {
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${color}`}>{text}</span>;
}

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
  const icons = { chat: "💬", contact: "✉️", feedback: "⭐" };
  const colors = {
    chat: "border-blue-400/30 bg-blue-50 dark:bg-blue-900/20",
    contact: "border-yellow-400/30 bg-yellow-50 dark:bg-yellow-900/20",
    feedback: "border-green-400/30 bg-green-50 dark:bg-green-900/20",
  };
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-72">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg animate-in slide-in-from-right-4 duration-300 ${colors[t.type]}`}
        >
          <span className="text-lg shrink-0">{icons[t.type]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{t.title}</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{t.body}</p>
          </div>
          <button onClick={() => onRemove(t.id)} className="shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300">
            <HiX size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-500 border border-yellow-400/30">
              <HiOutlineLockClosed size={28} />
            </div>
          </div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Admin Panel</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Enter the password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              autoFocus
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              placeholder="Password"
              className={`w-full rounded-xl border px-4 py-2.5 text-sm pr-12 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${error ? "border-red-400 dark:border-red-500" : "border-neutral-200 dark:border-neutral-700"}`}
            />
            <button
              type="button"
              onClick={() => setShow(s => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-center text-xs text-red-500">Incorrect password</p>}
          <button type="submit" className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors">
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  usePushNotifications("admin");
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const [tab, setTab] = useState<"contacts" | "feedback" | "chat" | "email-logs" | "settings">("contacts");

  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackReview[]>([]);

  const [loadingC, setLoadingC] = useState(true);
  const [loadingCh, setLoadingCh] = useState(true);
  const [loadingF, setLoadingF] = useState(true);

  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [replyTarget, setReplyTarget] = useState<string | null>(null);

  const [emailReplyId, setEmailReplyId] = useState<string | null>(null);
  const [emailReplyText, setEmailReplyText] = useState("");
  const [emailReplying, setEmailReplying] = useState(false);
  const [emailReplySent, setEmailReplySent] = useState<string | null>(null);
  const [emailReplyError, setEmailReplyError] = useState("");
  const [emailLogs, setEmailLogs] = useState<any[]>([]);

  // Gmail Settings
  const [gmailAppPassword, setGmailAppPassword] = useState("");
  const [gmailSaved, setGmailSaved] = useState(false);
  const [gmailError, setGmailError] = useState("");

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [unreadC, setUnreadC] = useState(0);
  const [unreadCh, setUnreadCh] = useState(0);
  const [unreadF, setUnreadF] = useState(0);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const prevCountC = useRef<number | null>(null);
  const prevCountCh = useRef<number | null>(null);
  const prevCountF = useRef<number | null>(null);
  const toastCounter = useRef(0);
  const tabRef = useRef(tab);
  useEffect(() => { tabRef.current = tab; }, [tab]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = ++toastCounter.current;
    setToasts(prev => [...prev, { id, ...toast }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const sendBrowserNotif = useCallback((title: string, body: string) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body, icon: "/logo.png" });
    }
  }, []);

  useEffect(() => {
    if (authed && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, [authed]);

  // Fetch email logs on component mount
  useEffect(() => {
    const fetchEmailLogs = async () => {
      try {
        const res = await fetch("/api/admin/email-logs");
        if (res.ok) {
          const data = await res.json();
          setEmailLogs(Array.isArray(data.emails) ? data.emails : []);
        }
      } catch (err) {
        console.error("[v0] Failed to fetch email logs:", err);
      }
    };
    fetchEmailLogs();
  }, []);

  useEffect(() => {
    if (!authed) return;

    const unsubContacts = onSnapshot(
      query(collection(db, "contact_messages"), orderBy("createdAt", "desc")),
      snap => {
        const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
        setContacts(msgs);
        setLoadingC(false);
        if (prevCountC.current !== null && msgs.length > prevCountC.current) {
          const newest = msgs[0];
          const title = `New Contact Message from ${newest.name}`;
          const body = newest.message.slice(0, 80);
          addToast({ title, body, type: "contact" });
          sendBrowserNotif(title, body);
          if (tabRef.current !== "contacts") setUnreadC(n => n + 1);
        }
        prevCountC.current = msgs.length;
      },
      () => setLoadingC(false)
    );

    const unsubChat = onSnapshot(
      query(collection(db, "chat_messages"), orderBy("createdAt", "asc")),
      snap => {
        const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() } as ChatMessage));
        setChats(msgs);
        setLoadingCh(false);
        if (prevCountCh.current !== null && msgs.length > prevCountCh.current) {
          const newest = msgs[msgs.length - 1];
          if (!newest.isAdmin) {
            const title = `New Chat from ${newest.name}`;
            const body = newest.text.slice(0, 80);
            addToast({ title, body, type: "chat" });
            sendBrowserNotif(title, body);
            if (tabRef.current !== "chat") setUnreadCh(n => n + 1);
          }
        }
        prevCountCh.current = msgs.length;
      },
      () => setLoadingCh(false)
    );

    const unsubFeedback = onSnapshot(
      query(collection(db, "feedback_reviews"), orderBy("createdAt", "desc")),
      snap => {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() } as FeedbackReview));
        setFeedbacks(items);
        setLoadingF(false);
        if (prevCountF.current !== null && items.length > prevCountF.current) {
          const newest = items[0];
          const title = `New Feedback ⭐${newest.rating} from ${newest.name}`;
          const body = newest.review.slice(0, 80);
          addToast({ title, body, type: "feedback" });
          sendBrowserNotif(title, body);
          if (tabRef.current !== "feedback") setUnreadF(n => n + 1);
        }
        prevCountF.current = items.length;
      },
      () => setLoadingF(false)
    );

    return () => { unsubContacts(); unsubChat(); unsubFeedback(); };
  }, [authed, addToast, sendBrowserNotif]);

  useEffect(() => {
    if (tab === "chat") {
      setUnreadCh(0);
      setTimeout(() => chatBottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
    if (tab === "contacts") setUnreadC(0);
    if (tab === "feedback") setUnreadF(0);
  }, [tab, chats.length]);

  const handleReplyClick = (name: string) => {
    const mention = `@${name}: `;
    setReplyText(mention);
    setReplyTarget(name);
    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
        replyInputRef.current.setSelectionRange(mention.length, mention.length);
      }
    }, 50);
  };

  const deleteContact = async (id: string) => { await deleteDoc(doc(db, "contact_messages", id)); };
  const deleteChat = async (id: string) => { await deleteDoc(doc(db, "chat_messages", id)); };
  const deleteFeedback = async (id: string) => { await deleteDoc(doc(db, "feedback_reviews", id)); };

  const sendEmailReply = async (msg: ContactMessage) => {
    if (!emailReplyText.trim() || emailReplying) return;
    setEmailReplying(true);
    setEmailReplyError("");
    
    try {
      console.log("[v0] Sending email reply to:", msg.email);
      
      const res = await fetch("/api/admin/reply-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: msg.email,
          userName: msg.name,
          replyMessage: emailReplyText.trim(),
          originalMessage: msg.message,
        }),
      });

      console.log("[v0] Response status:", res.status);
      
      // Handle non-200 status codes
      if (!res.ok) {
        let errorMsg = `Server error (${res.status})`;
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          console.log("[v0] Could not parse error response");
        }
        throw new Error(errorMsg);
      }

      // Parse successful response
      let data;
      try {
        data = await res.json();
        console.log("[v0] Response data:", data);
      } catch (parseErr) {
        console.error("[v0] Failed to parse JSON:", parseErr);
        throw new Error("Invalid server response - could not parse JSON");
      }

      if (!data.success) {
        throw new Error(data.error || "Server returned unsuccessful response");
      }

      // Success
      addToast({ 
        title: "Reply sent successfully", 
        body: `Email sent to ${msg.email}`, 
        type: "contact" 
      });
      setEmailReplySent(msg.id);
      setEmailReplyId(null);
      setEmailReplyText("");
      
      // Fetch updated email logs
      try {
        const logsRes = await fetch("/api/admin/email-logs");
        if (logsRes.ok) {
          const logsData = await logsRes.json();
          setEmailLogs(Array.isArray(logsData.emails) ? logsData.emails : []);
        }
      } catch (logErr) {
        console.log("[v0] Could not fetch email logs:", logErr);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      console.error("[v0] Send reply failed:", message, err);
      setEmailReplyError(message);
      addToast({ 
        title: "Failed to send reply", 
        body: message, 
        type: "contact" 
      });
    } finally {
      setEmailReplying(false);
    }
  };

  const sendAdminReply = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = replyText.trim();
    if (!text || replying) return;
    setReplying(true);
    try {
      await addDoc(collection(db, "chat_messages"), {
        name: ADMIN_NAME,
        text,
        provider: "admin",
        isAdmin: true,
        replyTo: replyTarget ?? null,
        createdAt: serverTimestamp(),
      });
      notifyVisitors(
        "🔔 New Reply from Muhammad Imran",
        text.slice(0, 100),
        "/chat"
      );
      setReplyText("");
      setReplyTarget(null);
    } catch {
      // silent
    } finally {
      setReplying(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_auth");
    setAuthed(false);
  };

  if (!authed) {
    return (
      <>
        <SEOHead title="Admin | Imran Digitals" description="Private administration area." path="/admin" noIndex />
        <PasswordGate onUnlock={() => setAuthed(true)} />
      </>
    );
  }

  const avgRating = feedbacks.length
    ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black">
      <SEOHead title="Admin | Imran Digitals" description="Private administration area." path="/admin" noIndex />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400 text-neutral-900">
              <HiOutlineLockClosed size={16} />
            </div>
            <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Admin Panel</h1>
            <span className="rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-600 dark:text-yellow-400 text-[10px] font-semibold px-2 py-0.5">
              {ADMIN_NAME}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Notification.permission === "default" && (
              <button
                onClick={() => Notification.requestPermission()}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HiOutlineBell size={13} /> Enable Notifications
              </button>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <HiOutlineLogout size={13} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-6">
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Contact Messages</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{loadingC ? "-" : contacts.length}</p>
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Feedback Reviews</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{loadingF ? "-" : feedbacks.length}</p>
            {avgRating && <p className="text-xs text-yellow-500 font-medium">⭐ {avgRating} avg</p>}
          </div>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-1">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Chat Messages</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{loadingCh ? "-" : chats.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 w-fit">
          {([
            { key: "contacts", label: "Contact", icon: <HiOutlineMail size={15} />, count: contacts.length, unread: unreadC, loading: loadingC },
            { key: "feedback", label: "Feedback", icon: <HiStar size={15} />, count: feedbacks.length, unread: unreadF, loading: loadingF },
            { key: "chat",     label: "Chat",     icon: <HiOutlineChatAlt2 size={15} />, count: chats.length, unread: unreadCh, loading: loadingCh },
            { key: "email-logs", label: "Email Logs", icon: <HiOutlineMail size={15} />, count: emailLogs.length, unread: 0, loading: false },
            { key: "settings",  label: "Settings",    icon: <HiOutlineCog size={15} />, count: 0, unread: 0, loading: false },
          ] as const).map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t.key ? "bg-yellow-400 text-neutral-900" : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"}`}
            >
              {t.icon} {t.label}
              {!t.loading && t.count > 0 && (
                <span className="rounded-full bg-neutral-900/10 dark:bg-white/10 px-1.5 py-0.5 text-[10px]">{t.count}</span>
              )}
              {t.unread > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white font-bold animate-pulse">
                  {t.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Contact Messages Tab ── */}
        {tab === "contacts" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <HiOutlineRefresh size={11} className="animate-pulse text-green-500" /> Live - updates in real-time
            </div>
            {loadingC && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 animate-pulse" />)}</div>}
            {!loadingC && contacts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-sm text-neutral-400">No contact messages yet.</div>
            )}
            {contacts.map(msg => (
              <div key={msg.id} className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-sm text-blue-500 hover:underline">{msg.email}</a>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{timeStr(msg.createdAt)}</span>
                    <button onClick={() => deleteContact(msg.id)} className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 dark:border-red-800 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Delete">
                      <HiOutlineTrash size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap border-l-2 border-yellow-400 pl-3">{msg.message}</p>
                {emailReplySent === msg.id ? (
                  <div className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 dark:border-green-700 px-3 py-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20">
                    ✓ Reply sent to {msg.email}
                  </div>
                ) : emailReplyId === msg.id ? (
                  <div className="space-y-2 w-full">
                    <textarea
                      value={emailReplyText}
                      onChange={e => setEmailReplyText(e.target.value)}
                      placeholder={`Write your reply to ${msg.name}…`}
                      rows={3}
                      className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                    />
                    {emailReplyError && (
                      <p className="text-xs text-red-500">{emailReplyError}</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => sendEmailReply(msg)}
                        disabled={!emailReplyText.trim() || emailReplying}
                        className="flex items-center gap-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 px-3 py-1.5 text-xs font-semibold text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                      >
                        <HiOutlineMail size={12} /> {emailReplying ? "Sending…" : "Send Reply"}
                      </button>
                      <button
                        onClick={() => { setEmailReplyId(null); setEmailReplyText(""); setEmailReplyError(""); }}
                        className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { setEmailReplyId(msg.id); setEmailReplyText(""); setEmailReplyError(""); }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <HiOutlineMail size={12} /> Reply via Email
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Feedback Tab ── */}
        {tab === "feedback" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <HiOutlineRefresh size={11} className="animate-pulse text-green-500" /> Live - updates in real-time
              {avgRating && (
                <span className="ml-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 text-[10px] font-medium">
                  ⭐ {avgRating} average rating
                </span>
              )}
            </div>
            {loadingF && <div className="space-y-3">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-28 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 animate-pulse" />)}</div>}
            {!loadingF && feedbacks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-sm text-neutral-400">No feedback reviews yet.</div>
            )}
            {feedbacks.map(fb => (
              <div key={fb.id} className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {fb.photoURL ? (
                      <img src={fb.photoURL} alt={fb.name} referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="h-9 w-9 flex items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-sm font-bold shrink-0">
                        {fb.name[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="space-y-0.5">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100">{fb.name}</p>
                      <div className="flex items-center gap-1.5">
                        <Badge text={fb.provider === "google" ? "Google" : "GitHub"} color={fb.provider === "google" ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"} />
                        <StarDisplay rating={fb.rating} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{timeStr(fb.createdAt)}</span>
                    <button onClick={() => deleteFeedback(fb.id)} className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 dark:border-red-800 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Delete">
                      <HiOutlineTrash size={13} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-wrap border-l-2 border-yellow-400 pl-3">{fb.review}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Chat Tab ── */}
        {tab === "chat" && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
              <HiOutlineRefresh size={11} className="animate-pulse text-green-500" /> Live - hover a message and click reply to mention someone
            </div>

            {loadingCh && <div className="space-y-2">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-16 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 animate-pulse" />)}</div>}
            {!loadingCh && chats.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-sm text-neutral-400">No chat messages yet.</div>
            )}

            {/* Messages list */}
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 divide-y divide-neutral-100 dark:divide-neutral-800 overflow-hidden max-h-[420px] overflow-y-auto">
              {chats.map(msg => (
                <div
                  key={msg.id}
                  className={`group flex items-start gap-3 px-5 py-3 transition-colors ${msg.isAdmin ? "bg-yellow-400/5 hover:bg-yellow-400/10" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}`}
                >
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-600 dark:text-neutral-400 ${msg.isAdmin ? "bg-yellow-400 text-neutral-900" : "bg-neutral-100 dark:bg-neutral-800"}`}>
                    {msg.isAdmin ? <span className="text-[10px] font-bold">MI</span>
                      : msg.provider === "google" ? <SiGoogle size={13} className="text-red-500" />
                      : <SiGithub size={13} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                      <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{msg.name}</span>
                      {msg.isAdmin
                        ? <Badge text="Admin" color="bg-yellow-400/20 text-yellow-700 dark:text-yellow-400" />
                        : <Badge text={msg.provider === "google" ? "Google" : "GitHub"} color={msg.provider === "google" ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"} />
                      }
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 ml-auto shrink-0">{timeStr(msg.createdAt)}</span>
                    </div>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">{msg.text}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!msg.isAdmin && (
                      <button
                        onClick={() => handleReplyClick(msg.name)}
                        className="opacity-0 group-hover:opacity-100 flex items-center gap-1 h-7 px-2 rounded-lg border border-blue-200 dark:border-blue-800 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-[11px] font-medium transition-all"
                        title={`Reply to ${msg.name}`}
                      >
                        <HiReply size={13} /> Reply
                      </button>
                    )}
                    <button
                      onClick={() => deleteChat(msg.id)}
                      className="opacity-0 group-hover:opacity-100 flex h-7 w-7 items-center justify-center rounded-lg border border-red-200 dark:border-red-800 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      title="Delete"
                    >
                      <HiOutlineTrash size={13} />
                    </button>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Admin Reply Box */}
            <div className={`rounded-2xl border p-4 space-y-3 transition-colors ${replyTarget ? "border-blue-400/40 bg-blue-50/50 dark:bg-blue-900/10" : "border-yellow-400/40 bg-yellow-400/5"}`}>
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-neutral-900">
                    <span className="text-[9px] font-bold">MI</span>
                  </div>
                  <p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
                    Reply as {ADMIN_NAME}
                    {replyTarget && (
                      <span className="ml-1 font-normal text-blue-600 dark:text-blue-400">→ @{replyTarget}</span>
                    )}
                  </p>
                </div>
                {replyTarget && (
                  <button
                    onClick={() => { setReplyTarget(null); setReplyText(""); }}
                    className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <HiX size={12} /> Clear
                  </button>
                )}
              </div>
              <form onSubmit={sendAdminReply} className="flex gap-2">
                <input
                  ref={replyInputRef}
                  type="text"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={replyTarget ? `Replying to @${replyTarget}…` : "Type your message… (hover a message to reply)"}
                  className="flex-1 rounded-xl border border-yellow-400/30 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                />
                <button
                  type="submit"
                  disabled={!replyText.trim() || replying}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  <HiPaperAirplane size={15} className="-rotate-45" />
                </button>
              </form>
              <p className="text-[10px] text-neutral-400">Visible to everyone in the chat room · Real-time via Firebase</p>
            </div>
          </div>
        )}

        {/* ── Email Logs Tab ── */}
        {tab === "email-logs" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
                <HiOutlineRefresh size={11} className="animate-pulse text-green-500" /> Email delivery history
              </div>
              <button
                onClick={async () => {
                  const res = await fetch("/api/admin/email-logs");
                  if (res.ok) {
                    const { emails } = await res.json();
                    setEmailLogs(emails);
                    addToast({ title: "Refreshed", body: `${emails.length} emails found`, type: "contact" });
                  }
                }}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <HiOutlineRefresh size={12} /> Refresh
              </button>
            </div>
            {emailLogs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-sm text-neutral-400">No emails sent yet.</div>
            )}
            {emailLogs.map((log, idx) => (
              <div key={log.id || idx} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100">To: {log.to}</p>
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full ${log.status === "delivered" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                        {log.status === "delivered" ? "✓ Delivered" : "✗ Failed"}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{log.subject}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500">{log.messagePreview}...</p>
                  </div>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500 shrink-0 whitespace-nowrap">{new Date(log.timestamp).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Settings Tab ── */}
        {tab === "settings" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Gmail Configuration</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Configure your Gmail account to send emails directly from the admin panel.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Gmail App Password</label>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    Generate at: <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">myaccount.google.com/security</a>
                  </p>
                  <input
                    type="password"
                    value={gmailAppPassword}
                    onChange={e => {
                      setGmailAppPassword(e.target.value);
                      setGmailError("");
                    }}
                    placeholder="Enter your 16-character Gmail App Password (spaces will be removed)"
                    className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {gmailError && <p className="text-xs text-red-500 mt-2">{gmailError}</p>}
                  {gmailSaved && <p className="text-xs text-green-600 dark:text-green-400 mt-2">✓ Gmail configuration saved successfully</p>}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const pwd = gmailAppPassword.replace(/\s/g, "");
                      if (!pwd || pwd.length < 16) {
                        setGmailError("Password must be at least 16 characters (including spaces)");
                        return;
                      }
                      localStorage.setItem("gmail_app_password", pwd);
                      setGmailSaved(true);
                      setGmailError("");
                      setTimeout(() => setGmailSaved(false), 3000);
                      addToast({ title: "Settings Saved", body: "Gmail configuration updated successfully", type: "contact" });
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-500 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors cursor-pointer"
                  >
                    Save Configuration
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("gmail_app_password");
                      setGmailAppPassword("");
                      setGmailError("Gmail configuration cleared");
                      setTimeout(() => setGmailError(""), 3000);
                    }}
                    className="rounded-lg border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Clear Configuration
                  </button>
                </div>

                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">How to get your Gmail App Password:</h4>
                  <ol className="text-xs text-neutral-600 dark:text-neutral-400 space-y-2 list-decimal list-inside">
                    <li>Go to <a href="https://myaccount.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">myaccount.google.com</a></li>
                    <li>Click on "Security" in the left menu</li>
                    <li>Enable "2-Step Verification" if not already enabled</li>
                    <li>Scroll down to "App passwords"</li>
                    <li>Select "Mail" and "Windows Computer"</li>
                    <li>Copy the 16-character password shown</li>
                    <li>Paste it above and click "Save Configuration"</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

