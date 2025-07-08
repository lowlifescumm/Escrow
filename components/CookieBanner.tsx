import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (consent !== 'accepted') {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
    };
    
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-50">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg sm:p-6">
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <p className="ml-3 font-medium text-gray-900 dark:text-white">
                                <span className="md:hidden">We use cookies to improve your experience.</span>
                                <span className="hidden md:inline">We use cookies to personalize and enhance your experience on our site. By using our site, you agree to our use of cookies, as well as our Privacy Policy and Terms of Use.</span>
                            </p>
                        </div>
                        <div className="order-3 mt-4 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                            <button
                                onClick={handleAccept}
                                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Accept
                            </button>
                        </div>
                         <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 mt-2 sm:mt-0"
                            >
                                Settings
                            </button>
                        </div>
                         <div className="order-4 flex-shrink-0 sm:order-4 sm:ml-2 mt-2 sm:mt-0">
                             <button
                                type="button"
                                onClick={() => setIsVisible(false)}
                                className="-mr-1 flex p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                            >
                                <span className="sr-only">Dismiss</span>
                                <svg className="h-6 w-6 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
