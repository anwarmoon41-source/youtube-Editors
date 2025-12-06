import React, { useState } from 'react';
import { useContent } from '../contexts/ContentContext';
import { EditableText, EditableImage } from '../components/Editable';
import { Plus, Trash2 } from 'lucide-react';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Shorts' | 'Long-Form' | 'Gaming'>('All');
  const { content, isEditMode, addItem, deleteItem } = useContent();

  const handleAddItem = () => {
    const newItem: PortfolioItem = {
      id: Date.now().toString(),
      client: 'New Client',
      category: 'Gaming',
      description: 'Project description goes here.',
      imageUrl: 'https://picsum.photos/seed/new/800/600',
      result: 'Viral Result'
    };
    addItem('portfolio.items', newItem);
  };

  const filteredItems = filter === 'All' 
    ? content.portfolio.items 
    : content.portfolio.items.filter(item => item.category === filter);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            <EditableText path="portfolio.titlePrefix" /> <span className="text-cyan"><EditableText path="portfolio.titleHighlight" /></span>
          </h1>
          <p className="text-gray-400">
            <EditableText path="portfolio.subtitle" />
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', 'Shorts', 'Long-Form', 'Gaming'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-6 py-2 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat 
                  ? 'bg-cyan text-black border-cyan shadow-neon-cyan' 
                  : 'bg-transparent text-gray-500 border-gray-700 hover:border-white hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, idx) => {
             // We need to find the real index in the main array for deletion if we are filtered
             const realIndex = content.portfolio.items.findIndex(i => i.id === item.id);
             
             return (
              <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gunmetal h-64">
                {isEditMode && (
                  <button 
                    onClick={() => deleteItem('portfolio.items', realIndex)}
                    className="absolute top-2 right-2 z-30 text-red-500 hover:text-red-400 p-2 bg-black/80 rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                
                {/* Image */}
                <div className="absolute inset-0">
                  <EditableImage 
                    path={`portfolio.items.${realIndex}.imageUrl`} 
                    alt={item.client} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-10 pointer-events-none group-hover:pointer-events-auto">
                  <span className="text-cyan text-xs font-bold uppercase tracking-widest mb-1">
                    <EditableText path={`portfolio.items.${realIndex}.category`} />
                  </span>
                  <h3 className="text-2xl font-orbitron font-bold text-white mb-2">
                    <EditableText path={`portfolio.items.${realIndex}.client`} />
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">
                    <EditableText path={`portfolio.items.${realIndex}.description`} />
                  </p>
                  <div className="inline-block bg-magenta/20 border border-magenta/50 text-magenta px-3 py-1 text-xs rounded w-fit">
                    <EditableText path={`portfolio.items.${realIndex}.result`} />
                  </div>
                </div>
              </div>
            );
          })}
          
          {isEditMode && (
             <button 
               onClick={handleAddItem}
               className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl hover:border-cyan hover:bg-cyan/5 transition-all h-64"
             >
               <Plus className="w-10 h-10 text-gray-500 mb-2" />
               <span className="text-gray-500 font-orbitron">ADD ITEM</span>
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;