import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

// Register GSAP plugins for scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);

/**
 * ABOUT COMPONENT - SCROLL-TRIGGERED CLIP PATH ANIMATION
 * 
 * Features:
 * - Scroll-triggered clip path expansion animation
 * - Pin/unpin behavior during scroll interaction
 * - Responsive layout with centered content
 * - Smooth scrub animation tied to scroll progress
 * - Full viewport image reveal effect
 * - Typography hierarchy with brand messaging
 * 
 * Design Pattern:
 * This component creates a cinematic reveal effect where a small
 * clipped image expands to full viewport as the user scrolls,
 * creating an immersive transition into the gaming world.
 */

const About = () => {
  // ===== GSAP SCROLL ANIMATION SETUP =====
  
  /**
   * useGSAP Hook - Manages GSAP animations with proper cleanup
   * 
   * This hook ensures animations are properly initialized and
   * cleaned up when the component mounts/unmounts, preventing
   * memory leaks and conflicting animations.
   */
  useGSAP(() => {
    // Create timeline for coordinated clip path animation
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        // ===== SCROLL TRIGGER CONFIGURATION =====
        
        trigger: "#clip",           // Element that triggers the animation
        start: "center center",     // Animation starts when clip center reaches viewport center
        end: "+=800 center",        // Animation ends after scrolling 800px from start
        scrub: 0.5,                // Smooth animation tied to scroll (0.5s lag for smoothness)
        pin: true,                 // Pin the element during animation
        pinSpacing: true,          // Maintain spacing while pinned (prevents layout jump)
        
        // Debug markers (enable in development)
        // markers: true,
        
        // Optional callbacks for advanced control
        // onEnter: () => console.log("Animation started"),
        // onLeave: () => console.log("Animation completed"),
        // onUpdate: (self) => console.log("Progress:", self.progress),
      },
    });

    // ===== CLIP PATH EXPANSION ANIMATION =====
    
    /**
     * Animates the mask from small circle to full viewport
     * 
     * Properties animated:
     * - width: Expands from initial size to 100vw (full viewport width)
     * - height: Expands from initial size to 100vh (full viewport height)
     * - borderRadius: Transitions from circular (initial) to rectangular (0)
     * 
     * The .mask-clip-path class should have initial styles:
     * - Small width/height (e.g., 200px x 200px)
     * - High border-radius for circular appearance (e.g., 50%)
     * - Centered positioning
     */
    clipAnimation.to(".mask-clip-path", {
      width: "100vw",        // Expand to full viewport width
      height: "100vh",       // Expand to full viewport height
      borderRadius: 0,       // Remove rounded corners for full rectangle
      
      // Optional advanced properties
      // ease: "power2.inOut",  // Custom easing for more dramatic effect
      // transformOrigin: "center center", // Ensure expansion from center
    });
  });

  // ===== COMPONENT RENDER =====

  return (
    // Main about section with full screen dimensions
    <div id="about" className="min-h-screen w-screen">
      
      {/* ===== CONTENT HEADER SECTION ===== */}
      {/* 
        Header content positioned above the animated clip section
        - relative: Allows z-index stacking above pinned content
        - mb-8: Bottom margin before the clip animation area
        - mt-36: Large top margin for proper spacing from previous section
        - flex flex-col: Vertical stacking of content
        - items-center: Horizontal centering
        - gap-5: Consistent spacing between child elements
      */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        
        {/* ===== SECTION IDENTIFIER ===== */}
        {/* 
          Small branding text that introduces the section
          - font-general: Custom font family for brand consistency
          - uppercase: Transforms text to uppercase for emphasis
          - Responsive sizing: text-sm on mobile, md:text-[10px] on medium+ screens
        */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </p>

        {/* ===== MAIN TITLE ===== */}
        {/* 
          Primary heading using the AnimatedTitle component
          - title: Contains HTML with <b> tags for emphasis on specific letters
          - containerClass: Additional CSS classes for styling
            - mt-5: Top margin for spacing from previous element
            - !text-black: Important override for black text (overrides inherited colors)
            - text-center: Center-aligned text
        */}
        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        {/* ===== DESCRIPTIVE SUBTEXT ===== */}
        {/* 
          Two-paragraph description using custom CSS class
          The .about-subtext class likely contains:
          - Font sizing and line height
          - Text color and opacity variations
          - Maximum width for readability
          - Responsive typography scaling
        */}
        <div className="about-subtext">
          {/* Primary description - bold statement about the gaming experience */}
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          
          {/* Secondary description - more detailed explanation with muted styling */}
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      {/* ===== SCROLL-TRIGGERED CLIP ANIMATION SECTION ===== */}
      {/* 
        Container for the clip path animation
        - h-dvh: Full dynamic viewport height (accounts for mobile browsers)
        - w-screen: Full screen width
        - id="clip": Identifier for GSAP ScrollTrigger targeting
        
        This section gets pinned during scroll animation,
        creating the effect where scrolling controls the clip expansion
      */}
      <div className="h-dvh w-screen" id="clip">
        
        {/* ===== CLIPPED IMAGE CONTAINER ===== */}
        {/* 
          The element that gets animated by GSAP
          - mask-clip-path: Custom CSS class that defines:
            - Initial small dimensions (likely circular)
            - Clip path or border-radius for shape
            - Positioning (likely centered)
            - Overflow hidden for clean clipping
          - about-image: Additional styling class for image-specific properties
        */}
        <div className="mask-clip-path about-image">
          
          {/* ===== BACKGROUND IMAGE ===== */}
          {/* 
            Full-size image that gets revealed through the expanding clip
            - src: Path to the about image (ensure high resolution for full-screen display)
            - alt: Descriptive text for accessibility
            - absolute positioning: Covers the entire container
            - left-0 top-0: Positioned at container's top-left
            - size-full: Width and height 100%
            - object-cover: Maintains aspect ratio while filling container
            
            Image considerations:
            - Should be high resolution (at least 1920x1080)
            - Optimized for web (WebP format recommended)
            - Consider lazy loading for performance
          */}
          <img
            src="img/about.webp"
            alt="Epic gaming world landscape showing the vast Zentry universe with interconnected realms and digital adventures"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;