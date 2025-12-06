import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ContentProvider, useContent } from './contexts/ContentContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import { Settings, RotateCcw } from 'lucide-react';

const AdminControls: React.FC = () => {
  const { isEditMode, toggleEditMode, resetContent } = useContent();

  return (
    <div className="fixed bottom-6 left-6 z-50 flex gap-2">
      <button 
        onClick={toggleEditMode}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 border-2 ${
          isEditMode 
            ? 'bg-cyan text-black border-cyan animate-pulse' 
            : 'bg-gunmetal text-gray-400 border-gray-700 hover:text-white hover:border-cyan'
        }`}
        title="Toggle Edit Mode"
      >
        <Settings className="w-6 h-6" />
      </button>
      
      {isEditMode && (
        <button 
          onClick={resetContent}
          className="p-3 rounded-full bg-red-900/80 text-white border-2 border-red-500 hover:bg-red-700 shadow-lg transition-all"
          title="Reset to Defaults"
        >
          <RotateCcw className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-void text-ice font-montserrat">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <AdminControls />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ContentProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </ContentProvider>
  );
};

export default App;