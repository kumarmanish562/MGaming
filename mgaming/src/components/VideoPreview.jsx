import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

// VideoPreview component adds a 3D hover animation effect using GSAP
export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false); // Track if the mouse is hovering

  const sectionRef = useRef(null); // Ref to the outer section (container)
  const contentRef = useRef(null); // Ref to the inner content (for parallax effect)

  // Function to handle mouse movement within the section
  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect(); // Get size and position of the section

    // Calculate mouse position relative to the center of the section
    const xOffset = clientX - (rect.left + rect.width / 2);
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // Animate the container to follow mouse direction with rotation
      gsap.to(sectionRef.current, {
        x: xOffset, // Move horizontally
        y: yOffset, // Move vertically
        rotationY: xOffset / 2, // Rotate around Y-axis
        rotationX: -yOffset / 2, // Rotate around X-axis
        transformPerspective: 500, // Adds depth perspective
        duration: 1,
        ease: "power1.out", // Easing for smooth transition
      });

      // Animate the content in the opposite direction (parallax effect)
      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  // Reset animation when hover ends
  useEffect(() => {
    if (!isHovering) {
      // Reset container position and rotation
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      });
      // Reset content position
      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isHovering]);
  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove} // Trigger animation on mouse move
      onMouseEnter={() => setIsHovering(true)} // Start hover effect
      onMouseLeave={() => setIsHovering(false)} // End hover effect
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px", // Add 3D perspective
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d", // Maintain 3D child transforms
        }}
      >
        {children} {/* Render children inside animated container */}
      </div>
    </section>
  );
};
export default VideoPreview;
