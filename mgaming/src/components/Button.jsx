import clsx from "clsx";

/**
 * REUSABLE BUTTON COMPONENT
 * 
 * A highly customizable button with advanced hover animations
 * Features a skew text effect that creates a dynamic transition
 * 
 * @param {string} id - Unique identifier for the button element
 * @param {string} title - Text content displayed on the button
 * @param {ReactNode} rightIcon - Icon component positioned on the right side
 * @param {ReactNode} leftIcon - Icon component positioned on the left side
 * @param {string} containerClass - Additional CSS classes for styling customization
 */
const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    // Main button element with dynamic class composition
    <button
      id={id}
      className={clsx(
        // Base button styles - creates foundation appearance
        "group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black",
        // Custom classes passed from parent component
        containerClass
      )}
    >
      {/* Left icon - conditionally rendered if provided */}
      {leftIcon}

      {/* Text container with advanced hover animation */}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        
        {/* Primary text layer - visible by default */}
        <div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
          {title}
        </div>
        
        {/* Secondary text layer - hidden initially, animates on hover */}
        <div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
          {title}
        </div>
      </span>

      {/* Right icon - conditionally rendered if provided */}
      {rightIcon}
    </button>
  );
};

export default Button;