
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dmv-blue text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">DMV EventHub</h3>
            <p className="text-sm text-gray-300">
              Your ultimate source for events in the DC, Maryland, and Virginia area.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-dmv-pink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-dmv-pink transition-colors">
                  Explore Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-dmv-pink transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore?category=Music" className="hover:text-dmv-pink transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Food%20%26%20Drink" className="hover:text-dmv-pink transition-colors">
                  Food & Drink
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Arts" className="hover:text-dmv-pink transition-colors">
                  Arts
                </Link>
              </li>
              <li>
                <Link to="/explore?category=Sports" className="hover:text-dmv-pink transition-colors">
                  Sports
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>info@dmveventhub.com</li>
              <li>Washington DC</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} DMV EventHub. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
