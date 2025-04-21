import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsOfService = () => {
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
                <Button size="lg" variant="outline" className="border-white text-dmv-blue hover:bg-white/10">
                  My Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    
      {/* Terms of Service Section */}
      <section className="py-16 px-4 bg-dmv-gray">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-dmv-blue">Terms of Service</h2>
            <Link to="/" className="text-dmv-blue hover:text-dmv-blue/80 font-medium flex items-center">
              Back to Home <ArrowLeft className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
              <p className="mb-4">
                Welcome to DMV's Best Events! These Terms of Service govern your use of our website and services.
              </p>
              
              <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
              
              <h2 className="text-xl font-bold mb-2">2. User Responsibilities</h2>
              <p className="mb-4">
                You agree to use our services responsibly and lawfully. You will not:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>Use our services for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users' enjoyment of the service</li>
                <li>Post false or misleading information</li>
              </ul>

              <h2 className="text-xl font-bold mb-2">3. Event Listings</h2>
              <p className="mb-4">
                We provide event information as a service but do not guarantee the accuracy of listings. Event organizers are responsible for their content.
              </p>

              <h2 className="text-xl font-bold mb-2">4. Intellectual Property</h2>
              <p className="mb-4">
                All content on this website, including text, graphics, and logos, is our property or used with permission and protected by copyright laws.
              </p>    

              <h2 className="text-xl font-bold mb-2">5. Limitation of Liability</h2>
              <p className="mb-4">
                We are not liable for any damages resulting from your use of our services or attendance at events listed on our platform.
              </p>

              <h2 className="text-xl font-bold mb-2">6. Account Termination</h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend your account for violations of these terms.
              </p>

              <h2 className="text-xl font-bold mb-2">7. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these terms at any time. Continued use of our services constitutes acceptance of the modified terms.
              </p>

              <h2 className="text-xl font-bold mb-2">8. Governing Law</h2>
              <p className="mb-4">
                These terms shall be governed by the laws of the state where our company is registered.
              </p>

              <h2 className="text-xl font-bold mb-2">9. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us at [legal@dmvbestevents.com].
              </p>
            </div>  
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;