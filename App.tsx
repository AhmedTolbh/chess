import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ParentDashboard from './pages/dashboard/ParentDashboard';
import SalaryReport from './pages/dashboard/SalaryReport';
import CalendarPage from './pages/dashboard/CalendarPage';
import GovernancePage from './pages/dashboard/GovernancePage';
import { Language } from './translations';
import SplashScreen from './components/SplashScreen';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('en');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Splash Screen Logic
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const unmountTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  // Theme Logic
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Language Logic
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <LandingPage
            isDarkMode={isDarkMode}
            lang={lang}
            toggleTheme={toggleTheme}
            toggleLang={toggleLang}
            isLoading={isLoading}
            showSplash={showSplash}
          />
        } />
        <Route path="/login" element={<Login isDarkMode={isDarkMode} lang={lang} />} />
        <Route path="/register" element={<Register isDarkMode={isDarkMode} lang={lang} />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/student" replace />} />
        <Route path="/dashboard/*" element={<DashboardLayout isDarkMode={isDarkMode} lang={lang} />}>
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/calendar" element={<CalendarPage role="student" />} />
          <Route path="instructor" element={<InstructorDashboard />} />
          <Route path="instructor/calendar" element={<CalendarPage role="instructor" />} />
          <Route path="instructor/financials" element={<SalaryReport />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/calendar" element={<CalendarPage role="admin" />} />
          <Route path="admin/governance" element={<GovernancePage />} />
          <Route path="parent" element={<ParentDashboard />} />
          <Route path="parent/calendar" element={<CalendarPage role="parent" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
