import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

// Navigation menu items array - easily configurable
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  // ===== STATE MANAGEMENT =====
  
  // Audio control states
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Tracks if background music is playing
  const [isIndicatorActive, setIsIndicatorActive] = useState(false); // Controls visual animation of audio bars
  
  // Navigation visibility states
  const [isNavVisible, setIsNavVisible] = useState(true); // Controls navbar show/hide animation
  const [lastScrollY, setLastScrollY] = useState(0); // Stores previous scroll position for comparison

  // ===== REFS FOR DOM MANIPULATION =====
  
  const audioElementRef = useRef(null); // Reference to the hidden audio element
  const navContainerRef = useRef(null); // Reference to navbar container for GSAP animations

  // ===== SCROLL DETECTION =====
  
  // Get current scroll position from react-use hook
  const { y: currentScrollY } = useWindowScroll();

  // ===== EVENT HANDLERS =====
  
  /**
   * Toggles audio playback and visual indicator animation
   * Called when user clicks the audio button
   */
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // ===== SIDE EFFECTS =====
  
  /**
   * EFFECT: Manage audio playback based on state
   * Plays or pauses the background music when isAudioPlaying changes
   */
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  /**
   * EFFECT: Handle navbar visibility based on scroll behavior
   * - At top (scroll = 0): Show navbar, remove floating style
   * - Scrolling down: Hide navbar, add floating style
   * - Scrolling up: Show navbar, keep floating style
   */
  useEffect(() => {
    if (currentScrollY === 0) {
      // User is at the top of the page
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // User is scrolling down - hide navbar
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // User is scrolling up - show navbar with floating effect
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    // Update last scroll position for next comparison
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  /**
   * EFFECT: Animate navbar show/hide using GSAP
   * Smoothly animates navbar position and opacity
   */
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100, // Move up/down by 100px
      opacity: isNavVisible ? 1 : 0, // Fade in/out
      duration: 0.2, // Animation duration
    });
  }, [isNavVisible]);

  // ===== COMPONENT RENDER =====
  
  return (
    // Main navbar container - fixed position with responsive margins
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      {/* Header wrapper for centering */}
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        {/* Main navigation bar with glassmorphism design */}
        <nav className="flex size-full items-center justify-between p-4 bg-gradient-to-r from-slate-900/90 via-gray-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10">
          
          {/* ===== LEFT SECTION: Logo and Product Button ===== */}
          <div className="flex items-center gap-7">
            {/* Company logo with drop shadow */}
            <img src="/img/logo.png" alt="logo" className="w-10 drop-shadow-lg" />

            {/* Product button - hidden on mobile, visible on desktop */}
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 md:flex hidden items-center justify-center gap-1 shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
            />
          </div>

          {/* ===== RIGHT SECTION: Navigation Links and Audio Button ===== */}
          <div className="flex h-full items-center">
            
            {/* Navigation links - hidden on mobile */}
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`} // Create anchor links to page sections
                  className="nav-hover-btn text-gray-200 hover:text-cyan-400 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/20 relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r before:from-purple-500 before:to-cyan-400 before:transition-all before:duration-300 hover:before:w-full"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio control button with visual indicator bars */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 p-3 rounded-xl border border-gray-600/30 hover:border-purple-400/50 bg-gradient-to-r from-gray-700/50 to-gray-600/50 hover:from-purple-600/30 hover:to-cyan-600/30 backdrop-blur-sm shadow-none transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
            >
              {/* Hidden audio element for background music */}
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop // Loop the audio continuously
              />
              
              {/* Audio visualizer bars - 4 animated bars */}
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx(
                    "indicator-line h-4 w-1 rounded-full bg-gradient-to-t from-purple-500 to-cyan-400 opacity-40 transition-all duration-300",
                    {
                      // Active state: pulse animation with full opacity and glow
                      "animate-pulse opacity-100 shadow-purple-400 shadow-sm": isIndicatorActive,
                    }
                  )}
                  style={{
                    // Stagger animation delay for wave effect
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;