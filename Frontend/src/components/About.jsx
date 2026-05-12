import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.scss";

import LetterHoverText from "./LetterHoverText";
import AboutServices from "./AboutServices";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import about_us from '../assets/about_us.jpg'
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  // 👇 Developers data
  const developers = [
    { name: "Nisarg Darji", role: "Frontend Developer",
      link:"https://www.linkedin.com/in/nisarg-darji-008106343?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    },
    { name: "Dev Singh", role: "Backend Developer",
      link:"https://www.linkedin.com/in/contactdevsingh?utm_source=share_via&utm_content=profile&utm_medium=member_android"
     },
    { name: "Suhail Sayyed", role: "Full Stack Developer",
      link:"https://www.linkedin.com/in/suhail-sayyed-b7616425b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
     },
  ];

  const [index, setIndex] = useState(0);

  // 🔁 Auto change every 3 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % developers.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 🎬 Animate text on change
  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
    );
  }, [index]);

  return (
    <section className="about-section" ref={sectionRef}>

      {/* GREEN */}
      <div className="about-top">
        <h1 className="about-title font-display">
          <LetterHoverText text="ABOUT US" />
        </h1>
      </div>

      {/* IMAGE */}
      <div className="about-image-wrapper">
        <img
          ref={imageRef}
          src={about_us}
          alt="about"
        />
      </div>

      {/* WHITE */}
      <div className="about-bottom">
        <p className="about-text font-display">
          LOCALBOOST AI IS AN INTELLIGENT SYSTEM BUILT FOR LOCAL BUSINESSES.
          IT HELPS OWNERS GROW THROUGH SMART DIGITAL STRATEGIES,
          AUTOMATING COMMUNICATION AND ENHANCING CUSTOMER ENGAGEMENT
          TO BUILD A STRONG ONLINE PRESENCE.
        </p>

        <br />
        <br />

        <p className="about-text font-display">
          SOCIAL MEDIA CONTENT GENERATION.
          WHATSAPP FEEDBACK AUTOMATION.
          COMPETITOR TRACKING.
          DATA-DRIVEN BUSINESS INSIGHTS.
          FROM OFFLINE STORES TO FULL DIGITAL BRANDS — POWERED BY AI.
        </p>
      </div>

      <AboutServices />

      {/* 🔥 NEW SECTION (AFTER SERVICES) */}
      <div className="about-hero">

        {/* LEFT — 3D */}
        <div className="about-3d">
          <Canvas camera={{ position: [0, 0, 9], fov: 50 }}>
            <ambientLight intensity={1} />

            <Scene />

            <OrbitControls
              enableZoom={false}
              autoRotate={false}
            />

            <EffectComposer>
              <Bloom
                luminanceThreshold={0.3}
                luminanceSmoothing={0.9}
                intensity={2.0}
              />
            </EffectComposer>
          </Canvas>
        </div>

        {/* RIGHT — TEXT */}
        <div className="about-info">
          <div className="text-wrapper" ref={textRef}>
            <h2 className="name">
              {developers[index].name}
            </h2>

            <p className="role">
              {developers[index].role}
            </p>
          </div>

         <a
  href={developers[index].link}
  target="_blank"
  rel="noopener noreferrer"
  className="linkedin"
>
  LinkedIn ↗
</a>
        </div>

      </div>

    </section>
  );
}