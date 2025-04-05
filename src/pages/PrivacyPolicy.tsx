import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-dmv-blue text-white py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover<span className="text-dmv-pink"> DMV's</span> Best Events
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Explore the hottest events happening in DMV! 
              Find concerts, festivals, workshops, and more!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/explore">
                <Button size="lg" className="bg-dmv-gold hover:bg-dmv-gold/90 text-dmv-blue font-semibold">
                  Find Events
                </Button>
              </Link>
              <Link to="/profile">
                
              </Link>
              <Link to="/profile">
                <Button size="lg" variant="outline" className="border-white text-dmv-blue hover:bg-white/10">
                  My Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    
      {/* Privacy Policy Section */}
      <section className="py-16 px-4 bg-dmv-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Privacy Policy</h2>
            <Link to="/" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              Back to Home <ArrowLeft className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8">
          <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          Welcome to DMV's Best Events! This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
        </p>
        
        <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          When you visit our website, we may collect the following information:
        </p>
        
        <ul className="list-disc pl-5 mb-4">
          <li>Your IP address</li>
          <li>Your browser type and version</li>
          <li>The pages you view on our site</li>
          <li>The date and time of your visit</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>Provide and improve our services</li>
          <li>Analyze usage patterns</li>
          <li>Customize content based on your preferences</li>
        </ul>

        <h2 className="text-xl font-bold mb-2">3. Data Sharing and Disclosure</h2>
        <p className="mb-4">
            We do not share your personal information with third parties for marketing purposes.
        </p>

        <h2 className="text-xl font-bold mb-2">4. Data Security</h2>
        <p className="mb-4">
            We implement security measures to protect your personal information.
        </p>    

        <h2 className="text-xl font-bold mb-2">5. Your Rights</h2>
        <p className="mb-4">
            You have the right to access, correct, or delete your personal information.
        </p>

        <h2 className="text-xl font-bold mb-2">6. Changes to This Privacy Policy</h2>
        <p className="mb-4">
            We reserve the right to update this Privacy Policy at any time.
        </p>

        <h2 className="text-xl font-bold mb-2">7. Contact Us</h2>
        <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at [contact@dmvbestevents.com].
        </p>
      </div>  
    </div>
  </div>
 </section>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;

        


