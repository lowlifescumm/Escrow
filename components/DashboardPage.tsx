import React, { useState, useEffect, useCallback } from 'react';
import { ConcordTitleLogoIcon, LogoutIcon, UserIcon, DocumentIcon } from './icons';
import BalanceSheet, { BalanceSheetData } from './BalanceSheet';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
}

interface DashboardPageProps {
  onLogout: () => void;
  userEmail: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, userEmail }) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [balanceSheetData, setBalanceSheetData] = useState<BalanceSheetData | null>(null);
  const [otherAssets, setOtherAssets] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    const API_URL = `https://script.google.com/macros/s/AKfycbxhxMGEzEf1V5pQu4WwcTVS4UsohLPg8QztvMA34YQYRwtOVc44N0tW76xC7G8bHPw7/exec?action=getDashboardData&email=${encodeURIComponent(userEmail)}`;

    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const fetchedTransactions: Transaction[] = result.data.transactions || [];
        const calculatedBalance = fetchedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
        
        setBalance(calculatedBalance);
        setAccountId(result.data.accountId);
        setTransactions(fetchedTransactions);
        setCompanyName(result.data.companyName);
        
        const rawBalanceSheetData = result.data.balanceSheet || {};
        // Corrected key to lowercase 'other assets' to match the Google Sheet category name.
        const otherAssetsData = rawBalanceSheetData['other assets'] || [];
        const totalOtherAssets = otherAssetsData.reduce((sum, item) => sum + (item.value || 0), 0);
        setOtherAssets(totalOtherAssets);

        // The 'other assets' category is now intentionally passed to the BalanceSheet component
        // to be displayed as an informational item, but it will not be included in the total asset calculation.
        setBalanceSheetData(rawBalanceSheetData);

      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data. The response was not successful.');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      signDisplay: 'never'
    }).format(Math.abs(amount));
  };

  const formattedBalance = balance !== null 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance)
    : '';
    
  const formattedOtherAssets = otherAssets !== null
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(otherAssets)
    : '';
  
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse"></div>
        <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        </div>
    </div>
  );

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <ConcordTitleLogoIcon className="h-8 w-8 text-gray-800 dark:text-white" />
                <span className="text-xl font-bold text-gray-800 dark:text-white">Concord Title</span>
              </div>
              <button
                onClick={onLogout}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-label="Logout"
              >
                <LogoutIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow bg-slate-100 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
              
              {error && (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                      <p className="font-bold">Error Loading Data</p>
                      <p>{error}</p>
                  </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                  <div className="lg:col-span-1 bg-primary-50 dark:bg-gray-800/50 border border-primary-200 dark:border-gray-700 rounded-2xl p-6">
                      <h2 className="text-base font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">Funds Held in Escrow For</h2>
                      <div className="mt-4 flex items-center space-x-4">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div>
                              <p className="text-xl font-bold text-gray-900 dark:text-white truncate" id="client-email" title={userEmail}>
                                  {userEmail}
                              </p>
                              {isLoading ? (
                                  <div className="mt-1 h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                              ) : (
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Client Account ID: {accountId}
                                  </p>
                              )}
                          </div>
                      </div>
                  </div>
                  
                  <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex justify-between items-start">
                          <div>
                              <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">Escrow Account Balance</h2>
                              {isLoading ? (
                                  <div className="mt-4 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4"></div>
                              ) : (
                                  <p className="mt-2 text-5xl font-extrabold text-grey-900 dark:text-white tracking-tight">
                                      {formattedBalance}
                                  </p>
                              )}
                          </div>
                      </div>

                      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                      </div>
                  </div>

                  <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300">
                      <div className="flex justify-between items-start">
                          <div>
                              <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">Other Assets</h2>
                              {isLoading ? (
                                  <div className="mt-4 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-3/4"></div>
                              ) : (
                                  <p className="mt-2 text-5xl font-extrabold text-grey-900 dark:text-white tracking-tight">
                                      {formattedOtherAssets}
                                  </p>
                              )}
                          </div>
                           <DocumentIcon className="h-7 w-7 text-primary-500 flex-shrink-0" />
                      </div>
                  </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Transaction History
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gray-700 dark:bg-slate-600">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                            Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {isLoading ? (
                          Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td className="px-6 py-5"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div></td>
                                <td className="px-6 py-5"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div></td>
                                <td className="px-6 py-5"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 ml-auto animate-pulse"></div></td>
                            </tr>
                          ))
                        ) : (
                          transactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {new Date(transaction.date).toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' })}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {transaction.description}
                              </td>
                              <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold text-right ${
                                  transaction.amount >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'
                                }`}>
                                {transaction.amount < 0 ? '−' : ''}{formatCurrency(transaction.amount)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                  <div className="flex items-center space-x-3 mb-4">
                    <DocumentIcon className="h-7 w-7 text-primary-600 dark:text-primary-400" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Financial Overview
                    </h2>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden p-6">
                    {isLoading ? <SkeletonCard /> : <BalanceSheet companyName={companyName} data={balanceSheetData} />}
                  </div>
              </div>

              <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                      Welcome back, {userEmail}
                  </p>
              </div>
          </div>
        </main>
        <footer className="bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} Concord Title Inc. All rights reserved.
            </div>
        </footer>
      </div>
    </>
  );
};

export default DashboardPage;
