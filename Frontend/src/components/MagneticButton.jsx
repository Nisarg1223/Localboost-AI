import { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className = '' }) {
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    // We could store rect, but it's easier to recalculate on mousemove
  };

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    gsap.to(btnRef.current, { x: dx * 0.4, y: dy * 0.4, duration: 0.35, ease: 'power2.out', overwrite: true });
  };

  const handleMouseLeave = () => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1.1, 0.45)', overwrite: true });
  };

  return (
    <div
      ref={btnRef}
      className={`magnetic-btn ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
