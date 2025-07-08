import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AboutPage from './components/AboutPage';
import ServicesPage from './components/ServicesPage';
import ContactPage from './components/ContactPage';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';


export type Page = 'home' | 'login' | 'dashboard' | 'services' | 'about' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false);
    }, 1000); 
  }, []);

  const handleLogin = (email: string) => {
    setTimeout(() => {
      setUserEmail(email);
      setCurrentPage('dashboard');
    }, 1500);
  };

  const handleLogout = () => {
    setUserEmail(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  const handleNavigateToLogin = () => {
    setCurrentPage('login');
  };

  if (isAppLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-primary-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigateToLogin={handleNavigateToLogin} />;
      case 'services':
        return <ServicesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigateHome={() => handleNavigate('home')}/>;
      case 'dashboard':
        if (userEmail) {
          return <DashboardPage onLogout={handleLogout} userEmail={userEmail} />;
        }
        setCurrentPage('login');
        return null; 
      default:
        return <HomePage onNavigateToLogin={handleNavigateToLogin} />;
    }
  };

  const isPublicPage = ['home', 'services', 'about', 'contact'].includes(currentPage);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-500">
      {isPublicPage ? (
        <>
          <Header onNavigate={handleNavigate} onNavigateToLogin={handleNavigateToLogin} currentPage={currentPage} />
          <main>{renderPageContent()}</main>
          <Footer onNavigate={handleNavigate} />
          <CookieBanner />
        </>
      ) : (
        renderPageContent()
      )}
    </div>
  );
};

export default App;
