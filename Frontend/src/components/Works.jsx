import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';
import './Works.scss';
import first from '../assets/first.png'
gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(() => {
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('span');
      gsap.set(chars, { y: '110%' });
      
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(chars, {
            y: '0%',
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.025,
          });
        },
        onLeaveBack: () => {
          gsap.set(chars, { y: '110%' });
        },
      });
    }

    const items = containerRef.current.querySelectorAll('.work-item');
    items.forEach((item) => {
      const overlay = item.querySelector('.work-overlay');
      const img = item.querySelector('img');

    if (window.innerWidth > 768) {
  gsap.set(overlay, { yPercent: 100 });
}

      item.addEventListener('mouseenter', () => {
        gsap.to(overlay, { yPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: true });
        gsap.to(img, { scale: 1.04, duration: 0.7, ease: 'power2.out', overwrite: true });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(overlay, { yPercent: 100, duration: 0.35, ease: 'power3.in', overwrite: true });
        gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: true });
      });

      gsap.from(item, {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: containerRef });

  const titleText = "AI in Action";

  return (
    <section id="works" className="works-section" ref={containerRef}>
      <div className="works-container">
        
       <h2 className="works-title font-display" ref={titleRef}>
  <span className="desktop-title">
    {titleText.split('').map((char, i) => (
      <span key={i}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>

  <span className="mobile-title">
    <span>AI in</span>
    <span>Action</span>
  </span>
</h2>
        
        <div className="works-divider"></div>

        {/* Work 1 — Large */}
        <div className="work-item work-item-large">
          <img src="https://i.pinimg.com/1200x/be/17/9d/be179de53ff616ce2dc1573e559176c5.jpg" alt="Work 1" />
          <div className="work-overlay">
            <div className="overlay-left">
              <span className="font-bebas number">01</span>
              <span className="font-display title">BRAND IDENTITY</span>
            </div>
            <div className="overlay-tags">
              <span className="capsule-tag">Branding</span>
              <span className="capsule-tag">Identity</span>
              <span className="capsule-tag">Digital</span>
            </div>
          </div>
        </div>

        {/* Work 2 & 3 — Two small */}
        <div className="work-row">
          <div className="work-item work-item-small">
            <img src="https://jasminegunarto.com/wp-content/uploads/2026/01/flow_stickers-scaled-2.webp" alt="Work 2" />
            <div className="work-overlay">
              <div className="overlay-left">
                <span className="font-bebas number">02</span>
                <span className="font-display title">Transforming to digital</span>
              </div>
              <div className="overlay-tags">
                <span className="capsule-tag">Presence</span>
                <span className="capsule-tag">Social media</span>
               
              </div>
            </div>
          </div>
          <div className="work-item work-item-small">
            <img src="https://i.pinimg.com/1200x/a3/85/36/a385367fdd803eb01272e196856eeeeb.jpg" alt="Work 3" />
            <div className="work-overlay">
              <div className="overlay-left">
                <span className="font-bebas number">03</span>
                <span className="font-display title">Helping Businesses</span>
              </div>
              <div className="overlay-tags">
                <span className="capsule-tag">Marketing</span>
                <span className="capsule-tag">competing</span>
                
              </div>
            </div>
          </div>
        </div>

        {/* Work 4 — Large */}
        <div className="work-item work-item-last">
          <img src="https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=1400&q=80" alt="Work 4" />
          <div className="work-overlay">
            <div className="overlay-left">
              <span className="font-bebas number">04</span>
              <span className="font-display title">Complete Control</span>
            </div>
            <div className="overlay-tags">
              <span className="capsule-tag">Profit</span>
              <span className="capsule-tag">Growth</span>
              <span className="capsule-tag">Sales</span>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="view-all-container">
          <MagneticButton className="view-all-btn font-bebas">
            Get started
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
