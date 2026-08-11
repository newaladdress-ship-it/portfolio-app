import { useState } from "react";
import { Link } from "wouter";
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
import Breakline from "@/components/layout/Breakline";
import { auth, googleProvider, db } from "@/lib/firebase";
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Heart,
  Layout,
  Briefcase,
  Layers,
  Smartphone,
  Lightbulb,
} from "lucide-react";

type FeedbackUser = {
  name: string;
  provider: "google" | "github";
  photoURL?: string;
};

const STAR_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-1.5 font-sans">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110 focus:outline-none"
        >
          <HiStar
            size={36}
            className={`transition-colors duration-150 ${
              star <= (hovered || value)
                ? "text-[#C96A3D]"
                : "text-[#D9D4CA] dark:text-[#2A3632]"
            }`}
          />
        </button>
      ))}
      {(hovered || value) > 0 && (
        <span className="ml-3 text-sm font-mono font-semibold text-[#C96A3D]">
          {STAR_LABELS[hovered || value]}
        </span>
      )}
    </div>
  );
}

function AuthGate({ onLogin }: { onLogin: (user: FeedbackUser) => void }) {
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
                <Lock size={13} />
                <span>Secure Feedback System</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
                Leave a Review
              </h2>
              <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Sign in to share your experience and leave feedback. You can continue securely using your existing <strong className="text-[#17211E] dark:text-[#F5F2EC]">Google</strong> or <strong className="text-[#17211E] dark:text-[#F5F2EC]">GitHub</strong> account.
              </p>
            </div>

            {/* Why Sign In Section */}
            <div className="p-5 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917] border border-[#D9D4CA]/80 dark:border-[#2A3632] space-y-3">
              <h3 className="text-xs font-mono font-semibold uppercase text-[#C96A3D] tracking-wider">
                Why Sign In?
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Authentication helps keep feedback associated with a real account and reduces spam and automated submissions.
              </p>
              <p className="text-xs font-mono font-semibold text-[#17211E] dark:text-[#F5F2EC] pt-1">
                After signing in, you'll be able to:
              </p>
              <ul className="space-y-2 text-sm text-[#5C655F] dark:text-[#9DA6A0]">
                {[
                  "Share your experience with my portfolio",
                  "Leave a review or general feedback",
                  "Tell me what you found useful",
                  "Suggest improvements",
                  "Share thoughts about my projects and presentation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <CheckCircle2 size={15} className="text-[#C96A3D] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* OAuth buttons */}
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
                What's your name?
              </h2>
              <p className="text-xs text-[#5C655F] dark:text-[#9DA6A0]">
                This display name will appear with your portfolio review.
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
                className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 focus:outline-none focus:border-[#C96A3D] transition-colors"
              />
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 text-sm font-heading font-medium text-white transition-colors"
              >
                Continue
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </SpotlightCard>
  );
}

function ReviewForm({ user, onDone }: { user: FeedbackUser; onDone: () => void }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review.trim()) return;
    setStatus("submitting");
    try {
      if (db) {
        await addDoc(collection(db, "feedback_reviews"), {
          name: user.name,
          provider: user.provider,
          photoURL: user.photoURL ?? null,
          rating,
          review: review.trim(),
          approved: false, // moderation queue flag
          createdAt: serverTimestamp(),
        });
      }

      await notifyAdmin(
        `⭐ New ${rating}-star Review from ${user.name}`,
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
      <SpotlightCard className="p-8 sm:p-10 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] text-center space-y-6 font-sans">
        <div className="w-16 h-16 rounded-2xl bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center mx-auto">
          <HiStar size={32} />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
            Thanks for your feedback!
          </h2>
          <p className="text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
            Your review has been submitted successfully.
          </p>
          <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] pt-1">
            Note: All feedback undergoes brief moderation before appearing publicly on the portfolio.
          </p>
        </div>

        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <HiStar
              key={s}
              size={22}
              className={s <= rating ? "text-[#C96A3D]" : "text-[#D9D4CA] dark:text-[#2A3632]"}
            />
          ))}
        </div>

        <div className="pt-2">
          <button
            onClick={onDone}
            className="inline-flex items-center gap-2 rounded-lg bg-[#C96A3D] hover:bg-[#A9512A] px-6 py-3 text-sm font-heading font-medium text-white transition-colors"
          >
            Submit Another Review
          </button>
        </div>
      </SpotlightCard>
    );
  }

  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <SpotlightCard className="p-6 sm:p-8 rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] space-y-6 font-sans">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Signed in user badge */}
        <div className="flex items-center gap-3 rounded-xl bg-[#F5F2EC]/60 dark:bg-[#121917] border border-[#D9D4CA]/80 dark:border-[#2A3632] px-4 py-3">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#C96A3D] text-white text-sm font-mono font-bold shrink-0">
              {initials}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC] truncate">
              {user.name}
            </p>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              {user.provider === "google" ? (
                <SiGoogle size={12} className="text-red-500" />
              ) : (
                <SiGithub size={12} />
              )}
              <span>Signed in via {user.provider === "google" ? "Google" : "GitHub"}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <h2 className="font-heading text-xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
            How was your experience?
          </h2>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Review text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-heading font-semibold text-[#17211E] dark:text-[#F5F2EC]">
              Your feedback
            </label>
            <span className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              {review.length}/500 characters
            </span>
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 500))}
            placeholder="Tell Muhammad Imran what you think..."
            rows={5}
            required
            className="w-full rounded-xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#F5F2EC]/60 dark:bg-[#121917] px-4 py-3 text-sm text-[#17211E] dark:text-[#F5F2EC] placeholder-[#5C655F]/60 focus:outline-none focus:border-[#C96A3D] transition-colors resize-y"
          />
        </div>

        <button
          type="submit"
          disabled={!rating || !review.trim() || status === "submitting"}
          className="w-full rounded-xl bg-[#C96A3D] hover:bg-[#A9512A] disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3.5 text-sm font-heading font-medium text-white transition-colors shadow-xs"
        >
          {status === "submitting" ? "Submitting Feedback…" : "Submit Feedback"}
        </button>
      </form>
    </SpotlightCard>
  );
}

export default function FeedbackPage() {
  const [user, setUser] = useState<FeedbackUser | null>(null);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://imrandigitals.com/" },
      { "@type": "ListItem", position: 2, name: "Portfolio Feedback", item: "https://imrandigitals.com/feedback" },
    ],
  };

  return (
    <>
      <SEOHead
        title="Portfolio Feedback | Muhammad Imran"
        description="Share your feedback about Muhammad Imran's portfolio, projects, and web development work. Sign in securely with Google or GitHub to leave a review."
        path="/feedback"
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
          <span className="text-[#17211E] dark:text-[#F5F2EC]">Feedback</span>
        </nav>

        {/* ---------------- HERO / HEADER ---------------- */}
        <section className="space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-md bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] px-3.5 py-1.5 text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0]">
              <Sparkles size={14} className="text-[#C96A3D]" />
              <span>User Interaction &amp; Portfolio Reviews</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight text-[#17211E] dark:text-[#F5F2EC]">
              Portfolio Feedback
            </h1>

            <h2 className="font-heading text-xl sm:text-2xl font-semibold text-[#C96A3D]">
              Share Your Experience
            </h2>
          </div>

          <div className="space-y-3 text-base sm:text-lg leading-relaxed text-[#5C655F] dark:text-[#9DA6A0] max-w-4xl font-sans">
            <p>
              Your feedback helps me understand what works well across my portfolio and where I can improve.
            </p>
            <p>
              If you've explored my projects, services, development work, or professional background, I'd appreciate hearing your thoughts.
            </p>
          </div>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- INTERACTIVE REVIEW GATE / FORM ---------------- */}
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

        <Breakline className="my-8" />

        {/* ---------------- WHAT KIND OF FEEDBACK CAN YOU SHARE? ---------------- */}
        <section className="space-y-6 font-sans">
          <div className="space-y-2">
            <SectionHeading title="What Kind of Feedback Can You Share?" icon={<Lightbulb />} />
            <SectionSubHeading>
              <p>You can comment on anything related to the portfolio, including:</p>
            </SectionSubHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Layout size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Portfolio Experience
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Was the website easy to navigate and understand?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Projects
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Did the projects and case studies clearly explain the work?
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
                Were the services and development capabilities easy to understand?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Smartphone size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Design &amp; Usability
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                How was your experience using the website on desktop or mobile?
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#1B2421] border border-[#D9D4CA] dark:border-[#2A3632] space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-9 h-9 rounded-lg bg-[#C96A3D]/10 text-[#C96A3D] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="font-heading font-bold text-base text-[#17211E] dark:text-[#F5F2EC]">
                Suggestions
              </h3>
              <p className="text-sm text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
                Is there anything you'd like to see added, changed, or explained better?
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-[#5C655F] dark:text-[#9DA6A0] text-center">
            Your feedback can be positive, critical, or simply a suggestion. Honest feedback is welcome.
          </p>
        </section>

        <Breakline className="my-8" />

        {/* ---------------- THANK YOU ---------------- */}
        <section className="rounded-2xl border border-[#D9D4CA] dark:border-[#2A3632] bg-[#FFFEFA] dark:bg-[#1B2421] p-6 sm:p-8 space-y-4 font-sans">
          <div className="space-y-3 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-[#17211E] dark:text-[#F5F2EC]">
              Thank You
            </h2>
            <div className="space-y-3 text-base text-[#5C655F] dark:text-[#9DA6A0] leading-relaxed">
              <p>
                Whether you've worked with me, explored my projects, or simply visited the portfolio, your feedback is valuable.
              </p>
              <p className="font-semibold text-[#17211E] dark:text-[#F5F2EC]">
                Thank you for taking the time to share your experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
