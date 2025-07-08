import React from 'react';
import { KeyIcon, BuildingIcon, DocumentIcon } from './icons';

const services = [
    {
        name: 'Title Insurance',
        description: 'A crucial component of any real estate transaction, title insurance protects homeowners and lenders from financial loss due to defects in a property title. Our comprehensive title searches and policies ensure your investment is secure against unforeseen claims, liens, or encumbrances from the past.',
        icon: BuildingIcon,
    },
    {
        name: 'Escrow Services',
        description: 'As a neutral, third-party intermediary, we securely hold all funds, documents, and instructions related to your real estate transaction. We ensure that all conditions of the sale agreement are met by both parties before any funds or property change hands, providing peace of mind and security.',
        icon: KeyIcon,
    },
    {
        name: 'Closing & Settlement',
        description: 'Our experienced closing agents meticulously coordinate all aspects of the final settlement. We prepare all necessary documents, such as the settlement statement, facilitate the signing, and ensure that all payments are disbursed correctly. We streamline the final steps to make your closing day smooth and successful.',
        icon: DocumentIcon,
    }
];

const ServicesPage: React.FC = () => {
    return (
        <div className="isolate">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="/image_0.jpg"
                        alt="A close-up of a client signing a document with a pen."
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply" aria-hidden="true" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Our Services
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-200">
                            Providing comprehensive solutions for a secure and seamless closing experience. Your property transaction is our priority.
                        </p>
                    </div>
                </div>
            </div>


            {/* Services List Section */}
            <div className="bg-white dark:bg-gray-800 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">Expertise You Can Trust</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Core Services for Your Protection</p>
                    </div>
                    <div className="max-w-4xl mx-auto mt-16 sm:mt-20 lg:mt-24">
                        <dl className="space-y-12">
                            {services.map((service) => (
                                <div key={service.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                                            <service.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                        </div>
                                        {service.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">{service.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;