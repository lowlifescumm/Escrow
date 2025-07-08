import React, { useState, useEffect, useCallback } from 'react';
import { ConcordTitleLogoIcon, LogoutIcon, UserIcon, DocumentIcon, MailIcon } from './icons';
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
        setBalance(result.data.balance);
        setAccountId(result.data.accountId);
        setTransactions(result.data.transactions);
        setCompanyName(result.data.companyName);
        setBalanceSheetData(result.data.balanceSheet);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data. The response was not successful.');
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred. Please try again later.';
      setError(errorMessage);
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

  const renderContent = () => {
    if (error) {
      if (error.includes('User not found')) {
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
                <UserIcon className="h-10 w-10 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Account Not Found</h2>
            <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">We couldn't find an account associated with this email address. Please log out and try again with a different account.</p>
            <button
              onClick={onLogout}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <LogoutIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-full">
                <MailIcon className="h-10 w-10 text-yellow-500 dark:text-yellow-400" />
            </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">An Unexpected Error Occurred</h2>
          <p className="mt-2 max-w-md text-gray-600 dark:text-gray-400">We had trouble loading your dashboard data. Please check your connection and try again.</p>
          <button
            onClick={fetchDashboardData}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (isLoading) {
       return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-1 bg-gray-200 dark:bg-gray-800/50 rounded-2xl p-6 h-32 animate-pulse"></div>
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl h-40 p-6 animate-pulse"></div>
          </div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl h-64 p-6 animate-pulse"></div>
        </div>
      );
    }
    
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                              Client Account ID: {accountId}
                          </p>
                      </div>
                  </div>
              </div>
              
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-300">
                  <h2 className="text-lg font-medium text-gray-500 dark:text-gray-400">Escrow Account Balance</h2>
                  <p className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                      {formattedBalance}
                  </p>
                  <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                          Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
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
                    {transactions.length > 0 ? (
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
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-10 text-gray-500 dark:text-gray-400">No transactions found.</td>
                      </tr>
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
                 <BalanceSheet companyName={companyName} data={balanceSheetData} />
              </div>
          </div>

          <div className="mt-8 text-center">
               <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back, {userEmail}
              </p>
          </div>
      </div>
    );
  };
  
  return (
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
        {renderContent()}
      </main>

      <footer className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
             &copy; {new Date().getFullYear()} Concord Title Inc. All rights reserved.
          </div>
      </footer>
    </div>
  );
};

export default DashboardPage;