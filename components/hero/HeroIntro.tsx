import { useEffect, useRef } from "react";

interface HeroIntroProps {
  heroRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function HeroIntro({ heroRef, videoRef }: HeroIntroProps) {
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasRunRef.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.remove("intro");
      document.documentElement.dataset.intro = "done";
      return;
    }

    if (document.documentElement.dataset.intro === "done") {
      return;
    }

    if (!document.documentElement.classList.contains("intro")) {
      document.documentElement.classList.add("intro");
    }

    hasRunRef.current = true;

    const hero = heroRef.current;
    if (!hero) {
      document.documentElement.classList.remove("intro");
      document.documentElement.dataset.intro = "done";
      return;
    }

    // Wait condition: document.fonts.ready & video loadeddata, capped at 900ms
    const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
    const video = videoRef.current;
    const videoPromise = new Promise<void>((resolve) => {
      if (!video || video.readyState >= 2) {
        resolve();
      } else {
        const onLoaded = () => {
          video.removeEventListener("loadeddata", onLoaded);
          resolve();
        };
        video.addEventListener("loadeddata", onLoaded);
      }
    });

    const timeoutPromise = new Promise<void>((resolve) => {
      setTimeout(resolve, 900);
    });

    Promise.race([Promise.all([fontPromise, videoPromise]), timeoutPromise]).then(() => {
      if (!heroRef.current) return;
      document.documentElement.dataset.intro = "running";

      const heroEl = heroRef.current;
      const wordmarkEl = heroEl.querySelector<HTMLElement>(".wordmark-link");
      const hairlineEl = heroEl.querySelector<HTMLElement>(".hairline");
      const navLinks = heroEl.querySelectorAll<HTMLElement>(".hero-nav a");
      const line1Li = heroEl.querySelector<HTMLElement>(".l-1 .li");
      const line2Li = heroEl.querySelector<HTMLElement>(".l-2 .li");
      const subheadEl = heroEl.querySelector<HTMLElement>(".subhead");
      const buttonEl = heroEl.querySelector<HTMLElement>(".btn-hero");
      const discoverEl = heroEl.querySelector<HTMLElement>(".discover-link");
      const arrowEl = heroEl.querySelector<HTMLElement>(".discover-arrow");

      // Measure wordmark height to compute k
      const wordmarkHeight = wordmarkEl ? wordmarkEl.offsetHeight : 23.5;
      const rawK = wordmarkHeight / 23.5;
      const k = Math.min(1, Math.max(0.65, rawK));

      const quint = "cubic-bezier(0.22, 1, 0.36, 1)";
      const expo = "cubic-bezier(0.16, 1, 0.3, 1)";
      const hairlineEase = "cubic-bezier(0.7, 0, 0.2, 1)";

      const animations: Animation[] = [];

      // 1. Wordmark: opacity 0, translateY(-6k px) -> opacity 1, translateY(0)
      if (wordmarkEl) {
        const anim = wordmarkEl.animate(
          [
            { opacity: 0, transform: `translateY(${-6 * k}px)` },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            delay: 60,
            duration: 900,
            easing: quint,
            fill: "both",
          }
        );
        animations.push(anim);
      }

      // 2. Hairline: scaleX 0 -> 1
      if (hairlineEl) {
        const anim = hairlineEl.animate(
          [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
          {
            delay: 180,
            duration: 1000,
            easing: hairlineEase,
            fill: "both",
          }
        );
        animations.push(anim);
      }

      // 3. Nav links: 2nd and 3rd links at 420ms, 1st and 4th links at 490ms
      if (navLinks.length >= 4) {
        // 2nd (index 1) and 3rd (index 2)
        [navLinks[1], navLinks[2]].forEach((link) => {
          if (link) {
            animations.push(
              link.animate(
                [
                  { opacity: 0, transform: `translateY(${-4 * k}px)` },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  delay: 420,
                  duration: 700,
                  easing: quint,
                  fill: "both",
                }
              )
            );
          }
        });
        // 1st (index 0) and 4th (index 3)
        [navLinks[0], navLinks[3]].forEach((link) => {
          if (link) {
            animations.push(
              link.animate(
                [
                  { opacity: 0, transform: `translateY(${-4 * k}px)` },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  delay: 490,
                  duration: 700,
                  easing: quint,
                  fill: "both",
                }
              )
            );
          }
        });
      }

      // 4. Headline lines
      if (line1Li) {
        animations.push(
          line1Li.animate(
            [{ transform: "translateY(104%)" }, { transform: "translateY(0)" }],
            {
              delay: 200,
              duration: 1100,
              easing: expo,
              fill: "both",
            }
          )
        );
      }
      if (line2Li) {
        animations.push(
          line2Li.animate(
            [{ transform: "translateY(104%)" }, { transform: "translateY(0)" }],
            {
              delay: 290,
              duration: 1100,
              easing: expo,
              fill: "both",
            }
          )
        );
      }

      // 5. Subhead: rises 10k px
      if (subheadEl) {
        animations.push(
          subheadEl.animate(
            [
              { opacity: 0, transform: `translateY(${10 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 700,
              duration: 850,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // 6. Button: rises 12k px from scale 0.975
      if (buttonEl) {
        animations.push(
          buttonEl.animate(
            [
              { opacity: 0, transform: `translateY(${12 * k}px) scale(0.975)` },
              { opacity: 1, transform: "translateY(0) scale(1)" },
            ],
            {
              delay: 860,
              duration: 900,
              easing: expo,
              fill: "both",
            }
          )
        );
      }

      // 7. Discover link: rises 6k px
      if (discoverEl) {
        animations.push(
          discoverEl.animate(
            [
              { opacity: 0, transform: `translateY(${6 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 1040,
              duration: 700,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // 8. Arrow: starts 5k px above and settles
      if (arrowEl) {
        animations.push(
          arrowEl.animate(
            [
              { transform: `translateY(${-5 * k}px)` },
              { transform: "translateY(0)" },
            ],
            {
              delay: 1120,
              duration: 820,
              easing: expo,
              fill: "both",
            }
          )
        );
      }

      // 9. Right column visual panel (gracefully skipped if omitted)
      const rightColEl = heroEl.querySelector<HTMLElement>(".hero-right-col");
      if (rightColEl) {
        animations.push(
          rightColEl.animate(
            [
              { opacity: 0, transform: `translateY(${14 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 520,
              duration: 950,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // 10. Compliance strip
      const complianceStripEl = heroEl.querySelector<HTMLElement>(".hero-compliance-strip");
      if (complianceStripEl) {
        animations.push(
          complianceStripEl.animate(
            [
              { opacity: 0, transform: `translateY(${6 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 900,
              duration: 800,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // 11. Ground line enterprise metrics ledger
      const groundLineEl = heroEl.querySelector<HTMLElement>(".hero-ground-line");
      if (groundLineEl) {
        animations.push(
          groundLineEl.animate(
            [
              { opacity: 0, transform: `translateY(${8 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 980,
              duration: 850,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // 12. Enterprise trust band
      const trustBandEl = heroEl.querySelector<HTMLElement>(".hero-trust-band");
      if (trustBandEl) {
        animations.push(
          trustBandEl.animate(
            [
              { opacity: 0, transform: `translateY(${10 * k}px)` },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              delay: 1060,
              duration: 850,
              easing: quint,
              fill: "both",
            }
          )
        );
      }

      // When all animations complete: clean up cleanly
      const cleanup = () => {
        document.documentElement.classList.remove("intro");
        animations.forEach((a) => {
          try {
            a.cancel();
          } catch {
            // ignore
          }
        });
        document.documentElement.dataset.intro = "done";
      };

      Promise.all(animations.map((a) => a.finished.catch(() => {})))
        .then(cleanup)
        .catch(cleanup);

      // Safety fallback to guarantee intro never hangs indefinitely
      setTimeout(cleanup, 2400);
    }).catch(() => {
      document.documentElement.classList.remove("intro");
      document.documentElement.dataset.intro = "done";
    });
  }, [heroRef, videoRef]);

  return null;
}
