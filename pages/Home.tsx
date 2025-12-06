import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Zap, Play, Layers } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/Editable';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { content, isEditMode, updateContent } = useContent();

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Zap': return Zap;
      case 'Play': return Play;
      case 'Layers': return Layers;
      default: return Zap;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-void opacity-90"></div>
          {/* Abstract Neon Lines (CSS Gradients) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gunmetal via-void to-void"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-1 rounded-full border border-cyan/30 bg-cyan/5 text-cyan text-xs font-bold tracking-[0.3em] uppercase animate-pulse flex">
              <EditableText path="home.badgeText" />
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold leading-tight mb-8">
            <span className="block text-white">
              <EditableText path="home.heroTitleLine1" />
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-magenta animate-gradient">
              <EditableText path="home.heroTitleLine2" />
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            <EditableText path="home.heroSubtitle" />
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Button onClick={() => navigate('/pricing')} variant="primary" className="w-full md:w-auto">
              <EditableText path="home.btnPrimary" />
            </Button>
            <Button onClick={() => navigate('/portfolio')} variant="secondary" className="w-full md:w-auto">
              <EditableText path="home.btnSecondary" />
            </Button>
          </div>
        </div>
      </section>

      {/* Intro / Features Grid */}
      <section className="py-24 bg-gunmetal relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4">
              <EditableText path="home.introTitlePrefix" /> <span className="text-magenta"><EditableText path="home.introTitleHighlight" /></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              <EditableText path="home.introDesc" />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.home.features.map((feature, idx) => {
              const Icon = getIcon(feature.icon);
              return (
                <div key={idx} className="glass-panel p-8 rounded-xl hover:shadow-neon-cyan transition-all duration-300 group relative">
                  <Icon className="w-12 h-12 text-cyan mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-orbitron font-bold text-white mb-4">
                    <EditableText path={`home.features.${idx}.title`} />
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    <EditableText path={`home.features.${idx}.desc`} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;