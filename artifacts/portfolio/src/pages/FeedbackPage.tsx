import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import { notifyAdmin } from "@/hooks/usePushNotifications";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { HiStar, HiX } from "react-icons/hi";
import { SiGithub, SiGoogle } from "react-icons/si";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { auth, googleProvider, db } from "@/lib/firebase";
import { useT } from "@/lib/i18n";

type FeedbackUser = {
  name: string;
  provider: "google" | "github";
  photoURL?: string;
};

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110"
        >
          <HiStar
            size={32}
            className={`transition-colors duration-150 ${
              star <= (hovered || value)
                ? "text-yellow-400"
                : "text-neutral-200 dark:text-neutral-700"
            }`}
          />
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="ml-2 text-sm font-medium text-neutral-600 dark:text-neutral-400">
          {STAR_LABELS[hovered || value]}
        </span>
      )}
    </div>
  );
}

function AuthGate({ onLogin }: { onLogin: (user: FeedbackUser) => void }) {
  const t = useT();
  const [step, setStep] = useState<"choose" | "github-name">("choose");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState<"google" | "github" | null>(null);
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
        photoURL: user.photoURL || undefined,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (!msg.includes("popup-closed")) setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handleGithub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading("github");
    onLogin({ name: name.trim(), provider: "github" });
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
                      <HiOutlineChatBubbleLeftRight size={28} />
                    </div>
                  </div>
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {t.feedback.signInTitle}
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t.feedback.signInSub}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleGoogle}
                    disabled={loading !== null}
                    className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-60 transition-colors shadow-sm"
                  >
                    <SiGoogle size={18} className="text-red-500 shrink-0" />
                    {loading === "google" ? "Signing in…" : t.feedback.google}
                  </button>
                  <button
                    onClick={() => setStep("github-name")}
                    disabled={loading !== null}
                    className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 disabled:opacity-60 transition-colors shadow-sm"
                  >
                    <SiGithub size={18} className="text-neutral-700 dark:text-neutral-300 shrink-0" />
                    {t.feedback.github}
                  </button>
                </div>

                {error && <p className="text-center text-xs text-red-500">{error}</p>}
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
                    <SiGithub size={15} />
                    Signing in with GitHub
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    What's your name?
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    This will appear with your review
                  </p>
                </div>
                <form onSubmit={handleGithub} className="space-y-4">
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
                    disabled={!name.trim()}
                    className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors"
                  >
                    Continue
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </div>
  );
}

function ReviewForm({ user, onDone }: { user: FeedbackUser; onDone: () => void }) {
  const t = useT();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    setStatus("submitting");
    try {
      await addDoc(collection(db, "feedback_reviews"), {
        name: user.name,
        provider: user.provider,
        photoURL: user.photoURL ?? null,
        rating,
        review: review.trim(),
        createdAt: serverTimestamp(),
      });
      // Notify admin about new review
      notifyAdmin(
        `New ${rating}-star Review from ${user.name}`,
        review.trim().slice(0, 100),
        "/admin",
        "feedback-review"
      );
      if (user.provider === "google") {
        await signOut(auth).catch(() => {});
      }
      setStatus("done");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <SpotlightCard className="w-full max-w-md">
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <HiStar size={32} className="text-yellow-400" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                {t.feedback.thankYou}
              </h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {t.feedback.thankYouSub}
              </p>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <HiStar
                  key={s}
                  size={20}
                  className={s <= rating ? "text-yellow-400" : "text-neutral-200 dark:text-neutral-700"}
                />
              ))}
            </div>
            <button
              onClick={onDone}
              className="mt-2 flex items-center gap-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 px-5 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              {t.feedback.backBtn}
            </button>
          </div>
        </SpotlightCard>
      </div>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avatarColors = ["bg-blue-500", "bg-purple-500", "bg-pink-500", "bg-green-500", "bg-orange-500"];
  const avatarColor = avatarColors[user.name.charCodeAt(0) % avatarColors.length];

  return (
    <div className="flex flex-col items-center py-6">
      <SpotlightCard className="w-full max-w-lg">
        <form onSubmit={handleSubmit} className="p-7 space-y-6">
          {/* Signed in as */}
          <div className="flex items-center gap-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 px-4 py-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="h-9 w-9 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className={`${avatarColor} h-9 w-9 flex items-center justify-center rounded-full text-white text-sm font-bold shrink-0`}>
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 truncate">{user.name}</p>
              <div className="flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                {user.provider === "google"
                  ? <SiGoogle size={10} className="text-red-500" />
                  : <SiGithub size={10} />}
                <span>Signed in via {user.provider === "google" ? "Google" : "GitHub"}</span>
              </div>
            </div>
          </div>

          {/* Star rating */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {t.feedback.ratingLabel}
            </label>
            <StarRating value={rating} onChange={setRating} />
          </div>

          {/* Review text */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {t.feedback.reviewLabel}
              </label>
              <span className="text-[11px] text-neutral-400">{review.length}/500 {t.feedback.charCount}</span>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, 500))}
              placeholder={t.feedback.reviewPlaceholder}
              rows={5}
              required
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!rating || !review.trim() || status === "submitting"}
            className="w-full rounded-xl bg-yellow-400 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors"
          >
            {status === "submitting" ? t.feedback.submitting : t.feedback.submitBtn}
          </button>
        </form>
      </SpotlightCard>
    </div>
  );
}

export default function FeedbackPage() {
  const t = useT();
  const [user, setUser] = useState<FeedbackUser | null>(null);

  return (
    <section className="space-y-6">
      <SEOHead
        title="Client Reviews and Feedback for Muhammad Imran Developer"
        description="Read genuine client reviews of web developer Muhammad Imran or share your feedback after collaborating on React and MERN projects."s web development work or share your own feedback after collaborating on a React or MERN project."
        path="/feedback"
      />
      <div className="space-y-2">
        <SectionHeading title={t.feedback.heading} icon={<HiOutlineChatBubbleLeftRight />} />
        <SectionSubHeading>
          <p>{t.feedback.sub}</p>
        </SectionSubHeading>
      </div>

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
            key="review"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ReviewForm user={user} onDone={() => setUser(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
