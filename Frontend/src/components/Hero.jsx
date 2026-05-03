import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetterHoverText from "./LetterHoverText";
import "./Hero.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const titleContainerRef = useRef(null);

  useGSAP(
    () => {
      if (window.innerWidth < 768) return;
      const stl = leftTextRef.current;
      const str = rightTextRef.current;

      const initPositions = () => {
        const lW = stl.getBoundingClientRect().width;
        const rW = str.getBoundingClientRect().width;
        const vw = window.innerWidth;
        const pad = vw * 0.025;

        const leftInit = pad;
        const leftTarget = vw / 2 - lW;
        const rightInit = vw - pad - rW;
        const rightTarget = vw / 2;

        gsap.set(stl, { left: leftInit, right: "auto", visibility: "visible" });
        gsap.set(str, {
          right: "auto",
          left: rightInit,
          visibility: "visible",
        });

        // Calculate exact centered left for the image (avoids xPercent drift)
        const imgRect = imageRef.current.getBoundingClientRect();
        const imgLeft = vw / 2 - imgRect.width / 2;
        gsap.set(imageRef.current, { left: imgLeft, xPercent: 0 });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          pin: viewportRef.current,
          pinSpacing: true,
        });

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: true,
          },
        });

        // Side texts converge toward center
        heroTl.to(stl, { left: leftTarget, ease: "none", duration: 0.6 }, 0);
        heroTl.to(str, { left: rightTarget, ease: "none", duration: 0.6 }, 0);

        // Phase 1 (0 → 0.3): image dips down
        heroTl.to(
          imageRef.current,
          { top: "80%", ease: "none", duration: 0.3 },
          0,
        );

        // Phase 2 (0.3 → 1.0): image expands to completely fill the screen
        heroTl.to(
          imageRef.current,
          {
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            ease: "none",
            duration: 0.7,
          },
          0.3,
        );
      };

      if (document.fonts.status === "loaded") {
        initPositions();
      } else {
        document.fonts.ready.then(initPositions);
      }
    },
    { scope: sectionRef },
  );

  return (
    <section id="hero-section" ref={sectionRef} className="hero-section">
      <div id="hero-viewport" ref={viewportRef} className="hero-viewport">
        <div ref={titleContainerRef} className="hero-title-container">
          {/* DESKTOP (animation) */}
          <h1 className="font-display hero-title desktop-title">
            <LetterHoverText text="LOCALBOOST AI" />
          </h1>

          {/* MOBILE (stacked) */}
          <h1 className="font-display hero-title mobile-title">
            <span>LOCALBOOST</span>
            <span>AI</span>
          </h1>
        </div>

        {/* Center Image — starts between the two side texts */}
        <div ref={imageRef} className="hero-image-container">
          <video
            src="https://jasminegunarto.com/wp-content/uploads/2026/02/jgunarto_demoreel_compressed_1.mp4"
            autoPlay
            loop
            muted
          ></video>
        </div>
        <div className="hero-mobile-text font-display">
          <span>PUSHING BOUNDARIES</span>
          <span>THROUGH IDEAS</span>
        </div>
        {/* Side Texts */}
        <span ref={leftTextRef} className="hero-side-text font-display">
          PUSHING BOUNDARIES
        </span>
        <span ref={rightTextRef} className="hero-side-text font-display">
          &nbsp;THROUGH IDEAS
        </span>
      </div>
    </section>
  );
}
