import React, { useState } from 'react';
import { ConcordTitleLogoIcon, MailIcon, LockIcon } from './icons';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onNavigateHome: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateHome }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    onLogin(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
            <button onClick={onNavigateHome} className="inline-block p-3 bg-primary-100 dark:bg-gray-800 rounded-full mb-4 transition-transform hover:scale-110">
                 <ConcordTitleLogoIcon className="h-12 w-12 text-gray-800 dark:text-white" />
            </button>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Client Portal Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Access your secure Concord Title dashboard.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-t-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                     <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-b-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-3 pl-10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoggingIn || !email || !password}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-3 px-4 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-primary-400 disabled:cursor-not-allowed"
            >
              {isLoggingIn ? (
                 <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                 </>
              ) : 'Sign in'}
            </button>
          </div>
        </form>
         <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Concord Title Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
