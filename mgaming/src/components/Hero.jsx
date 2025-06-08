import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

// Register GSAP ScrollTrigger plugin for scroll-based animations
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // ===== STATE MANAGEMENT =====
  
  // Video carousel states
  const [currentIndex, setCurrentIndex] = useState(1); // Current video index (1-4)
  const [hasClicked, setHasClicked] = useState(false); // Tracks if mini video has been clicked
  
  // Loading states
  const [loading, setLoading] = useState(true); // Controls loading screen visibility
  const [loadedVideos, setLoadedVideos] = useState(0); // Counter for loaded videos

  // ===== CONSTANTS =====
  
  const totalVideos = 4; // Total number of hero videos available
  
  // ===== REFS FOR DOM MANIPULATION =====
  
  const nextVdRef = useRef(null); // Reference to the next video element for playback control

  // ===== EVENT HANDLERS =====
  
  /**
   * Handles video load completion
   * Increments the loaded video counter for loading state management
   */
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  /**
   * Handles mini video click interaction
   * Triggers video transition animation and updates current index
   */
  const handleMiniVdClick = () => {
    setHasClicked(true);
    // Cycle through videos (1-4), reset to 1 after 4
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  /**
   * Generates video source path based on index
   * @param {number} index - Video index number
   * @returns {string} - Complete video file path
   */
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // ===== SIDE EFFECTS =====
  
  /**
   * EFFECT: Manage loading state based on video load progress
   * Hides loading screen when all videos (except one) are loaded
   */
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // ===== GSAP ANIMATIONS =====
  
  /**
   * ANIMATION: Video transition when mini video is clicked
   * Creates smooth scaling and positioning transitions between videos
   */
  useGSAP(
    () => {
      if (hasClicked) {
        // Make next video visible and animate it to full size
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(), // Start video playback
        });
        // Animate current video with scale effect
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex], // Re-run when currentIndex changes
      revertOnUpdate: true, // Reset animation on dependency change
    }
  );

  /**
   * ANIMATION: Video frame clipping animation on scroll
   * Creates a dynamic shape transition effect as user scrolls
   */
  useGSAP(() => {
    // Set initial clipped polygon shape and border radius
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    // Animate from full rectangle to clipped shape on scroll
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true, // Smooth animation tied to scroll position
      },
    });
  });

  // ===== COMPONENT RENDER =====
  
  return (
    // Main hero container - full viewport height
    <div className="relative h-dvh w-screen overflow-x-hidden">
      
      {/* ===== LOADING SCREEN ===== */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          {/* Loading animation - three bouncing dots */}
          {/* Credit: https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* ===== MAIN VIDEO FRAME ===== */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-800"
      >
        <div>
          {/* ===== MINI VIDEO PREVIEW (CENTER) ===== */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg border-2 border-purple-500/30 shadow-xl shadow-purple-500/20">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                {/* Preview video that shows next video in sequence */}
                <video
                  ref={nextVdRef}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </VideoPreview>
          </div>

          {/* ===== TRANSITION VIDEO (HIDDEN) ===== */}
          {/* Used for smooth transitions between main videos */}
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          
          {/* ===== MAIN BACKGROUND VIDEO ===== */}
          {/* Primary video that fills the entire background */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* ===== BRAND TITLE (BOTTOM RIGHT) ===== */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
          G<b>A</b>MING
        </h1>

        {/* ===== MAIN CONTENT OVERLAY ===== */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            {/* Main hero heading */}
            <h1 className="special-font hero-heading text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-300 bg-clip-text">
              redefi<b>n</b>e
            </h1>

            {/* Hero description text */}
            <p className="mb-5 max-w-64 font-robert-regular text-gray-200 text-shadow">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/* Call-to-action button */}
            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 flex-center gap-1 shadow-lg hover:shadow-purple-500/25 transition-all duration-300 border border-purple-400/30"
            />
          </div>
        </div>
      </div>
      {/* ===== SECONDARY BRAND TITLE (BOTTOM RIGHT) ===== */}
      {/* Duplicate title for layering effect */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-gray-800/30">
        G<b>A</b>MING
      </h1>
    </div>
  );
};
export default Hero;