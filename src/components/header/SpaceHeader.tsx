import React, { useState, useEffect } from 'react';
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
  
  // Handle scroll locking and menu positioning
  useEffect(() => {
    if (mobileMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = 'hidden';
      
      // Force scroll to top when menu opens to ensure it's visible
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    } else {
      // Restore normal scrolling
      document.body.style.overflow = '';
    }
    
    // Clean up in case component unmounts with menu open
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Very simple scroll function
  const scrollToSection = (id: string) => {
    // Store whether mobile menu was open
    const wasMenuOpen = mobileMenuOpen;
    
    // If mobile menu is open, close it first
    if (mobileMenuOpen) {
      // Simply close the menu
      setMobileMenuOpen(false);
    }
    
    // Delay scrolling if menu was open
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        // Get the element's position relative to the document
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const elementTop = rect.top + scrollTop;
        
        // Calculate position with header offset
        const offsetTop = elementTop - 80;
        
        // Use standard scrollTo with a smooth behavior
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }, wasMenuOpen ? 100 : 0);
  };
  
  // Super-simple toggle menu function
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`space-header ${
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
      
      {/* Mobile Navigation - Simplified implementation */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 w-full h-full bg-black/95 backdrop-blur-xl border-t border-purple-500/30 z-[9999] shadow-lg flex flex-col"
        >
          <div className="pt-[64px] max-h-full overflow-y-auto flex-1">
            <div className="relative overflow-hidden h-full">
              {/* Background effects for mobile menu */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
            <StarBackground />
              </div>
              
              {/* Mobile navigation links */}
              <div className="px-4 py-8 space-y-4 relative z-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-200 hover:text-white hover:bg-purple-900/30 block px-4 py-5 rounded-lg text-xl font-medium w-full text-center transition-all duration-200 border border-purple-500/20"
              >
                {link.label}
              </button>
            ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SpaceHeader;