import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
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
    accent: "rust",
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
    accent: "acid",
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

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const fadeInReveal = sectionVariants;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      wheelMultiplier: 1.05,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

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
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/50 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="font-display text-2xl italic tracking-tight hover:text-acid transition-colors duration-300">
          Fahim<span className="text-rust">.</span>
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-widest md:flex">
          <a href="#work" className="hover:text-acid transition-colors duration-300 relative group">
            Work
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="hover:text-acid transition-colors duration-300 relative group">
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#skills" className="hover:text-acid transition-colors duration-300 relative group">
            Stack
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contact" className="hover:text-acid transition-colors duration-300 relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
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
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section id="top" ref={ref} className="relative border-b border-white/5 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rust/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-20 pt-12 md:px-10 md:pb-32 md:pt-24 relative z-10">
        {/* Left column: meta */}
        <div className="col-span-12 md:col-span-3 space-y-6 font-mono text-xs uppercase tracking-widest text-zinc-500">
          <div>
            <div className="text-zinc-600">Index / 01</div>
            <div className="mt-1 text-zinc-300">Portfolio — v2026</div>
          </div>
          <div>
            <div className="text-zinc-600">Based in</div>
            <div className="mt-1 flex items-center gap-1.5 text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-rust" /> Dhaka, BD
            </div>
          </div>
          <div>
            <div className="text-zinc-600">Studying</div>
            <div className="mt-1 text-zinc-300">B.Sc SWE · DIU · Yr 3</div>
          </div>
        </div>

        {/* Center: big type */}
        <div className="col-span-12 md:col-span-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[10rem] select-none cursor-default"
          >
            Fah<span className="italic text-rust hover:text-acid transition-colors duration-500">i</span>m
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Cross-platform app developer, full-stack builder & founder of{" "}
            <span className="inline-block border border-acid/20 bg-acid/5 px-2.5 py-0.5 rounded-full text-xs text-acid tracking-widest font-mono uppercase">
              VYNIX
            </span>
            . I ship Flutter apps, AI automation systems and SaaS platforms — from Dhaka.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-acid"
            >
              See selected work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <Github className="h-4 w-4 text-zinc-400" /> GitHub
            </a>
          </motion.div>
        </div>

        {/* Right: portrait card */}
        <motion.div style={{ y }} className="col-span-12 md:col-span-3">
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative aspect-[3/4] w-full border border-white/10 rounded-2xl bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-[0_0_50px_rgba(217,119,6,0.05)] group"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-rust/10 via-acid/15 to-transparent">
              <div className="font-display text-[10rem] leading-none italic text-white/5 select-none transition-all duration-500 group-hover:scale-105 group-hover:text-white/10">F</div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                Software Engineer
              </div>
            </div>
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
              FIG. 01
            </div>
            <div className="absolute bottom-4 right-4 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white">
              Fahim · 2026
            </div>
          </motion.div>
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
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
    <section className="overflow-hidden border-b border-white/5 bg-white/[0.01] py-4 text-zinc-400">
      <div className="marquee-track flex gap-10 whitespace-nowrap font-sans font-medium uppercase tracking-widest text-xs md:text-sm">
        {line.map((w, i) => (
          <span key={i} className="flex items-center gap-10">
            {w}
            <Sparkles className="h-3.5 w-3.5 text-rust/60" />
          </span>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <motion.section 
      id="about" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 relative"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-acid/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-36 relative z-10">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            § 02 — About
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[1.1] md:text-7xl">
            Builder<br />
            <span className="italic text-rust">by day,</span><br />
            rider<br />
            <span className="italic text-zinc-400">by dusk.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-base leading-relaxed text-zinc-400 md:text-lg">
          <p>
            I'm a 3rd-year Software Engineering student at{" "}
            <span className="underline decoration-rust decoration-1 underline-offset-4 text-white">
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
          <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-6 py-4">
            <div className="p-2 rounded-lg bg-rust/10 text-rust">
              <Bike className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs tracking-wide text-zinc-300">
              Off-screen: motorbike riding, tinkering, chai at odd hours.
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Skills() {
  return (
    <motion.section 
      id="skills" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 bg-white/[0.005]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 03 — Stack
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl">The toolkit.</h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest text-zinc-500 md:block">
            05 disciplines
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeInReveal}
              className="group relative bg-white/[0.01] border border-white/5 p-8 hover:bg-white/[0.03] hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Top border glow effect */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-acid/30 transition-all duration-500" />
              
              <div className="flex items-center justify-between">
                <s.icon className="h-6 w-6 text-zinc-400 group-hover:text-acid transition-colors duration-300" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-8 font-display text-3xl text-zinc-100 group-hover:text-white transition-colors">{s.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/5 bg-white/[0.02] px-3 py-1 font-mono text-[10px] tracking-wide text-zinc-400 group-hover:text-white group-hover:border-white/15 transition-all duration-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div className="border border-white/5 bg-zinc-950/40 p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rust/5 rounded-full blur-3xl pointer-events-none" />
            <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Currently
            </div>
            <p className="mt-6 font-display text-2xl italic leading-tight text-zinc-300">
              "Exploring how far a solo developer can push AI-native product architecture."
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ProjectPreview({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-acid font-bold">REPLIXON.AI</span>
            <span className="bg-acid/20 text-acid px-1.5 py-0.5 rounded text-[8px]">LIVE</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="h-2 w-2/3 bg-white/10 rounded" />
            <div className="h-2 w-full bg-white/10 rounded" />
            <div className="grid grid-cols-3 gap-1 pt-2">
              <div className="border border-acid/30 p-1.5 rounded bg-acid/5 flex flex-col">
                <span className="text-[7px] text-zinc-500">ACCURACY</span>
                <span className="text-acid font-bold mt-0.5">99.8%</span>
              </div>
              <div className="border border-white/5 p-1.5 rounded bg-white/5 flex flex-col">
                <span className="text-[7px] text-zinc-500">AGENTS</span>
                <span className="text-white font-bold mt-0.5">14 active</span>
              </div>
              <div className="border border-white/5 p-1.5 rounded bg-white/5 flex flex-col">
                <span className="text-[7px] text-zinc-500">CHATS</span>
                <span className="text-white font-bold mt-0.5">1.2k/hr</span>
              </div>
            </div>
          </div>
          <div className="text-[7px] text-zinc-600">Secure TLS Connection Verified</div>
        </div>
      );
    case 1:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-rust font-bold">MILL & CHILL</span>
            <span className="text-zinc-500">V2.5</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Total Meals</span>
              <span className="text-rust">142.5</span>
            </div>
            <div className="h-1.5 w-full bg-zinc-900 rounded overflow-hidden">
              <div className="h-full bg-rust w-[75%]" />
            </div>
            <div className="flex justify-between text-[7px] text-zinc-500 pt-1">
              <span>Mess Balance</span>
              <span>৳ 12,450</span>
            </div>
          </div>
          <div className="bg-rust/10 text-rust p-1.5 rounded text-center text-[8px] font-bold">
            FLAT 4B EXPENSE SPLIT
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-zinc-400 font-bold">INSTAMINER // ENGINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="my-auto space-y-1 font-mono text-[7px] text-zinc-500">
            <p className="text-zinc-300">$ start --engine growth</p>
            <p className="text-acid">[SUCCESS] Node 01 handshake complete</p>
            <p>[RUNNING] Scraping queue: 45 profiles</p>
            <p className="text-zinc-300">[METRIC] Engagement up 24.3%</p>
            <p>[SYSTEM] Sleeping 140s to avoid rate limit</p>
          </div>
          <div className="flex justify-between text-[7px] border-t border-white/5 pt-2 text-zinc-600">
            <span>PID: 9028</span>
            <span>CPU: 4.2%</span>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-acid font-bold">MOTOFILE VAULT</span>
            <span className="text-zinc-500">ENCRYPTED</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="border border-white/5 bg-white/5 p-2 rounded flex items-center justify-between">
              <div>
                <p className="text-white text-[8px]">Tax Token.pdf</p>
                <p className="text-zinc-500 text-[6px]">Expires 14-Dec-2026</p>
              </div>
              <span className="text-acid font-bold">✓ SECURE</span>
            </div>
            <div className="border border-white/5 bg-white/5 p-2 rounded flex items-center justify-between">
              <div>
                <p className="text-white text-[8px]">Driving License.pdf</p>
                <p className="text-zinc-500 text-[6px]">Verified ID 4893</p>
              </div>
              <span className="text-acid font-bold">✓ SECURE</span>
            </div>
          </div>
          <div className="text-[6px] text-center text-zinc-500">AES-256 Storage</div>
        </div>
      );
    case 4:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-rust font-bold">BIKE CORNER</span>
            <span className="text-zinc-500">INVENTORY</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white">Suzuki Gixxer SF</span>
              <span className="text-rust font-bold">৳ 2,10,000</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white">Yamaha R15 V3</span>
              <span className="text-rust font-bold">৳ 3,45,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Honda CB Hornet</span>
              <span className="text-rust font-bold">৳ 1,60,000</span>
            </div>
          </div>
          <div className="text-[7px] text-zinc-500">3 Sold · 5 Available</div>
        </div>
      );
    case 5:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-white font-bold">POLICE KOTHAY</span>
            <span className="bg-red-500/20 text-red-500 px-1 py-0.5 rounded text-[7px] font-bold">LIVE MAP</span>
          </div>
          <div className="my-auto flex items-center justify-center gap-2">
            <div className="relative w-12 h-12 border border-white/10 rounded bg-white/5 flex items-center justify-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 bg-red-500 rounded-full absolute" />
              <span className="text-[7px] mt-8 text-zinc-500">Dhanmondi</span>
            </div>
            <div className="relative w-12 h-12 border border-white/10 rounded bg-white/5 flex items-center justify-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping absolute" />
              <div className="w-2 h-2 bg-yellow-500 rounded-full absolute" />
              <span className="text-[7px] mt-8 text-zinc-500">Banani</span>
            </div>
          </div>
          <div className="text-[7px] text-center text-zinc-600">Active confirmation logs: 5+</div>
        </div>
      );
    case 6:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-acid font-bold">CROP ADVISOR</span>
            <span className="text-zinc-500">SRS ANALYSIS</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="flex justify-between text-zinc-400">
              <span>Soil PH Optimal</span>
              <span className="text-acid">6.2 - 6.8</span>
            </div>
            <div className="flex justify-between text-[7px] text-zinc-500">
              <span>NPK Level Target</span>
              <span>12-11-18</span>
            </div>
            <div className="bg-white/5 p-1.5 rounded text-[7px] text-zinc-400">
              Soil recommendation: Nitrogen enrichment requested.
            </div>
          </div>
          <div className="text-[7px] text-zinc-600">DIU SE Academic Project</div>
        </div>
      );
    default:
      return null;
  }
}

function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 120); // Center horizontally (half of w-240)
      mouseY.set(e.clientY - rect.top - 80);  // Center vertically (half of h-160)
    }
  };

  return (
    <motion.section 
      id="work" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 04 — Work
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl">
              Selected <span className="italic text-rust">projects</span>.
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest text-zinc-500 md:block">
            07 shipped
          </div>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="mt-8 relative"
        >
          {/* Floating Hover Preview Card */}
          <motion.div
            style={{
              x,
              y,
              pointerEvents: "none",
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.85,
            }}
            className="absolute z-30 w-[240px] h-[160px] hidden md:block rounded-xl overflow-hidden border border-white/15 bg-zinc-950/80 backdrop-blur-md shadow-2xl p-1"
            transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
          >
            {hoveredIndex !== null && <ProjectPreview index={hoveredIndex} />}
          </motion.div>

          {projects.map((p, i) => (
            <div
              key={p.n}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative border-b border-white/5 py-8 transition-all duration-300 hover:bg-white/[0.01] px-4 cursor-pointer"
            >
              <div className="mx-auto grid grid-cols-12 items-baseline gap-4">
                <span className="col-span-2 font-mono text-xs text-zinc-600 group-hover:text-white transition-colors duration-300 md:col-span-1">{p.n}</span>
                <h3 className="col-span-10 font-display text-3xl leading-none group-hover:translate-x-4 group-hover:text-acid md:col-span-5 md:text-5xl transition-all duration-500 ease-out text-zinc-100 font-medium">
                  {p.name}
                </h3>
                <span className="col-span-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors duration-300 md:col-span-3">
                  {p.tag}
                </span>
                <p className="col-span-12 mt-3 max-w-xl text-xs leading-relaxed text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300 md:col-span-2 md:mt-0 md:text-right">
                  {p.desc}
                </p>
                <span className="col-span-6 text-right font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors duration-300 md:col-span-1">
                  {p.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function Initiatives() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 bg-white/[0.002]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          § 05 — Initiatives & Roles
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-white/5 bg-white/[0.01] p-8 rounded-2xl transition-all duration-300 hover:border-acid/20 hover:bg-acid/[0.02] group">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Founder</span>
              <span className="font-mono text-xs text-zinc-500">2024 →</span>
            </div>
            <h3 className="mt-6 font-display text-5xl md:text-6xl text-white group-hover:text-acid transition-colors duration-300">VYNIX</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              My own software development initiative — a home for professional application
              engineering & product branding. Where experiments graduate into products.
            </p>
          </div>
          <div className="border border-white/5 bg-white/[0.01] p-8 rounded-2xl transition-all duration-300 hover:border-rust/20 hover:bg-rust/[0.02] group">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">R&D · Contractor</span>
              <span className="font-mono text-xs text-zinc-500">Recent</span>
            </div>
            <h3 className="mt-6 font-display text-5xl md:text-6xl text-white group-hover:text-rust transition-colors duration-300">Markello Agency</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              AI Automation & Full-Stack R&D role — building dynamic automation workflows that
              scale beyond templates.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function GithubSection() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 06 — Signal
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">
              Commits, quietly<span className="italic text-rust">.</span>
            </h2>
          </div>
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-black"
          >
            @Fahimulislamfahim <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-10 border border-white/5 bg-white/[0.01] p-6 md:p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rust/5 to-transparent pointer-events-none" />
          <img
            src="https://ghchart.rshah.org/f97316/Fahimulislamfahim"
            alt="Fahim's GitHub contribution calendar"
            className="w-full relative z-10"
            loading="lazy"
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 relative z-10">
            <span>Contribution graph · live from GitHub</span>
            <span>github.com/Fahimulislamfahim</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Education() {
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 bg-white/[0.005]"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-32">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            § 07 — Education
          </div>
          <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">In progress.</h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6">
          <div className="flex items-start justify-between border-t border-white/10 pt-6">
            <div>
              <div className="font-display text-2xl md:text-4xl text-zinc-200">
                B.Sc. in Software Engineering
              </div>
              <div className="mt-1.5 font-mono text-xs text-zinc-500">
                Daffodil International University · DIU
              </div>
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
              3rd Year
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-background relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-rust/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-24 md:px-10 md:pt-36 relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          § 08 — Contact
        </div>
        <h2 className="mt-4 font-display text-[14vw] leading-[0.85] md:text-[9rem] select-none cursor-default text-zinc-100">
          Let's <span className="italic text-rust hover:text-acid transition-colors duration-500">build</span> something.
        </h2>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Reach out
            </div>
            <a
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-display text-2xl italic text-zinc-300 hover:text-rust transition-colors duration-300 md:text-3xl"
            >
              github.com/Fahimulislamfahim
              <ArrowUpRight className="h-6 w-6 transition group-hover:rotate-45" />
            </a>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 text-right">
            <div>© 2026 Fahim · Dhaka, BD</div>
            <div className="mt-1 text-zinc-700">Designed & built from scratch.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
