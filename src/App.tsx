import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import Stats from './components/home/Stats';
import TrustedBy from './components/home/TrustedBy';
import HowItWorks from './components/home/HowItWorks';
import FeaturedJobs from './components/home/FeaturedJobs';
import Testimonials from './components/home/Testimonials';
import CallToAction from './components/home/CallToAction';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import JobApplyPage from './pages/JobApplyPage';
import AuthPage from './pages/AuthPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminJobCreatePage from './pages/admin/AdminJobCreatePage';
import AdminJobEditPage from './pages/admin/AdminJobEditPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminApplicationReviewPage from './pages/admin/AdminApplicationReviewPage';
import './App.css';

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <TrustedBy />
      <FeaturedJobs />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </>
  );
}

function PublicLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

import UserDashboardPage from './pages/UserDashboardPage';
import ScrollToTop from './components/ScrollToTop';
import UserProfilePage from './pages/UserProfilePage';
import UserApplicationDetailPage from './pages/UserApplicationDetailPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:slug" element={<JobDetailPage />} />
          <Route path="/jobs/:slug/apply" element={<JobApplyPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<UserDashboardPage />} />
          <Route path="/dashboard/applications/:id" element={<UserApplicationDetailPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="jobs" element={<AdminDashboardPage />} />
          <Route path="jobs/create" element={<AdminJobCreatePage />} />
          <Route path="jobs/edit/:slug" element={<AdminJobEditPage />} />
          <Route path="applications" element={<AdminApplicationsPage />} />
          <Route path="applications/:id" element={<AdminApplicationReviewPage />} />
          <Route path="settings" element={<div className="p-10">Settings Placeholder</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
