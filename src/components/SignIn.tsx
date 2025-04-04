import { SignIn as ClerkSignIn } from '@clerk/clerk-react';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dmv-gray">
      <div className="w-full max-w-md p-8">
        <ClerkSignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white shadow-lg rounded-lg",
              headerTitle: "text-2xl font-bold text-dmv-blue",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border-dmv-blue text-dmv-blue hover:bg-dmv-blue/10",
              formButtonPrimary: "bg-dmv-blue hover:bg-dmv-blue/90",
              footerActionLink: "text-dmv-blue hover:text-dmv-blue/80"
            }
          }}
        />
      </div>
    </div>
  );
} 