import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeaderProps {
  onLogout?: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog.html' },
    { name: 'Courses', href: '#courses' }
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Omnia Courses
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <LogOut size={16} />
          Sign Out
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 pb-4 border-t border-gray-700">
          <nav className="flex flex-col space-y-4 pt-4 px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }}
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 font-medium text-left flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* Modal for Courses */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#16182F] text-white p-8 rounded-2xl shadow-2xl w-[90%] max-w-md animate-fade-in">
            <div className="flex flex-col items-center space-y-4">
              <Sparkles className="w-12 h-12 text-purple-300 animate-pulse" />
              <h2 className="text-2xl font-bold text-center">We're working on it!</h2>
              <p className="text-center text-gray-300">
                Our Courses section is under development.<br /> Stay tuned!
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-600 hover:to-purple-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
