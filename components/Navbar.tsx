import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Youtube } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './Editable';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Map nav links to paths
  const getPath = (name: string) => {
    if (name === 'Home') return '/';
    return `/${name.toLowerCase()}`;
  };

  return (
    <nav 
      className={`fixed w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-void/90 backdrop-blur-md border-b border-cyan/20 py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Youtube className="w-8 h-8 text-cyan group-hover:text-magenta transition-colors duration-300" />
          <span className="text-2xl font-orbitron font-bold text-white tracking-widest group-hover:text-glow transition-all duration-300 flex">
            <EditableText path="global.brandNamePrefix" />
            <span className="text-cyan group-hover:text-magenta ml-1">
              <EditableText path="global.brandNameSuffix" />
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {content.global.navLinks.map((linkName, idx) => {
            const path = getPath(linkName);
            const isActive = location.pathname === path;
            return (
              <Link
                key={idx}
                to={path}
                className={`font-montserrat text-sm font-medium tracking-wide transition-all duration-300 hover:text-magenta hover:text-glow ${
                  isActive ? 'text-cyan text-glow' : 'text-ice'
                }`}
              >
                <EditableText path={`global.navLinks.${idx}`} />
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-cyan transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-void/95 backdrop-blur-xl z-30 flex flex-col items-center justify-center space-y-8 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', height: '100vh' }}
      >
        <button 
          className="absolute top-6 right-6 text-white hover:text-magenta"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-10 h-10" />
        </button>
        
        {content.global.navLinks.map((linkName, idx) => {
           const path = getPath(linkName);
           const isActive = location.pathname === path;
           return (
            <Link
              key={idx}
              to={path}
              className={`font-orbitron text-2xl tracking-widest transition-all duration-300 hover:text-cyan ${
                isActive ? 'text-cyan text-glow' : 'text-white'
              }`}
            >
              {linkName}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;