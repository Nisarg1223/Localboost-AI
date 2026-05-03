
   import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutServices.scss";

gsap.registerPlugin(ScrollTrigger);

export default function AboutServices() {
  const containerRef = useRef(null);
  const items = [
     "DEVELOPERS",
   "DEV SINGH",
   "SUHAIL SAYYED",
   "NISARG DARJI"
  ];

  useGSAP(() => {
    const lines = containerRef.current.querySelectorAll(".service-line");

    lines.forEach((line) => {
      const highlight = line.querySelector(".highlight-text");
      const underline = line.querySelector(".service-underline");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: line,
  start: "top 70%", // Highlight starts earlier (at 70% of viewport)
  end: "bottom 30%", // Ends later (at 30%)
  toggleActions: "play reverse play reverse",
        },
      });

      tl.to(highlight, { opacity: 1, duration: 0.3 })
        .to(underline, { width: "100%", duration: 0.4, ease: "power2.out" }, 0); 
        // The "0" at the end makes both animations start at the same time
    });
  }, { scope: containerRef });

  return (
    <section className="services-scroll-section" ref={containerRef}>
      {items.map((item, index) => (
        <div key={index} className="service-line font-display">
          <span className="base-text">{item}</span>
          <span className="highlight-text">{item}</span>
          {/* THE HIGHLIGHTED LINE */}
          <div className="service-underline"></div>
        </div>
      ))}
    </section>
  );
}