import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function LetterHoverText({ text, className = '' }) {
  const containerRef = useRef(null);
  const [widths, setWidths] = useState([]);

  // Split text into array of characters
  const chars = text.split('').map((char) => (char === ' ' ? '\u00A0' : char));

  useEffect(() => {
    // Measure widths after initial render
    if (!containerRef.current) return;
    const wraps = containerRef.current.querySelectorAll('.letter-wrap');
    const newWidths = Array.from(wraps).map((wrap) => {
      const current = wrap.querySelector('.letter-current');
      return Math.ceil(current.getBoundingClientRect().width) + 3;
    });
    setWidths(newWidths);
  }, [text]);

  const handleMouseEnter = (index) => {
    if (!containerRef.current) return;
    const inner = containerRef.current.querySelectorAll('.letter-inner')[index];
    if (!inner) return;
    
    const shiftX = inner.querySelector('.letter-current').offsetWidth + inner.querySelector('.letter-gap').offsetWidth;
    gsap.killTweensOf(inner);
    gsap.to(inner, { x: -shiftX, duration: 0.65, ease: 'power4.out' });
  };

  const handleMouseLeave = (index) => {
    if (!containerRef.current) return;
    const inner = containerRef.current.querySelectorAll('.letter-inner')[index];
    if (!inner) return;
    
    gsap.killTweensOf(inner);
    gsap.to(inner, { x: 0, duration: 0.65, ease: 'power4.out' });
  };

  return (
    <div ref={containerRef} className={className} style={{ display: 'inline-block' }}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="letter-wrap"
          style={{ width: widths[i] ? `${widths[i]}px` : 'auto' }}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={() => handleMouseLeave(i)}
        >
          <span className="letter-inner">
            <span className="letter-current">{char}</span>
            <span className="letter-gap"></span>
            <span className="letter-next">{char}</span>
          </span>
        </span>
      ))}
    </div>
  );
}
