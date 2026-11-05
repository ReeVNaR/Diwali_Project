import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
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
    <div className="min-h-screen bg-[#080A12] text-white flex flex-col font-sans selection:bg-festive-gold/30 selection:text-festive-gold">
      {/* Floating Navbar on all non-editor views */}
      {!isEditor && <Navbar />}

      {/* When in editor, show a lightweight top mini-nav or standard navbar */}
      {isEditor && (
        <div className="h-10 border-b border-white/10 bg-[#080A12] px-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <a href="/" className="font-serif font-bold text-festive-gold flex items-center gap-1.5 hover:underline">
              ← Festive Ad Studio
            </a>
            <span className="text-white/20">|</span>
            <a href="/templates" className="text-festive-textSecondary hover:text-white transition-colors">
              Templates Gallery
            </a>
            <a href="/my-designs" className="text-festive-textSecondary hover:text-white transition-colors">
              My Designs
            </a>
          </div>
          <span className="text-[11px] font-mono text-festive-gold/70 hidden sm:inline">
            ✨ Canva-Grade Diwali Creative Studio
          </span>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/my-designs" element={<MyDesigns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
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
