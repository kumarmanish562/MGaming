import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGamepad, FaUsers, FaTrophy } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

/**
 * CONTACT COMPONENT WITH MODERN DESIGN AND COMPREHENSIVE FUNCTIONALITY
 * 
 * Features:
 * - Interactive contact form with validation
 * - Multiple contact methods (email, phone, location)
 * - Gaming statistics display
 * - Modern glassmorphism design with dark theme
 * - Responsive layout with decorative elements
 * - Success/error handling for form submissions
 * - Accessibility features and proper semantic markup
 */

// ===== UTILITY COMPONENTS =====

/**
 * Reusable image component with clipping effects
 * @param {string} src - Image source URL
 * @param {string} clipClass - CSS classes for clipping effects
 * @param {string} alt - Alt text for accessibility
 */
const ImageClipBox = ({ src, clipClass, alt = "Decorative gaming image" }) => (
  <div className={clipClass}>
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover"
      loading="lazy" // Performance optimization
    />
  </div>
);

// ===== CONFIGURATION DATA =====

/**
 * Contact methods with icons and interactive elements
 */
const contactMethods = [
  {
    icon: <FaEnvelope className="text-purple-400" />,
    title: "Email Us",
    description: "Get in touch via email",
    value: "mk86215@gmail.com",
    href: "mailto:mk86215@gmail.com",
    bgColor: "from-purple-500/20 to-blue-500/20"
  },
  {
    icon: <FaPhone className="text-blue-400" />,
    title: "Call Us",
    description: "Speak with our team",
    value: "+91 933417XXXX",
    href: "tel:+91933417XXXX",
    bgColor: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: <FaMapMarkerAlt className="text-green-400" />,
    title: "Visit Us",
    description: "Our location",
    value: "Bhilai, Chattisgarh",
    href: "#location",
    bgColor: "from-green-500/20 to-emerald-500/20"
  }
];

/**
 * Gaming statistics for visual appeal
 */
const gamingStats = [
  {
    icon: <FaGamepad className="text-purple-400" />,
    number: "150+",
    label: "Games Available",
  },
  {
    icon: <FaUsers className="text-blue-400" />,
    number: "2M+",
    label: "Active Players",
  },
  {
    icon: <FaTrophy className="text-yellow-400" />,
    number: "500+",
    label: "Tournaments",
  }
];

// ===== MAIN CONTACT COMPONENT =====

const Contact = () => {
  // ===== STATE MANAGEMENT =====
  
  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  // UI state management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  // ===== EVENT HANDLERS =====

  /**
   * Handles form input changes
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handles form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({ name: "", email: "", subject: "", message: "" });
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== COMPONENT RENDER =====

  return (
    // Main contact section with proper ID for navigation
    <section id="contact" className="my-20 min-h-96 w-screen px-10">
      {/* Main container with dark gradient background */}
      <div className="relative rounded-2xl bg-gradient-to-br from-black via-gray-900 to-slate-900 py-24 text-white overflow-hidden shadow-2xl shadow-purple-500/20">
        
        {/* ===== DECORATIVE BACKGROUND IMAGES ===== */}
        {/* Left side decorative elements - hidden on mobile */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96 opacity-30">
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/contact-1.webp`}
            clipClass="contact-clip-path-1"
            alt="Gaming character background decoration"
          />
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/contact-2.webp`}
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60`"
            alt="Gaming scene background decoration"
          />
        </div>

        {/* Right side character images */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80 opacity-40">
          <ImageClipBox
  src={`${import.meta.env.BASE_URL}img/swordman-partial.webp`}
  clipClass="absolute md:scale-125"
  alt="Gaming character partial view"
/>
          <ImageClipBox
            src={`${import.meta.env.BASE_URL}img/swordman.webp`}  // Use BASE_URL
            clipClass="sword-man-clip-path md:scale-125"
            alt="Gaming character full view"
          />
        </div>

        {/* ===== MAIN CONTENT AREA ===== */}
        <div className="relative z-10 max-w-6xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            {/* Brand tagline */}
            <p className="mb-6 font-general text-sm uppercase tracking-wider text-purple-300">
              Join MGaming Community
            </p>

            {/* Main heading with animated title */}
            <AnimatedTitle
              title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
              className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent"
            />

            {/* Description text */}
            <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Ready to revolutionize gaming? Connect with us and be part of the next generation gaming experience.
            </p>
          </div>

          {/* ===== CONTACT CONTENT GRID ===== */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* ===== LEFT COLUMN: CONTACT INFO & STATS ===== */}
            <div className="space-y-8">
              
              {/* Contact Methods */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Get in Touch</h3>
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    className="block p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon with gradient background */}
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                        {method.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                        <p className="text-purple-300 font-medium">{method.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Gaming Statistics */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-purple-300 mb-6">Our Gaming Community</h3>
                <div className="grid grid-cols-1 gap-4">
                  {gamingStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/10">
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">{stat.number}</p>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== RIGHT COLUMN: CONTACT FORM ===== */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-purple-300 mb-6">Send us a Message</h3>
              
              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 resize-vertical"
                    placeholder="Tell us about your gaming ideas, feedback, or questions..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  title={isSubmitting ? "Sending..." : "Send Message"}
                  rightIcon={!isSubmitting && <TiLocationArrow />}
                  containerClass={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white flex items-center justify-center gap-2 shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
                  disabled={isSubmitting}
                />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-300 text-center">
                    🎉 Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-center">
                    ❌ Failed to send message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ===== CALL TO ACTION SECTION ===== */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Level Up Your Gaming Experience?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of gamers already part of our community. Experience the future of gaming today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  title="Join Community"
                  containerClass="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
                />
                <Button
                  title="View Games"
                  containerClass="bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-purple-400/50 shadow-lg transition-all duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;