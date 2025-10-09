import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { StarBackground } from '../magicui/star-background';
import { DataGrid } from '../magicui/data-grid';
import './space-header.css';

interface NavLink {
  id: string;
  label: string;
}

const SpaceHeader: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  // Setup portal container
  useEffect(() => {
    // Check if the portal container already exists
    let container = document.getElementById('mobile-menu-portal');
    
    // Create it if it doesn't exist
    if (!container) {
      container = document.createElement('div');
      container.id = 'mobile-menu-portal';
      document.body.appendChild(container);
    }
    
    setPortalContainer(container);
    
    // Cleanup function
    return () => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []);

  // Define navigation links - update these with the actual section IDs from your page
  const navLinks: NavLink[] = [
    { id: 'personalHeading', label: 'Home' },
    { id: 'projectsIndexContainer', label: 'Projects' },
    { id: 'aboutMeSection', label: 'About' },
    { id: 'contactSection', label: 'Contact' },
  ];

  // Simple scroll behavior - just to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Add background when scrolled down, transparent at top
      if (currentScrollPos > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle scroll locking for menu
  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore normal scrolling
      document.body.style.overflow = '';
    }
    
    // Clean up in case component unmounts with menu open
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Improved scroll function using scrollIntoView
  const scrollToSection = (id: string) => {
    // If mobile menu is open, close it first
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    
    // Short delay to allow any menu animations to complete
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Use scrollIntoView with options for better browser compatibility
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Apply an offset to account for the fixed header
        // This uses a small additional scroll after the main scrollIntoView
        setTimeout(() => {
          const headerOffset = 80; // Adjust based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }, 50);
  };
  
  // Toggle menu function
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only do this if the mobile menu is open
      if (!mobileMenuOpen) return;
      
      // Check if the click target is part of the menu content or the toggle button
      const menuContent = document.querySelector('.mobile-menu-content');
      const mobileMenuButton = document.querySelector('.mobile-menu-button');
      const clickedElement = event.target as Node;
      
      // If we clicked outside both the menu content and the toggle button, close the menu
      if (
        menuContent && 
        !menuContent.contains(clickedElement) && 
        mobileMenuButton && 
        !mobileMenuButton.contains(clickedElement)
      ) {
        setMobileMenuOpen(false);
      }
    };

    // Add event listener when mobile menu is open
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`space-header fixed top-0 left-0 right-0 z-[10000] ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
        <StarBackground />
        <DataGrid
          columns={50}
          rows={8}
          cellSize={20}
          color="#4c61ff"
          density={0.05}
          speed={0.4}
          interactive={false}
          className="w-full h-full opacity-20"
        />
        {/* Add shooting stars */}
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>
      
      <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <div className="text-white font-bold text-xl flex items-center logo-text">
              <span className="text-purple-400">M</span>
              <span className="text-purple-400">I</span>
              <span className="text-purple-400">T</span>
              <span className="text-purple-400">C</span>
              <span className="text-purple-400">H</span>
              <span className="text-purple-700 ml-1">O</span>
              <span className="text-purple-700">'</span>
              <span className="text-purple-700">B</span>
              <span className="text-purple-700">R</span>
              <span className="text-purple-700">I</span>
              <span className="text-purple-700">E</span>
              <span className="text-purple-700">N</span>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-200 hover:text-white px-4 py-2 text-base font-medium transition-colors relative group nav-item-glow"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Mobile Menu Button - Simplified */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:text-white hover:bg-purple-900/40 focus:outline-none transition-all"
            >
              {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation - Implemented with React Portal */}
      {mobileMenuOpen && portalContainer && createPortal(
        <div 
          className="fixed top-[64px] left-0 right-0 bottom-0 w-full h-[calc(100vh-64px)] bg-black/95 backdrop-blur-xl border-t border-purple-500/30 z-[9999] shadow-lg flex flex-col overflow-y-auto"
        >
          {/* Background effects for mobile menu */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <StarBackground />
          </div>
              
          {/* Mobile navigation links - Positioned at the top of the menu */}
          <div className="px-4 py-8 space-y-6 relative z-10 mobile-menu-content">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-200 hover:text-white hover:bg-purple-900/30 block px-4 py-5 rounded-lg text-xl font-medium w-full text-center transition-all duration-200 border border-purple-500/20"
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>,
        portalContainer
      )}
    </header>
  );
};

export default SpaceHeader;