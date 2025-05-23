import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import linkedin from './assets/linkedin.jpg';
import logo from './assets/logo.png';

const Footer = ({ onAboutClick, onTeamClick, onNewsClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '';

  const handleNavigation = async (e, callback, section) => {
    e.preventDefault();
    if (isHomePage) {
      // If on homepage, just scroll
      callback();
    } else {
      // If on another page, navigate to homepage first
      localStorage.setItem('scrollTarget', section);
      navigate('/');
    }
  };

  const footerLinks = {
    about: {
      title: 'Useful Links',
      links: [
        { 
          text: 'About Us', 
          to: '#',
          onClick: (e) => handleNavigation(e, onAboutClick, 'about')
        },
        { 
          text: 'Gallery', 
          to: '/gallery'
        },
        { 
          text: 'Our Team', 
          to: '#',
          onClick: (e) => handleNavigation(e, onTeamClick, 'team')
        },
        { 
          text: 'News & Events', 
          to: '#',
          onClick: (e) => handleNavigation(e, onNewsClick, 'news')
        },
        { 
          text: 'Become Member', 
          to: '/member'
        }
      ]
    },
  };

  const handleLinkClick = (link, e) => {
    if (link.onClick) {
      link.onClick(e);
    } else {
      // For regular links without special navigation
      if (!link.to.startsWith('#')) {
        // Don't prevent default for regular routes
        return;
      }
      e.preventDefault();
    }
  };

  return (
    <footer className="bg-black text-white px-4 sm:px-6 py-8 sm:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Link to="/" className="flex items-center h-full group">
              <img 
                src={logo} 
                alt="Nepal Drone Association Logo"
                className="w-24 sm:w-28 h-auto rounded-2xl transition-all duration-300 ease-in-out transform group-hover:scale-132 group-hover:brightness-120 group-hover:shadow-lg"
              />
              </Link>
              <p className="text-gray-400 mt-4 text-sm space-y-1">
                <span className="block font-semibold text-white">Nepal Drone Association</span>
                <span className="block hover:text-white">nepaldroneassociation.org.np</span>
                <a href="mailto:info@nepaldroneassociation.org.np" className="block hover:text-white">
                  info@nepaldroneassociation.org.np
                </a>
                <a href="tel:+9779843723924" className="block hover:text-white">
                  +977-9843723924
                </a>
                <span className="block">Lamtingan Marg, Ward No.4,</span>
                <span className="block">Kathmandu Metropolitan</span>
                <span className="block">Opposite to J.P House</span>
              </p>
            </div>
            <div className="flex space-x-4 mt-6">
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:opacity-80 transition-opacity"
              >
                <img src={facebook} alt="Facebook" className="w-8 h-8 rounded-full" />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:opacity-80 transition-opacity"
              >
                <img src={instagram} alt="Instagram" className="w-8 h-8 rounded-full" />
              </a>
              <a 
                href="/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 hover:opacity-80 transition-opacity"
              >
                <img src={linkedin} alt="LinkedIn" className="w-8 h-8 rounded-full" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-semibold text-lg mb-4 capitalize">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <Link
                      to={link.to}
                      onClick={(e) => handleLinkClick(link, e)}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
                    >
                      <span className="hover:translate-x-1 transition-transform duration-200">
                        {link.text}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nepal Drone Association. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;