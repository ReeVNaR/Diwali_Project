import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import MobileBottomNav from './components/MobileBottomNav.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import TemplateGallery from './pages/TemplateGallery.jsx';
import EditorPage from './pages/EditorPage.jsx';
import MyDesigns from './pages/MyDesigns.jsx';
import NotFound from './pages/NotFound.jsx';

function Layout() {
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/editor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#FFF5EC] to-[#F1F5F9] text-[#0F172A] flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-800">
      {/* Floating Navbar on all non-editor views */}
      {!isEditor && <Navbar />}

      <main className={`flex-1 flex flex-col ${!isEditor ? 'pb-20 md:pb-0' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/my-designs" element={<MyDesigns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Floating Mobile Bottom Navigation for non-editor views */}
      <MobileBottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
