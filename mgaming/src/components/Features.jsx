import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

/**
 * FEATURES COMPONENT WITH INTERACTIVE BENTO GRID LAYOUT
 * 
 * Features:
 * - Interactive 3D tilt effects on mouse movement
 * - Responsive bento grid layout for feature showcase
 * - Video backgrounds with overlay content
 * - "Coming Soon" interactive buttons with radial hover effects
 * - Modern glassmorphism design elements
 * - Smooth animations and transitions
 * - Accessibility-friendly interactions
 */

// ===== INTERACTIVE BENTO TILT COMPONENT =====

/**
 * BentoTilt - Creates 3D tilt effect based on mouse position
 * 
 * This component tracks mouse movement and applies 3D transformations
 * to create an engaging interactive effect where cards tilt based on
 * the cursor position relative to the card center.
 * 
 * @param {React.ReactNode} children - Child components to render inside the tilt container
 * @param {string} className - Additional CSS classes to apply
 */
export const BentoTilt = ({ children, className = "" }) => {
  // State to store the current transform style for the 3D effect
  const [transformStyle, setTransformStyle] = useState("");
  
  // Ref to access the DOM element for calculating mouse position
  const itemRef = useRef(null);

  /**
   * Handles mouse movement to calculate and apply 3D tilt effect
   * 
   * @param {MouseEvent} event - Mouse move event containing cursor coordinates
   */
  const handleMouseMove = (event) => {
    // Early return if ref is not available
    if (!itemRef.current) return;

    // Get the bounding rectangle of the element
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    // Calculate relative position (0 to 1) of mouse within the element
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    // Calculate tilt angles based on mouse position
    // Center (0.5, 0.5) = no tilt, edges = maximum tilt
    const tiltX = (relativeY - 0.5) * 5; // Vertical tilt (-2.5deg to +2.5deg)
    const tiltY = (relativeX - 0.5) * -5; // Horizontal tilt (inverted for natural feel)

    // Create 3D transform string with perspective, rotation, and slight scale
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  /**
   * Resets the tilt effect when mouse leaves the element
   */
  const handleMouseLeave = () => {
    setTransformStyle(""); // Reset to default transform
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }} // Apply dynamic transform
    >
      {children}
    </div>
  );
};

// ===== BENTO CARD COMPONENT =====

/**
 * BentoCard - Individual feature card with video background and interactive elements
 * 
 * Each card displays a feature with:
 * - Video background for visual appeal
 * - Title and description overlay
 * - Optional "Coming Soon" button with radial hover effect
 * 
 * @param {string} src - Video source URL for background
 * @param {React.ReactNode} title - Feature title (can include JSX for styling)
 * @param {string} description - Feature description text
 * @param {boolean} isComingSoon - Whether to show "Coming Soon" button
 */
export const BentoCard = ({ src, title, description, isComingSoon }) => {
  // State for tracking cursor position within the button for radial gradient
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  // State for controlling the opacity of the hover effect
  const [hoverOpacity, setHoverOpacity] = useState(0);
  
  // Ref for the "Coming Soon" button to calculate relative cursor position
  const hoverButtonRef = useRef(null);

  /**
   * Tracks mouse movement within the "Coming Soon" button
   * Updates cursor position for the radial gradient effect
   * 
   * @param {MouseEvent} event - Mouse move event
   */
  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    
    // Get button's position and dimensions
    const rect = hoverButtonRef.current.getBoundingClientRect();

    // Calculate cursor position relative to button's top-left corner
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  /**
   * Shows the radial hover effect when mouse enters button
   */
  const handleMouseEnter = () => setHoverOpacity(1);

  /**
   * Hides the radial hover effect when mouse leaves button
   */
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      {/* Background Video */}
      {/* 
        Video serves as the background for each feature card
        - autoPlay: Starts playing automatically (muted for browser compatibility)
        - muted: Required for autoplay in most browsers
        - loop: Continuously plays for engaging background
        - object-cover: Maintains aspect ratio while filling container
      */}
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      
      {/* Content Overlay */}
      {/* 
        Positioned above video with higher z-index
        Uses flexbox to position content at top and bottom of card
      */}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        
        {/* Title and Description Section */}
        <div>
          {/* Feature Title */}
          {/* 
            Uses special-font class for custom typography
            Title can contain JSX elements (like <b> tags) for styling
          */}
          <h1 className="bento-title special-font">{title}</h1>
          
          {/* Feature Description */}
          {/* 
            Conditional rendering - only shows if description is provided
            Responsive text sizing: xs on mobile, base on medium+ screens
          */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {/* Coming Soon Interactive Button */}
        {/* 
          Only renders if isComingSoon prop is true
          Features a sophisticated radial gradient hover effect
        */}
        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial Gradient Hover Effect */}
            {/* 
              Creates a dynamic radial gradient that follows the cursor
              - pointer-events-none: Prevents interference with button interactions
              - absolute positioning with -inset-px for full coverage
              - Dynamic background using cursor position and opacity
            */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            
            {/* Button Content */}
            {/* z-20 ensures content stays above the gradient effect */}
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== MAIN FEATURES COMPONENT =====

/**
 * Features - Main component showcasing MGaming platform features
 * 
 * Layout Structure:
 * 1. Header section with introduction text
 * 2. Large featured card (full width)
 * 3. Bento grid with 4 feature cards + 2 additional elements
 * 
 * Design Features:
 * - Responsive grid layout that adapts to screen size
 * - Interactive 3D tilt effects on all cards
 * - Video backgrounds for visual engagement
 * - Strategic use of spacing and typography
 */
const Features = () => (
  // Main section with dark background and bottom padding
  <section className="bg-black pb-52">
    {/* Container with responsive padding for content centering */}
    <div className="container mx-auto px-3 md:px-10">
      
      {/* ===== HEADER SECTION ===== */}
      {/* Introduction text with large padding for visual separation */}
      <div className="px-5 py-32">
        {/* Main headline */}
        <p className="font-circular-web text-lg text-blue-50">
          Into the Metagame Layer
        </p>
        
        {/* Descriptive subtitle with reduced opacity for hierarchy */}
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich and ever-expanding universe where a vibrant
          array of products converge into an interconnected overlay experience
          on your world.
        </p>
      </div>

      {/* ===== FEATURED CARD (FULL WIDTH) ===== */}
      {/* 
        Large hero card showcasing the main "radiant" feature
        - Full width with responsive height (h-96 on mobile, 65vh on medium+)
        - Rounded corners and border styling via border-hsla class
        - Overflow hidden to contain the tilt effects and video
      */}
      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              radia<b>n</b>t
            </>
          }
          description="A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure."
          isComingSoon
        />
      </BentoTilt>

      {/* ===== BENTO GRID SECTION ===== */}
      {/* 
        Complex CSS Grid layout:
        - 135vh height for consistent vertical spacing
        - 2 columns, 3 rows for desktop layout
        - Strategic use of grid-span classes for varied card sizes
        - 7-unit gap between grid items
      */}
      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        
        {/* Feature Card 1: "zigma" - Tall card (spans 2 rows on desktop) */}
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                zig<b>m</b>a
              </>
            }
            description="An anime and gaming-inspired NFT collection - the IP primed for expansion."
            isComingSoon
          />
        </BentoTilt>

        {/* Feature Card 2: "nexus" - Standard card with responsive margin */}
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                n<b>e</b>xus
              </>
            }
            description="A gamified social hub, adding a new dimension of play to social interaction for Web3 communities."
            isComingSoon
          />
        </BentoTilt>
        {/* Feature Card 3: "azul" - Standard card with responsive margin */}
        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                az<b>u</b>l
              </>
            }
            description="A cross-world AI Agent - elevating your gameplay to be more fun and productive."
            isComingSoon
          />
        </BentoTilt>
        {/* "More Coming Soon" Card - Special styling with violet background */}
        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            {/* Title with contrasting black text on light background */}
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            {/* Large decorative arrow icon positioned at bottom-right */}
            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>
        {/* Video Showcase Card - Pure video content without overlay */}
        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/feature-5.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);
export default Features;