import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.scss';
import robotVideo from '../assets/video1.mp4'
const Loading = () => {
  const loaderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Exit animation: Move whole page up
      gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          // Optional: hide element completely after animation
          if (loaderRef.current) loaderRef.current.style.display = 'none';
        }
      });
    }, 5000); // 5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loader-wrapper" ref={loaderRef}>
      <div className="loader-content">
        
        {/* TOP LEFT TEXT */}
        <div className="loader-header">
          <span className="brand-text">Localboost AI</span>
        </div>

        {/* CENTER VIDEO AREA */}
        <div className="video-container">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            src={robotVideo} // Replace with your video path
          />
        </div>

        {/* BOTTOM RIGHT TEXT */}
        <div className="loader-footer">
          <div className="loading-status">
            <span>Loading...</span>
            <div className="progress-bar"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Loading;