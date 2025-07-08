import React from 'react';
import { KeyIcon, BuildingIcon, DocumentIcon, ArrowRightIcon } from './icons';

interface HomePageProps {
  onNavigateToLogin: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToLogin }) => {
  return (
    <>
      {/* Hero Section */}
       <div className="relative bg-gray-900">
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
            <img 
              src="/image_2.jpg" 
              alt="A real estate agent discussing documents with a couple in a new home."
              className="w-full h-full object-cover object-center"
            />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-60"></div>

        <div className="relative max-w-7xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-48 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Seamless Real Estate Closings, Secured with Confidence.
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Concord Title provides comprehensive title and escrow services to ensure your property transactions are smooth, secure, and stress-free.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={onNavigateToLogin}
                  className="rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Access Client Portal
                </button>
              </div>
            </div>
        </div>
      </div>


      {/* Features Section */}
      <section className="bg-white dark:bg-gray-800 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:text-center">
             <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Your Trusted Partner</h2>
             <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Everything you need for a successful closing</p>
             <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                From initial title search to final policy issuance, we handle every detail with precision and care.
             </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <BuildingIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    Title Insurance
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">Protect your property rights and investment with our comprehensive title insurance policies for owners and lenders.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <KeyIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    Escrow Services
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">As a neutral third party, we hold funds and documents securely, ensuring all conditions of your agreement are met before closing.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <DocumentIcon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    Closing & Settlement
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">Our experienced team coordinates all aspects of the closing process, ensuring a smooth and timely final settlement.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;