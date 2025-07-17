'use client';

import React from 'react';
import Link from 'next/link';
import SignupForm from '@/components/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center px-4 py-30">
      <div className="w-full max-w-md space-y-4">
        <SignupForm />
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login here
            </Link>
          </p>
        </div>
        
        <div className="text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;