import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavLink {
  id: string;
  label: string;
}

const SiteHeader: React.FC = () => {
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

  const navLinks: NavLink[] = [
    { id: 'personalHeading', label: 'Home' },
    { id: 'projectsIndexContainer', label: 'Projects' },
    { id: 'experienceSection', label: 'Experience' },
    { id: 'aboutMeSection', label: 'About' },
    { id: 'contactSection', label: 'Contact' },
  ];

  // Add a background once the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle scroll locking for menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    // Short delay to allow any menu animations to complete
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Apply an offset to account for the fixed header
        setTimeout(() => {
          const headerOffset = 72;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }, 50);
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[10000] h-16 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-zinc-800 bg-zinc-950/80 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6">
        {/* Logo/Brand */}
        <button
          onClick={() => scrollToSection('personalHeading')}
          className="flex items-baseline gap-1 text-sm font-semibold tracking-tight text-zinc-50"
        >
          Mitch O'Brien
          <span className="text-zinc-500">.</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-md px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
          >
            {mobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Implemented with React Portal */}
      {mobileMenuOpen && portalContainer && createPortal(
        <div
          className="fixed top-16 left-0 right-0 bottom-0 z-[9999] flex w-full flex-col overflow-y-auto border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(false);
          }}
        >
          <div className="mobile-menu-content space-y-1 px-4 py-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full rounded-md px-4 py-3 text-left text-base text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-zinc-50"
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

export default SiteHeader;
