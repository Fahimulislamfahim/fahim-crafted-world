import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Github,
  MapPin,
  Bike,
  Sparkles,
  Code2,
  Cpu,
  Terminal,
  Cloud,
  Smartphone,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Fahim — Cross-Platform App Developer" },
      {
        name: "description",
        content:
          "Portfolio of Fahim — 3rd year Software Engineering student at DIU, Dhaka. Flutter apps, AI automation, and multi-channel SaaS architecture.",
      },
    ],
  }),
});

const GITHUB = "https://github.com/Fahimulislamfahim";

const skills = [
  {
    icon: Smartphone,
    title: "Mobile",
    items: ["Flutter", "Dart"],
  },
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "Dart", "PHP"],
  },
  {
    icon: Terminal,
    title: "Tools & IDEs",
    items: ["VS Code", "Google Antigravity IDE", "Git"],
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    items: ["Workflow Automation", "Multi-channel SaaS", "Custom Agents"],
  },
  {
    icon: Cloud,
    title: "Cloud & Deploy",
    items: ["Vercel", "GitHub Student Pack", "Server Deployment"],
  },
];

const projects = [
  {
    n: "01",
    name: "Replixon",
    tag: "SaaS · AI",
    year: "2025",
    desc: "Multi-channel AI customer interaction SaaS platform with a 3D-responsive landing page. Deployed on Vercel.",
    accent: "acid",
  },
  {
    n: "02",
    name: "Mill n Chill",
    tag: "Mobile · Mess Mgmt",
    year: "2025",
    desc: "Shared-living mess manager: financial splits, meal tracking, daily expenses. Tested in the real world with flatmates.",
    accent: "rust",
  },
  {
    n: "03",
    name: "InstaMiner / InstaRise",
    tag: "Automation · Growth",
    year: "2024",
    desc: "Autonomous Instagram automation & follower growth engine built on a custom architecture workflow.",
    accent: "ink",
  },
  {
    n: "04",
    name: "MotoFile",
    tag: "Mobile · Utility",
    year: "2024",
    desc: "Digital vehicle documentation vault — riders securely store and manage essential bike papers.",
    accent: "acid",
  },
  {
    n: "05",
    name: "Bike Corner",
    tag: "Inventory · Web",
    year: "2024",
    desc: "Full inventory system tracking buying & selling of second-hand motorcycles.",
    accent: "rust",
  },
  {
    n: "06",
    name: "Police Kothay",
    tag: "Maps · Civic",
    year: "2024",
    desc: "Map-based web app tracking real-time urban checkposts with dynamic confirmation counts & update-time logic.",
    accent: "ink",
  },
  {
    n: "07",
    name: "Weather & Crop Advisor",
    tag: "Academic · SRS",
    year: "2024",
    desc: "Collaborative academic project — SRS, stakeholder requirements & DFDs to help farmers optimize yields.",
    accent: "acid",
  },
];

function Portfolio() {
  return (
    <main className="grain min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Initiatives />
      <GithubSection />
      <Education />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/80 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-2xl italic tracking-tight">
          Fahim<span className="text-rust">.</span>
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-widest md:flex">
          <a href="#work" className="hover:text-rust transition">Work</a>
          <a href="#about" className="hover:text-rust transition">About</a>
          <a href="#skills" className="hover:text-rust transition">Stack</a>
          <a href="#contact" className="hover:text-rust transition">Contact</a>
        </nav>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rust" />
          </span>
          Available for work
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="top" ref={ref} className="relative border-b border-ink/80">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-16">
        {/* Left column: meta */}
        <div className="col-span-12 md:col-span-3 space-y-6 font-mono text-xs uppercase tracking-widest">
          <div>
            <div className="text-muted-foreground">Index / 01</div>
            <div className="mt-1">Portfolio — v2026</div>
          </div>
          <div>
            <div className="text-muted-foreground">Based in</div>
            <div className="mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> Dhaka, BD</div>
          </div>
          <div>
            <div className="text-muted-foreground">Studying</div>
            <div className="mt-1">B.Sc SWE · DIU · Yr 3</div>
          </div>
        </div>

        {/* Center: big type */}
        <div className="col-span-12 md:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[11rem]"
          >
            Fah<span className="italic text-rust">i</span>m
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-lg text-lg leading-relaxed md:text-xl"
          >
            Cross-platform app developer, full-stack builder & founder of{" "}
            <span className="bg-acid px-1 font-mono text-sm uppercase tracking-widest">VYNIX</span>
            . I ship Flutter apps, AI automation systems and SaaS platforms — from Dhaka.
          </motion.p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-cream transition hover:bg-rust hover:border-rust"
            >
              See selected work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-mono text-xs uppercase tracking-widest transition hover:bg-acid"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>

        {/* Right: portrait card */}
        <motion.div style={{ y }} className="col-span-12 md:col-span-3">
          <div className="relative aspect-[3/4] w-full border-2 border-ink bg-muted overflow-hidden">
            {/* User image will go here — swap the div for <img src={yourPhoto} /> */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-rust/20 via-acid/30 to-ink/10">
              <div className="font-display text-[10rem] leading-none italic text-ink/80">F</div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/70">
                Portrait / Insert
              </div>
            </div>
            <div className="absolute left-2 top-2 rounded-full bg-ink px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-cream">
              FIG. 01
            </div>
            <div className="absolute bottom-2 right-2 rounded-full bg-cream px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-ink">
              Fahim · 2026
            </div>
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Dhaka 23.8103° N</span>
            <span>90.4125° E</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = [
    "Flutter", "AI Automation", "SaaS", "Full-Stack", "Cross-Platform",
    "Founder @ VYNIX", "Cloud Deploy", "Multi-Channel", "Motorbike Rider",
  ];
  const line = [...words, ...words, ...words];
  return (
    <section className="overflow-hidden border-b border-ink/80 bg-ink py-6 text-cream">
      <div className="marquee-track flex gap-10 whitespace-nowrap font-display text-5xl italic md:text-7xl">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <Sparkles className="h-6 w-6 text-acid" />
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-ink/80">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-20 md:px-10 md:py-32">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            § 02 — About
          </div>
          <h2 className="mt-4 font-display text-6xl leading-none md:text-7xl">
            Builder<br />
            <span className="italic text-rust">by day,</span><br />
            rider<br />
            <span className="italic">by dusk.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed">
          <p>
            I'm a 3rd-year Software Engineering student at{" "}
            <span className="underline decoration-rust decoration-2 underline-offset-4">
              Daffodil International University
            </span>{" "}
            in Dhaka — but the classroom is only half of it. The other half is a workshop of
            cross-platform apps, AI automation flows and quietly-shipped SaaS experiments.
          </p>
          <p>
            I care about products that survive contact with real users. That means Flutter
            builds that run smooth on cheap phones, backends that don't fold under load, and
            interfaces that feel human, not templated.
          </p>
          <div className="flex items-center gap-3 rounded-lg border-2 border-ink bg-muted px-4 py-3">
            <Bike className="h-5 w-5 text-rust" />
            <span className="font-mono text-sm">
              Off-screen: motorbike riding, tinkering, chai at odd hours.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-b border-ink/80 bg-muted/40">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex items-end justify-between border-b-2 border-ink pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              § 03 — Stack
            </div>
            <h2 className="mt-2 font-display text-5xl md:text-6xl">The toolkit.</h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest md:block">
            05 disciplines
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-ink md:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative bg-background p-8 transition hover:bg-acid"
            >
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-ink">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl">{s.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink px-3 py-1 font-mono text-xs"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div className="bg-ink p-8 text-cream">
            <div className="font-mono text-[10px] uppercase tracking-widest text-cream/60">
              Currently
            </div>
            <p className="mt-4 font-display text-2xl italic leading-tight">
              "Exploring how far a solo developer can push AI-native product architecture."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section id="work" className="border-b border-ink/80">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b-2 border-ink pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              § 04 — Work
            </div>
            <h2 className="mt-2 font-display text-5xl md:text-7xl">
              Selected <span className="italic text-rust">projects</span>.
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest md:block">
            07 shipped
          </div>
        </div>

        <div className="mt-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.n}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="group relative border-b border-ink/60 py-8 transition-colors"
              style={{
                backgroundColor:
                  hovered === i
                    ? p.accent === "acid"
                      ? "var(--acid)"
                      : p.accent === "rust"
                        ? "var(--rust)"
                        : "var(--ink)"
                    : "transparent",
                color: hovered === i && p.accent !== "acid" ? "var(--cream)" : "var(--ink)",
              }}
            >
              <div className="mx-auto grid grid-cols-12 items-baseline gap-4 px-2">
                <span className="col-span-2 font-mono text-sm md:col-span-1">{p.n}</span>
                <h3 className="col-span-10 font-display text-4xl leading-none md:col-span-5 md:text-6xl">
                  {p.name}
                </h3>
                <span className="col-span-6 font-mono text-xs uppercase tracking-widest md:col-span-3">
                  {p.tag}
                </span>
                <p className="col-span-12 mt-3 max-w-xl text-sm leading-relaxed md:col-span-2 md:mt-0 md:text-right">
                  {p.desc}
                </p>
                <span className="col-span-6 text-right font-mono text-xs uppercase tracking-widest md:col-span-1">
                  {p.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Initiatives() {
  return (
    <section className="border-b border-ink/80 bg-ink text-cream">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="font-mono text-xs uppercase tracking-widest text-cream/60">
          § 05 — Initiatives & Roles
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border-2 border-cream/20 p-8 transition hover:border-acid hover:bg-acid hover:text-ink">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest">Founder</span>
              <span className="font-mono text-xs">2024 →</span>
            </div>
            <h3 className="mt-6 font-display text-6xl">VYNIX</h3>
            <p className="mt-4 text-base leading-relaxed">
              My own software development initiative — a home for professional application
              engineering & product branding. Where the experiments graduate into products.
            </p>
          </div>
          <div className="border-2 border-cream/20 p-8 transition hover:border-rust hover:bg-rust">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-widest">R&D · Contractor</span>
              <span className="font-mono text-xs">Recent</span>
            </div>
            <h3 className="mt-6 font-display text-6xl">Markello Agency</h3>
            <p className="mt-4 text-base leading-relaxed">
              AI Automation & Full-Stack R&D role — building dynamic automation workflows that
              scale beyond templates.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GithubSection() {
  return (
    <section className="border-b border-ink/80">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-ink pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              § 06 — Signal
            </div>
            <h2 className="mt-2 font-display text-5xl md:text-6xl">
              Commits, quietly<span className="italic text-rust">.</span>
            </h2>
          </div>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2 font-mono text-xs uppercase tracking-widest transition hover:bg-ink hover:text-cream"
          >
            @Fahimulislamfahim <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-10 border-2 border-ink bg-muted p-6 md:p-10">
          <img
            src="https://ghchart.rshah.org/1a1a1a/Fahimulislamfahim"
            alt="Fahim's GitHub contribution calendar"
            className="w-full"
            loading="lazy"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Contribution graph · live from GitHub</span>
            <span>github.com/Fahimulislamfahim</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="border-b border-ink/80 bg-muted/40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-20 md:px-10 md:py-28">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            § 07 — Education
          </div>
          <h2 className="mt-2 font-display text-5xl md:text-6xl">In progress.</h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <div className="flex items-start justify-between border-t-2 border-ink pt-6">
            <div>
              <div className="font-display text-3xl md:text-4xl">
                B.Sc. in Software Engineering
              </div>
              <div className="mt-1 font-mono text-sm text-muted-foreground">
                Daffodil International University · DIU
              </div>
            </div>
            <div className="rounded-full bg-ink px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cream">
              3rd Year
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-background">
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-24 md:px-10 md:pt-32">
        <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          § 08 — Contact
        </div>
        <h2 className="mt-4 font-display text-[15vw] leading-[0.85] md:text-[10rem]">
          Let's <span className="italic text-rust">build</span> something.
        </h2>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t-2 border-ink pt-8">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Reach out
            </div>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-display text-3xl italic md:text-4xl"
            >
              github.com/Fahimulislamfahim
              <ArrowUpRight className="h-6 w-6 transition group-hover:rotate-45 group-hover:text-rust" />
            </a>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <div>© 2026 Fahim · Dhaka, BD</div>
            <div>Designed & built from scratch · No templates.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
