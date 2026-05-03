import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.scss";
import LetterHoverText from "./LetterHoverText";
import AboutServices from "./AboutServices";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);



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
          src="https://i.pinimg.com/736x/01/7a/58/017a588574fba0507416c16de2d7cde6.jpg"
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
<br/>
<br/>
<p className="about-text font-display">
  SOCIAL MEDIA CONTENT GENERATION. 
  WHATSAPP FEEDBACK AUTOMATION. 
  COMPETITOR TRACKING. 
  DATA-DRIVEN BUSINESS INSIGHTS. 
  FROM OFFLINE STORES TO FULL DIGITAL BRANDS — POWERED BY AI.
</p>
      </div>
<AboutServices />
    </section>
  );
}