import React, { useState } from 'react';
import { ConcordTitleLogoIcon, ArrowRightIcon } from './icons';
import { Page } from '../App';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    onNavigateToLogin: () => void;
    currentPage: Page;
}

const NavLink: React.FC<{
    page: Page;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    children: React.ReactNode;
}> = ({ page, currentPage, onNavigate, children }) => {
    const isActive = page === currentPage;
    return (
        <button
            onClick={() => onNavigate(page)}
            className={`text-sm font-semibold leading-6 transition-colors ${
                isActive 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400'
            }`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, onNavigateToLogin, currentPage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <button onClick={() => onNavigate('home')} className="-m-1.5 p-1.5 flex items-center space-x-3">
                        <span className="sr-only">Concord Title</span>
                        <ConcordTitleLogoIcon className="h-10 w-10 text-gray-800 dark:text-white" />
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Concord Title</span>
                    </button>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <NavLink page="services" currentPage={currentPage} onNavigate={onNavigate}>Services</NavLink>
                    <NavLink page="about" currentPage={currentPage} onNavigate={onNavigate}>About Us</NavLink>
                    <NavLink page="contact" currentPage={currentPage} onNavigate={onNavigate}>Contact</NavLink>
                </div>
                <div className="hidden lg:flex flex-1 justify-end">
                    <button
                        onClick={onNavigateToLogin}
                        className="group inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                        User Login
                        <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </nav>
            {/* Mobile menu */}
            {isMobileMenuOpen && (
                 <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-50" />
                    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <button onClick={() => onNavigate('home')} className="-m-1.5 p-1.5 flex items-center space-x-3">
                                <ConcordTitleLogoIcon className="h-8 w-8 text-gray-800 dark:text-white" />
                                <span className="text-xl font-bold text-gray-900 dark:text-white">Concord Title</span>
                            </button>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <button onClick={() => { onNavigate('services'); setIsMobileMenuOpen(false); }} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">Services</button>
                                    <button onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">About Us</button>
                                    <button onClick={() => { onNavigate('contact'); setIsMobileMenuOpen(false); }} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">Contact</button>
                                </div>
                                <div className="py-6">
                                    <button onClick={onNavigateToLogin} className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">User Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
