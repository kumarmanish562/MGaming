import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaGamepad, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";

/**
 * FOOTER COMPONENT WITH COMPREHENSIVE SITE NAVIGATION AND CONTACT INFORMATION
 * 
 * Features:
 * - Multi-column responsive layout
 * - Social media integration with platform-specific hover colors
 * - Newsletter subscription functionality
 * - Contact information with interactive elements
 * - Organized navigation links by category
 * - Modern glassmorphism design with gradients
 * - Accessibility features and proper semantic markup
 */

// ===== CONFIGURATION DATA =====

/**
 * Social media platform configuration
 * Each platform has specific branding colors for hover effects
 */
const socialLinks = [
  { 
    href: "https://discord.com/mgaming", 
    icon: <FaDiscord />, 
    label: "Discord",
    hoverColor: "hover:text-indigo-400" // Discord brand color
  },
  { 
    href: "https://twitter.com/mgaming", 
    icon: <FaTwitter />, 
    label: "Twitter",
    hoverColor: "hover:text-blue-400" // Twitter brand color
  },
  { 
    href: "https://youtube.com/mgaming", 
    icon: <FaYoutube />, 
    label: "YouTube",
    hoverColor: "hover:text-red-400" // YouTube brand color
  },
  { 
    href: "https://medium.com/@mgaming", 
    icon: <FaMedium />, 
    label: "Medium",
    hoverColor: "hover:text-green-400" // Medium brand color
  },
];

/**
 * Footer navigation links organized by categories
 * Provides comprehensive site navigation and important pages
 */
const footerLinks = {
  // Gaming-related pages and features
  gaming: [
    { name: "Game Library", href: "#games" },
    { name: "Tournaments", href: "#tournaments" },
    { name: "Leaderboards", href: "#leaderboards" },
    { name: "Gaming News", href: "#news" },
  ],
  // Customer support and help resources
  support: [
    { name: "Help Center", href: "#help" },
    { name: "Contact Us", href: "#contact" },
    { name: "Bug Reports", href: "#bugs" },
    { name: "Feature Requests", href: "#features" },
  ],
  // Company information and business pages
  company: [
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Press Kit", href: "#press" },
    { name: "Partnerships", href: "#partners" },
  ],
  // Legal and policy documents
  legal: [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Cookie Policy", href: "#cookies" },
    { name: "DMCA", href: "#dmca" },
  ],
};

/**
 * Contact information with interactive elements
 * Includes email, phone, and location with appropriate links
 */
const contactInfo = [
  { 
    icon: <FaEnvelope className="text-purple-400" />, 
    text: "mk86215@gmail.com",
    href: "mailto:mk86215@gmail.com" // Opens default email client
  },
  { 
    icon: <FaPhone className="text-blue-400" />, 
    text: "+91 933417XXXX",
    href: "tel:+91933417XXXX" // Initiates phone call on mobile devices
  },
  { 
    icon: <FaMapMarkerAlt className="text-green-400" />, 
    text: "Bhilai Chattisgarh, India",
    href: "#location" // Could link to Google Maps or location page
  },
];

// ===== MAIN FOOTER COMPONENT =====

const Footer = () => {
  // Dynamic year calculation for copyright notice
  const currentYear = new Date().getFullYear();

  return (
    // Main footer container with dark gradient background
    <footer className="w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white">
      
      {/* ===== MAIN FOOTER CONTENT SECTION ===== */}
      <div className="container mx-auto px-6 py-16">
        {/* Responsive grid layout: 1 column on mobile, 2 on tablet, 5 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* ===== BRAND & DESCRIPTION SECTION ===== */}
          {/* Takes 2 columns on large screens for more content space */}
          <div className="lg:col-span-2">
            
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3 mb-6">
              {/* Gradient background for logo icon */}
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <FaGamepad className="text-white text-2xl" />
              </div>
              {/* Brand name with gradient text effect */}
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                MGaming
              </h3>
            </div>

            {/* Company Description */}
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Redefining the gaming experience through innovative technology, 
              immersive gameplay, and a thriving community of passionate gamers worldwide.
            </p>

            {/* Contact Information Section */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">Get in Touch</h4>
              {/* Map through contact information with interactive elements */}
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                >
                  {/* Icon with scale animation on hover */}
                  <span className="group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </span>
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ===== GAMING NAVIGATION LINKS ===== */}
          <div>
            <h4 className="text-lg font-semibold text-purple-300 mb-6">Gaming</h4>
            <ul className="space-y-3">
              {/* Generate gaming-related navigation links */}
              {footerLinks.gaming.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    {/* Arrow icon that appears on hover */}
                    <TiLocationArrow className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== SUPPORT NAVIGATION LINKS ===== */}
          <div>
            <h4 className="text-lg font-semibold text-purple-300 mb-6">Support</h4>
            <ul className="space-y-3">
              {/* Generate support-related navigation links */}
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    {/* Arrow icon that appears on hover */}
                    <TiLocationArrow className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COMPANY & LEGAL LINKS SECTION ===== */}
          <div>
            {/* Company Links */}
            <h4 className="text-lg font-semibold text-purple-300 mb-6">Company</h4>
            <ul className="space-y-3 mb-8">
              {/* Generate company-related navigation links */}
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    {/* Arrow icon that appears on hover */}
                    <TiLocationArrow className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Legal Links */}
            <h4 className="text-lg font-semibold text-purple-300 mb-6">Legal</h4>
            <ul className="space-y-3">
              {/* Generate legal and policy navigation links */}
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    {/* Arrow icon that appears on hover */}
                    <TiLocationArrow className="text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== NEWSLETTER SUBSCRIPTION SECTION ===== */}
        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Newsletter Description */}
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-semibold text-purple-300 mb-2">Stay Updated</h4>
              <p className="text-gray-300 text-sm">Get the latest gaming news, updates, and exclusive content.</p>
            </div>
            
            {/* Newsletter Subscription Form */}
            <div className="flex gap-3 w-full lg:w-auto">
              {/* Email input field with glassmorphism styling */}
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-80 px-4 py-3 bg-white/10 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
              />
              {/* Subscribe button with gradient background and hover effects */}
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM BAR SECTION ===== */}
      {/* Contains copyright, social links, and back-to-top functionality */}
      <div className="border-t border-gray-700 bg-slate-900/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright Notice */}
            <p className="text-center text-sm text-gray-400 md:text-left">
              © {currentYear} MGaming. All rights reserved. Made with ❤️ for gamers worldwide.
            </p>

            {/* Social Media Links Section */}
            <div className="flex items-center gap-6">
              {/* Social media label - hidden on small screens */}
              <span className="text-sm text-gray-400 hidden sm:block">Follow us:</span>
              
              {/* Social media icons with platform-specific hover colors */}
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank" // Opens in new tab for external links
                    rel="noopener noreferrer" // Security best practice for external links
                    aria-label={link.label} // Accessibility label for screen readers
                    className={`text-gray-400 ${link.hoverColor} transition-all duration-300 hover:scale-110 p-2 rounded-lg hover:bg-white/10`}
                    title={link.label} // Tooltip on hover
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} // Smooth scroll to top
              className="text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center gap-2 text-sm hover:bg-white/10 px-3 py-2 rounded-lg"
            >
              {/* Rotated arrow icon pointing upward */}
              <TiLocationArrow className="rotate-90" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;