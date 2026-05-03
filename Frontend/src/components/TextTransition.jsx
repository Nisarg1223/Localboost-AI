import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TextTransition.scss';

gsap.registerPlugin(ScrollTrigger);

export default function TextTransition() {
  const containerRef = useRef(null);

useGSAP(() => {
  const lines = containerRef.current.querySelectorAll('.tt-line');

  lines.forEach((el, i) => {
    const direction = i % 2 === 0 ? 1 : -1;

    gsap.fromTo(
      el,
      { x: direction * window.innerWidth }, // 🔥 KEY FIX
      {
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          invalidateOnRefresh: true,
        },
      }
    );
  });

}, { scope: containerRef });

  return (
    <section id="text-transition" className="text-transition-section" ref={containerRef}>
      <div className="text-transition-container">
        <h2 className="font-display tt-line">WE BUILD</h2>
        <h2 className="font-display tt-line">VISUAL</h2>
        <h2 className="font-display tt-line">STORIES</h2>
      </div>
    </section>
  );
}
