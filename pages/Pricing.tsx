import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { Check, Trash2, Plus } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/Editable';
import { PricingTier } from '../types';

const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { content, isEditMode, addItem, deleteItem } = useContent();

  const handleAddTier = (category: string) => {
    const newTier: PricingTier = {
      category: category,
      name: 'NEW TIER',
      price: 'Rs. 1000',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      glowColor: 'cyan',
      highlight: false,
      buttonText: 'Select Plan'
    };
    addItem('pricing.tiers', newTier);
  };

  // Group tiers by category
  const categories: string[] = Array.from(new Set(content.pricing.tiers.map(t => t.category || 'General Prices')));
  
  // Custom sort order for categories
  const sortOrder = ['Video Editing Prices', 'Thumbnail Prices', 'Monthly Editing Plans'];
  categories.sort((a, b) => {
    const indexA = sortOrder.indexOf(a);
    const indexB = sortOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  const getServiceTypeFromCategory = (category: string) => {
    if (category.includes('Thumbnail')) return 'Thumbnails';
    if (category.includes('Monthly')) return 'Monthly';
    return 'Editing';
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <EditableText path="pricing.titlePrefix" /> <span className="text-voltage"><EditableText path="pricing.titleHighlight" /></span>
          </h1>
          <p className="text-gray-400">
            <EditableText path="pricing.subtitle" />
          </p>
        </div>

        <div className="max-w-7xl mx-auto space-y-20">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white mb-8 border-b border-gray-800 pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-cyan rounded-full shadow-neon-cyan"></span>
                {category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {content.pricing.tiers
                  .map((tier, index) => ({ ...tier, originalIndex: index })) // Keep original index for updates/deletes
                  .filter(item => (item.category || 'General Prices') === category)
                  .map((item) => (
                    <div 
                      key={item.originalIndex}
                      className={`relative p-8 rounded-2xl border transition-all duration-300 flex flex-col group min-h-[450px] ${
                        item.highlight 
                          ? 'bg-gunmetal border-magenta shadow-neon-magenta transform md:-translate-y-4 z-10' 
                          : `bg-void border-${item.glowColor === 'cyan' ? 'cyan' : 'voltage'}/30 hover:border-${item.glowColor === 'cyan' ? 'cyan' : 'voltage'} `
                      }`}
                    >
                      {isEditMode && (
                        <button 
                          onClick={() => deleteItem('pricing.tiers', item.originalIndex)}
                          className="absolute top-2 right-2 text-red-500 hover:text-red-400 p-2 bg-black/50 rounded-full z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}

                      {item.highlight && (
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-magenta text-white px-4 py-1 text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_10px_#FF00FF]">
                          Recommended
                        </div>
                      )}

                      <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                        <EditableText path={`pricing.tiers.${item.originalIndex}.name`} />
                      </h3>
                      <div className="flex items-baseline mb-8">
                        <span className="text-3xl font-bold text-white">
                          <EditableText path={`pricing.tiers.${item.originalIndex}.price`} />
                        </span>
                      </div>

                      <ul className="space-y-4 mb-8 flex-1">
                        {item.features.map((feat, featIdx) => (
                          <li key={featIdx} className="flex items-start gap-3">
                            <Check className={`w-5 h-5 flex-shrink-0 text-${item.glowColor}`} />
                            <span className="text-gray-300 text-sm">
                              <EditableText path={`pricing.tiers.${item.originalIndex}.features.${featIdx}`} />
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Button 
                        variant={item.highlight ? 'secondary' : (item.glowColor === 'voltage' ? 'accent' : 'primary')}
                        className="w-full mt-auto"
                        onClick={() => navigate('/contact', { state: { service: getServiceTypeFromCategory(category) } })}
                      >
                         <EditableText path={`pricing.tiers.${item.originalIndex}.buttonText`} placeholder="Select Plan" />
                      </Button>
                    </div>
                  ))}

                {isEditMode && (
                  <button 
                    onClick={() => handleAddTier(category)}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl p-8 hover:border-voltage hover:bg-voltage/5 transition-all min-h-[450px] opacity-50 hover:opacity-100"
                  >
                    <Plus className="w-12 h-12 text-gray-500 mb-2" />
                    <span className="text-gray-500 font-orbitron">ADD TO {category.toUpperCase()}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;