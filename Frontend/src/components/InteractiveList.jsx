import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";
import "./InteractiveList.scss";
import bi from '../assets/brand_inteligence.png'
import bs from '../assets/bs.png'
import dp from '../assets/dp.png'
import ie from '../assets/ie.png'
import hover1 from '../assets/hover1.jpg'
gsap.registerPlugin(ScrollTrigger);

const listItems = [
  {
    text: "Brand Intelligence",
    img: bi
  },
  {
    text: "BRAND STRATEGY",
    img: bs,
  },
  {
    text: "DIGITAL PRESENCE",
    img: dp,
  },
  {
    text: "Interactive Experiences",
    img: ie,
  },
  {
    text: "VISUAL IDENTITY",
    img: hover1,
  },
];

export default function InteractiveList() {
  const containerRef = useRef(null);
  const followerRef = useRef(null);
  const [hoveredImg, setHoveredImg] = useState(null);
  const isMobile = window.innerWidth < 768;
  const physics = useRef({
    mX: 0,
    mY: 0,
    fX: 0,
    fY: 0,
    isFollowing: false,
    prevSkew: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      physics.current.mX = e.clientX;
      physics.current.mY = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    let animationFrameId;
    const tickFollower = () => {
      const p = physics.current;
      if (p.isFollowing && followerRef.current) {
        const dx = p.mX - p.fX;
        const dy = p.mY - p.fY;
        p.fX += dx * 0.1;
        p.fY += dy * 0.1;

        const vx = dx * 0.1;
        const targetSkew = Math.max(-15, Math.min(15, vx * 0.5));
        p.prevSkew += (targetSkew - p.prevSkew) * 0.12;
        const rot = p.prevSkew * 0.25;

        followerRef.current.style.left = `${p.fX - 210}px`;
        followerRef.current.style.top = `${p.fY - 260}px`;
        followerRef.current.style.transform = `rotate(${rot.toFixed(2)}deg) skewX(${p.prevSkew.toFixed(2)}deg)`;
      }
      animationFrameId = requestAnimationFrame(tickFollower);
    };

    tickFollower();

    return () => {
      document.removeEventListener("https://images.unsplash.com/photo-1618556450994-a163d8d74e95?w=600&q=80mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useGSAP(
    () => {
      const rows = containerRef.current.querySelectorAll(".list-row");
      rows.forEach((row) => {
        gsap.from(row, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef },
  );

  const handleMouseEnter = (rowIdx, img) => {
    if (isMobile) return;
    const row = containerRef.current.querySelectorAll(".list-row")[rowIdx];
    const letters = row.querySelectorAll(".letter-inner");

    gsap.killTweensOf(letters);
    letters.forEach((inner, i) => {
      const curr = inner.querySelector(".letter-current");
      gsap.set(inner, { y: 0 });
      gsap.to(inner, {
        y: -curr.offsetHeight,
        duration: 0.5,
        ease: "power3.out",
        delay: i * 0.018,
      });
    });

    setHoveredImg(img);
    const p = physics.current;
    p.isFollowing = true;

    const offsetX = rowIdx % 2 === 0 ? -100 : 100;
    p.fX = p.mX + offsetX;
    p.fY = p.mY;

    gsap.set(followerRef.current, { left: p.fX - 210, top: p.fY - 260 });
    gsap.to(followerRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = (rowIdx) => {
    if (isMobile) return;
    const row = containerRef.current.querySelectorAll(".list-row")[rowIdx];
    const letters = row.querySelectorAll(".letter-inner");

    gsap.killTweensOf(letters);
    letters.forEach((inner) => {
      gsap.to(inner, {
        y: 0,
        duration: 0.35,
        ease: "power3.inOut",
        overwrite: true,
      });
    });

    const p = physics.current;
    p.isFollowing = false;
    p.prevSkew = 0;
    gsap.to(followerRef.current, {
      opacity: 0,
      scale: 0,
      duration: 0.32,
      ease: "power2.in",
      overwrite: true,
    });
  };

  return (
    <>
      <section id="list-section" className="list-section" ref={containerRef}>
        <div className="list-container">
          <div className="break-text font-display">BOOST</div>

          {/* thin line + small text */}
          <div className="list-header">
            <div className="line"></div>
            <div className="inner-divs">
              <div className="label">short,experimental designs</div>
              <div className="label">Small scale</div>
            </div>
          </div>

          {listItems.map((item, idx) => (
            <div
              key={idx}
              className="list-row"
              onMouseEnter={() => handleMouseEnter(idx, item.img)}
              onMouseLeave={() => handleMouseLeave(idx)}
            >
              <div className="list-text font-display">
                {item.text.split("").map((char, charIdx) => (
                  <span key={charIdx} className="letter-wrap">
                    <span className="letter-inner">
                      <span className="letter-current">
                        {char === " " ? "\u00A0" : char}
                      </span>
                      <span className="letter-next">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    </span>
                  </span>
                ))}
              </div>
             
    <div className="list-image">
      <img src={item.img} alt={item.text} />
    </div>
            </div>
          ))}

          <div className="services-btn-container">
            <MagneticButton className="services-btn font-bebas">
             DashBoard
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Image Follower */}
      <div className="image-follower" id="imageFollower" ref={followerRef}>
        {hoveredImg && <img src={hoveredImg} alt="Preview" />}
      </div>
    </>
  );
}
