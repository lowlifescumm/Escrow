import React from 'react';
import { PhoneIcon, MailIcon } from './icons';

const ContactPage: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-gray-900 py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        We're here to help. Reach out to us with any questions or concerns about your transaction.
                    </p>
                </div>

                <div className="mt-20 max-w-lg mx-auto grid grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
                    {/* Email Card */}
                    <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                                <MailIcon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Email Support</h2>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                Best for non-urgent inquiries. We'll get back to you within one business day.
                            </p>
                            <p className="mt-4 font-semibold text-primary-600 dark:text-primary-400">
                                sales@concordtitle.net
                            </p>
                        </div>
                        <div className="mt-6 flex-1 flex items-end">
                             <a
                                href="mailto:sales@concordtitle.com"
                                className="rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Send an Email
                            </a>
                        </div>
                    </div>

                    {/* Phone Card */}
                     <div className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400">
                                <PhoneIcon className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Support</h2>
                            <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                                For urgent matters or to speak directly with a closing agent.
                            </p>
                            <p className="mt-4 font-semibold text-primary-600 dark:text-primary-400">
                                (865) 601-2916
                            </p>
                        </div>
                        <div className="mt-6 flex-1 flex items-end">
                             <a
                                href="tel:+1-(865) 601-2916"
                                className="rounded-md bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
