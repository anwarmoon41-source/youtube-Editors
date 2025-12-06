import React from 'react';
import { Youtube, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContent } from '../contexts/ContentContext';
import { EditableText } from './Editable';

const Footer: React.FC = () => {
  const { content, updateContent, isEditMode } = useContent();

  const handlePlaceholderChange = () => {
    if (!isEditMode) return;
    const newPlaceholder = prompt("Enter new placeholder text:", content.footer.newsletterPlaceholder);
    if (newPlaceholder !== null) {
      updateContent('footer.newsletterPlaceholder', newPlaceholder);
    }
  };

  return (
    <footer className="bg-gunmetal border-t border-cyan/10 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Youtube className="w-6 h-6 text-magenta" />
              <span className="text-xl font-orbitron font-bold text-white tracking-widest flex">
                <EditableText path="global.brandNamePrefix" />
                <span className="text-cyan ml-1"><EditableText path="global.brandNameSuffix" /></span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              <EditableText path="footer.brandDesc" />
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-cyan transition-colors transform hover:scale-110">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">
              <EditableText path="footer.column1Title" />
            </h4>
            <ul className="space-y-3">
              {content.global.navLinks.map((item) => (
                <li key={item}>
                  <Link to={`/${item === 'Home' ? '' : item.toLowerCase()}`} className="text-gray-400 hover:text-magenta text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">
              <EditableText path="footer.column2Title" />
            </h4>
            <ul className="space-y-3">
              {content.services.items.slice(0, 4).map((service, idx) => (
                <li key={idx} className="text-gray-400 text-sm hover:text-cyan cursor-pointer">
                  {service.title.split('(')[0]}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">
              <EditableText path="footer.column3Title" />
            </h4>
            <div className="flex flex-col gap-4">
              <p className="text-gray-400 text-sm">
                <EditableText path="footer.column3Text" />
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={content.footer.newsletterPlaceholder}
                  onClick={handlePlaceholderChange}
                  readOnly={isEditMode}
                  className={`bg-void border border-gray-700 text-white px-4 py-2 text-sm focus:outline-none focus:border-cyan w-full rounded-l ${isEditMode ? 'cursor-pointer hover:bg-cyan/10' : ''}`}
                />
                <button className="bg-cyan/20 border-y border-r border-cyan text-cyan px-3 rounded-r hover:bg-cyan hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-mono">
            © {new Date().getFullYear()} <EditableText path="footer.copyright" />
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-white text-xs font-mono">
              <EditableText path="footer.privacyText" />
            </a>
            <a href="#" className="text-gray-600 hover:text-white text-xs font-mono">
              <EditableText path="footer.termsText" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;