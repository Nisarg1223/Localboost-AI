import { useRef, useEffect } from "react";
import gsap from "gsap";
import pen from '../assets/pen_img.gif'
export default function PageTransition({ trigger, onComplete }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    const tl = gsap.timeline({
      onComplete: onComplete
    });

    // 🔥 animation like you described
    tl.fromTo(
      overlayRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.6, ease: "power4.inOut" }
    )
      .to({}, { duration: 0.1 }) // small pause
      .to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut"
      });

  }, [trigger]);

 return (
  <div
    ref={overlayRef}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      background: "#F4922C",
      zIndex: 9999,
      transform: "translateY(100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* 🔥 YOUR GIF */}
    <img
      src="https://i.pinimg.com/originals/67/ab/c6/67abc669cd89471ffc4bb3d902318a87.gif"
      alt="loading"
      style={{
        width: "100%", // adjust size
        height: "100%",
        objectFit: "contain",
      }}
    />
  </div>
);
}