import React from 'react';
import { PhoneIcon, MailIcon, MapPinIcon } from './icons';

const ContactPage: React.FC = () => {
    return (
        <div className="relative bg-white dark:bg-gray-800">
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-slate-50 dark:bg-gray-900" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
                    <div className="absolute inset-0">
                         <img 
                            src="/image_1.jpg"
                            alt="Overhead view of real estate documents, keys, and a calculator on a desk."
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary-700/70 mix-blend-multiply" />
                    </div>
                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white">Get in touch</span>
                        </h1>
                        <p className="mt-6 max-w-lg mx-auto text-center text-xl text-primary-100 sm:max-w-3xl">
                           We're here to help with any questions you have about your closing process. Reach out to us today.
                        </p>
                    </div>
                </div>
            </div>
             <div className="bg-slate-50 dark:bg-gray-900 py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                         <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">Fill out the form and our team will get back to you within 24 hours.</p>
                        </div>
                        <div className="flex items-start space-x-4">
                            <MapPinIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Our Address</h3>
                                <p className="text-gray-600 dark:text-gray-300">3000 Meridian Blvd Suite #140, Franklin, TN 37067</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <PhoneIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Phone Number</h3>
                                <p className="text-gray-600 dark:text-gray-300">(865) 201-2916</p>
                            </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <MailIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Address</h3>
                                <p className="text-gray-600 dark:text-gray-300">corporate@concordtitle.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                                <div className="mt-1">
                                    <input type="text" name="full-name" id="full-name" autoComplete="name" className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                <div className="mt-1">
                                    <input id="email" name="email" type="email" autoComplete="email" className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                <div className="mt-1">
                                    <textarea id="message" name="message" rows={4} className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md focus:ring-primary-500 focus:border-primary-500"></textarea>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ContactPage;
