import React from 'react';
import { ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText, EditableImage } from '../components/Editable';

const About: React.FC = () => {
  const { content } = useContent();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock': return Clock;
      case 'ShieldCheck': return ShieldCheck;
      case 'TrendingUp': return TrendingUp;
      default: return Clock;
    }
  };

  const getColorClass = (color: string, type: 'text' | 'bg' | 'shadow' | 'border' = 'text') => {
    if (color === 'cyan') return type === 'shadow' ? 'shadow-neon-cyan' : `${type}-cyan`;
    if (color === 'magenta') return type === 'shadow' ? 'shadow-neon-magenta' : `${type}-magenta`;
    if (color === 'voltage') return type === 'shadow' ? 'shadow-[0_0_10px_#FBFF00]' : `${type}-voltage`;
    return `${type}-white`;
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <EditableText path="about.titlePrefix" /> <span className="text-cyan text-glow"><EditableText path="about.titleHighlight" /></span>
          </h1>
          <div className="h-1 w-24 bg-magenta mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
             <div className="absolute inset-0 bg-cyan/20 transform translate-x-4 translate-y-4 rounded-lg"></div>
             <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
               <EditableImage 
                 path="about.mainImg" 
                 alt="Futuristic Workspace" 
                 className="grayscale hover:grayscale-0 transition-all duration-500"
               />
             </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-orbitron font-bold text-white mb-6">
              <EditableText path="about.sectionTitle" />
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6 font-light">
              <EditableText path="about.desc1" />
            </p>
            <p className="text-gray-300 leading-relaxed mb-8 font-light">
              <EditableText path="about.desc2" />
            </p>

            <div className="space-y-4">
              {content.about.points.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${
                    idx === 0 ? 'bg-cyan shadow-neon-cyan' : idx === 1 ? 'bg-magenta shadow-neon-magenta' : 'bg-voltage shadow-[0_0_10px_#FBFF00]'
                  }`}></div>
                  <span className="font-montserrat text-sm">
                    <EditableText path={`about.points.${idx}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Trust Us - Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.about.stats.map((stat, idx) => {
            const Icon = getIcon(stat.icon);
            return (
              <div key={idx} className={`bg-gunmetal border border-gray-800 p-8 rounded-xl text-center hover:border-${stat.color}/50 transition-colors group`}>
                <Icon className={`w-10 h-10 text-${stat.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="font-orbitron font-bold text-lg mb-2">
                  <EditableText path={`about.stats.${idx}.title`} />
                </h3>
                <p className="text-gray-400 text-sm">
                  <EditableText path={`about.stats.${idx}.desc`} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default About;