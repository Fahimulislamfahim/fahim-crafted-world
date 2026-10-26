import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, type Variants } from "motion/react";
import { useRef, useState, useEffect } from "react";
import Lenis from "lenis";
import { useIsMobile } from "../hooks/use-mobile";
import {
  ArrowUpRight,
  Github,
  MapPin,
  Activity,
  Sparkles,
  Code2,
  Cpu,
  Terminal,
  Cloud,
  Smartphone,
  Facebook,
  Linkedin,
  Globe,
  Menu,
  X,
  Radio,
  ShieldCheck,
  Server,
  Database,
  Mail,
  Check,
  Copy,
  ExternalLink,
  Layers,
  Filter,
  SlidersHorizontal,
  Bell,
  Search,
  Plus,
} from "lucide-react";

function MagnetElement({ children, className = "", distance = 35, ...props }: { children: React.ReactNode; className?: string; distance?: number; [key: string]: any }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (dist < distance) {
      const pull = 0.35;
      x.set(distanceX * pull);
      y.set(distanceY * pull);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 180 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 180 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
    ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 transform-style-3d ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorType, setCursorType] = useState<"default" | "hover" | "project" | "scan" | "click">("default");
  const [hoverText, setHoverText] = useState("");

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setCursorType("click");
    const handleMouseUp = () => setCursorType("hover");

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

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
        setHoverText("SCAN");
      } else if (isClickable) {
        setCursorType("hover");
        setHoverText("");
      } else {
        setCursorType("default");
        setHoverText("");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed pointer-events-none z-50 rounded-full transition-[width,height,background-color,border-color] duration-200 hidden md:flex items-center justify-center font-mono text-[9px] font-bold tracking-widest ${
          cursorType === "click"
            ? "w-8 h-8 bg-acid/40 border border-acid scale-90"
            : cursorType === "hover"
              ? "w-12 h-12 bg-white/10 border border-white/40 backdrop-blur-[2px]"
              : cursorType === "project"
                ? "w-20 h-20 bg-acid/90 text-black border border-acid shadow-[0_0_20px_rgba(217,249,157,0.4)]"
                : cursorType === "scan"
                  ? "w-16 h-16 bg-rust/80 text-white border border-rust shadow-[0_0_20px_rgba(217,119,6,0.4)] animate-pulse"
                  : "w-3 h-3 bg-white/80 border border-transparent"
        }`}
      >
        {hoverText && (
          <span className="select-none animate-fadeIn">
            {hoverText}
          </span>
        )}
      </motion.div>
      <motion.div
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className={`fixed pointer-events-none z-40 rounded-full bg-rust/20 blur-xl transition-all duration-300 hidden md:block ${
          cursorType === "hover" || cursorType === "project" ? "w-24 h-24 opacity-60" : "w-12 h-12 opacity-30"
        }`}
      />
    </>
  );
}

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const points: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fill();

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (mouse.x > 0 && mouse.y > 0) {
              const mdx = mouse.x - (p.x + p2.x) / 2;
              const mdy = mouse.y - (p.y + p2.y) / 2;
              const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

              if (mdist < 160) {
                const alpha = (1 - dist / 100) * (1 - mdist / 160) * 0.2;
                ctx.strokeStyle = `rgba(217, 249, 157, ${alpha})`;
              } else {
                const alpha = (1 - dist / 100) * 0.03;
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              }
            } else {
              const alpha = (1 - dist / 100) * 0.03;
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            }

            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-50"
    />
  );
}

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Fahimul Islam Fahim — Software Engineer • Mobile App Specialist • IoT Systems Developer" },
      {
        name: "description",
        content:
          "Professional Portfolio of Fahimul Islam Fahim. Systems and applications engineer specializing in production-grade cross-platform mobile solutions (Flutter/Dart), native mobile applications (Kotlin), reactive full-stack web platforms, and embedded microcontroller hardware.",
      },
    ],
  }),
});

const GITHUB = "https://github.com/Fahimulislamfahim";
const EMAIL = "fahimulislam.dev@gmail.com";
const FACEBOOK = "https://www.facebook.com/Fahim.01533335214/";
const LINKEDIN = "https://www.linkedin.com/in/fahimulislam86/";
const THREADS = "https://www.threads.net/@fahim.0.1";

const skills = [
  {
    icon: Smartphone,
    title: "Mobile Engineering",
    domain: "Cross-Platform & Native Android",
    desc: "End-to-end Flutter development for iOS and Android with scalable state management (Bloc, Provider). Hardware-integrated native Android with background services, zero-latency triggers, keystore biometrics, and offline resilience.",
    items: ["Flutter", "Dart", "Kotlin", "Bloc & Provider", "Keystore Biometrics", "PDF Engines", "Offline Resilience"],
  },
  {
    icon: Terminal,
    title: "Full-Stack Web Systems",
    domain: "Modern Single-Page Architectures",
    desc: "Single-page responsive architectures using React, Next.js, and TypeScript. Structured high-throughput REST endpoints and reactive service layers with FastAPI and Node.js.",
    items: ["React.js", "Next.js", "TypeScript", "Node.js", "Express.js", "FastAPI", "Leaflet.js", "RESTful APIs"],
  },
  {
    icon: Radio,
    title: "Real-Time Systems",
    domain: "Low-Latency WebSocket Streaming",
    desc: "Bidirectional WebSocket infrastructures (Socket.io) engineered for vehicle telemetry streams, real-time location tracking, live dispatch, and synchronized multi-tenant chat.",
    items: ["WebSockets", "Socket.io", "Vehicle Telemetry", "Live Route Matching", "Geo-Tracking", "Failover Systems"],
  },
  {
    icon: Database,
    title: "Databases & Cloud",
    domain: "Data Modeling & Cloud Deployment",
    desc: "Relational persistence and document storage across PostgreSQL and MongoDB / Atlas. Local encrypted vaults via SQLCipher SQLite, Firebase integrations, and automated Vercel/Railway deployments.",
    items: ["PostgreSQL", "MongoDB / Atlas", "Firebase", "SQLite (SQLCipher)", "Vercel", "Railway", "Git / GitHub"],
  },
  {
    icon: Cpu,
    title: "Automation & Multi-Agent AI",
    domain: "Headless Workflows & LLM Pipelines",
    desc: "Web scraping, data extraction, and test automation via Playwright and Python. Multi-agent content orchestration with Google Gemini (gemini-2.5-flash) and FastAPI services, alongside custom Chromium extensions.",
    items: ["Google Gemini (2.5-flash)", "Multi-Agent Pipelines", "Playwright", "Python Web Scraping", "Chromium Extensions", "FastAPI"],
  },
  {
    icon: Cloud,
    title: "Embedded Hardware & IoT",
    domain: "Firmware, Sensors & Web-Bridges",
    desc: "Microcontroller firmware in C/C++ on ESP32, ESP8266, ESP32-CAM, and Arduino. Web servers directly on chip for local browser controls, paired with I2C OLED displays, relays, and hardware emergency triggers.",
    items: ["ESP32", "ESP8266", "ESP32-CAM", "Arduino", "C / C++ Firmware", "I2C OLED", "Hardware-Web Bridge"],
  },
];

export interface ProjectItem {
  n: string;
  name: string;
  category: "mobile" | "web" | "ai" | "iot";
  categoryLabel: string;
  tag: string;
  year: string;
  desc: string;
  accent: "acid" | "rust";
  github: string;
  badge: string;
}

const projects: ProjectItem[] = [
  // CURATED PRODUCTION REPOSITORIES (MOBILE APPLICATIONS)
  {
    n: "01",
    name: "CoRide",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Real-Time WebSockets",
    year: "2026",
    desc: "Campus ridesharing and carpooling ecosystem designed for DIU. Live route matching, passenger tracking, dynamic fare division, and real-time WebSocket dispatch.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/CoRide",
    badge: "FLUTTER · DIU",
  },
  {
    n: "02",
    name: "Sathee (Abhay)",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Kotlin · Edge-First Android",
    year: "2026",
    desc: "Edge-first women's safety mobile system for Bangladesh. Silent hardware triggers, earpiece-routed fake calls, route anomaly detection, and 2G SMS emergency fallback.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/Sathee",
    badge: "KOTLIN · EMERGENCY",
  },
  {
    n: "03",
    name: "MotoFile",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Keystore Biometrics",
    year: "2026",
    desc: "Secure document vault app with biometric fingerprint/face authentication, encrypted local database storage, and integrated dark-mode PDF viewing.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/MotoFile",
    badge: "FLUTTER · VAULT",
  },
  {
    n: "04",
    name: "BikeHub",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Trading Portal",
    year: "2026",
    desc: "Motorcycle trading and reselling shopping portal. Features inventory cataloging, spec filtering matrices, transaction ledgers, and direct communication channels.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/BikeHub",
    badge: "FLUTTER · COMMERCE",
  },
  {
    n: "05",
    name: "Krishi-Advice",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · AgriTech",
    year: "2026",
    desc: "Agricultural advisory mobile tool delivering pest diagnosis, crop treatment advisories, seasonal tips, and weather-linked cultivation guides for local farmers.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/Krishi-Advice",
    badge: "FLUTTER · AGRITECH",
  },
  {
    n: "06",
    name: "Nexus-Academica",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Academic OS",
    year: "2026",
    desc: "Comprehensive university academic workspace providing automated course scheduling, grade estimations, syllabus tracking, and submission reminders.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Nexus-Academica",
    badge: "FLUTTER · ACADEMIC",
  },
  {
    n: "07",
    name: "Class-Routine-App",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Schedule Engine",
    year: "2026",
    desc: "Departmental routine manager organizing section-specific time slots, instructor availability, lab room designations, and weekly schedule updates.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/Class-Routine-App",
    badge: "FLUTTER · TIMETABLE",
  },
  {
    n: "08",
    name: "Smart-Planner",
    category: "mobile",
    categoryLabel: "Mobile Applications",
    tag: "Dart / Flutter · Productivity",
    year: "2026",
    desc: "Adaptive time management and daily planning mobile application featuring milestone breakdowns, priority matrix sorting, and local reminder alerts.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Smart-Planner",
    badge: "FLUTTER · PLANNER",
  },

  // CURATED WEB PLATFORMS & FULL-STACK SOLUTIONS
  {
    n: "09",
    name: "Co-Ride (Web Edition)",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    tag: "JavaScript / Node · Live Dispatch",
    year: "2026",
    desc: "Web dispatch portal and administrative dashboard for the CoRide campus carpooling platform, orchestrating live rides and map integration.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Co-Ride",
    badge: "NODE · WEBSOCKETS",
  },
  {
    n: "10",
    name: "MealNChill",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    tag: "Full-Stack Web · Shared Ledger",
    year: "2026",
    desc: "Apartment ledger management application handling multi-tenant meal tracking, automated grocery cost calculations, and monthly shared balances.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/MealNChill",
    badge: "FULL-STACK · FINTECH",
  },
  {
    n: "11",
    name: "Meal-Routine-Genarator",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    tag: "TypeScript · Nutritional Planning",
    year: "2026",
    desc: "Smart meal planning generator producing structured weekly menus based on nutritional goals and dietary preferences.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Meal-Routine-Genarator",
    badge: "TYPESCRIPT · NUTRITION",
  },
  {
    n: "12",
    name: "Hospital-Test-Voucher",
    category: "web",
    categoryLabel: "Web & Full-Stack",
    tag: "Python · Clinical Invoicing",
    year: "2026",
    desc: "Diagnostic test voucher and clinical invoicing system managing billing records, doctor commissions, and patient test reporting.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/Hospital-Test-Voucher",
    badge: "PYTHON · HEALTHCARE",
  },

  // WEB, AI, AUTOMATION & EMBEDDED SYSTEMS
  {
    n: "13",
    name: "Personify",
    category: "ai",
    categoryLabel: "AI & Automation",
    tag: "FastAPI / Dart · Multi-Agent LLM",
    year: "2026",
    desc: "Advanced social media automation platform utilizing Google Gemini multi-agent pipelines and a Flutter control dashboard for cross-platform post generation.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Personify",
    badge: "GEMINI 2.5 · MULTI-AGENT",
  },
  {
    n: "14",
    name: "Ai-Automation-Studio",
    category: "ai",
    categoryLabel: "AI & Automation",
    tag: "TypeScript · Workflow Chaining",
    year: "2026",
    desc: "Modular automation workspace enabling visual workflow chaining, headless triggers, and scheduled task executions.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Ai-Automation-Studio",
    badge: "TYPESCRIPT · WORKFLOW",
  },
  {
    n: "15",
    name: "ChatBotLand",
    category: "ai",
    categoryLabel: "AI & Automation",
    tag: "TypeScript · Multi-Turn Interface",
    year: "2026",
    desc: "Responsive multi-turn chatbot user interface engineered with modern TypeScript components and customized prompt parameter presets.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/ChatBotLand",
    badge: "TYPESCRIPT · CHATBOT",
  },
  {
    n: "16",
    name: "CodeSignalAI",
    category: "ai",
    categoryLabel: "AI & Automation",
    tag: "JavaScript · AI Debugger & Tutor",
    year: "2026",
    desc: "Interactive coding assistant and practice tool leveraging AI guidance to debug algorithmic problems and optimize runtime complexity.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/CodeSignalAI",
    badge: "AI · ALGORITHMS",
  },
  {
    n: "17",
    name: "Auto-fb-Unfollower",
    category: "ai",
    categoryLabel: "AI & Automation",
    tag: "Chrome Ext / JS · Headless Automation",
    year: "2026",
    desc: "Browser automation extension for batch unfollowing pages and accounts on Facebook with a clean, focused control interface.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/Auto-fb-Unfollower",
    badge: "CHROME EXT · BATCH",
  },
  {
    n: "18",
    name: "DeskBot",
    category: "iot",
    categoryLabel: "Embedded & IoT",
    tag: "IoT Hardware · C/C++ Firmware",
    year: "2026",
    desc: "Physical desktop companion robot built with microcontroller firmware, hosting an embedded web server for hardware-software interaction.",
    accent: "rust",
    github: "https://github.com/Fahimulislamfahim/DeskBot",
    badge: "ESP32 · C++ FIRMWARE",
  },
  {
    n: "19",
    name: "Smart-Task-Habit-Tracker",
    category: "iot",
    categoryLabel: "Embedded & IoT",
    tag: "C++ · Deterministic Core",
    year: "2026",
    desc: "High-performance CLI and local task habit tracker written in C++ for tracking goal consistency and recurring routines.",
    accent: "acid",
    github: "https://github.com/Fahimulislamfahim/Smart-Task-Habit-Tracker",
    badge: "C++20 · SYSTEMS",
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function Portfolio() {
  useEffect(() => {
    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    let lenis: Lenis | null = null;
    if (!isMobileDevice) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1.05,
      });
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetElement = document.querySelector<HTMLElement>(href);
          if (targetElement) {
            if (lenis) {
              lenis.scrollTo(targetElement);
            } else {
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    let rafId: number;
    if (lenis) {
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (lenis) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <NeuralCanvas />
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

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const symbols = "01$!@#%?*&_+=/\\";

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iterations = 0;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return text[index];
            }
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join("");
      });

      iterations += 1 / 2;
      if (iterations >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 25);
  };

  return (
    <span
      onMouseEnter={triggerScramble}
      className={className}
    >
      {displayText}
    </span>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navLogoOpacity = useTransform(scrollY, [0, 120, 200], [0, 0, 1]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 z-50 mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isMobileMenuOpen
          ? "top-0 max-w-full h-screen bg-zinc-950/95 py-4 border-none"
          : isScrolled
            ? "top-4 max-w-[92%] md:max-w-[780px] border border-white/10 bg-zinc-950/80 backdrop-blur-md py-2.5 rounded-full shadow-xl shadow-black/40"
            : "top-0 max-w-full border-b border-transparent bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex w-full items-center justify-between px-6 md:px-8">
        {/* Left: Logo */}
        <motion.div 
          style={{ opacity: isMobile ? 1 : navLogoOpacity }} 
          className="flex items-center"
        >
          <MagnetElement distance={25}>
            <a
              href="#top"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-2xl italic tracking-tight hover:text-acid transition-colors duration-300"
            >
              Fahim<span className="text-rust">.</span>
            </a>
          </MagnetElement>
        </motion.div>

        {/* Middle: Navigation links (Desktop) */}
        <nav className="hidden md:flex justify-center gap-6 font-mono text-xs uppercase tracking-widest">
          <MagnetElement distance={20}>
            <a
              href="#work"
              className="hover:text-acid transition-colors duration-300 relative group px-2 py-1"
            >
              <ScrambleText text="Work" />
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
            </a>
          </MagnetElement>
          <MagnetElement distance={20}>
            <a
              href="#about"
              className="hover:text-acid transition-colors duration-300 relative group px-2 py-1"
            >
              <ScrambleText text="About" />
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
            </a>
          </MagnetElement>
          <MagnetElement distance={20}>
            <a
              href="#skills"
              className="hover:text-acid transition-colors duration-300 relative group px-2 py-1"
            >
              <ScrambleText text="Stack" />
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
            </a>
          </MagnetElement>
          <MagnetElement distance={20}>
            <a
              href="#contact"
              className="hover:text-acid transition-colors duration-300 relative group px-2 py-1"
            >
              <ScrambleText text="Contact" />
              <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-acid transition-all duration-300 group-hover:w-[calc(100%-16px)]" />
            </a>
          </MagnetElement>
        </nav>

        {/* Right: Availability status / Mobile Menu */}
        <div className="flex items-center justify-end gap-3 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            <span className={`overflow-hidden whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"}`}>
              Available for work
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center p-2 rounded-full border border-white/5 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/10 cursor-pointer transition-all duration-300"
              title="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden absolute top-[100%] left-0 w-full h-[calc(100vh-100%)] bg-zinc-950/95 backdrop-blur-lg z-40 px-6 py-12 flex flex-col justify-between border-t border-white/5"
            style={{ minHeight: "calc(100vh - 60px)" }}
          >
            <nav className="flex flex-col gap-5 font-mono text-lg uppercase tracking-widest text-center mt-4">
              <a
                href="#work"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-acid py-3 transition-colors duration-300 border-b border-white/5"
              >
                Work
              </a>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-acid py-3 transition-colors duration-300 border-b border-white/5"
              >
                About
              </a>
              <a
                href="#skills"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-acid py-3 transition-colors duration-300 border-b border-white/5"
              >
                Stack
              </a>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-acid py-3 transition-colors duration-300 border-b border-white/5"
              >
                Contact
              </a>
            </nav>

            <div className="flex flex-col items-center gap-4 border-t border-white/5 pt-8 text-center">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
                </span>
                <span>Available for work · Dhaka, BD</span>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                fahimulislam.dev@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const [isIHovered, setIsIHovered] = useState(false);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isMobile = useIsMobile();
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 150]);

  const titleX = useTransform(scrollY, [0, 120, 200], isMobile ? ["0vw", "0vw", "0vw"] : ["0vw", "0vw", "-22vw"]);
  const titleY = useTransform(scrollY, [0, 120, 200], isMobile ? ["0px", "0px", "0px"] : ["0px", "0px", "-160px"]);
  const titleScale = useTransform(scrollY, [0, 120, 200], isMobile ? [1, 1, 1] : [1, 1, 0.16]);
  const titleOpacity = useTransform(scrollY, [0, 120, 200], isMobile ? [1, 1, 1] : [1, 1, 0]);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const bgGlow = useTransform(
    [glowX, glowY],
    ([xVal, yVal]) => `radial-gradient(600px circle at ${xVal}px ${yVal}px, rgba(217, 119, 6, 0.04) 0%, transparent 70%)`
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section 
      id="top" 
      ref={heroRef} 
      onMouseMove={handleHeroMouseMove}
      className="relative border-b border-white/5 overflow-hidden"
    >
      <motion.div 
        style={{ background: bgGlow }}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rust/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-20 pt-12 md:px-10 md:pb-32 md:pt-24 relative z-10">
        {/* Left column: meta */}
        <div className="col-span-12 md:col-span-3 space-y-6 font-mono text-xs uppercase tracking-widest text-zinc-500">
          <div>
            <div className="text-zinc-600">Profile / 01</div>
            <div className="mt-1 text-zinc-300 font-sans font-medium text-sm">Fahimul Islam Fahim</div>
            <div className="text-[10px] text-rust mt-0.5">GitHub Pro Developer</div>
          </div>
          <div>
            <div className="text-zinc-600">Location</div>
            <div className="mt-1 flex items-center gap-1.5 text-zinc-300">
              <MapPin className="h-3.5 w-3.5 text-rust" /> Dhaka, Bangladesh
            </div>
          </div>
          <div>
            <div className="text-zinc-600">Contact</div>
            <button
              onClick={handleCopyEmail}
              className="mt-1 text-zinc-300 hover:text-acid flex items-center gap-1.5 transition-colors cursor-pointer text-left lowercase font-mono text-[11px]"
              title="Click to copy email address"
            >
              {copiedEmail ? <Check className="h-3 w-3 text-acid" /> : <Copy className="h-3 w-3 text-zinc-500" />}
              <span>{copiedEmail ? "Copied to clipboard!" : EMAIL}</span>
            </button>
          </div>
          <div>
            <div className="text-zinc-600">Role Spec</div>
            <div className="mt-1 text-zinc-300 leading-snug">
              Software Engineer • Mobile Apps • IoT Systems
            </div>
          </div>
        </div>

        {/* Center: big type */}
        <div className="col-span-12 md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                className="hover:text-rust transition-colors duration-500 cursor-pointer inline-block"
              >Fah</motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                onMouseEnter={() => setIsIHovered(true)}
                onMouseLeave={() => setIsIHovered(false)}
                className="italic text-rust hover:text-acid transition-colors duration-500 cursor-pointer inline-block"
                data-cursor-state="scan"
              >i</motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                onMouseEnter={() => setIsNameHovered(true)}
                onMouseLeave={() => setIsNameHovered(false)}
                className="hover:text-rust transition-colors duration-500 cursor-pointer inline-block"
              >m</motion.span>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-zinc-300 md:text-lg"
          >
            Systems and applications engineer specializing in production-grade cross-platform mobile solutions (Flutter/Dart), native mobile applications (Kotlin), reactive full-stack web platforms, and embedded microcontroller hardware. Focused on delivering secure, edge-first architectures, low-latency WebSocket systems, and verifiable software standards.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagnetElement distance={25}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-acid cursor-pointer font-medium"
              >
                See selected work ({projects.length}) <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </MagnetElement>

            <div className="flex flex-wrap gap-2.5 items-center">
              <MagnetElement distance={20}>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
                >
                  <Github className="h-4 w-4 text-zinc-400" /> GitHub
                </a>
              </MagnetElement>
              <MagnetElement distance={15}>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </MagnetElement>
              <MagnetElement distance={15}>
                <a
                  href={FACEBOOK}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                  title="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </MagnetElement>
              <MagnetElement distance={15}>
                <a
                  href={THREADS}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 transition-all duration-300 cursor-pointer"
                  title="Threads"
                >
                  <Globe className="h-4 w-4" />
                </a>
              </MagnetElement>
            </div>
          </motion.div>
        </div>

        {/* Right: portrait card */}
        <motion.div style={{ y }} className="col-span-12 md:col-span-3">
          <TiltCard>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative aspect-[3/4] w-full border border-white/10 rounded-2xl bg-zinc-900 overflow-hidden shadow-[0_0_50px_rgba(217,119,6,0.05)] group"
            >
              <img 
                src="/fahim.jpg" 
                alt="Fahimul Islam Fahim" 
                className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                  isIHovered 
                    ? "grayscale-0 scale-100 opacity-0" 
                    : isNameHovered
                      ? "grayscale-0 scale-100 opacity-100"
                      : "grayscale group-hover:grayscale-0 group-hover:scale-105 opacity-100"
                }`}
              />
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
          </TiltCard>
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
    "Flutter & Dart",
    "Kotlin Native Android",
    "Real-Time WebSockets",
    "Google Gemini 2.5",
    "FastAPI & Node.js",
    "ESP32 C++ Firmware",
    "PostgreSQL & MongoDB",
    "Playwright Automation",
    "Edge-First Systems",
    "Biometric Keystores",
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
  const isMobile = useIsMobile();
  return (
    <motion.section 
      id="about" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 relative"
    >
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-acid/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-36 relative z-10">
        <div className="col-span-12 md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
            § 02 — About & Standards
          </div>
          <h2 className="mt-4 font-display text-5xl leading-[1.1] md:text-7xl">
            Architecting<br />
            <span className="italic text-rust">for scale,</span><br />
            engineered<br />
            <span className="italic text-zinc-400">for resilience.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-6 text-base leading-relaxed text-zinc-400 md:text-lg">
          <p>
            Software Engineer based in Dhaka, focused on designing distributed systems,
            edge-first mobile architectures, and real-time streaming backends. My work centers on
            building fault-tolerant client-server ecosystems that scale deterministically under high concurrency.
          </p>
          <p>
            Whether implementing bidirectional WebSocket state synchronization for campus transport, hardware-level
            biometric keystore isolation, or autonomous multi-agent LLM orchestration pipelines with Google Gemini 2.5 Flash,
            I prioritize defensive error boundaries, verifiable standards, and clean code separation.
          </p>

          {/* Delivery Standards & Working Model from PDF Page 3 */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-rust/10 text-rust">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-semibold">
                Delivery Standards & Working Model
              </span>
            </div>
            <p className="font-mono text-xs leading-relaxed text-zinc-400">
              Collaboration & Quality Assurance: Every project follows strict modular separation of concerns, defensive error handling, Git branch feature isolation, reproducible configuration setups (<code className="text-acid">.env.example</code>), and complete documentation for seamless client handover.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SkillCard({ s, i }: { s: typeof skills[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const glowClasses = [
    "glow-card-acid",
    "glow-card-rust",
    "glow-card-neutral",
    "glow-card-acid",
    "glow-card-rust",
    "glow-card-neutral",
  ];
  const glowClass = glowClasses[i % glowClasses.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative bg-white/[0.015] border border-white/5 p-7 md:p-8 hover:bg-white/[0.03] hover:border-white/15 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between ${glowClass}`}
    >
      <div className="glow-bg" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 group-hover:text-acid group-hover:border-acid/30 transition-all duration-300">
              <s.icon className="h-5 w-5" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-zinc-400 transition-colors">
              0{i + 1}
            </span>
          </div>

          <div className="mt-6 font-mono text-[10px] uppercase tracking-wider text-rust font-medium">
            {s.domain}
          </div>
          <h3 className="mt-1 font-display text-2xl md:text-3xl text-zinc-100 group-hover:text-white transition-colors">
            {s.title}
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-zinc-400 font-sans">
            {s.desc}
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
          {s.items.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/5 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[9px] tracking-wide text-zinc-400 group-hover:text-zinc-200 group-hover:border-white/15 transition-all duration-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Skills() {
  const isMobile = useIsMobile();
  return (
    <motion.section 
      id="skills" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5 bg-white/[0.002]"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 03 — Core Services & Stack
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">
              <ScrambleText text="The technical matrix." />
            </h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest text-zinc-500 md:block">
            06 core domains
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((s, i) => (
            <SkillCard key={s.title} s={s} i={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

{/* ANIMATED UI MOCKUPS FOR EACH CATEGORY (MATERIAL DESIGN 3 / MUI AESTHETICS) */}

function MobileDeviceMockup() {
  const [activeTab, setActiveTab] = useState(0);
  const [isRideActive, setIsRideActive] = useState(true);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between select-none">
      {/* Mobile Frame with Material Design 3 UI */}
      <div className="w-full max-w-[290px] sm:max-w-[310px] mx-auto rounded-[38px] border-[5px] border-zinc-800 bg-zinc-950 p-3 shadow-2xl relative overflow-hidden">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-zinc-900 rounded-full z-30 flex items-center justify-between px-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Status Bar */}
        <div className="flex justify-between items-center text-[10px] font-sans text-zinc-400 px-3 pt-3 pb-1 border-b border-white/5 font-medium">
          <span>09:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <div className="w-4 h-2.5 border border-zinc-400 rounded-[2px] p-[1px] flex items-center">
              <div className="w-full h-full bg-acid rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Material 3 App Screen */}
        <div className="pt-2 pb-1 space-y-2.5">
          {/* M3 Small Top App Bar */}
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-zinc-300">
                <Menu className="h-3.5 w-3.5" />
              </div>
              <div>
                <div className="text-[11px] font-sans font-bold text-white tracking-tight">CoRide Campus</div>
                <div className="text-[8px] font-mono text-zinc-400">Material 3 · Flutter Engine</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 relative">
                <Bell className="h-3 w-3" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rust" />
              </div>
            </div>
          </div>

          {/* M3 Search Anchor / Search Bar */}
          <div className="bg-zinc-900/90 border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Search className="h-3 w-3 text-zinc-400" />
            <span className="text-[9px] font-sans text-zinc-400">Where to on campus?</span>
            <span className="ml-auto text-[8px] font-mono bg-white/10 px-1.5 py-0.5 rounded-full text-zinc-300">DIU</span>
          </div>

          {/* M3 Elevated Route Card */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-3 space-y-2 shadow-md relative overflow-hidden">
            <div className="flex justify-between items-center">
              <span className="text-[8px] font-mono uppercase tracking-wider text-acid font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
                Route In Progress
              </span>
              <span className="text-[8px] font-mono bg-acid/15 text-acid px-1.5 py-0.5 rounded-full font-bold">
                DIU → UTTARA
              </span>
            </div>

            {/* SVG Animated Route Trace */}
            <div className="h-16 rounded-xl bg-zinc-950/80 border border-white/5 relative p-1 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 240 60">
                <path d="M 20 45 Q 80 10, 140 35 T 220 15" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="3" />
                <path d="M 20 45 Q 80 10, 140 35 T 220 15" fill="none" stroke="var(--color-acid)" strokeWidth="3" strokeDasharray="6 6" className="animate-[dash_1s_linear_infinite]" />
                <circle cx="20" cy="45" r="4" fill="var(--color-rust)" />
                <circle cx="220" cy="15" r="4" fill="var(--color-acid)" />
                <motion.circle
                  r="5"
                  fill="white"
                  stroke="var(--color-acid)"
                  strokeWidth="2"
                  animate={{ cx: [20, 80, 140, 220], cy: [45, 20, 35, 15] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>

            {/* M3 Filter Chips */}
            <div className="flex gap-1.5 overflow-x-auto pt-0.5">
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[8px] font-sans font-medium flex items-center gap-1 shrink-0">
                <Check className="h-2.5 w-2.5 text-acid" /> Fare: ৳45 Split
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[8px] font-sans shrink-0">
                4/4 Seats
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[8px] font-sans shrink-0">
                1.2 km
              </span>
            </div>
          </div>

          {/* M3 Outlined Biometric Keystore Card */}
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rust/15 text-rust flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[9px] font-sans font-semibold text-white">Hardware Keystore</div>
                <div className="text-[7px] font-mono text-zinc-400">Android Biometric Prompt</div>
              </div>
            </div>
            <span className="text-[8px] font-mono bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full font-bold border border-emerald-500/30">
              VERIFIED
            </span>
          </div>

          {/* M3 Floating Action Button (FAB) */}
          <div className="flex justify-end pt-0.5">
            <div className="rounded-2xl bg-acid text-black font-sans font-bold text-[9px] px-3.5 py-1.5 flex items-center gap-1.5 shadow-lg shadow-acid/20 cursor-pointer">
              <Plus className="h-3.5 w-3.5" /> Book Transit
            </div>
          </div>

          {/* M3 Navigation Bar (Iconic pill container on active item) */}
          <div className="bg-zinc-900/95 border-t border-white/10 rounded-2xl p-1.5 flex justify-around items-center">
            <button
              onClick={() => setActiveTab(0)}
              className="flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${activeTab === 0 ? "bg-acid/20 text-acid font-bold" : "text-zinc-500"}`}>
                <Smartphone className="h-3.5 w-3.5" />
              </div>
              <span className={`text-[7px] font-sans ${activeTab === 0 ? "text-acid font-semibold" : "text-zinc-500"}`}>Home</span>
            </button>

            <button
              onClick={() => setActiveTab(1)}
              className="flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${activeTab === 1 ? "bg-acid/20 text-acid font-bold" : "text-zinc-500"}`}>
                <Radio className="h-3.5 w-3.5" />
              </div>
              <span className={`text-[7px] font-sans ${activeTab === 1 ? "text-acid font-semibold" : "text-zinc-500"}`}>Rides</span>
            </button>

            <button
              onClick={() => setActiveTab(2)}
              className="flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <div className={`px-3 py-0.5 rounded-full transition-all ${activeTab === 2 ? "bg-acid/20 text-acid font-bold" : "text-zinc-500"}`}>
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
              <span className={`text-[7px] font-sans ${activeTab === 2 ? "text-acid font-semibold" : "text-zinc-500"}`}>Vault</span>
            </button>
          </div>
        </div>

        {/* Home Indicator bar */}
        <div className="w-20 h-1 bg-zinc-600 rounded-full mx-auto mt-1" />
      </div>

      {/* Side Explainer with Material Design 3 Tokens */}
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acid/10 border border-acid/30 text-acid font-mono text-xs uppercase tracking-wider font-semibold">
          <Smartphone className="h-3.5 w-3.5" /> Material Design 3 (Flutter M3)
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-zinc-100">
          Native Android & Flutter Material 3 Architecture
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 font-sans">
          Fully integrated with Google's Material 3 (Material You) design system. Features M3 Navigation Bars with pill active indicators, dynamic tonal elevation cards, extended Floating Action Buttons (FABs), BLoC state management, and native Kotlin biometric keystore dialogs.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">M3 Component Spec</div>
            <div className="text-zinc-200 mt-1 font-semibold">M3 Navigation & FAB</div>
          </div>
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">State & Offline Storage</div>
            <div className="text-acid mt-1 font-semibold">BLoC & SQLCipher</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebBrowserMockup() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between select-none">
      {/* MUI Browser Window Frame */}
      <div className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden">
        {/* MUI Chrome Header Bar */}
        <div className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900/90 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex-1 bg-zinc-950 border border-white/10 rounded-full px-3 py-1 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
            <span className="text-emerald-400">🔒</span>
            <span className="truncate">https://fahim.systems/mui/fleet-dashboard</span>
          </div>
        </div>

        {/* Material-UI (MUI) App Bar & Paper Container */}
        <div className="p-4 space-y-3 font-sans">
          {/* MUI App Bar */}
          <div className="flex justify-between items-center bg-zinc-900/80 border border-white/10 rounded-xl p-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-rust/20 text-rust flex items-center justify-center font-bold text-xs">
                M
              </div>
              <span className="text-xs font-bold text-white font-sans">Fleet Manager (MUI)</span>
            </div>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-acid/15 text-acid text-[8px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" />
                WS STREAMING
              </span>
            </div>
          </div>

          {/* MUI Metric Cards (Tonal Surface Elevation) */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-zinc-900/90 border border-white/10 p-2.5 rounded-xl shadow-sm">
              <span className="text-zinc-500 text-[8px] uppercase font-mono font-medium">Live Conns</span>
              <div className="text-base font-bold text-white mt-0.5">1,024</div>
              <span className="text-[7px] text-emerald-400 font-mono">↑ 12% vs avg</span>
            </div>
            <div className="bg-zinc-900/90 border border-white/10 p-2.5 rounded-xl shadow-sm">
              <span className="text-zinc-500 text-[8px] uppercase font-mono font-medium">Active Rides</span>
              <div className="text-base font-bold text-acid mt-0.5">84</div>
              <span className="text-[7px] text-zinc-400 font-mono">DIU Campus</span>
            </div>
            <div className="bg-zinc-900/90 border border-white/10 p-2.5 rounded-xl shadow-sm">
              <span className="text-zinc-500 text-[8px] uppercase font-mono font-medium">p99 Latency</span>
              <div className="text-base font-bold text-emerald-400 mt-0.5">14ms</div>
              <span className="text-[7px] text-emerald-400 font-mono">Ultra Low</span>
            </div>
          </div>

          {/* MUI Table / Data Grid Preview */}
          <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-2.5 font-mono text-[8px] space-y-1.5">
            <div className="flex justify-between items-center text-zinc-500 border-b border-white/5 pb-1">
              <span>MUI DATA GRID · LIVE VEHICLE FEED</span>
              <span className="text-zinc-400">4 OF 84</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300 py-0.5">
              <span className="text-white font-medium">Rider #104 (Uttara)</span>
              <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-bold">MATCHED</span>
              <span>12:45:02</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300 py-0.5">
              <span className="text-white font-medium">Rider #105 (Mirpur)</span>
              <span className="bg-acid/10 text-acid px-1.5 py-0.2 rounded font-bold">DISPATCH</span>
              <span>12:45:03</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300 py-0.5">
              <span className="text-white font-medium">Rider #106 (Savar)</span>
              <span className="bg-white/10 text-zinc-300 px-1.5 py-0.2 rounded font-bold">QUEUED</span>
              <span>12:45:05</span>
            </div>
          </div>
        </div>
      </div>

      {/* Side Explainer */}
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust/10 border border-rust/30 text-rust font-mono text-xs uppercase tracking-wider font-semibold">
          <Globe className="h-3.5 w-3.5" /> Full-Stack Web Architecture
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-zinc-100">
          Modern SPAs & Material-UI (MUI) Dashboards
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 font-sans">
          Single-page web platforms engineered with React 19, Next.js, and TypeScript. Coupled with low-latency bidirectional WebSocket infrastructure (Socket.io) for live dispatch grids, geospatial tracking, and high-concurrency PostgreSQL relational persistence.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">Frontend Framework</div>
            <div className="text-zinc-200 mt-1 font-semibold">React & MUI Components</div>
          </div>
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">Transport Layer</div>
            <div className="text-rust mt-1 font-semibold">Socket.io & FastAPI</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AIPipelineMockup() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between select-none">
      {/* M3 Stepper & Agent Pipeline Studio */}
      <div className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl p-4 space-y-3 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-xs text-rust font-bold">
            <Sparkles className="h-4 w-4" />
            <span>Material 3 Agent Stepper</span>
          </div>
          <span className="bg-rust/20 text-rust px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold">
            GEMINI 2.5 FLASH
          </span>
        </div>

        {/* Material 3 Horizontal Stepper */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-[10px]">
              <Check className="h-3 w-3 stroke-[3]" />
            </div>
            <span className="text-[8px] font-mono text-zinc-300 mt-1">1. Ingest</span>
          </div>
          <div className="flex-1 h-0.5 bg-emerald-500/60 mx-1" />
          
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-acid text-black flex items-center justify-center font-bold text-[10px]">
              2
            </div>
            <span className="text-[8px] font-mono text-acid font-bold mt-1">2. LLM Plan</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1" />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 border border-white/10 flex items-center justify-center font-bold text-[10px]">
              3
            </div>
            <span className="text-[8px] font-mono text-zinc-500 mt-1">3. Schema</span>
          </div>
          <div className="flex-1 h-0.5 bg-white/20 mx-1" />

          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-zinc-800 text-zinc-400 border border-white/10 flex items-center justify-center font-bold text-[10px]">
              4
            </div>
            <span className="text-[8px] font-mono text-zinc-500 mt-1">4. Dispatch</span>
          </div>
        </div>

        {/* M3 Outlined Text Field Simulation */}
        <div className="rounded-xl border border-white/15 bg-zinc-900/60 p-2.5 space-y-1">
          <div className="text-[8px] font-mono uppercase text-zinc-400 font-semibold flex justify-between">
            <span>Prompt Instruction Context</span>
            <span className="text-acid">Pydantic v2 Schema</span>
          </div>
          <div className="text-[9px] font-mono text-zinc-200">
            &gt; Extract social trends and compose scheduled viral campaign brief
          </div>
        </div>

        {/* JSON Output Contract */}
        <div className="bg-black/80 border border-white/10 rounded-xl p-3 space-y-1 text-[8px] font-mono">
          <div className="text-zinc-500 flex justify-between border-b border-white/5 pb-1">
            <span>STRUCTURED JSON OUTPUT</span>
            <span className="text-emerald-400 font-bold">● VERIFIED CONTRACT</span>
          </div>
          <p className="text-zinc-400">{"{"}</p>
          <p className="text-zinc-300 pl-3">"agent_status": <span className="text-acid">"DISPATCH_READY"</span>,</p>
          <p className="text-zinc-300 pl-3">"model": <span className="text-rust">"gemini-2.5-flash"</span>,</p>
          <p className="text-zinc-300 pl-3">"tokens_evaluated": <span className="text-white">1,840</span>,</p>
          <p className="text-zinc-300 pl-3">"validation_latency": <span className="text-emerald-400">"42ms"</span></p>
          <p className="text-zinc-400">{"}"}</p>
        </div>
      </div>

      {/* Side Explainer */}
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rust/10 border border-rust/30 text-rust font-mono text-xs uppercase tracking-wider font-semibold">
          <Cpu className="h-3.5 w-3.5" /> AI & Automation Architecture
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-zinc-100">
          Autonomous Multi-Agent Orchestration
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 font-sans">
          Production AI pipelines utilizing Google Gemini (gemini-2.5-flash) and asynchronous FastAPI services. Combines headless browser automation via Playwright, custom Chromium extensions, and strict Pydantic schemas to deliver verifiable, deterministic outputs.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">LLM Orchestration</div>
            <div className="text-rust mt-1 font-semibold">Gemini 2.5 Flash</div>
          </div>
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">Automation Tools</div>
            <div className="text-zinc-200 mt-1 font-semibold">Playwright & Python</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IoTBoardMockup() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 justify-between select-none">
      {/* IoT Microcontroller Frame with Material Card Components */}
      <div className="w-full max-w-[440px] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl p-5 space-y-4 font-sans relative overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-xs text-white font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ESP32 FIRMWARE CORE</span>
          </div>
          <span className="bg-white/10 text-zinc-300 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-medium">
            C++20 · FreeRTOS
          </span>
        </div>

        {/* OLED Screen Simulation */}
        <div className="bg-black border-2 border-zinc-800 rounded-xl p-3 font-mono text-[9px] text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] space-y-1">
          <div className="flex justify-between text-[7px] text-cyan-600 border-b border-cyan-900 pb-0.5">
            <span>I2C OLED 128x64</span>
            <span>0x3C ADDR</span>
          </div>
          <div className="flex justify-between font-bold pt-1">
            <span>DESKBOT v2.1</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
          <div className="text-cyan-300 text-[8px]">IP: 192.168.4.1 (ONBOARD WS)</div>
          <div className="flex justify-between text-[8px] pt-1 border-t border-cyan-900/50">
            <span>CORE TEMP: 31.8°C</span>
            <span>HEAP: 248 KB</span>
          </div>
        </div>

        {/* M3 Segmented / Tonal Chips */}
        <div className="grid grid-cols-4 gap-2 text-center text-[8px] font-mono">
          <div className="bg-zinc-900 border border-white/10 p-2 rounded-xl">
            <span className="text-zinc-500 text-[7px]">GPIO 21</span>
            <div className="text-acid font-bold mt-0.5">SDA</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-2 rounded-xl">
            <span className="text-zinc-500 text-[7px]">GPIO 22</span>
            <div className="text-acid font-bold mt-0.5">SCL</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-2 rounded-xl">
            <span className="text-zinc-500 text-[7px]">UART0</span>
            <div className="text-emerald-400 font-bold mt-0.5">115200</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-2 rounded-xl">
            <span className="text-zinc-500 text-[7px]">HTTP SRV</span>
            <div className="text-rust font-bold mt-0.5">PORT 80</div>
          </div>
        </div>
      </div>

      {/* Side Explainer */}
      <div className="flex-1 space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-acid/10 border border-acid/30 text-acid font-mono text-xs uppercase tracking-wider font-semibold">
          <Cloud className="h-3.5 w-3.5" /> Embedded Systems Architecture
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-zinc-100">
          Hardware Firmware & Web Bridges
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 font-sans">
          Microcontroller firmware developed in C/C++ on ESP32, ESP8266, and Arduino platforms. Features embedded HTTP servers running directly on the chip for local browser controls, paired with I2C OLED display drivers, hardware sensors, and low-latency WebSockets.
        </p>
        <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">Hardware Platforms</div>
            <div className="text-zinc-200 mt-1 font-semibold">ESP32 & Arduino</div>
          </div>
          <div className="border border-white/10 bg-zinc-900/60 p-3 rounded-2xl shadow-sm">
            <div className="text-zinc-500 text-[10px] uppercase font-bold">Protocols</div>
            <div className="text-acid mt-1 font-semibold">I2C, UART & WebSockets</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllSystemsMockup({ onSelectCategory }: { onSelectCategory: (id: string) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
        <div>
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-semibold">M3 Architectural Catalog</span>
          <h3 className="font-display text-2xl md:text-3xl text-zinc-100 mt-1">19 Production Systems across 4 Engineering Pillars</h3>
        </div>
        <span className="font-mono text-xs text-zinc-400">Select any Material 3 chip below to switch sandbox:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onSelectCategory("mobile")}
          className="group text-left p-5 rounded-2xl border border-white/10 bg-zinc-900/40 hover:border-acid/40 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center text-zinc-400 group-hover:text-acid">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-acid/15">
              <Smartphone className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs font-bold bg-white/5 px-2 py-0.5 rounded-full">8 Repos</span>
          </div>
          <div className="mt-3 font-sans font-bold text-lg text-white">Mobile Apps</div>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">Flutter, Dart & Kotlin native offline-first systems.</p>
          <div className="mt-3 text-[10px] font-mono text-acid flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
            Launch M3 View <ArrowUpRight className="h-3 w-3" />
          </div>
        </button>

        <button
          onClick={() => onSelectCategory("web")}
          className="group text-left p-5 rounded-2xl border border-white/10 bg-zinc-900/40 hover:border-rust/40 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center text-zinc-400 group-hover:text-rust">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-rust/15">
              <Globe className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs font-bold bg-white/5 px-2 py-0.5 rounded-full">4 Repos</span>
          </div>
          <div className="mt-3 font-sans font-bold text-lg text-white">Web & Full-Stack</div>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">React, Next.js, Node.js & real-time Socket.io.</p>
          <div className="mt-3 text-[10px] font-mono text-rust flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
            Launch MUI View <ArrowUpRight className="h-3 w-3" />
          </div>
        </button>

        <button
          onClick={() => onSelectCategory("ai")}
          className="group text-left p-5 rounded-2xl border border-white/10 bg-zinc-900/40 hover:border-acid/40 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center text-zinc-400 group-hover:text-acid">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-acid/15">
              <Cpu className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs font-bold bg-white/5 px-2 py-0.5 rounded-full">5 Repos</span>
          </div>
          <div className="mt-3 font-sans font-bold text-lg text-white">AI & Automation</div>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">Google Gemini 2.5 Flash, FastAPI & Playwright.</p>
          <div className="mt-3 text-[10px] font-mono text-acid flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
            Launch AI View <ArrowUpRight className="h-3 w-3" />
          </div>
        </button>

        <button
          onClick={() => onSelectCategory("iot")}
          className="group text-left p-5 rounded-2xl border border-white/10 bg-zinc-900/40 hover:border-rust/40 hover:bg-zinc-900/80 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
        >
          <div className="flex justify-between items-center text-zinc-400 group-hover:text-rust">
            <div className="p-2 rounded-xl bg-white/5 group-hover:bg-rust/15">
              <Cloud className="h-5 w-5" />
            </div>
            <span className="font-mono text-xs font-bold bg-white/5 px-2 py-0.5 rounded-full">2 Repos</span>
          </div>
          <div className="mt-3 font-sans font-bold text-lg text-white">Embedded & IoT</div>
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2">ESP32, ESP8266, C++ firmware & I2C sensors.</p>
          <div className="mt-3 text-[10px] font-mono text-rust flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
            Launch IoT View <ArrowUpRight className="h-3 w-3" />
          </div>
        </button>
      </div>
    </div>
  );
}

function CategoryAnimatedUI({ category, onSelectCategory }: { category: string; onSelectCategory: (id: string) => void }) {
  return (
    <div className="border border-white/10 bg-zinc-950/80 rounded-3xl p-6 md:p-8 relative overflow-hidden my-8 shadow-2xl backdrop-blur-md">
      <div className="glow-bg" />
      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -15, scale: 0.98, filter: "blur(3px)" }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          {category === "mobile" && <MobileDeviceMockup />}
          {category === "web" && <WebBrowserMockup />}
          {category === "ai" && <AIPipelineMockup />}
          {category === "iot" && <IoTBoardMockup />}
          {category === "all" && <AllSystemsMockup onSelectCategory={onSelectCategory} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ProjectPreview({ project }: { project: ProjectItem }) {
  const renderDetails = () => {
    switch (project.category) {
      case "mobile":
        return (
          <div className="space-y-1.5 text-[8px] text-zinc-400 font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Client Architecture</span>
              <span className="text-acid">BLoC / Provider</span>
            </div>
            <div className="flex justify-between">
              <span>Persistence & Cache:</span>
              <span className="text-white">Encrypted Vault</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Target:</span>
              <span className="text-zinc-300">Android & iOS</span>
            </div>
          </div>
        );
      case "web":
        return (
          <div className="space-y-1.5 text-[8px] text-zinc-400 font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Stack Runtime</span>
              <span className="text-acid">React / Node.js</span>
            </div>
            <div className="flex justify-between">
              <span>API Protocol:</span>
              <span className="text-white">REST & WebSockets</span>
            </div>
            <div className="flex justify-between">
              <span>Storage Layer:</span>
              <span className="text-zinc-300">PostgreSQL / MongoDB</span>
            </div>
          </div>
        );
      case "ai":
        return (
          <div className="space-y-1.5 text-[8px] text-zinc-400 font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>LLM Orchestration</span>
              <span className="text-acid">Gemini 2.5 Flash</span>
            </div>
            <div className="flex justify-between">
              <span>Async Execution:</span>
              <span className="text-white">FastAPI Dispatch</span>
            </div>
            <div className="flex justify-between">
              <span>Schema Output:</span>
              <span className="text-zinc-300">Strict Pydantic JSON</span>
            </div>
          </div>
        );
      case "iot":
        return (
          <div className="space-y-1.5 text-[8px] text-zinc-400 font-mono">
            <div className="flex justify-between border-b border-white/5 pb-1">
              <span>Microcontroller</span>
              <span className="text-acid">ESP32 / ESP8266</span>
            </div>
            <div className="flex justify-between">
              <span>Firmware Core:</span>
              <span className="text-white">Modern C / C++</span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry Protocol:</span>
              <span className="text-zinc-300">I2C OLED & WebSockets</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full bg-zinc-950 p-4 font-mono text-[9px] flex flex-col justify-between border border-white/10 rounded-lg">
      <div className="flex justify-between items-center border-b border-white/10 pb-2">
        <span className="text-acid font-bold truncate pr-2">{project.name}</span>
        <span className="bg-acid/15 text-acid px-1.5 py-0.5 rounded text-[7px] font-bold shrink-0">
          {project.badge}
        </span>
      </div>

      <div className="my-auto py-1">
        {renderDetails()}
      </div>

      <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[7px] text-zinc-500">
        <span>{project.categoryLabel}</span>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
          VERIFIED REPO
        </span>
      </div>
    </div>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const rotateX = useTransform(y, (latestY) => {
    if (hoveredProject === null) return 0;
    return (latestY / 10) % 10 - 5;
  });
  const rotateY = useTransform(x, (latestX) => {
    if (hoveredProject === null) return 0;
    return (latestX / 10) % 10 - 5;
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left - 120);
      mouseY.set(e.clientY - rect.top - 80);
    }
  };

  const categories = [
    { id: "all", label: "All Curated Systems", count: projects.length },
    { id: "mobile", label: "Mobile Applications", count: projects.filter(p => p.category === "mobile").length },
    { id: "web", label: "Web & Full-Stack", count: projects.filter(p => p.category === "web").length },
    { id: "ai", label: "AI & Automation", count: projects.filter(p => p.category === "ai").length },
    { id: "iot", label: "Embedded & IoT", count: projects.filter(p => p.category === "iot").length },
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <motion.section 
      id="work" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 04 — Curated Production Repositories
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">
              <ScrambleText text="All repositories." />
            </h2>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            Showing <span className="text-acid font-bold">{filteredProjects.length}</span> of {projects.length} verified production systems
          </div>
        </div>

        {/* Material Design 3 (M3) Filter Chips */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5 pb-2">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            const Icon = c.id === "mobile" ? Smartphone : c.id === "web" ? Globe : c.id === "ai" ? Cpu : c.id === "iot" ? Cloud : Layers;
            return (
              <motion.button
                key={c.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(c.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-sans font-medium transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-zinc-100 text-zinc-950 font-semibold shadow-md shadow-black/25"
                    : "border border-zinc-700/60 bg-zinc-900/50 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500"
                }`}
              >
                {/* M3 Active checkmark or category icon */}
                {isActive ? (
                  <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                ) : (
                  <Icon className="h-3.5 w-3.5 text-zinc-400" />
                )}
                <span>{c.label}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isActive ? "bg-zinc-950/15 text-zinc-900" : "bg-zinc-800 text-zinc-400"
                }`}>
                  {c.count}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Animated UI for Active Category */}
        <CategoryAnimatedUI
          category={activeCategory}
          onSelectCategory={(id) => setActiveCategory(id)}
        />

        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="mt-6 relative"
        >
          {/* Floating Hover Preview Card */}
          <motion.div
            style={{
              x,
              y,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: "1000px",
              pointerEvents: "none",
              opacity: hoveredProject !== null ? 1 : 0,
              scale: hoveredProject !== null ? 1 : 0.85,
            }}
            className="absolute top-0 left-0 z-30 w-[260px] h-[175px] hidden md:block rounded-xl overflow-hidden border border-white/15 bg-zinc-950/90 backdrop-blur-md shadow-2xl p-1"
            transition={{ opacity: { duration: 0.15 }, scale: { duration: 0.15 } }}
          >
            {hoveredProject !== null && <ProjectPreview project={hoveredProject} />}
          </motion.div>

          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.a
                key={p.n + p.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                href={p.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setHoveredProject(p)}
                onMouseLeave={() => setHoveredProject(null)}
                className="group block relative border-b border-white/5 py-7 transition-all duration-300 hover:bg-white/[0.015] px-4 cursor-pointer rounded-lg"
                data-cursor-text="SOURCE"
              >
                <div className="mx-auto grid grid-cols-12 items-baseline gap-4">
                  <span className="col-span-2 font-mono text-xs text-zinc-600 group-hover:text-white transition-colors duration-300 md:col-span-1">
                    {p.n}
                  </span>
                  
                  <div className="col-span-10 md:col-span-4">
                    <h3 className="font-display text-2xl group-hover:translate-x-3 group-hover:text-acid md:text-4xl transition-all duration-300 ease-out text-zinc-100 font-medium flex items-center gap-2 transform-gpu">
                      {p.name}
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-acid shrink-0" />
                    </h3>
                    <div className="md:hidden mt-1 font-mono text-[9px] uppercase tracking-wider text-rust">
                      {p.categoryLabel}
                    </div>
                  </div>

                  <span className="col-span-12 font-mono text-[10px] uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors duration-300 md:col-span-3">
                    {p.tag}
                  </span>

                  <p className="col-span-12 mt-1 text-xs leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 md:col-span-3 md:mt-0">
                    {p.desc}
                  </p>

                  <span className="col-span-12 text-left font-mono text-[10px] uppercase tracking-widest text-zinc-600 group-hover:text-white transition-colors duration-300 md:col-span-1 md:text-right">
                    {p.year}
                  </span>
                  
                  {/* Mobile Preview Widget */}
                  {isMobile && (
                    <div className="col-span-12 mt-3 h-[125px] w-full pointer-events-none">
                      <ProjectPreview project={p} />
                    </div>
                  )}
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}

function GithubSection() {
  const isMobile = useIsMobile();
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 05 — Signal & Version Control
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
          <div className="w-full overflow-x-auto pb-2 scrollbar-thin relative z-10">
            <div className="min-w-[600px] md:min-w-0">
              <img
                src="https://ghchart.rshah.org/f97316/Fahimulislamfahim"
                alt="Fahim's GitHub contribution calendar"
                className="w-full relative z-10 [filter:invert(0.9)_hue-rotate(180deg)]"
                loading="lazy"
              />
            </div>
          </div>
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
  const isMobile = useIsMobile();
  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
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
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer id="contact" className="bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-rust/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-24 md:px-10 md:pt-36 relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          § 07 — Contact & Inquiries
        </div>
        <h2 className="mt-4 font-display text-[14vw] leading-[0.85] md:text-[9rem] select-none cursor-default text-zinc-100">
          Let's <span className="italic text-rust hover:text-acid transition-colors duration-500">build</span> something.
        </h2>

        {/* Direct Email Hub */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-mono text-xs uppercase tracking-widest text-black hover:bg-acid transition-all duration-300 font-semibold"
          >
            <Mail className="h-4 w-4" /> Send Email Direct
          </a>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer"
          >
            {copied ? <Check className="h-4 w-4 text-acid" /> : <Copy className="h-4 w-4 text-zinc-400" />}
            <span>{copied ? "Copied Email!" : "Copy: " + EMAIL}</span>
          </button>
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-6 border-t border-white/10 pt-8">
          <div className="space-y-4">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-600">
              Channels
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-wrap items-center gap-2 font-display text-xl sm:text-2xl md:text-3xl italic text-zinc-300 hover:text-rust transition-colors duration-300"
              >
                github.com/Fahimulislamfahim
                <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 transition group-hover:rotate-45 shrink-0" />
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
            <div>© 2026 Fahimul Islam Fahim · Dhaka, Bangladesh</div>
            <div className="mt-1 text-zinc-500">Software Engineer • Mobile App Specialist • IoT Systems Developer</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
