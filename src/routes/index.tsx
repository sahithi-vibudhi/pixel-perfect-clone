import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { profilePhoto, profilePhotoAlt } from "@/lib/profile-photo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vibudhi Sahithi — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Vibudhi Sahithi, a Computer Science Engineering student and full stack developer working with Python, FastAPI, PostgreSQL and React.",
      },
      { property: "og:title", content: "Vibudhi Sahithi — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Projects, internship experience, skills and contact details of Vibudhi Sahithi, full stack developer and aspiring software developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const RESUME_PATH = `${import.meta.env.BASE_URL}Vibudhi_Sahithi_Resume.pdf`;
const EMAIL = "vibudhisahithi16@gmail.com";
const LINKEDIN = "https://linkedin.com/in/vibudhi-sahithi";
const GITHUB = "https://github.com/sahithi-vibudhi";
const PHONE = "9959187402";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const SKILLS: { title: string; items: string[] }[] = [
  { title: "Programming Languages", items: ["Python", "Java", "C"] },
  { title: "Frontend", items: ["React", "HTML", "CSS"] },
  { title: "Backend", items: ["FastAPI", "WebSockets"] },
  { title: "Databases", items: ["MySQL", "PostgreSQL"] },
  {
    title: "AI & Machine Learning",
    items: ["Machine Learning (basics)", "Artificial Intelligence", "Scikit-learn", "YOLO"],
  },
  {
    title: "Tools & Technologies",
    items: ["VS Code", "GitHub", "Google Cloud Platform", "Jupyter Notebook"],
  },
];

const PROJECTS: {
  name: string;
  description: string[];
  tech: string[];
  techNote?: string;
}[] = [
  {
    name: "TrinetraX — Smart Crowd Management System",
    description: [
      "AI-powered crowd management system for real-time crowd detection and monitoring.",
      "YOLO-based video analysis detects crowd density and identifies peak crowd levels.",
      "Full-stack platform with booking, user management, analytics and admin monitoring.",
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "YOLO"],
  },
  {
    name: "Disease Risk Prediction",
    description: [
      "Machine learning model that predicts disease risk using KNN and Naive Bayes.",
      "Improved model performance through data preprocessing, feature selection and evaluation.",
    ],
    tech: ["Python", "Machine Learning", "Scikit-learn"],
  },
  {
    name: "Emotion-Based Music Recommendation System",
    description: [
      "System that recommends music based on the user's detected emotion.",
      "Project details and description can be expanded here.",
    ],
    tech: [],
    techNote: "Tech stack to be added",
  },
];

const EXPERIENCE = [
  {
    company: "Purview India Consulting and Services LLP",
    role: "Software Development Intern",
    period: "Apr 2026 – Jun 2026",
    location: "Hyderabad, India",
    points: [
      "Developed the backend for the Health Check-up Post Call GenAgent using FastAPI and PostgreSQL.",
      "Built APIs for patient management, call initiation, call logs and report generation.",
      "Implemented WebSockets for real-time active call monitoring and live transcripts.",
    ],
  },
  {
    company: "Edunet Foundation",
    role: "Microsoft AI Initiative, AICTE",
    period: "April 2025 – May 2025",
    location: "Hyderabad, Telangana",
    points: [
      "Completed training in Artificial Intelligence and Machine Learning fundamentals.",
      "Learned concepts such as supervised learning, model evaluation and data preprocessing.",
      "Worked with Python tools to understand AI model development and data analysis.",
    ],
  },
];

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{label}</p>
      <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{title}</h2>
      <div className="accent-rule mt-4 h-px w-24" />
    </div>
  );
}

const PHOTO_KEY = "portfolio-profile-photo";

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const max = 800;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

function ProfilePhoto() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<string | null>(profilePhoto);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(PHOTO_KEY);
      if (saved) setPhoto(saved);
    } catch {}
  }, []);

  const openPicker = () => inputRef.current?.click();

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !/^image\/(jpe?g|png)$/.test(file.type)) return;
    const data = await resizeImage(file);
    setPhoto(data);
    try {
      localStorage.setItem(PHOTO_KEY, data);
    } catch {}
  };

  const removePhoto = () => {
    setPhoto(profilePhoto);
    try {
      localStorage.removeItem(PHOTO_KEY);
    } catch {}
  };

  return (
    <div className="relative mx-auto w-[15rem] sm:w-[17rem] lg:w-[20rem]">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={onFile}
      />
      <div className="absolute -inset-3 rounded-[2rem] bg-primary/10 blur-2xl" aria-hidden="true" />
      <div className="surface-panel relative aspect-square overflow-hidden rounded-[2rem] ring-1 ring-primary/40">
        {photo ? (
          <img
            src={photo}
            alt={profilePhotoAlt}
            className="h-full w-full object-cover"
            loading="eager"
          />
        ) : (
          <button
            type="button"
            onClick={openPicker}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3 bg-secondary/40 px-6 text-center transition-colors hover:bg-secondary/60"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-16 w-16 text-primary/70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              aria-hidden="true"
            >
              <circle cx="12" cy="8.5" r="3.6" />
              <path d="M4.5 20c1.4-3.8 4.2-5.6 7.5-5.6s6.1 1.8 7.5 5.6" strokeLinecap="round" />
            </svg>
            <span className="rounded-full border border-primary/50 px-4 py-1.5 text-sm font-medium text-foreground">
              Add Photo
            </span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              Profile photo placeholder — replace it with your own image anytime.
            </span>
          </button>
        )}
      </div>
      {photo && (
        <div className="relative mt-4 flex items-center justify-center gap-3 text-xs">
          <button type="button" onClick={openPicker} className="text-primary hover:underline">
            Change Photo
          </button>
          <span className="text-muted-foreground">|</span>
          <button type="button" onClick={removePhoto} className="text-muted-foreground hover:text-foreground hover:underline">
            Remove Photo
          </button>
        </div>
      )}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#hero" className="font-display text-sm font-semibold tracking-tight">
            Vibudhi <span className="text-primary">Sahithi</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={RESUME_PATH}
            download="Vibudhi_Sahithi_Resume.pdf"
            className="rounded-lg border border-primary/50 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Resume
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section id="hero" className="hero-glow relative py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="fade-up">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Hyderabad, Telangana
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
                Vibudhi Sahithi
              </h1>
              <p className="mt-4 text-base font-medium text-muted-foreground sm:text-lg">
                Full Stack Developer <span className="text-primary">|</span> Aspiring Software
                Developer
              </p>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Computer Science Engineering student building practical full-stack applications with
                Python, FastAPI, PostgreSQL and React. I enjoy working on real backend systems and
                keep improving my software development skills project by project.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  View Projects
                </a>
                <a
                  href={RESUME_PATH}
                  download="Vibudhi_Sahithi_Resume.pdf"
                  className="rounded-lg border border-primary/50 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  Download Resume
                </a>
                <a
                  href="#contact"
                  className="rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
                >
                  Contact Me
                </a>
              </div>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-primary"
              >
                or view resume in browser
              </a>
            </div>
            <ProfilePhoto />
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-border/70 py-16">
          <SectionHeading label="About" title="Who I am" />
          <div className="surface-panel max-w-3xl p-6 sm:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              I'm a Computer Science Engineering student with hands-on experience in backend
              development, full-stack applications and AI/ML. I like turning ideas into working
              software — building APIs, connecting them to clean interfaces and making sure the whole
              thing actually runs well.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Most of my learning comes from building practical projects, and I'm looking for a
              software development opportunity where I can keep growing while contributing real work.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t border-border/70 py-16">
          <SectionHeading label="Skills" title="What I know" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILLS.map((group) => (
              <div key={group.title} className="surface-panel p-5">
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-primary/25 bg-primary/5 px-2.5 py-1 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="border-t border-border/70 py-16">
          <SectionHeading label="Projects" title="What I built" />
          <div className="grid gap-5 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article key={project.name} className="surface-panel flex flex-col p-6">
                <h3 className="text-base font-semibold leading-snug">{project.name}</h3>
                <ul className="mt-4 space-y-2">
                  {project.description.map((line) => (
                    <li
                      key={line}
                      className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-primary before:content-['—']"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techNote ? (
                    <span className="rounded-md border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
                      {project.techNote}
                    </span>
                  ) : null}
                </div>
                <div className="mt-6 pt-2">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-3.5 py-2 text-xs font-semibold transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    GitHub
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-border/70 py-16">
          <SectionHeading label="Experience" title="Internship experience" />
          <div className="space-y-5">
            {EXPERIENCE.map((job) => (
              <div key={job.company} className="surface-panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold">{job.company}</h3>
                  <span className="text-xs font-medium text-primary">{job.period}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.role} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-primary before:content-['—']"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education" className="border-t border-border/70 py-16">
          <SectionHeading label="Education" title="Academic background" />
          <div className="surface-panel max-w-3xl p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-base font-semibold">
                Stanley College of Engineering and Technology for Women
              </h3>
              <span className="text-xs font-medium text-primary">2023 – 2027</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Bachelor of Technology (B.Tech) in Computer Science Engineering
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Hyderabad, Telangana</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="border-t border-border/70 py-16">
          <SectionHeading label="Contact" title="Let's Connect" />
          <div className="grid gap-5 sm:grid-cols-3">
            <a
              href={`mailto:${EMAIL}`}
              className="surface-panel group p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Email</p>
              <p className="mt-3 break-all text-sm text-muted-foreground group-hover:text-foreground">
                {EMAIL}
              </p>
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noreferrer"
              className="surface-panel group p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                LinkedIn
              </p>
              <p className="mt-3 break-all text-sm text-muted-foreground group-hover:text-foreground">
                linkedin.com/in/vibudhi-sahithi
              </p>
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="surface-panel group p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                GitHub
              </p>
              <p className="mt-3 break-all text-sm text-muted-foreground group-hover:text-foreground">
                github.com/sahithi-vibudhi
              </p>
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Phone: <span className="text-foreground">{PHONE}</span>
          </p>
        </section>
      </main>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Vibudhi Sahithi</p>
          <p>Full Stack Developer | Aspiring Software Developer</p>
        </div>
      </footer>
    </div>
  );
}
