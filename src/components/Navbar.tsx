import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useAuth, UserButton } from '@clerk/clerk-react';

const Navbar: React.FC = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-dmv-blue font-bold text-2xl flex items-center space-x-2">
          <span className="text-dmv-pink">DMV</span>
          <span>EventBuzz</span>
        </Link>
        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-dmv-dark hover:text-dmv-blue transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-dmv-dark hover:text-dmv-blue transition-colors">
            Explore
          </Link>
          {isSignedIn && (
            <Link to="/profile" className="text-dmv-dark hover:text-dmv-blue transition-colors">
              My Events
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/explore">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="flex space-x-2">
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm" className="bg-dmv-blue hover:bg-dmv-blue/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
