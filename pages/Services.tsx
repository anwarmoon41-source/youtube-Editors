import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Image, Package, Plus, Trash2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/Editable';
import Button from '../components/Button';
import { Service } from '../types';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const { content, isEditMode, addItem, deleteItem } = useContent();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Film': return <Film className="w-12 h-12 text-cyan" />;
      case 'Image': return <Image className="w-12 h-12 text-magenta" />;
      case 'Package': return <Package className="w-12 h-12 text-voltage" />;
      default: return <Film className="w-12 h-12 text-white" />;
    }
  };

  const handleAddService = () => {
    const newService: Service = {
      id: `service-${Date.now()}`,
      title: 'New Service Module',
      description: 'Describe your new service here.',
      features: ['Feature 1', 'Feature 2'],
      icon: 'Film',
      buttonText: 'Get Started'
    };
    addItem('services.items', newService);
  };

  const getServiceTypeForContact = (serviceId: string) => {
    if (serviceId === 'thumbnails') return 'Thumbnails';
    if (serviceId === 'packages') return 'Monthly';
    return 'Editing';
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <EditableText path="services.titlePrefix" /> <span className="text-magenta"><EditableText path="services.titleHighlight" /></span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            <EditableText path="services.subtitle" />
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {content.services.items.map((service, idx) => (
            <div key={service.id || idx} className="bg-gunmetal/50 border border-cyan/20 p-8 rounded-2xl hover:bg-gunmetal transition-all duration-300 hover:shadow-neon-cyan hover:-translate-y-2 group relative flex flex-col">
              {isEditMode && (
                <button 
                  onClick={() => deleteItem('services.items', idx)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  title="Remove Service"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white mb-4">
                <EditableText path={`services.items.${idx}.title`} />
              </h3>
              <p className="text-gray-400 mb-8 min-h-[3rem]">
                <EditableText path={`services.items.${idx}.description`} />
              </p>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {service.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-cyan rounded-full flex-shrink-0"></span>
                    <EditableText path={`services.items.${idx}.features.${featureIdx}`} />
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={() => navigate('/contact', { state: { service: getServiceTypeForContact(service.id) } })}
                >
                  <EditableText path={`services.items.${idx}.buttonText`} placeholder="Get Started" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add New Service Button */}
          {isEditMode && (
            <button 
              onClick={handleAddService}
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl p-8 hover:border-cyan hover:bg-cyan/5 transition-all group min-h-[400px]"
            >
              <Plus className="w-16 h-16 text-gray-700 group-hover:text-cyan mb-4" />
              <span className="font-orbitron font-bold text-gray-500 group-hover:text-cyan">ADD MODULE</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;