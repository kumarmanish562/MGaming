import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

/**
 * STORY COMPONENT - FLOATING IMAGE WITH 3D MOUSE INTERACTION
 * 
 * Features:
 * - Interactive 3D floating image that responds to mouse movement
 * - GSAP-powered smooth animations with perspective transforms
 * - Responsive layout with adaptive positioning
 * - Custom SVG filter effects for visual enhancement
 * - Mixed blend mode title overlay for artistic effect
 * - Call-to-action section with descriptive content
 * 
 * Design Pattern:
 * This component creates an immersive storytelling experience where
 * the main image tilts and rotates based on cursor position, creating
 * a 3D floating effect that enhances user engagement.
 */

const FloatingImage = () => {
  // ===== REFS FOR DOM MANIPULATION =====
  
  // Reference to the floating image element for GSAP animations
  const frameRef = useRef(null);

  // ===== MOUSE INTERACTION HANDLERS =====

  /**
   * Handles mouse movement to create 3D tilt effect
   * 
   * Algorithm:
   * 1. Calculate mouse position relative to image center
   * 2. Convert position to rotation angles (X and Y axis)
   * 3. Apply smooth GSAP animation with perspective
   * 
   * @param {MouseEvent} e - Mouse move event containing cursor coordinates
   */
  const handleMouseMove = (e) => {
    // Extract cursor coordinates from event
    const { clientX, clientY } = e;
    
    // Get reference to the image element
    const element = frameRef.current;

    // Safety check - ensure element exists before proceeding
    if (!element) return;

    // Get element's position and dimensions relative to viewport
    const rect = element.getBoundingClientRect();
    
    // Calculate mouse position relative to element's top-left corner
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    // Calculate center point of the element
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles based on distance from center
    // Normalized to -1 to 1 range, then scaled for desired effect
    const rotateX = ((yPos - centerY) / centerY) * -10; // Vertical tilt (inverted for natural feel)
    const rotateY = ((xPos - centerX) / centerX) * 10;  // Horizontal tilt

    // Apply smooth 3D transformation using GSAP
    gsap.to(element, {
      duration: 0.3,              // Animation duration (300ms)
      rotateX,                    // X-axis rotation (up/down tilt)
      rotateY,                    // Y-axis rotation (left/right tilt)
      transformPerspective: 500,  // 3D perspective depth
      ease: "power1.inOut",       // Smooth easing function
    });
  };

  /**
   * Resets image to neutral position when mouse leaves
   * 
   * This function is called on multiple events to ensure consistent behavior:
   * - onMouseLeave: When cursor exits the image area
   * - onMouseUp: When mouse button is released
   * - onMouseEnter: When cursor first enters (ensures clean state)
   */
  const handleMouseLeave = () => {
    const element = frameRef.current;

    // Safety check before animation
    if (element) {
      // Smoothly return to neutral rotation (0, 0)
      gsap.to(element, {
        duration: 0.3,        // Same duration as move animation for consistency
        rotateX: 0,           // Reset X rotation
        rotateY: 0,           // Reset Y rotation
        ease: "power1.inOut", // Matching easing for smooth transition
      });
    }
  };

  // ===== COMPONENT RENDER =====

  return (
    // Main story section with full viewport height and dark theme
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      
      {/* Main content container with centered layout */}
      <div className="flex size-full flex-col items-center py-10 pb-24">
        
        {/* ===== SECTION HEADER ===== */}
        {/* 
          Small uppercase text serving as section identifier
          Responsive font sizing: sm on mobile, 10px on medium+ screens
        */}
        <p className="font-general text-sm uppercase md:text-[10px]">
          the multiversal ip world
        </p>

        {/* ===== MAIN CONTENT AREA ===== */}
        {/* 
          Relative positioning container for layered content
          Contains both the animated title and the floating image
        */}
        <div className="relative size-full">
          
          {/* ===== ANIMATED TITLE OVERLAY ===== */}
          {/* 
            Title positioned above the image with special blend mode
            - mix-blend-difference: Creates artistic contrast effect with background
            - pointer-events-none: Allows mouse events to pass through to image below
            - z-10: Ensures title stays above other content
          */}
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          {/* ===== FLOATING IMAGE CONTAINER ===== */}
          {/* 
            Container for the interactive image with custom styling
            Uses CSS classes defined elsewhere for:
            - story-img-container: Main container styling
            - story-img-mask: Masking effects for rounded corners
            - story-img-content: Inner content wrapper
          */}
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                {/* 
                  INTERACTIVE FLOATING IMAGE
                  - ref={frameRef}: Allows GSAP to animate this element
                  - Multiple mouse event handlers ensure smooth interaction
                  - object-contain: Maintains image aspect ratio
                */}
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}     // 3D tilt effect on movement
                  onMouseLeave={handleMouseLeave}   // Reset on cursor exit
                  onMouseUp={handleMouseLeave}      // Reset on mouse release
                  onMouseEnter={handleMouseLeave}   // Ensure clean state on enter
                  src="/img/entrance.webp"
                  alt="Mystical entrance to the hidden realm - an ethereal gateway with cosmic lighting"
                  className="object-contain"
                />
              </div>
            </div>

            {/* ===== SVG FILTER DEFINITIONS ===== */}
            {/* 
              Hidden SVG containing custom filter effects
              - invisible: Hidden from view but accessible for CSS filter references
              - size-0: Takes up no layout space
              - flt_tag filter: Creates soft glow/blur effects with custom matrix
            */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Custom filter for enhanced visual effects */}
                <filter id="flt_tag">
                  {/* Gaussian blur for soft glow effect */}
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"        // Blur intensity
                    result="blur"
                  />
                  {/* Color matrix for contrast and opacity adjustment */}
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"  // Custom matrix values
                    result="flt_tag"
                  />
                  {/* Composite the original with the filtered version */}
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"         // Blend mode
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        {/* ===== CALL-TO-ACTION SECTION ===== */}
        {/* 
          Positioned below the image with responsive layout:
          - -mt-80: Negative margin to overlay with image on mobile
          - md:-mt-64: Smaller negative margin on medium+ screens
          - md:me-44: Right margin on desktop for asymmetric layout
          - Flexbox for centering on mobile, right-alignment on desktop
        */}
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
          
          {/* Content wrapper with responsive alignment */}
          <div className="flex h-full w-fit flex-col items-center md:items-start">
            
            {/* ===== DESCRIPTIVE TEXT ===== */}
            {/* 
              Story description with responsive styling:
              - max-w-sm: Limits text width for readability
              - text-center on mobile, text-start on desktop
              - font-circular-web: Custom font family
              - text-violet-50: Light purple color for mystical theme
            */}
            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            {/* ===== ACTION BUTTON ===== */}
            {/* 
              Call-to-action button with:
              - Unique ID for potential JavaScript targeting
              - Custom title for user engagement
              - Top margin for spacing from text
            */}
            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;