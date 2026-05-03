import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.scss";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

 useEffect(() => {
  const digits = loaderRef.current.querySelectorAll(".digit-inner");

  const randomNum = Math.floor(Math.random() * 99) + 1;
  const randomStr = String(randomNum).padStart(3, "0");

  const sequence = ["000", randomStr, "100"];

  let tl = gsap.timeline({
   onComplete: () => {
  gsap.to(loaderRef.current, {
    y: "-100%",
    duration: 1.6,
    ease: "expo.inOut",
    delay: 0.3, // 🔥 small delay after 100
    onComplete: onComplete,
  });
}
  });

 sequence.forEach((value, stepIndex) => {
  tl.add(() => {
    const chars = value.split("");

    digits.forEach((digit, i) => {
      const next = digit.querySelector(".digit-next");
      next.textContent = chars[i];

      gsap.to(digit, {
        yPercent: -100,
        duration: 1.4,
        ease: "expo.inOut",
        delay: i * 0.2,
        onComplete: () => {
          const current = digit.querySelector(".digit-current");
          current.textContent = chars[i];
          gsap.set(digit, { yPercent: 0 });
        },
      });
    });
  });

  // 🔥 IMPORTANT: last step needs MORE time
  if (stepIndex === sequence.length - 1) {
    tl.to({}, { duration: 2.2 }); // 🔥 increase this
  } else {
    tl.to({}, { duration: 0.8 });
  }
});
}, []);

  return (
    <div className="loader" ref={loaderRef}>
      {[0, 1, 2].map((_, i) => (
        <span key={i} className="digit-wrap">
          <span className="digit-inner">
            <span className="digit-current">0</span>
            <span className="digit-next">0</span>
          </span>
        </span>
      ))}
    </div>
  );
}
