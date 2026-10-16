import React, { useEffect, useRef, useState } from "react";

export interface MindAIBustInteractiveProps {
  className?: string;
  onScrub?: (progress: number) => void;
}

export function MindAIBustInteractive({
  className = "",
  onScrub,
}: MindAIBustInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [scrubPercent, setScrubPercent] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Touch device detection
    const isTouch =
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    setIsTouchDevice(isTouch);

    if (isTouch) {
      // Autoplay and loop smoothly on touch devices
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.addEventListener(
            "canplay",
            () => {
              video.play().catch(() => {});
            },
            { once: true }
          );
        });
      }
      return;
    }

    // High-performance smooth physics tracking engine with adaptive velocity interpolation
    let targetProgress = 0.5;
    let currentProgress = 0.5;
    let animId: number;
    let isSeeking = false;
    let pendingSeekTime: number | null = null;
    let lastAppliedTime = -1;
    let fadeTimer: NodeJS.Timeout | null = null;
    let latestClientX: number | null = null;
    let prevProcessedX: number | null = null;

    const getDuration = () => {
      return isFinite(video.duration) && video.duration > 0
        ? video.duration
        : 4.042;
    };

    const clamp = (val: number, min: number, max: number) => {
      return Math.max(min, Math.min(max, val));
    };

    // Immediate first-frame rendering without waiting for user interaction
    const initFirstFrame = () => {
      const d = getDuration();
      const initialTime = clamp(targetProgress * d, 0.01, d - 0.01);
      video.muted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // First frame decoded onto GPU compositing layer
            requestAnimationFrame(() => {
              video.pause();
              try {
                video.currentTime = initialTime;
                lastAppliedTime = initialTime;
              } catch {}
            });
          })
          .catch(() => {
            try {
              video.currentTime = initialTime;
              lastAppliedTime = initialTime;
            } catch {}
          });
      }
    };

    video.addEventListener("loadeddata", initFirstFrame, { once: true });
    video.addEventListener("canplay", initFirstFrame, { once: true });
    if (video.readyState >= 2) {
      initFirstFrame();
    }

    // Zero-lag seek pipeline with hardware fastSeek and pending target queue
    const performSeek = (time: number) => {
      if (isSeeking) {
        pendingSeekTime = time;
        return;
      }

      isSeeking = true;
      lastAppliedTime = time;
      pendingSeekTime = null;

      if (
        "fastSeek" in video &&
        typeof (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek === "function"
      ) {
        try {
          (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(time);
        } catch {
          video.currentTime = time;
        }
      } else {
        try {
          video.currentTime = time;
        } catch {
          isSeeking = false;
        }
      }
    };

    const handleSeeked = () => {
      isSeeking = false;
      // Immediately flush latest target queued during rapid pointer movement
      if (pendingSeekTime !== null && Math.abs(pendingSeekTime - lastAppliedTime) > 0.012) {
        const nextTime = pendingSeekTime;
        pendingSeekTime = null;
        performSeek(nextTime);
      }
    };

    video.addEventListener("seeked", handleSeeked);

    // Continuous ultra-fluid rAF interpolation loop with adaptive dynamic damping
    const update = () => {
      // 1. Process latest cursor movement synchronously with display refresh rate
      if (latestClientX !== null) {
        const winWidth = window.innerWidth || 1200;
        if (prevProcessedX !== null) {
          const deltaX = latestClientX - prevProcessedX;
          if (Math.abs(deltaX) > 0) {
            // High responsiveness sensitivity (1.08) for immediate response to right-side motion
            const SENSITIVITY = 1.08;
            targetProgress = clamp(
              targetProgress + (deltaX / winWidth) * SENSITIVITY,
              0.03,
              0.97
            );
          }
        } else {
          // On cursor entry, smoothly seed from normalized rightward position
          const normalizedX = latestClientX / winWidth;
          targetProgress = clamp(normalizedX, 0.05, 0.95);
        }
        prevProcessedX = latestClientX;
      }

      // 2. Adaptive velocity-aware interpolation:
      // Micro movements use gentle 0.12 damping for buttery smoothness;
      // Rapid sweeps scale up to 0.42 to track the hand instantaneously with zero lag!
      const diff = targetProgress - currentProgress;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.0004) {
        const adaptiveFactor = Math.min(0.42, 0.12 + absDiff * 0.55);
        currentProgress += diff * adaptiveFactor;
      } else {
        currentProgress = targetProgress;
      }

      // 3. Dispatch seek
      const d = getDuration();
      const desiredTime = clamp(currentProgress * d, 0.001, d - 0.001);

      if (Math.abs(desiredTime - lastAppliedTime) > 0.012) {
        performSeek(desiredTime);
        const pct = Math.round(currentProgress * 100);
        setScrubPercent(pct);
        if (onScrub) onScrub(pct);
      }

      animId = requestAnimationFrame(update);
    };

    // Low-overhead mousemove handler: buffers coordinates without blocking DOM events
    const handleMouseMove = (e: MouseEvent) => {
      latestClientX = e.clientX;
      setIsInteracting(true);
      if (fadeTimer) clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => {
        setIsInteracting(false);
      }, 1200);
    };

    const handleMouseLeave = () => {
      latestClientX = null;
      prevProcessedX = null;
      if (fadeTimer) clearTimeout(fadeTimer);
      setIsInteracting(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    // Start smooth animation loop
    animId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animId);
      if (fadeTimer) clearTimeout(fadeTimer);
      video.removeEventListener("seeked", handleSeeked);
      video.removeEventListener("loadeddata", initFirstFrame);
      video.removeEventListener("canplay", initFirstFrame);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
    };
  }, [onScrub]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-visible select-none ${className}`}
      role="img"
      aria-label="Translucent iridescent 3D figure turning with zero-lag adaptive physics based on right-side mouse movement"
    >
      {/* Soft Glow Aura Backdrop */}
      <div
        className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-tr from-pink-400/10 via-purple-400/15 to-cyan-400/15 blur-[90px] dark:from-cyan-500/10 dark:via-purple-500/15 dark:to-blue-600/10 transition-opacity duration-700"
        aria-hidden="true"
      />

      {/* Masked Figure Container with Seamless Edge Fade */}
      <div
        className="relative w-full max-w-[560px] aspect-[1049/1032] overflow-hidden rounded-3xl"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 96%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 6%, #000 96%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        {/* Video element with immediate first frame rendering and zero-lag adaptive tracking */}
        <video
          ref={videoRef}
          src="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/24f3c998-86fb-4f1d-9906-07c7fa740f8a.mp4"
          muted
          autoPlay
          playsInline
          loop={isTouchDevice}
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter brightness-[1.18] saturate-[1.22] mix-blend-multiply dark:mix-blend-screen transition-all duration-300"
          style={{
            transform: "scaleX(-1)",
            transformOrigin: "50% 100%",
          }}
        />

        {/* Ethereal bottom bleed overlay */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-40"
          aria-hidden="true"
        />
      </div>

      {/* Sleek Minimal Tracking Indicator */}
      {!isTouchDevice && (
        <div
          className={`absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-md border border-black/10 dark:border-white/10 text-[11px] sm:text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm transition-opacity duration-300 ${
            isInteracting ? "opacity-90" : "opacity-40 hover:opacity-80"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              isInteracting
                ? "bg-cyan-500 shadow-[0_0_8px_#06b6d4] scale-125"
                : "bg-slate-400 dark:bg-slate-500"
            }`}
          />
          <span className="tracking-tight">
            {isInteracting
              ? `Rotation · ${scrubPercent}%`
              : "Move mouse right/left to rotate figure"}
          </span>
        </div>
      )}
    </div>
  );
}
