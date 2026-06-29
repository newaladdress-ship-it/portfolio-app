import { useState } from "react";
import SEOHead from "@/components/SEOHead";
import {
  HiOutlineBriefcase, HiChevronRight, HiChevronDown,
  HiOutlineDownload, HiOutlineEye, HiX,
} from "react-icons/hi";
import { TbSchool } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { format, differenceInMonths, differenceInYears } from "date-fns";
import SectionHeading from "@/components/layout/SectionHeading";
import SectionSubHeading from "@/components/layout/SectionSubHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { PERSONAL, CAREERS, EDUCATION } from "@/data/personal";
import { useT } from "@/lib/i18n";

const CV_PATH = "/cv.pdf";
const CV_FILENAME = "Muhammad_Imran_CV.pdf";

function ResumeViewer({ onClose }: { onClose: () => void }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl"
        style={{ height: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 px-5 py-3">
          <div className="flex items-center gap-2">
            <HiOutlineEye size={16} className="text-neutral-500" />
            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Muhammad Imran - Resume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={CV_PATH}
              download={CV_FILENAME}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <HiOutlineDownload size={13} />
              Download
            </a>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <HiX size={15} />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <div className="relative flex-1 bg-neutral-100 dark:bg-neutral-950">
          {!loaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-indigo-500" />
              <p className="text-sm">Loading resume…</p>
            </div>
          )}
          <iframe
            src={CV_PATH}
            className="h-full w-full"
            title="Resume"
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}

function ResumeButtons() {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setViewerOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-4 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm"
        >
          <HiOutlineEye size={16} />
          View Resume
        </button>
        <a
          href={CV_PATH}
          download={CV_FILENAME}
          className="flex items-center gap-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 px-4 py-2.5 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all shadow-sm"
        >
          <HiOutlineDownload size={16} />
          Download Resume
        </a>
      </div>

      {viewerOpen && <ResumeViewer onClose={() => setViewerOpen(false)} />}
    </>
  );
}

function Story() {
  const paragraphs = [
    "I'm a motivated and passionate MERN Stack Developer with a strong interest in building modern, responsive, and user-friendly web applications. I have hands-on experience with React.js, Node.js, Express.js, Next.js, MongoDB, and Tailwind CSS.",
    "I focus on writing clean code, understanding core concepts, and continuously improving my skills through real projects. I'm experienced with responsive UI design, frontend logic with React, and building backend APIs using Node and Express.",
    "I'm a quick learner, hardworking, and always eager to explore new technologies. My goal is to grow as a full-stack developer and contribute to real-world projects while learning from experienced teams.",
  ];

  return (
    <section className="space-y-4 leading-7 text-neutral-800 dark:text-neutral-300">
      {paragraphs.map((p, i) => (
        <div key={i}>{p}</div>
      ))}
    </section>
  );
}

function CareerCard({ career }: { career: typeof CAREERS[0] }) {
  const [isShowDetails, setIsShowDetails] = useState(false);

  const startDate = new Date(career.startDate);
  const endDate = career.endDate ? new Date(career.endDate) : new Date();

  const durationYears = differenceInYears(endDate, startDate);
  const durationMonths = differenceInMonths(endDate, startDate) % 12;

  let durationText = "";
  if (durationYears > 0) durationText += `${durationYears} year${durationYears > 1 ? "s" : ""} `;
  if (durationMonths > 0 || durationYears === 0) durationText += `${durationMonths} Month${durationMonths !== 1 ? "s" : ""}`;

  return (
    <SpotlightCard className="flex items-start gap-5 p-6">
      {career.logo ? (
        <img
          width={60}
          height={60}
          loading="lazy"
          decoding="async"
          src={career.logo}
          alt={`${career.company} logo`}
          className="shrink-0 rounded-lg border-[1.5px] border-neutral-300 bg-neutral-100 dark:border-neutral-700 object-cover"
        />
      ) : (
        <BsBuildings size={60} className="shrink-0 text-neutral-500" />
      )}

      <div className="w-full space-y-1">
        <h5 className="font-medium text-neutral-900 dark:text-neutral-100">{career.position}</h5>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-2 md:flex-row">
            <a href={career.link} target="_blank" rel="noreferrer">
              <span className="cursor-pointer hover:text-neutral-900 hover:underline hover:dark:text-neutral-50">
                {career.company}
              </span>
            </a>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span>{career.location}</span>
          </div>
          <div className="flex flex-col gap-2 text-[13px] md:flex-row">
            <div className="flex gap-1 text-neutral-600 dark:text-neutral-400">
              <span>{format(startDate, "MMM yyyy")}</span> -{" "}
              <span>{career.endDate ? format(endDate, "MMM yyyy") : "Present"}</span>
            </div>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span className="text-neutral-500">{durationText}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span className="text-neutral-600 dark:text-neutral-400">{career.type}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span className="text-neutral-500">{career.locationType}</span>
          </div>
        </div>

        <button
          onClick={() => setIsShowDetails(!isShowDetails)}
          className="mt-2 flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
        >
          {isShowDetails ? "Hide" : "Show"} details
          {isShowDetails ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
        </button>

        {isShowDetails && (
          <div className="mt-3 space-y-3 text-sm">
            <div>
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Responsibilities</p>
              <ul className="list-disc ml-4 space-y-1 text-neutral-600 dark:text-neutral-400">
                {career.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">What I Learned</p>
              <ul className="list-disc ml-4 space-y-1 text-neutral-600 dark:text-neutral-400">
                {career.lessonsLearned.map((l, i) => <li key={i}>{l}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-medium text-neutral-700 dark:text-neutral-300 mb-1">Impact</p>
              <ul className="list-disc ml-4 space-y-1 text-neutral-600 dark:text-neutral-400">
                {career.impact.map((imp, i) => <li key={i}>{imp}</li>)}
              </ul>
            </div>
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

function EducationCard({ edu }: { edu: typeof EDUCATION[0] }) {
  return (
    <SpotlightCard className="flex items-start gap-5 p-6">
      {edu.logo ? (
        <img width={70} height={70} loading="lazy" decoding="async" src={edu.logo} alt={`${edu.school} logo`} className="rounded-lg" />
      ) : (
        <TbSchool size={65} className="shrink-0 text-neutral-500" />
      )}
      <div className="space-y-1">
        <a href={edu.link} target="_blank" rel="noreferrer">
          <h6 className="font-medium text-neutral-900 dark:text-neutral-100 hover:underline">{edu.school}</h6>
        </a>
        <div className="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex flex-col gap-1 md:flex-row md:gap-2">
            <span>{edu.degree}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span>{edu.major}</span>
            {edu.GPA && (
              <div className="flex gap-2">
                <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
                <span>GPA: {edu.GPA}</span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 text-[12px] md:flex-row md:gap-2">
            <span className="dark:text-neutral-500">{(edu as { period?: string }).period ?? `${edu.startYear} – ${edu.endYear ?? "Present"}`}</span>
            <span className="hidden text-neutral-300 dark:text-neutral-700 md:block">•</span>
            <span>{edu.location}</span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function AboutPage() {
  const t = useT();
  return (
    <>
      <SEOHead
        title="About Muhammad Imran - Web Developer in Multan, Pakistan"
        description="Professional background, skills, and technical stack of Muhammad Imran, a React, Node.js, and full-stack web developer in Pakistan."
        path="/about"
      />
      <Story />

      <Breakline className="my-8" />

      {/* Resume Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-5 py-4">
        <div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">My Resume</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">View or download my full resume / CV</p>
        </div>
        <ResumeButtons />
      </div>

      <Breakline className="my-8" />

      <section className="space-y-6">
        <div className="space-y-2">
          <SectionHeading title={t.about.career} icon={<HiOutlineBriefcase />} />
          <SectionSubHeading>
            <p>{t.about.sub}</p>
          </SectionSubHeading>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {CAREERS.filter(c => c.isShow).map((career, i) => (
            <CareerCard key={i} career={career} />
          ))}
        </div>
      </section>

      <Breakline className="my-8" />

      <section className="space-y-6">
        <div className="space-y-2">
          <SectionHeading title={t.about.education} icon={<TbSchool />} />
          <SectionSubHeading>
            <p>{t.about.educationSub}</p>
          </SectionSubHeading>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {EDUCATION.map((edu, i) => (
            <EducationCard key={i} edu={edu} />
          ))}
        </div>
      </section>
    </>
  );
}
