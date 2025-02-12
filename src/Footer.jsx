import React from 'react';
import facebook from './assets/facebook.png';
import instagram from './assets/instagram.png';
import twitter from './assets/twitter.png';
import linkedin from './assets/linkedin.jpg';
import NDA from './assets/NDA.jpg';

const Footer = () => {
  const footerLinks = {
    about: {
      title: 'About',
      links: [
        { text: 'How it works', href: '#' },
        { text: 'Featured', href: '#' },
        { text: 'Partnership', href: '#' },
        { text: 'Business Relation', href: '#' }
      ]
    },
    explore: {
      title: 'Explore',
      links: [
        { text: 'Features', href: '#' },
        { text: 'Showcase', href: '#' },
        { text: 'Events', href: '#' },
        { text: 'Sitemap', href: '#' }
      ]
    },
    whereToBuy: {
      title: 'Where to buy',
      links: [
        { text: 'Online Store', href: '#' },
        { text: 'Retail Store', href: '#' },
        { text: 'Become a Dealer', href: '#' },
        { text: 'Authorized Retail', href: '#' }
      ]
    }
  };

  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={NDA} className="rounded-3xl"></img>
              <p className="text-gray-400 mt-2 text-sm">
              Nepal Drone Association<br></br>
              nepaldroneassociation.org.np<br></br>
              info@nepaldroneassociation.org.np<br></br>
              +977-9843723924<br></br>
              Lamtingan Marg, Ward No.4, Kathmandu Metropolitan<br></br>
              Opposite to J.P House<br></br>
              27.726352000141453, 85.33294069528846<br></br>

              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full" >
                <img src={facebook} className="w-10 h-8 rounded-full"></img>
              </a>
              <a href="#" className="p-2 rounded-full">
                <img src={instagram} className="w-10 h-10 bg-white rounded-full"></img>
              </a>
              <a href="#" className="p-2 rounded-full">
                <img src={linkedin} className="w-10 h-10 rounded-full"></img>
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              ©2022 Company Name. All rights reserved
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy & Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">
                Terms & Condition
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;