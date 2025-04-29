import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NDA from './assets/NDA.jpg';
import logo from './assets/logo.png';

const Navbar2 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Optionally, you can redirect the user to the login page or home page
      navigate('/');
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 z-50" ref={menuRef}>
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center h-full py-2">
            <span className="flex items-center h-full group">
              <img 
                src={logo}
                alt="NDA Logo" 
                className="h-fit w-auto rounded-4xl mx-2 object-contain transition-all duration-300 ease-in-out transform group-hover:scale-128 group-hover:brightness-120"
                style={{
                  maxHeight: '100%',
                  maxWidth: '120px'
                }}
              />
            </span>
            <div className="flex flex-col justify-center">
                <p className="text-xs sm:text-sm md:text-[6px] lg:text-[12px] font-semibold leading-tight italic">
                  <span className="text-[#003893]">Nepal Drone Association</span>
                  <br className="sm:block md:block lg:block" />
                  <span className="text-[#003893]">Connecting Skies</span>
                  <span className="mx-1">,</span>
                  <br className="sm:hidden md:block lg:hidden" />
                  <span className="text-[#DC143C]">Transforming Lives</span>
                </p>
              </div>
          </div>
          

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-[#003893]">
            <Link to="/AdminNews" className="hover:text-[#DC143C]">News Management</Link>
            <Link to="/admindashboard" className="hover:text-[#DC143C]">User Management</Link>
            <Link to="/galleryupload" className="hover:text-[#DC143C]">Gallery Management</Link>
            <Link to="/admin" className=" hover:text-[#DC143C]">Admin Panel</Link>
            <button onClick={handleLogout} className="bg-[#003893] text-white px-4 py-2 rounded-md hover:bg-[#DC143C]">LOGOUT</button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
                to="/AdminNews"
                className="block px-3 py-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-md"
              >
                News Management
              </Link>
              <Link
                to="/admin"
                className="block px-3 py-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Admin Panel
              </Link>
              <Link
                to="/galleryupload"
                className="block px-3 py-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-md"
              >
                Gallery Management
              </Link>
              <Link
                to="/admindashboard"
                className="block px-3 py-2 text-black hover:text-gray-600 hover:bg-gray-50 rounded-md"
              >
                User Management
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-white bg-black hover:bg-gray-600 rounded-md"
              >
                LOGOUT
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;