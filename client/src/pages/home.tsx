import RaindropCanvas from "@/components/raindrop-canvas";
import Navigation from "@/components/navigation";
import TypewriterBanner from "@/components/typewriter-banner";
import SiteFooter from "@/components/site-footer";
import { Link } from "wouter";

const STEEL_TEAL = "#4A7C7E";
const DARK_SIENNA = "#6B3A2A";
const MAUVE_BROWN = "#8B6F5E";

const featuredProjects = [
  {
    id: "vermogenhorizon",
    title: "VermogenHorizon ClientCenter AI Assistant",
    description: "Leading research on banker-facing CRM and data analysis toolings, internal AI chat assistant, and client-facing mobile applications.",
    tag: "Finance Sector",
    year: "2023 — Now",
  },
  {
    id: "user-feedback-handler",
    title: "User Feedback Handler",
    description: "Designing an end-to-end feedback pipeline to transform raw user signals into actionable product insights.",
    tag: "Work · Interest project",
    year: "2026",
  },
  {
    id: "trip-planning-assistant",
    title: "Trip Planning Assistant",
    description: "A collaborative travel planner that orchestrates itinerary creation through conversational AI interaction.",
    tag: "Team side project",
    year: "2024 · 3 months",
  },
];

const latestExperience = {
  company: "Van Lanschot Kempen",
  role: "Full time",
  period: "July 2023 — NOW",
  sector: "Finance Sector",
  description: "Leading research on banker-facing CRM and data analysis toolings, internal AI chat assistant, and client-facing mobile applications.",
};

const pastExperiences = [
  {
    company: "Technology University of Eindhoven",
    role: "Part-time",
    period: "2022 — 2023",
    details: ["Content management system design", "Teaching assistant in several bachelor & master courses"],
  },
  {
    company: "Accenture",
    role: "Graduation Internship · 6 months · 2022—2023\nInternship · 6 months · 2021—2022",
    period: "2021 — 2023",
    details: ["Social VR design and development"],
  },
  {
    company: "PTTRNS.AI",
    role: "Internship · 6 months",
    period: "2022",
    details: ["B2C Fashion AI"],
  },
];

const principles = [
  { num: "01", text: "Always asking the WHY question." },
  { num: "02", text: "Bridging the gap between product teams and users." },
  { num: "03", text: "Managing research operations" },
  { num: "04", text: "Driving 100% decisions with 80% information." },
];

const LINE = "rgba(0,0,0,0.08)";
const LINE_L = "rgba(0,0,0,0.05)";
const CONTENT = "max-w-6xl mx-auto";

function ArrowLink({ href, label, color, external = true }: { href: string; label: string; color: string; external?: boolean }) {
  const cls = "group font-sans text-sm font-medium inline-flex items-center gap-1.5";
  const children = (
    <>
      <span className="no-underline group-hover:underline group-hover:underline-offset-2 transition-all decoration-current">
        {label}
      </span>
      <span
        className="inline-flex items-center justify-center text-[14px] leading-none font-bold transition-transform duration-200 -rotate-45 group-hover:rotate-0"
        style={{ width: "1em", height: "1em" }}
      >
        &#8594;
      </span>
    </>
  );
  const testId = `link-${label.toLowerCase().replace(/\s/g, "-")}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" data-testid={testId} className={cls} style={{ color }}>
        {children}
      </a>
    );
  }
  return <Link href={href} data-testid={testId} className={cls} style={{ color }}>{children}</Link>;
}

function FullLine() {
  return <div className="w-full h-px" style={{ background: LINE }} />;
}

export default function Home() {
  return (
    <div data-testid="page-home">
      <section
        className="relative w-full h-screen overflow-hidden"
        data-testid="section-hero"
      >
        <RaindropCanvas />
        <Navigation />
        <div className="absolute inset-0 z-10 flex items-center pointer-events-none px-8 md:px-12 lg:px-16">
          <TypewriterBanner />
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none px-8 md:px-12 lg:px-16 pb-8">
          <div
            className="flex items-end gap-8 flex-wrap pointer-events-auto"
            data-testid="section-hero-footer"
          >
            <div className="min-w-[180px] mr-8" data-testid="info-location">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Currently based in
              </p>
              <p className="font-sans text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                Amsterdam, NL & Paris, FR
              </p>
            </div>
            <div className="min-w-[140px]" data-testid="info-work">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Currently working in
              </p>
              <p className="font-sans text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                Finance sector
              </p>
            </div>
            <div className="flex-1 text-right" data-testid="info-contact">
              <p className="font-sans text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Contact me at
              </p>
              <div className="flex items-center justify-end gap-5">
                <ArrowLink href="https://www.instagram.com/luna_in_kitchen/" label="CookingInstagram" color="rgba(255,255,255,0.8)" />
                <ArrowLink href="https://www.linkedin.com/in/xumeng-zhang/" label="LinkedIn" color="rgba(255,255,255,0.8)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative"
        data-testid="section-latest-work"
      >
        <FullLine />

        <div className={`${CONTENT} px-6 py-28 md:py-36`}>
          <div className="flex items-baseline justify-between mb-16">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest mb-2" style={{ color: "rgba(0,0,0,0.35)" }}>
                Latest Work
              </p>
              <h2
                className="font-serif text-3xl md:text-4xl font-light tracking-tight"
                style={{ color: "#1a1a1a" }}
                data-testid="text-latest-work-heading"
              >
                Featured Projects
              </h2>
            </div>
            <ArrowLink href="/work" label="All work" color="rgba(0,0,0,0.45)" external={false} />
          </div>
        </div>

        <FullLine />
        <div className={`${CONTENT} grid grid-cols-1 md:grid-cols-3`}>
          {featuredProjects.map((project, idx) => (
            <Link key={project.id} href={`/work/${project.id}`}>
              <div
                className={`group relative overflow-hidden transition-colors duration-200 hover:bg-white/60 ${idx > 0 ? "border-t md:border-t-0 md:border-l" : ""}`}
                data-testid={`card-project-${project.id}`}
                style={{ borderColor: LINE }}
              >
                <div
                  className="h-48 md:h-56 flex items-center justify-center"
                  style={{
                    background: idx === 0
                      ? "linear-gradient(135deg, #e8e4df 0%, #d4cfc8 100%)"
                      : idx === 1
                      ? "linear-gradient(135deg, #eae7e2 0%, #ddd9d2 100%)"
                      : "linear-gradient(135deg, #ece9e4 0%, #dfdbd5 100%)",
                    borderBottom: `1px solid ${LINE}`,
                  }}
                >
                  <span
                    className="font-serif text-lg font-light opacity-30 text-center px-6"
                    style={{ color: "#1a1a1a" }}
                  >
                    {project.title}
                  </span>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="font-sans text-[10px] uppercase tracking-wider px-2 py-0.5"
                      style={{ background: `${STEEL_TEAL}12`, color: STEEL_TEAL }}
                    >
                      {project.tag}
                    </span>
                    <span className="font-sans text-[10px]" style={{ color: "rgba(0,0,0,0.3)" }}>
                      {project.year}
                    </span>
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl font-bold mb-3 leading-tight" style={{ color: "#1a1a1a" }} data-testid={`text-project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.5)" }}>
                    {project.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 font-sans text-xs group" style={{ color: STEEL_TEAL }}>
                    <span className="group-hover:underline transition-all">View project</span>
                    <span className="inline-block transition-transform duration-200 -rotate-45 group-hover:rotate-0 font-bold text-[12px]">&#8594;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <FullLine />
      </section>

      <section
        className="relative"
        data-testid="section-experience"
      >
        <div className={`${CONTENT} px-6 pt-20 md:pt-28 pb-12`}>
          <div className="text-center">
            <h2
              className="font-serif text-3xl md:text-4xl font-light tracking-tight mb-4"
              style={{ color: "#1a1a1a" }}
              data-testid="text-experience-heading"
            >
              Working as researcher,<br />product designer
            </h2>
            <p className="font-sans text-base" style={{ color: "rgba(0,0,0,0.45)" }}>
              Worked in Finance, SaaS, B2C Fashion AI sectors.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Link href="/work">
                <span
                  className="btn-pill font-sans text-sm px-5 py-2 rounded-full inline-block select-none"
                  style={{ border: `1px solid ${STEEL_TEAL}40`, color: STEEL_TEAL }}
                  data-testid="link-more-work"
                >
                  More work
                </span>
              </Link>
              <Link href="/about">
                <span
                  className="btn-pill font-sans text-sm px-5 py-2 rounded-full inline-block select-none"
                  style={{ border: `1px solid ${MAUVE_BROWN}40`, color: MAUVE_BROWN }}
                  data-testid="link-more-about"
                >
                  More about me
                </span>
              </Link>
            </div>
          </div>
        </div>

        <FullLine />
        <div className={`${CONTENT} grid grid-cols-1 lg:grid-cols-2`}>
          <div
            className="relative px-6 py-10 transition-colors duration-200 hover:bg-white/40 border-b lg:border-b-0 lg:border-r"
            data-testid="card-experience-latest"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-sans text-xl font-bold" style={{ color: "#1a1a1a" }}>{latestExperience.company}</h3>
                <p className="font-sans text-sm mt-1" style={{ color: "rgba(0,0,0,0.45)" }}>
                  {latestExperience.role} · {latestExperience.period}
                </p>
              </div>
              <Link href={`/work/${featuredProjects[0].id}`}>
                <span
                  className="w-9 h-9 flex items-center justify-center transition-all duration-200 hover:scale-110 text-white font-bold"
                  style={{ background: STEEL_TEAL }}
                  data-testid="link-experience-arrow"
                >
                  &#8594;
                </span>
              </Link>
            </div>
            <p className="font-sans text-sm mb-2 font-medium" style={{ color: MAUVE_BROWN }}>{latestExperience.sector}</p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(0,0,0,0.55)" }}>{latestExperience.description}</p>
          </div>

          <div>
            {pastExperiences.map((exp, idx) => (
              <div
                key={idx}
                className="px-6 py-6 transition-colors duration-200 hover:bg-white/40"
                data-testid={`card-experience-${idx}`}
                style={{
                  borderTop: idx > 0 ? `1px solid ${LINE_L}` : "none",
                }}
              >
                <h3 className="font-sans text-base font-bold mb-1" style={{ color: "#1a1a1a" }}>{exp.company}</h3>
                <p className="font-sans text-xs whitespace-pre-line" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {exp.role}
                </p>
                {exp.details.map((d, i) => (
                  <p key={i} className="font-sans text-sm mt-2" style={{ color: "rgba(0,0,0,0.45)" }}>{d}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <FullLine />
      </section>

      <section
        className="relative flex flex-col justify-end min-h-screen"
        data-testid="section-how"
      >
        <div>
          <FullLine />
          <div className={`${CONTENT} grid grid-cols-1 lg:grid-cols-2`}>
            <div className="px-6 py-14 md:py-16 border-b lg:border-b-0 lg:border-r" style={{ borderColor: LINE }}>
              <p className="font-sans text-xs uppercase tracking-widest mb-4" style={{ color: STEEL_TEAL }}>
                How
              </p>
              <p
                className="font-serif text-2xl md:text-3xl font-light leading-relaxed"
                style={{ color: "#1a1a1a" }}
                data-testid="text-how-description"
              >
                Through profound user insights, I find harmony between user needs and product ecosystem, transforming complex features into intuitive and confident design solutions.
              </p>
              <div className="mt-8 h-px w-16" style={{ background: MAUVE_BROWN + "30" }} />
              <p className="font-serif text-lg leading-relaxed mt-8" style={{ color: "rgba(0,0,0,0.55)" }}>
                As a researcher, a keen curiosity fuels the exploration of human behaviors, uncovering patterns and making sense of complex datasets to bring clarity to the vast expanse of human data.
              </p>
              <p className="font-sans text-xs mt-8 italic" style={{ color: "rgba(0,0,0,0.3)" }}>
                Inspired by Yuan Lu, TU/e professor.
              </p>
            </div>

            <div className="flex flex-col py-14 md:py-16">
              {principles.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-6 px-6 py-5 md:py-6"
                  style={{ borderTop: idx > 0 ? `1px solid ${LINE_L}` : "none" }}
                  data-testid={`text-principle-${idx}`}
                >
                  <span
                    className="font-serif text-3xl font-light flex-shrink-0 w-12"
                    style={{ color: `${STEEL_TEAL}30` }}
                  >
                    {p.num}
                  </span>
                  <p className="font-sans text-base font-medium pt-2" style={{ color: "#1a1a1a" }}>
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <FullLine />

          <div style={{ height: "4rem" }} />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
