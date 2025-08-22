
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import AboutUsPage from '@/pages/AboutUsPage';
import EmployersPage from '@/pages/EmployersPage';
import JobSeekersPage from '@/pages/JobSeekersPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import ContactUsPage from '@/pages/ContactUsPage';
import LoginPage from '@/pages/LoginPage';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage';
import SignUpPage from '@/pages/SignUpPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import ResetPasswordPage from '@/pages/ResetPasswordPage';
// import AdminDashboardOne from './pages/AdminDashboardOne';
// import AdminPanelLayout from './pages/AdminPanel';
import EmployerManagementPanel from './pages/EmployerManagementPanel';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';


import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';


const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
    scale: 0.8
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: "100vw",
    scale: 1.2
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0
};

function AnimatedRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><HomePage /></motion.div></Layout>} />
        <Route path="/about" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AboutUsPage /></motion.div></Layout>} />
        <Route path="/employers" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><EmployersPage /></motion.div></Layout>} />
        <Route path="/job-seekers" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><JobSeekersPage /></motion.div></Layout>} />
        <Route path="/contact" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><ContactUsPage /></motion.div></Layout>} />
        <Route path="/job-details/:id" element={<Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><JobDetailsPage /></motion.div></Layout>} />
        <Route path="/login" element={<motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><LoginPage /></motion.div>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/employer-management-panel" element={< EmployerManagementPanel />} />
        <Route path="/candidateDashboard" element={<CandidateDashboard />} />


        <Route path="/sign-up" element={<SignUpPage />} />


        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated ? (
              <Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><AdminDashboardPage /></motion.div></Layout>
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />

        <Route
          path="/employer/dashboard"
          element={
            isAuthenticated ? (
              <Layout><motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}> <EmployerDashboard /></motion.div></Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
