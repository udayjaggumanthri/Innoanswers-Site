import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [bootProgress, setBootProgress] = useState(0);
  const [isBootDone, setIsBootDone] = useState(false);

  useEffect(() => {
    /*
     * 1920x1080, 10.04s, 241 frames, all-intra (every frame is a keyframe).
     * Because every frame is an IDR keyframe, seeking is instantaneous with zero inter-frame decode lag.
     */
    const VIDEO_URL = "/videos/hero-scroll.mp4";
    const FALLBACK_URL =
      "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4";

    const clip = videoRef.current;
    const container = containerRef.current;
    if (!clip || !container) return;

    /*
     * Cue table: [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] in 0..1 hero scroll progress.
     * The gaps between fadeOutEnd and fadeInStart are deliberate dead zones — video only —
     * so two panels are never readable at once.
     */
    const CUES = [
      [0.00, 0.00, 0.18, 0.26],
      [0.36, 0.44, 0.58, 0.66],
      [0.76, 0.84, 1.10, 1.20],
    ];
    const DRIFT = 22; // px of counter-scroll travel per panel

    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }
    function smooth(t: number) {
      return t * t * (3 - 2 * t);
    }
    function ramp(p: number, a: number, b: number) {
      if (b <= a) return p >= b ? 1 : 0;
      return smooth(clamp((p - a) / (b - a), 0, 1));
    }

    let progress = 0;
    let seekTo = 0;
    let seekAt = 0;
    let duration = 0;
    let ready = false;
    let started = false;
    let attached = false;
    let rafId: number;

    function readScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableDist = container.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) {
        progress = 0;
      } else {
        const scrolled = -rect.top;
        progress = clamp(scrolled / scrollableDist, 0, 1);
      }
      if (duration) seekTo = progress * duration;
    }

    function paint() {
      if (meterRef.current) {
        meterRef.current.style.transform = `scaleX(${progress})`;
      }
      for (let i = 0; i < panelsRef.current.length; i++) {
        const el = panelsRef.current[i];
        if (!el) continue;
        const c = CUES[i];
        const enter = ramp(progress, c[0], c[1]);
        const leave = ramp(progress, c[2], c[3]);
        const o = enter * (1 - leave);
        const y = (1 - enter) * DRIFT - leave * DRIFT;
        el.style.opacity = `${o}`;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.pointerEvents = o > 0.6 ? "auto" : "none";
      }
    }

    function frame() {
      if (ready && duration && clip) {
        const gap = seekTo - seekAt;
        if (Math.abs(gap) > 0.0008) {
          seekAt += gap * 0.115; // easing factor from spec
          if (clip.readyState >= 2 && !clip.seeking) {
            try {
              clip.currentTime = seekAt;
            } catch (e) {}
          }
        }
      }
      paint();
      rafId = requestAnimationFrame(frame);
    }

    function setProg(f: number) {
      setBootProgress(Math.round(f * 100));
    }

    function start() {
      if (started) return;
      started = true;
      ready = true;
      setIsBootDone(true);
      readScroll();
      seekAt = seekTo;
    }

    function attach(src: string) {
      if (attached || !clip) return;
      attached = true;

      clip.addEventListener("loadedmetadata", () => {
        duration = clip.duration || 0;
        clip.pause();
        readScroll();
        seekAt = seekTo;
        try {
          clip.currentTime = seekAt;
        } catch (e) {}
      });

      clip.addEventListener("loadeddata", start);
      clip.addEventListener("canplaythrough", start);
      clip.addEventListener("error", () => {
        if (src !== FALLBACK_URL) {
          attached = false;
          attach(FALLBACK_URL);
        } else {
          start();
        }
      });

      clip.src = src;
      clip.load();
      setTimeout(start, 10000); // safety fallback
    }

    /*
     * Preload blob: seeking inside a fully buffered blob in memory is instantaneous,
     * whereas network HTTP Range requests can create stutter.
     */
    function preload() {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const bail = setTimeout(() => {
        if (!attached) {
          if (controller) controller.abort();
          setProg(1);
          attach(VIDEO_URL);
        }
      }, 12000);

      fetch(VIDEO_URL, controller ? { signal: controller.signal } : {})
        .then((res) => {
          if (!res.ok || !res.body) throw new Error("fetch failed");
          const total = parseInt(res.headers.get("content-length") || "0", 10);
          const reader = res.body.getReader();
          const chunks: Uint8Array[] = [];
          let got = 0;

          function pump(): Promise<Blob> {
            return reader.read().then((r) => {
              if (r.done) {
                return new Blob(chunks as any[], { type: "video/mp4" });
              }
              chunks.push(r.value);
              got += r.value.length;
              setProg(total ? got / total : Math.min(got / 11e6, 0.95));
              return pump();
            });
          }
          return pump();
        })
        .then((blob) => {
          clearTimeout(bail);
          setProg(1);
          attach(URL.createObjectURL(blob));
        })
        .catch(() => {
          clearTimeout(bail);
          setProg(1);
          attach(VIDEO_URL);
        });
    }

    /*
     * iOS play/pause nudge: iOS will not paint a frame from a video that has never played,
     * so touch/keydown interaction unlocks frame drawing.
     */
    function unlock() {
      if (!clip) return;
      const p = clip.play();
      if (p && p.then) p.then(() => clip.pause()).catch(() => {});
      else clip.pause();
    }
    ["touchstart", "pointerdown", "wheel", "keydown"].forEach((ev) => {
      window.addEventListener(ev, unlock, { once: true, passive: true });
    });

    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);

    readScroll();
    paint();
    preload();
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 h-[280vh] w-full" id="top">
      {/* Sticky Stage pinned to viewport while scrubbing */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f2f0ec] dark:bg-[#090d16]">
        {/* Preloader overlay (fades out as video buffers) */}
        <div
          className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#f2f0ec] dark:bg-[#090d16] transition-opacity duration-700 pointer-events-none ${
            isBootDone ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-36 h-[1px] bg-slate-400/30 overflow-hidden">
            <div
              className="h-full bg-slate-900 dark:bg-white transition-transform duration-150 origin-left"
              style={{ transform: `scaleX(${bootProgress / 100})` }}
            />
          </div>
          <p className="text-[12px] font-mono tracking-widest text-slate-500 uppercase">
            LOADING {bootProgress}%
          </p>
        </div>

        {/* Video Surface Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 scale-[1.02] object-cover contrast-[1.02] will-change-transform"
          />

          {/* High-Key Studio Veil Wash matching specification */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                linear-gradient(to bottom, rgba(242,240,236,.68) 0%, rgba(242,240,236,.12) 22%, rgba(242,240,236,.12) 78%, rgba(242,240,236,.72) 100%),
                radial-gradient(100% 80% at 50% 48%, rgba(242,240,236,0) 0%, rgba(242,240,236,.36) 100%),
                rgba(242,240,236,.22)
              `,
            }}
          />

          {/* Dark Mode Complementary Ambient Wash */}
          <div className="hidden dark:block absolute inset-0 pointer-events-none bg-slate-950/60 backdrop-brightness-75" />

          {/* SVG Turbulence Micro-Grain */}
          <div
            className="absolute -inset-[50%] opacity-15 mix-blend-multiply pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='.5'/></svg>")`,
            }}
          />
        </div>

        {/* Scroll Hairline Progress Meter */}
        <div
          ref={meterRef}
          className="absolute top-0 left-0 right-0 h-[2px] bg-slate-900 dark:bg-sky-400 z-40 origin-left opacity-60 pointer-events-none"
          style={{ transform: "scaleX(0)" }}
        />

        {/* Fixed Overlay Panels Container */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* PANEL 1: Primary Company Brand & Mission */}
          <div
            ref={(el) => {
              panelsRef.current[0] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-14 pt-24 pb-20 will-change-transform will-change-opacity"
            style={{ opacity: 1 }}
          >
            <div className="max-w-[920px] mx-auto space-y-5 sm:space-y-6">
              {/* Clean Eyebrow Badge (Logo removed as requested) */}
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-black/[0.06] dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/15 text-xs text-slate-700 dark:text-slate-200 tracking-wider font-semibold uppercase shadow-xs">
                <span>Outcome-Focused Enterprise AI</span>
              </div>

              {/* Primary Monumental H1 */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.05]">
                Solving tough problems with AI-driven solutions.
              </h1>

              {/* Clear Sub-headline */}
              <p className="max-w-[720px] mx-auto text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                AI expertise meets industry knowledge. We engineer deterministic machine learning systems that eliminate operational bottlenecks — with zero jargon and full client code &amp; IP sovereignty.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 pl-3 pr-7 py-3 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold text-sm sm:text-base tracking-wide shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl group"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <span>Talk to our team</span>
                </a>

                <a
                  href="/services"
                  className="inline-flex h-12 items-center justify-center px-6 rounded-full border border-slate-400/40 dark:border-white/20 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-900 dark:text-white text-sm sm:text-base font-semibold transition-all duration-200 hover:bg-white/80 dark:hover:bg-slate-800"
                >
                  <span>Explore services &amp; case studies</span>
                </a>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Strict NDA Protection</span>
                </div>
                <span className="opacity-30">&middot;</span>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Private Cloud VPC</span>
                </div>
                <span className="opacity-30">&middot;</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>100% Client Code &amp; IP Ownership</span>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 2: Production Rigor & Zero Hallucination */}
          <div
            ref={(el) => {
              panelsRef.current[1] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-14 pt-24 pb-20 will-change-transform will-change-opacity pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="max-w-[880px] mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.06] dark:bg-white/10 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Production Architecture &amp; Safety
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.05]">
                Deterministic models.<br />Hardened reliability.
              </h2>

              <p className="max-w-[680px] mx-auto text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                Zero hallucination, mathematical guardrails, and private VPC air-gapped deployments. Software built for financial, healthcare, and mission-critical enterprise workflows.
              </p>

              <div className="pt-2 pointer-events-auto">
                <a
                  href="/services"
                  className="inline-flex h-12 items-center justify-center px-7 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold text-sm sm:text-base shadow-lg transition-transform hover:scale-105"
                >
                  <span>Explore Technical Capabilities</span>
                </a>
              </div>
            </div>
          </div>

          {/* PANEL 3: Sovereignty & Total Work-For-Hire */}
          <div
            ref={(el) => {
              panelsRef.current[2] = el;
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-14 pt-24 pb-20 will-change-transform will-change-opacity pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="max-w-[880px] mx-auto space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.06] dark:bg-white/10 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Data Sovereignty &amp; IP Rights
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.05]">
                100% Client Code<br />&amp; IP Handover.
              </h2>

              <p className="max-w-[680px] mx-auto text-base sm:text-lg lg:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                Unlike SaaS black-boxes, you own every model weight, training pipeline, and repository commit from day one. Production-ready in weeks, not years.
              </p>

              <div className="pt-2 pointer-events-auto">
                <a
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center px-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-lg transition-transform hover:scale-105"
                >
                  <span>Schedule Scoping Session</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Instruction Hint at the bottom */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 opacity-60 text-[11px] font-mono tracking-wider text-slate-600 dark:text-slate-400 pointer-events-none uppercase">
          <span>Scroll to explore</span>
          <div className="w-1 h-3 rounded-full bg-slate-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
