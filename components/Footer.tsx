import React from 'react';
import { ConcordTitleLogoIcon } from './icons';
import { Page } from '../App';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
                <div className="flex justify-center mb-8">
                    <button onClick={() => onNavigate('home')} className="flex items-center space-x-3">
                         <ConcordTitleLogoIcon className="h-12 w-12 text-gray-800 dark:text-white" />
                         <span className="text-2xl font-bold text-gray-800 dark:text-white">Concord Title</span>
                    </button>
                </div>
                <nav className="flex flex-wrap justify-center -mx-5 -my-2" aria-label="Footer">
                    <div className="px-5 py-2">
                        <button onClick={() => onNavigate('home')} className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white">Home</button>
                    </div>
                    <div className="px-5 py-2">
                        <button onClick={() => onNavigate('services')} className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white">Services</button>
                    </div>
                    <div className="px-5 py-2">
                        <button onClick={() => onNavigate('about')} className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white">About Us</button>
                    </div>
                    <div className="px-5 py-2">
                        <button onClick={() => onNavigate('contact')} className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white">Contact</button>
                    </div>
                </nav>
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Concord Title Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
