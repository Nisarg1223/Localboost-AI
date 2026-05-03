import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LetterHoverText from "./LetterHoverText";
import "./Hero.scss";
import video from '../assets/og_video.mp4'
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const imageRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const titleContainerRef = useRef(null);

  useGSAP(() => {
  if (window.innerWidth < 768) return;

  const stl = leftTextRef.current;
  const str = rightTextRef.current;

  let ctx = gsap.context(() => {

    const initPositions = () => {
      ScrollTrigger.getAll().forEach(t => t.kill()); // 🔥 clear old triggers

      const lW = stl.getBoundingClientRect().width;
      const rW = str.getBoundingClientRect().width;
      const vw = window.innerWidth;
      const pad = vw * 0.025;

      const leftInit = pad;
      const leftTarget = vw / 2 - lW;
      const rightInit = vw - pad - rW;
      const rightTarget = vw / 2;

      gsap.set(stl, { left: leftInit });
      gsap.set(str, { left: rightInit });

      const imgRect = imageRef.current.getBoundingClientRect();
      const imgLeft = vw / 2 - imgRect.width / 2;

      gsap.set(imageRef.current, { left: imgLeft });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: viewportRef.current,
      });

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=180%",
          scrub: true,
        },
      });

      heroTl.to(stl, { left: leftTarget, ease: "none" }, 0);
      heroTl.to(str, { left: rightTarget, ease: "none" }, 0);

      heroTl.to(imageRef.current, { top: "80%" }, 0);
      heroTl.to(imageRef.current, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }, 0.3);
    };

    initPositions();

    // 🔥 KEY FIX: re-run on resize (with debounce)
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initPositions();
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, sectionRef);

  return () => ctx.revert();

}, { scope: sectionRef });

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
            src={video}
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
