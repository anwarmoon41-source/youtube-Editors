import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from '../components/Editable';

const Contact: React.FC = () => {
  const { isEditMode } = useContent();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Editing',
    message: ''
  });

  useEffect(() => {
    if (location.state && location.state.service) {
      setFormData(prev => ({ ...prev, service: location.state.service }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode) return;
    
    // Construct mailto link
    const subject = encodeURIComponent(`Project Inquiry: ${formData.service}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Service: ${formData.service}\n\n` +
      `Message:\n${formData.message}`
    );
    
    window.location.href = `mailto:anwarmoon.41@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-24 pb-20 w-full min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
              <EditableText path="contact.titlePrefix" /> <span className="text-cyan text-glow"><EditableText path="contact.titleHighlight" /></span>
            </h1>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              <EditableText path="contact.subtitle" />
            </p>
            
            <div className="p-6 border-l-2 border-magenta bg-magenta/5 mb-8">
              <h4 className="font-orbitron font-bold text-white mb-2">
                <EditableText path="contact.statusTitle" />
              </h4>
              <p className="text-gray-400 text-sm">
                <EditableText path="contact.statusLabel" /> <span className="text-cyan animate-pulse"><EditableText path="contact.statusValue" /></span>
              </p>
            </div>
          </div>

          <div className="bg-gunmetal border border-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
             {/* Decorative Corner */}
             <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan/20 to-transparent"></div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  <EditableText path="contact.formLabels.name" />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full bg-void border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-cyan transition-colors"
                  required
                  disabled={isEditMode}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                   <EditableText path="contact.formLabels.email" />
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@domain.com"
                  className="w-full bg-void border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-cyan transition-colors"
                  required
                  disabled={isEditMode}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                   <EditableText path="contact.formLabels.service" />
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-void border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-cyan transition-colors appearance-none"
                  disabled={isEditMode}
                >
                  <option value="Editing">Video Editing</option>
                  <option value="Thumbnails">Thumbnail Design</option>
                  <option value="Monthly">Creator Package</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                   <EditableText path="contact.formLabels.message" />
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Brief us on your project..."
                  rows={4}
                  className="w-full bg-void border border-gray-700 text-white px-4 py-3 rounded focus:outline-none focus:border-cyan transition-colors resize-none"
                  required
                  disabled={isEditMode}
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={isEditMode}>
                 <EditableText path="contact.buttonText" />
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;