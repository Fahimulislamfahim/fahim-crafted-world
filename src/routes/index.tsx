import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
import { useIsMobile } from "../hooks/use-mobile";
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
  Facebook,
  Linkedin,
  Globe,
} from "lucide-react";

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 32, stiffness: 380, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorType, setCursorType] = useState<"default" | "hover" | "project" | "scan">("default");
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea");
      const cursorText = target.closest("[data-cursor-text]")?.getAttribute("data-cursor-text");
      const cursorState = target.closest("[data-cursor-state]")?.getAttribute("data-cursor-state");

      if (cursorText) {
        setCursorType("project");
        setHoverText(cursorText);
      } else if (cursorState === "scan") {
        setCursorType("scan");
      } else if (isClickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        cursorType === "hover"
          ? "w-10 h-10 border border-acid/60 bg-acid/5 scale-100"
          : cursorType === "project"
            ? "w-20 h-20 border border-rust bg-rust/15 scale-100"
            : cursorType === "scan"
              ? "w-14 h-14 border border-acid/80 bg-transparent rotate-45"
              : "w-6 h-6 border border-white/20 bg-transparent"
      }`}
    >
      {cursorType === "project" && (
        <span className="font-mono text-[8px] uppercase tracking-widest text-rust font-bold">
          {hoverText}
        </span>
      )}
      {cursorType === "default" && (
        <div className="w-1 h-1 rounded-full bg-white/60" />
      )}
      {cursorType === "hover" && (
        <div className="w-1.5 h-1.5 rounded-full bg-acid" />
      )}
      {cursorType === "scan" && (
        <div className="w-2 h-2 rounded-sm bg-acid/70 animate-pulse" />
      )}
    </motion.div>
  );
}

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Fahimul Islam" },
      {
        name: "description",
        content:
          "Portfolio of Fahimul Islam — 3rd year Software Engineering student at DIU, Dhaka. Flutter apps, AI automation, and multi-channel SaaS architecture.",
      },
    ],
  }),
});

const GITHUB = "https://github.com/Fahimulislamfahim";
const FACEBOOK = "https://www.facebook.com/Fahim.01533335214/";
const LINKEDIN = "https://www.linkedin.com/in/fahimulislam86/";
const THREADS = "https://www.threads.net/@fahim.0.1";

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
    name: "Personify",
    tag: "SaaS · AI",
    year: "2026",
    desc: "AI-powered Social Media Management (SMM) SaaS with a multi-agent Google Gemini pipeline & high-fidelity Flutter dashboard.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Personify.git",
  },
  {
    n: "02",
    name: "CoRide",
    tag: "Mobile · Rideshare",
    year: "2026",
    desc: "Campus ridesharing & carpooling platform for DIU using WebSocket tracking, geospatial pricing, and Flutter.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/CoRide.git",
  },
  {
    n: "03",
    name: "InstaRise",
    tag: "Automation · Growth",
    year: "2024",
    desc: "Autonomous Instagram automation & follower growth engine built on a custom queue/action workflow.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/InstaRise.git",
  },
  {
    n: "04",
    name: "MotoFile",
    tag: "Mobile · Utility",
    year: "2024",
    desc: "Digital vehicle documentation vault enabling riders to securely store, verify and manage essential papers.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/MotoFile.git",
  },
  {
    n: "05",
    name: "BikeShopBd",
    tag: "E-Commerce · Web",
    year: "2025",
    desc: "Complete motorcycle and parts e-commerce retail platform featuring custom booking & parts ordering.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/BikeShopBd.git",
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

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            lenis.scrollTo(targetElement);
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="grain min-h-screen bg-background text-foreground overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <GithubSection />
        <Education />
        <Footer />
      </main>
    </>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Fade in the navbar logo as the hero text flies up and fades out
  const navLogoOpacity = useTransform(scrollY, [120, 200], [0, 1]);
  
  // Fade out availability on scroll down for a more minimal navbar
  const navExtraOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out border-b ${
        isScrolled
          ? "border-white/5 bg-zinc-950/80 backdrop-blur-md py-3 shadow-md shadow-black/10"
          : "border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Left: Logo */}
        <motion.div style={{ opacity: navLogoOpacity }} className="w-1/4 flex justify-start">
          <a href="#top" className="font-display text-2xl italic tracking-tight hover:text-acid transition-colors duration-300">
            Fahim<span className="text-rust">.</span>
          </a>
        </motion.div>

        {/* Middle: Navigation links */}
        <nav className="flex justify-center gap-8 font-mono text-xs uppercase tracking-widest w-2/4">
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

        {/* Right: Availability status */}
        <motion.div
          style={{ opacity: navExtraOpacity }}
          className="w-1/4 flex justify-end items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
          </span>
          <span className="hidden sm:inline">Available for work</span>
        </motion.div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const [isIHovered, setIsIHovered] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  // Scroll transforms to slide, scale, and fade the main title into the header logo position
  const titleX = useTransform(scrollY, [0, 200], ["0vw", "-22vw"]);
  const titleY = useTransform(scrollY, [0, 200], ["0px", "-160px"]);
  const titleScale = useTransform(scrollY, [0, 200], [1, 0.16]);
  const titleOpacity = useTransform(scrollY, [120, 200], [1, 0]);

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              style={{
                x: titleX,
                y: titleY,
                scale: titleScale,
                opacity: titleOpacity,
                transformOrigin: "left center"
              }}
              className="font-display text-[18vw] leading-[0.85] tracking-tight md:text-[10rem] select-none cursor-default"
            >
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                className="hover:text-rust transition-colors duration-500 cursor-pointer inline-block"
              >Fah</motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                onMouseEnter={() => setIsIHovered(true)}
                onMouseLeave={() => setIsIHovered(false)}
                className="italic text-rust hover:text-acid transition-colors duration-500 cursor-pointer inline-block"
                data-cursor-state="scan"
              >i</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                className="hover:text-rust transition-colors duration-500 cursor-pointer inline-block"
              >m</motion.span>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Cross-platform app developer & full-stack builder. I ship Flutter apps, AI automation systems and SaaS platforms — from Dhaka.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-acid"
            >
              See selected work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
            </a>
            
            <div className="flex flex-wrap gap-2.5 items-center">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <Github className="h-4 w-4 text-zinc-400" /> GitHub
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={THREADS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                title="Threads"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right: portrait card */}
        <motion.div style={{ y }} className="col-span-12 md:col-span-3">
          <motion.div 
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative aspect-[3/4] w-full border border-white/10 rounded-2xl bg-zinc-900 overflow-hidden shadow-[0_0_50px_rgba(217,119,6,0.05)] group"
          >
            {/* Base Regular Image */}
            <img 
              src="/fahim.jpg" 
              alt="Fahim" 
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                isIHovered 
                  ? "grayscale-0 scale-100 opacity-0" 
                  : isNameHovered
                    ? "grayscale-0 scale-100 opacity-100"
                    : "grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-100"
              }`}
            />
            {/* Scan Image (Active on 'i' hover) */}
            <img 
              src="/fahim-scan.jpg" 
              alt="Fahim Scan" 
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out pointer-events-none ${
                isIHovered 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-100"
              }`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 transition-opacity duration-500 ${
              isIHovered || isNameHovered ? "opacity-60" : "opacity-80 group-hover:opacity-60"
            }`} />
            <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-zinc-300">
              FIG. 01
            </div>
            <div className="absolute bottom-4 right-4 rounded-full bg-black/40 border border-white/5 backdrop-blur-sm px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white">
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
    "Cloud Deploy", "Multi-Channel", "Motorbike Rider",
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

function RiderDashboard() {
  const [isEngineOn, setIsEngineOn] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(1000);
  const [gear, setGear] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isEngineOn) {
      interval = setInterval(() => {
        setSpeed((prev) => {
          const target = isHovered ? 134 : 74;
          const diff = target - prev;
          return Math.round(prev + diff * 0.08 + (Math.random() - 0.5) * 2);
        });
        setRpm((prev) => {
          const target = isHovered ? 8200 : 3100;
          const diff = target - prev;
          return Math.round(prev + diff * 0.12 + (Math.random() - 0.5) * 120);
        });
        setGear((prev) => {
          if (speed > 90) return 5;
          if (speed > 65) return 4;
          if (speed > 40) return 3;
          if (speed > 18) return 2;
          return 1;
        });
      }, 50);
    } else {
      interval = setInterval(() => {
        setSpeed((prev) => (prev > 0 ? Math.max(0, prev - 4) : 0));
        setRpm((prev) => (prev > 1000 ? Math.max(1000, prev - 150) : 1000));
        setGear(1);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isEngineOn, isHovered, speed]);

  const maxRpm = 10000;
  const rpmRotation = ((rpm - 1000) / (maxRpm - 1000)) * 240 - 120;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="glow-card-rust border border-white/5 bg-zinc-950/60 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden select-none"
    >
      <div className="glow-bg" />
      <div className="absolute inset-0 dashboard-grid-pattern opacity-[0.12] pointer-events-none" />
      
      <div className="flex justify-between items-center relative z-10 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Bike className="h-3.5 w-3.5 text-rust animate-pulse" /> DUSK RIDER DASH
        </span>
        <button
          onClick={() => setIsEngineOn(!isEngineOn)}
          className={`px-3 py-1 rounded-full border text-[8px] transition-all duration-300 font-bold cursor-pointer ${
            isEngineOn
              ? "border-rust bg-rust/20 text-rust shadow-[0_0_12px_rgba(217,119,6,0.3)] animate-pulse"
              : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
          }`}
          data-cursor-text={isEngineOn ? "STOP" : "START"}
        >
          {isEngineOn ? "IGNITION ON" : "IGNITION OFF"}
        </button>
      </div>

      <div className="my-6 flex items-center justify-around gap-4 relative z-10">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90 animate-[pulse-soft_4s_infinite]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
              strokeDasharray="180 360"
              strokeLinecap="round"
              className="transform rotate-30 origin-center"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="var(--color-rust)"
              strokeWidth="4"
              strokeDasharray={`${((rpm - 1000) / 9000) * 180} 360`}
              strokeLinecap="round"
              className="transform rotate-30 origin-center opacity-40 blur-[1px] transition-all duration-75"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="var(--color-rust)"
              strokeWidth="3"
              strokeDasharray={`${((rpm - 1000) / 9000) * 180} 360`}
              strokeLinecap="round"
              className="transform rotate-30 origin-center transition-all duration-75"
            />
          </svg>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
            <span className="font-mono text-xl font-bold leading-none tracking-tight text-white">
              {isEngineOn ? speed : "0"}
            </span>
            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">KM/H</span>
          </div>

          <div
            className="absolute inset-0 transition-transform duration-75 ease-out pointer-events-none"
            style={{ transform: `rotate(${rpmRotation}deg)` }}
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-rust rounded-full shadow-[0_0_8px_var(--color-rust)]" />
          </div>
        </div>

        <div className="flex flex-col gap-2 font-mono text-[9px] w-24">
          <div className="bg-zinc-950/60 border border-white/5 px-2 py-1 rounded flex justify-between items-center">
            <span className="text-zinc-500">RPM:</span>
            <span className={`font-bold transition-all ${isEngineOn ? "text-rust" : "text-zinc-400"}`}>
              {isEngineOn ? rpm : "0"}
            </span>
          </div>
          <div className="bg-zinc-950/60 border border-white/5 px-2 py-1 rounded flex justify-between items-center">
            <span className="text-zinc-500">GEAR:</span>
            <span className={`font-bold ${isEngineOn ? "text-white animate-pulse" : "text-zinc-400"}`}>
              {isEngineOn ? gear : "-"}
            </span>
          </div>
          <div className="bg-zinc-950/60 border border-white/5 px-2 py-1 rounded flex justify-between items-center">
            <span className="text-zinc-500">THR:</span>
            <span className="text-white font-bold">{isHovered && isEngineOn ? "REVVED" : "IDLE"}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/5 pt-4">
        <div className="flex justify-between items-center font-mono text-[8px] text-zinc-500 uppercase tracking-widest mb-1.5">
          <span>Active Route: Dhaka - DIU</span>
          <span className={`${isEngineOn ? "text-emerald-400 animate-pulse font-bold" : "text-zinc-600"}`}>
            {isEngineOn ? "● ACTIVE TRACKING" : "STANDBY"}
          </span>
        </div>
        <div className="h-8 w-full bg-zinc-950/40 rounded border border-white/5 relative overflow-hidden flex items-center px-4">
          <svg className="w-full h-full text-zinc-800" viewBox="0 0 200 40">
            <path
              id="route-path"
              d="M10 20 C 50 0, 80 40, 110 20 S 160 0, 190 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {isEngineOn && (
              <motion.path
                d="M10 20 C 50 0, 80 40, 110 20 S 160 0, 190 20"
                fill="none"
                stroke="var(--color-rust)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            {isEngineOn && (
              <circle r="3.5" fill="var(--color-acid)" className="shadow-[0_0_8px_var(--color-acid)]">
                <animateMotion
                  path="M10 20 C 50 0, 80 40, 110 20 S 160 0, 190 20"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

function SkillCard({ s, i }: { s: typeof skills[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 24, stiffness: 220 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 24, stiffness: 220 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(relativeX);
    y.set(relativeY);

    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const glowClasses = [
    "glow-card-acid",
    "glow-card-neutral",
    "glow-card-neutral",
    "glow-card-rust",
    "glow-card-acid",
  ];
  const glowClass = glowClasses[i] || "glow-card-neutral";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative bg-white/[0.01] border border-white/5 p-8 hover:bg-white/[0.02] hover:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${glowClass}`}
    >
      <div className="glow-bg" />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <div className="flex items-center justify-between">
          <s.icon className="h-6 w-6 text-zinc-400 group-hover:text-acid transition-colors duration-300" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors">
            0{i + 1}
          </span>
        </div>
        <h3 className="mt-8 font-display text-3xl text-zinc-100 group-hover:text-white transition-colors">
          {s.title}
        </h3>
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
      </div>
    </motion.div>
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
      className="border-b border-white/5 bg-white/[0.002]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 03 — Stack
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">The toolkit.</h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest text-zinc-500 md:block">
            05 disciplines
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 perspective-1000"
        >
          {skills.map((s, i) => (
            <SkillCard key={s.title} s={s} i={i} />
          ))}
          <RiderDashboard />
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
            <span className="text-acid font-bold">PERSONIFY AI</span>
            <span className="bg-acid/20 text-acid px-1.5 py-0.5 rounded text-[8px] font-bold">GEMINI 2.5</span>
          </div>
          <div className="my-auto space-y-1.5">
            <div className="text-[7px] text-zinc-500 uppercase tracking-wider">Active AI Pipeline:</div>
            <div className="grid grid-cols-4 gap-1 text-center text-[7px]">
              <div className="border border-white/10 p-1 rounded bg-white/5 flex flex-col justify-center">
                <span className="text-acid font-bold">AG-01</span>
                <span className="text-[5px] text-zinc-500 mt-0.5">TREND</span>
              </div>
              <div className="border border-white/10 p-1 rounded bg-white/5 flex flex-col justify-center">
                <span className="text-acid font-bold">AG-02</span>
                <span className="text-[5px] text-zinc-500 mt-0.5">VISION</span>
              </div>
              <div className="border border-white/10 p-1 rounded bg-white/5 flex flex-col justify-center">
                <span className="text-acid font-bold">AG-03</span>
                <span className="text-[5px] text-zinc-500 mt-0.5">COPY</span>
              </div>
              <div className="border border-white/10 p-1 rounded bg-white/5 flex flex-col justify-center">
                <span className="text-acid font-bold">AG-04</span>
                <span className="text-[5px] text-zinc-500 mt-0.5">QC</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-[7px] text-zinc-400 border-t border-white/5 pt-1.5">
              <span>SMM Scheduler</span>
              <span className="text-emerald-400 font-bold animate-pulse">● ACTIVE LOOP</span>
            </div>
          </div>
          <div className="text-[6px] text-zinc-600">Multi-Channel Publishing System</div>
        </div>
      );
    case 1:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-rust font-bold">CORIDE HUB</span>
            <span className="text-zinc-500 text-[8px]">@diu.edu.bd</span>
          </div>
          <div className="my-auto space-y-2">
            <div className="flex justify-between text-zinc-400 text-[8px]">
              <span>WebSocket Stream</span>
              <span className="text-rust animate-pulse">● Live</span>
            </div>
            <div className="bg-white/5 border border-white/5 p-1.5 rounded space-y-1 text-[7px] text-zinc-400">
              <div className="flex justify-between">
                <span>Rider Lat:</span>
                <span className="text-white">23.8759° N</span>
              </div>
              <div className="flex justify-between">
                <span>Fare Share:</span>
                <span className="text-rust font-bold">৳ Base / (1+N)</span>
              </div>
            </div>
          </div>
          <div className="text-[7px] text-center text-zinc-500 border-t border-white/5 pt-1">
            PostgreSQL · Express · Flutter
          </div>
        </div>
      );
    case 2:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-rust font-bold">INSTARISE</span>
            <span className="bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded text-[7px] font-bold">RUNNING</span>
          </div>
          <div className="my-auto space-y-1.5">
            <div className="font-mono text-[7px] text-zinc-500 space-y-0.5">
              <p className="text-zinc-300">$ node --growth-engine</p>
              <p className="text-rust">[OK] Queue: 120 target profiles</p>
              <p className="text-zinc-400">[DELAY] Throttled 120s (Anti-Ban)</p>
              <p className="text-emerald-400">[GROWTH] Engagement +28.4%</p>
            </div>
          </div>
          <div className="text-[7px] text-zinc-600 border-t border-white/5 pt-1">
            Autonomous Social Growth Engine
          </div>
        </div>
      );
    case 3:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-acid font-bold">MOTOFILE VAULT</span>
            <span className="text-zinc-500">AES-256</span>
          </div>
          <div className="my-auto space-y-1.5">
            <div className="border border-white/5 bg-white/5 p-1.5 rounded flex items-center justify-between">
              <div>
                <p className="text-white text-[8px]">Tax Token.pdf</p>
                <p className="text-zinc-500 text-[6px]">Expires 14-Dec-2026</p>
              </div>
              <span className="text-acid font-bold">✓ SECURE</span>
            </div>
            <div className="border border-white/5 bg-white/5 p-1.5 rounded flex items-center justify-between">
              <div>
                <p className="text-white text-[8px]">Driving License.pdf</p>
                <p className="text-zinc-500 text-[6px]">Verified ID 4893</p>
              </div>
              <span className="text-acid font-bold">✓ SECURE</span>
            </div>
          </div>
          <div className="text-[6px] text-center text-zinc-500">Secure Flutter Docs Locker</div>
        </div>
      );
    case 4:
      return (
        <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-rust font-bold">BIKESHOP BD</span>
            <span className="text-zinc-500">LIVE RETAIL</span>
          </div>
          <div className="my-auto space-y-1.5">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white">Suzuki Gixxer SF</span>
              <span className="text-rust font-bold">৳ 2,45,000</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span className="text-white">Yamaha R15 V4</span>
              <span className="text-rust font-bold">৳ 3,85,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Accessories Kit</span>
              <span className="text-rust font-bold">৳ 12,500</span>
            </div>
          </div>
          <div className="text-[7px] text-zinc-500 border-t border-white/5 pt-1">
            Motorcycle & Spare Parts E-Shop
          </div>
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
            05 shipped
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
            <a
              key={p.n}
              href={p.github}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group block relative border-b border-white/5 py-8 transition-all duration-300 hover:bg-white/[0.01] px-4 cursor-pointer"
              data-cursor-text="SOURCE"
            >
              <div className="mx-auto grid grid-cols-12 items-baseline gap-4">
                <span className="col-span-2 font-mono text-xs text-zinc-600 group-hover:text-white transition-colors duration-300 md:col-span-1">{p.n}</span>
                <h3 className="col-span-10 font-display text-3xl leading-none group-hover:translate-x-4 group-hover:text-acid md:col-span-5 md:text-5xl transition-all duration-500 ease-out text-zinc-100 font-medium flex items-center gap-2">
                  {p.name}
                  <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-acid" />
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
            </a>
          ))}
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
              § 05 — Signal
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
            className="w-full relative z-10 [filter:invert(0.9)_hue-rotate(180deg)]"
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
            § 06 — Education
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
          § 07 — Contact
        </div>
        <h2 className="mt-4 font-display text-[14vw] leading-[0.85] md:text-[9rem] select-none cursor-default text-zinc-100">
          Let's <span className="italic text-rust hover:text-acid transition-colors duration-500">build</span> something.
        </h2>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Reach out
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-display text-2xl italic text-zinc-300 hover:text-rust transition-colors duration-300 md:text-3xl"
              >
                github.com/Fahimulislamfahim
                <ArrowUpRight className="h-6 w-6 transition group-hover:rotate-45" />
              </a>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-acid transition-colors flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="h-3 w-3" />
                </a>
                <a href={FACEBOOK} target="_blank" rel="noreferrer" className="hover:text-acid transition-colors flex items-center gap-1">
                  Facebook <ArrowUpRight className="h-3 w-3" />
                </a>
                <a href={THREADS} target="_blank" rel="noreferrer" className="hover:text-acid transition-colors flex items-center gap-1">
                  Threads <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
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
