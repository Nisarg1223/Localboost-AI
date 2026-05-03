import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Footer.scss';

export default function Footer() {
  const footerRef = useRef(null);
  const marqueeRef = useRef(null);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Tokyo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setLocalTime('Local Time ' + t + ' JST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(() => {
    const links = footerRef.current.querySelectorAll('.footer-link-wrap');
    links.forEach((wrap) => {
      const inner = wrap.querySelector('.fl-inner');
      const curr = inner.querySelector('.fl-current');
      if (!inner) return;

      wrap.addEventListener('mouseenter', () => {
        gsap.to(inner, { y: -curr.offsetHeight, duration: 0.3, ease: 'power2.inOut', overwrite: true });
      });
      wrap.addEventListener('mouseleave', () => {
        gsap.to(inner, { y: 0, duration: 0.3, ease: 'power2.inOut', overwrite: true });
      });
    });

    const marqueeTrack = marqueeRef.current;
    if (marqueeTrack) {
      const children = Array.from(marqueeTrack.children);
      children.forEach((child) => {
        marqueeTrack.appendChild(child.cloneNode(true));
      });
      
      const singleSetW = marqueeTrack.scrollWidth / 2;

      gsap.to(marqueeTrack, {
        x: -singleSetW,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }
  }, { scope: footerRef });

  return (
    <section id="footer" className="footer-section" ref={footerRef}>
      <div className="footer-links-area">
        <div className="footer-header font-display">
          <span>FOLLOW</span>
          <span>NAVIGATION</span>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-content">
          <div className="footer-column">
            {['Instagram', 'Dribbble', 'Behance', 'LinkedIn'].map((link) => (
              <a key={link} href="#" className="footer-link-wrap">
                <span className="fl-inner">
                  <span className="fl-current">{link}</span>
                  <span className="fl-next">{link}</span>
                </span>
              </a>
            ))}
          </div>
          <div className="footer-column right">
            {['Home', 'Works', 'About', 'Contact'].map((link) => (
              <a key={link} href="#" className="footer-link-wrap">
                <span className="fl-inner">
                  <span className="fl-current">{link}</span>
                  <span className="fl-next">{link}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="marquee-section">
        <div className="marquee-track" id="marquee" ref={marqueeRef}>
          <span className="marquee-item font-display">LET'S TALK</span>
          <span className="marquee-item font-display separator">&mdash;</span>
          <span className="marquee-item font-display">LET'S TALK</span>
          <span className="marquee-item font-display separator">&mdash;</span>
          <span className="marquee-item font-display">LET'S TALK</span>
          <span className="marquee-item font-display separator">&mdash;</span>
          <span className="marquee-item font-display">LET'S TALK</span>
          <span className="marquee-item font-display separator">&mdash;</span>
        </div>
      </div>

      <div className="footer-bottom">
  <div className="footer-bottom-top">
    <div className="location">
      <span className="dot">•</span> INDIA
    </div>
    <div className="time">{localTime}</div>
    <div className="coords">WE MADE IMPACT</div>
  </div>
  
  <div className="footer-bottom-copy">
    <div>©2026</div>
    <div>ALL RIGHTS RESERVED</div>
  </div>
</div>
    </section>
  );
}
