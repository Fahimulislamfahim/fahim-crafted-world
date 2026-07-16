import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
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
  Menu,
  X,
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
      } else if (isClickable) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
          ? "w-12 h-12 border border-acid/80 bg-acid/5 scale-100 shadow-[0_0_15px_rgba(217,249,157,0.2)]"
          : cursorType === "project"
            ? "w-24 h-24 border border-rust bg-rust/10 scale-100 shadow-[0_0_20px_rgba(217,119,6,0.15)]"
            : cursorType === "scan"
              ? "w-16 h-16 border border-acid bg-transparent rotate-45 shadow-[0_0_15px_rgba(217,249,157,0.3)]"
              : cursorType === "click"
                ? "w-8 h-8 border border-white bg-white/10 scale-90"
                : "w-6 h-6 border border-white/20 bg-transparent"
      }`}
    >
      {cursorType === "project" && (
        <span className="font-mono text-[9px] uppercase tracking-widest text-rust font-bold">
          {hoverText}
        </span>
      )}
      {cursorType === "default" && (
        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
      )}
      {cursorType === "hover" && (
        <div className="w-2.5 h-2.5 rounded-full bg-acid shadow-[0_0_8px_rgba(217,249,157,0.8)]" />
      )}
      {cursorType === "scan" && (
        <div className="w-2.5 h-2.5 rounded-sm bg-acid animate-pulse" />
      )}
    </motion.div>
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

    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    let mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 0.8,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        if (mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 220) {
            p.x += dx * 0.002;
            p.y += dy * 0.002;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);

            if (mouse.x > 0 && mouse.y > 0) {
              const mdx = mouse.x - (p1.x + p2.x) / 2;
              const mdy = mouse.y - (p1.y + p2.y) / 2;
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
    title: "Mobile Development",
    items: ["Flutter", "Dart"],
  },
  {
    icon: Code2,
    title: "Languages & Tools",
    items: ["Python", "Java", "JavaScript", "Dart", "PHP", "VS Code", "Antigravity IDE", "Git"],
  },
  {
    icon: Cpu,
    title: "AI & Automation",
    items: ["Workflow Automation", "Multi-agent SaaS", "Custom Agents"],
  },
  {
    icon: Cloud,
    title: "Cloud & Deploy",
    items: ["Vercel", "GitHub Pack", "Server Deployment"],
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
    const isMobileDevice = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    let lenis: Lenis | null = null;
    if (!isMobileDevice) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
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
          const targetElement = document.querySelector(href);
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

const globalSynth = {
  ctx: null as AudioContext | null,
  isMuted: true,
  init() {
    if (this.ctx) return;
    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  },
  setMute(mute: boolean) {
    this.isMuted = mute;
    if (!mute) {
      this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
    }
  },
  playTick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.006, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn(e);
    }
  },
  playTone(freq: number) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.17);
    } catch (e) {
      console.warn(e);
    }
  }
};

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  const symbols = "01$!@#%?*&_+=/\\";

  const triggerScramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iterations = 0;
    
    globalSynth.playTick();

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
  const [isMuted, setIsMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    globalSynth.setMute(nextMuted);
    if (!nextMuted) {
      setTimeout(() => {
        globalSynth.playTone(440);
      }, 50);
    }
  };

  // Fade in the navbar logo as the hero text flies up and fades out
  // On mobile, keep it visible so there's always a brand identifier
  const navLogoOpacity = useTransform(scrollY, [0, 120, 200], [0, 0, 1]);
  
  // Fade out availability on scroll down for a more minimal navbar
  const navExtraOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
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
            ? "top-4 max-w-[92%] md:max-w-[780px] border border-white/10 bg-zinc-950/75 backdrop-blur-md py-2.5 rounded-full shadow-xl shadow-black/40"
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
              onMouseEnter={() => globalSynth.playTick()}
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

        {/* Right: Availability & Audio Synth Toggle / Mobile Menu Trigger */}
        <div className="flex items-center justify-end gap-3 font-mono text-[9px] uppercase tracking-widest text-zinc-400">
          <motion.div
            style={{ opacity: isMobile ? 1 : navExtraOpacity }}
            className="hidden sm:flex items-center gap-2"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            <span>Available for work</span>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <MagnetElement distance={20}>
              <button
                onClick={toggleMute}
                onMouseEnter={() => globalSynth.playTick()}
                className={`flex items-center gap-2 px-2.5 py-1 rounded-full border text-[8px] font-bold tracking-widest transition-all duration-300 cursor-pointer ${
                  !isMuted
                    ? "border-acid/30 bg-acid/10 text-acid shadow-[0_0_10px_rgba(217,249,157,0.15)]"
                    : "border-white/5 bg-white/[0.02] text-zinc-500 hover:text-white"
                }`}
                title="Toggle Audio Synthesizer"
              >
                {!isMuted ? (
                  <>
                    <span className="flex h-2 items-center">
                      <span className="audio-wave-bar" />
                      <span className="audio-wave-bar" />
                      <span className="audio-wave-bar" />
                      <span className="audio-wave-bar" />
                    </span>
                    SYNTH ON
                  </>
                ) : (
                  "SYNTH OFF"
                )}
              </button>
            </MagnetElement>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                globalSynth.playTone(isMobileMenuOpen ? 220.00 : 330.00);
              }}
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
            <nav className="flex flex-col gap-6 font-mono text-lg uppercase tracking-widest text-center mt-6">
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
                <span>Available for work</span>
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                © 2026 Fahim · Dhaka, BD
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
  const ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const isMobile = useIsMobile();
  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 150]);

  // Safe scroll transforms to slide, scale, and fade the main title into the header logo position
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

  return (
    <section 
      id="top" 
      ref={heroRef} 
      onMouseMove={handleHeroMouseMove}
      className="relative border-b border-white/5 overflow-hidden"
    >
      {/* Interactive Background soft glow */}
      <motion.div 
        style={{ background: bgGlow }}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rust/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div ref={ref} className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6 px-6 pb-20 pt-12 md:px-10 md:pb-32 md:pt-24 relative z-10">
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
            className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400 md:text-xl"
          >
            Cross-platform app developer & full-stack builder. I ship Flutter apps, AI automation systems and SaaS platforms — from Dhaka.
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
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-black transition-all duration-300 hover:bg-acid cursor-pointer"
              >
                See selected work <ArrowUpRight className="h-4 w-4 transition group-hover:rotate-45" />
              </a>
            </MagnetElement>
            
            <div className="flex flex-wrap gap-2.5 items-center">
              <MagnetElement distance={20}>
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
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
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
  const [speedHistory, setSpeedHistory] = useState<number[]>(new Array(20).fill(0));
  
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
          const nextSpeed = Math.round(prev + diff * 0.08 + (Math.random() - 0.5) * 2);
          return Math.max(0, Math.min(140, nextSpeed));
        });
        setRpm((prev) => {
          const target = isHovered ? 8200 : 3100;
          const diff = target - prev;
          const nextRpm = Math.round(prev + diff * 0.12 + (Math.random() - 0.5) * 120);
          return Math.max(1000, Math.min(10000, nextRpm));
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

  useEffect(() => {
    const historyInterval = setInterval(() => {
      setSpeedHistory((prev) => {
        const currentSpeed = isEngineOn ? speed : 0;
        return [...prev.slice(1), currentSpeed];
      });
    }, 150);
    return () => clearInterval(historyInterval);
  }, [speed, isEngineOn]);

  const maxRpm = 10000;
  const rpmRotation = ((rpm - 1000) / (maxRpm - 1000)) * 240 - 120;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); globalSynth.playTone(196.00); }}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => { setIsHovered(true); globalSynth.playTone(196.00); }}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
      className={`glow-card-rust border border-white/5 bg-zinc-950/60 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden select-none transition-all duration-300 ${
        isEngineOn ? "engine-rumble shadow-[0_0_30px_rgba(217,119,6,0.08)] border-rust/15" : ""
      }`}
    >
      <div className="glow-bg" />
      <div className="absolute inset-0 dashboard-grid-pattern opacity-[0.12] pointer-events-none" />
      
      <div className="flex justify-between items-center relative z-10 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Bike className="h-3.5 w-3.5 text-rust animate-pulse" /> DUSK RIDER DASH
        </span>
        <button
          onClick={() => {
            const nextOn = !isEngineOn;
            setIsEngineOn(nextOn);
            globalSynth.playTone(nextOn ? 392.00 : 220.00);
          }}
          onMouseEnter={() => globalSynth.playTick()}
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
        <div className="h-10 w-full bg-zinc-950/40 rounded border border-white/5 relative overflow-hidden flex items-center px-2">
          <svg className="w-full h-full text-zinc-800" viewBox="0 0 200 40">
            <defs>
              <linearGradient id="speed-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-rust)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-rust)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              id="route-path"
              d="M10 20 C 50 0, 80 40, 110 20 S 160 0, 190 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 4"
              className="opacity-40"
            />
            {isEngineOn && (
              <motion.path
                d="M10 20 C 50 0, 80 40, 110 20 S 160 0, 190 20"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
            {/* Speed History Telemetry Line */}
            <path
              d={`M ${speedHistory.map((s, idx) => `${10 + idx * 9} ${32 - (s / 140) * 22}`).join(" L ")}`}
              fill="none"
              stroke="var(--color-rust)"
              strokeWidth="1.5"
              className="transition-all duration-150 ease-out opacity-80"
              style={{ filter: "drop-shadow(0 0 4px var(--color-rust))" }}
            />
            {/* Ambient fill underneath speed graph */}
            <path
              d={`M 10 35 L ${speedHistory.map((s, idx) => `${10 + idx * 9} ${32 - (s / 140) * 22}`).join(" L ")} L 181 35 Z`}
              fill="url(#speed-gradient)"
              className="opacity-20 transition-all duration-150 ease-out"
            />
            {isEngineOn && (
              <circle r="2.5" fill="var(--color-acid)" className="shadow-[0_0_8px_var(--color-acid)]">
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
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const playHoverSound = () => {
    const tones = [261.63, 293.66, 329.63, 392.00]; // Pentatonic: C4, D4, E4, G4
    const tone = tones[i] || 261.63;
    globalSynth.playTone(tone);
  };

  const glowClasses = [
    "glow-card-acid",
    "glow-card-neutral",
    "glow-card-rust",
    "glow-card-acid",
  ];
  const glowClass = glowClasses[i] || "glow-card-neutral";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={playHoverSound}
      className={`group relative bg-white/[0.01] border border-white/5 p-8 hover:bg-white/[0.02] hover:border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 ${glowClass}`}
    >
      <div className="glow-bg" />
      <div className="relative z-10">
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
    </div>
  );
}

function AIPipelineSimulator() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "System ready. Click below to simulate pipeline."
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState("");
  
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const steps = [
    { name: "Scout", label: "Trend Scout", desc: "Crawls social feeds" },
    { name: "Vision", label: "Vision Scanner", desc: "Analyzes media aesthetics" },
    { name: "Copy", label: "Copywriting Engine", desc: "Generates high-conv copy" },
    { name: "QC", label: "QC Auditor", desc: "Validates and runs filters" }
  ];

  const simulatedLogs = [
    [
      "[Scout] Accessing trend endpoints...",
      "[Scout] Detected trending hash: #FlutterDev",
      "[Scout] Engagement index: 9.8/10",
      "[Scout] Forwarding payload to Vision."
    ],
    [
      "[Vision] Scanning uploaded creative...",
      "[Vision] Checking brightness & layout ratios...",
      "[Vision] Quality check: PASS (High Aesthetic Rating)",
      "[Vision] Forwarding assets to Copywriter."
    ],
    [
      "[Copywriter] Generating Gemini prompts...",
      "[Copywriter] Draft 1: 'Flutter is the future!' (Score: 78%)",
      "[Copywriter] Draft 2: 'Build once. Deploy everywhere.' (Score: 94%)",
      "[Copywriter] Selected Draft 2. Passing to QC."
    ],
    [
      "[QC] Auditor verification started...",
      "[QC] Anti-spam filters: OK",
      "[QC] Duplicate check: OK (Original content)",
      "[QC] PIPELINE DEPLOYED SUCCESSFUL!"
    ]
  ];

  const typeLog = (text: string, delay = 15) => {
    return new Promise<void>((resolve) => {
      let i = 0;
      setCurrentTypingText("");
      const interval = setInterval(() => {
        setCurrentTypingText((prev) => prev + text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setLogs((prev) => [...prev.slice(-3), text]);
          setCurrentTypingText("");
          resolve();
        }
      }, delay);
    });
  };

  const triggerPipeline = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    setCurrentTypingText("");
    
    await typeLog("[Pipeline] Launching Multi-Agent flow...", 15);
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    for (let step = 0; step < 4; step++) {
      setActiveStep(step);
      globalSynth.playTone(329.63 + step * 65);
      for (const logLine of simulatedLogs[step]) {
        globalSynth.playTick();
        await typeLog(logLine, 8);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
    
    setActiveStep(null);
    setIsRunning(false);
    globalSynth.playTone(523.25);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => globalSynth.playTone(220.00)}
      className={`glow-card-acid border border-white/5 bg-zinc-950/60 p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden select-none transition-all duration-300 ${
        isRunning ? "shadow-[0_0_30px_rgba(217,249,157,0.06)] border-acid/15" : ""
      }`}
    >
      <div className="glow-bg" />
      <div className="absolute inset-0 dashboard-grid-pattern opacity-[0.12] pointer-events-none" />

      <div className="flex justify-between items-center relative z-10 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5 text-acid animate-pulse" /> AI Agent Pipeline
        </span>
        <button
          onClick={() => {
            triggerPipeline();
            globalSynth.playTone(523.25);
          }}
          onMouseEnter={() => globalSynth.playTick()}
          disabled={isRunning}
          className={`px-3 py-1 rounded-full border text-[8px] transition-all duration-300 font-bold cursor-pointer ${
            isRunning
              ? "border-acid bg-acid/20 text-acid shadow-[0_0_12px_rgba(217,249,157,0.3)] animate-pulse"
              : "border-white/10 bg-white/5 text-zinc-400 hover:text-white"
          }`}
          data-cursor-text={isRunning ? "RUNNING" : "SIMULATE"}
        >
          {isRunning ? "PROCESSING" : "RUN SIMULATION"}
        </button>
      </div>

      <div className="relative z-10 my-4 h-20 w-full flex items-center justify-between px-1">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isDone = activeStep !== null && idx < activeStep;
          return (
            <div key={step.name} className="flex items-center flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center z-10 w-12 text-center shrink-0">
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? "border-acid bg-acid/20 text-acid shadow-[0_0_12px_rgba(217,249,157,0.4)] scale-110"
                      : isDone
                        ? "border-acid/40 bg-zinc-950 text-acid/60"
                        : "border-white/10 bg-zinc-950 text-zinc-500"
                  }`}
                  title={step.desc}
                >
                  <span className="font-mono text-[9px] font-bold">AG-0{idx + 1}</span>
                </div>
                <span className={`font-mono text-[7px] tracking-wide mt-1.5 ${isActive ? "text-acid font-bold animate-pulse" : "text-zinc-500"}`}>
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[1.5px] mx-1 relative bg-zinc-800/40 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive 
                        ? "bg-acid animate-pulse shadow-[0_0_8px_var(--color-acid)]"
                        : isDone
                          ? "bg-acid/60"
                          : "bg-transparent"
                    }`}
                    style={{
                      width: activeStep !== null && activeStep >= idx ? "100%" : "0%",
                    }}
                  />
                  {isActive && (
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-[laser_1.5s_linear_infinite]" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 bg-zinc-950/80 border border-white/5 rounded-lg p-2.5 font-mono text-[7px] text-zinc-400 h-16 overflow-hidden flex flex-col justify-end">
        <div className="space-y-0.5 text-left">
          {logs.map((log, index) => (
            <p
              key={index}
              className={`leading-normal ${
                log.includes("SUCCESSFUL") || log.includes("PASS")
                  ? "text-emerald-400 font-bold"
                  : log.includes("Scout")
                    ? "text-sky-400"
                    : log.includes("Vision")
                      ? "text-purple-400"
                      : log.includes("Copy")
                        ? "text-amber-400"
                        : "text-zinc-500"
              }`}
            >
              {log}
            </p>
          ))}
          {currentTypingText && (
            <p className="leading-normal text-white font-semibold">
              {currentTypingText}
              <span className="inline-block w-1 h-2 bg-white ml-0.5 animate-pulse" />
            </p>
          )}
        </div>
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
              § 03 — Stack
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100"><ScrambleText text="The toolkit." /></h2>
          </div>
          <div className="hidden font-mono text-xs uppercase tracking-widest text-zinc-500 md:block">
            04 disciplines
          </div>
        </div>

        <motion.div 
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((s, i) => (
            <SkillCard key={s.title} s={s} i={i} />
          ))}
          <AIPipelineSimulator />
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
  const isMobile = useIsMobile();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Calculate dynamic 3D tilt for the preview card based on its movement velocity
  const rotateX = useTransform(y, (latestY) => {
    if (hoveredIndex === null) return 0;
    return (latestY / 10) % 10 - 5;
  });
  const rotateY = useTransform(x, (latestX) => {
    if (hoveredIndex === null) return 0;
    return (latestX / 10) % 10 - 5;
  });

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
      viewport={{ once: true, margin: isMobile ? "-30px" : "-100px" }}
      variants={sectionVariants}
      className="border-b border-white/5"
    >
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <div className="flex items-end justify-between border-b border-white/10 pb-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              § 04 — Work
            </div>
            <h2 className="mt-2 font-display text-4xl md:text-6xl text-zinc-100">
              <ScrambleText text="Selected projects." />
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
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
              perspective: "1000px",
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
                
                {/* Mobile Preview Widget */}
                {isMobile && (
                  <div className="col-span-12 mt-4 h-[120px] w-full pointer-events-none">
                    <ProjectPreview index={i} />
                  </div>
                )}
              </div>
            </a>
          ))}
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
            <div>© 2026 Fahim · Dhaka, BD</div>
            <div className="mt-1 text-zinc-700">Designed & built from scratch.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
