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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Account for header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setMobileMenuOpen(false);
    }
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
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default SpaceHeader;