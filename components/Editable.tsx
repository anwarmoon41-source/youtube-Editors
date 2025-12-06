import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Edit2, Image as ImageIcon } from 'lucide-react';

interface EditableProps {
  path: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'li';
  placeholder?: string;
}

export const EditableText: React.FC<EditableProps> = ({ path, className = '', tag = 'span', placeholder = 'Edit text...' }) => {
  const { content, updateContent, isEditMode } = useContent();

  // Helper to get value from path
  const getValue = (obj: any, pathStr: string) => {
    return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const value = getValue(content, path);

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const newValue = e.target.innerText;
    if (newValue !== value) {
      updateContent(path, newValue);
    }
  };

  const Tag = tag as any;

  if (isEditMode) {
    return (
      <Tag
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        className={`${className} outline-none border border-dashed border-cyan/50 hover:bg-cyan/10 transition-colors cursor-text min-w-[20px]`}
      >
        {value || placeholder}
      </Tag>
    );
  }

  return <Tag className={className}>{value}</Tag>;
};

interface EditableImageProps {
  path: string; // Path to the image URL string
  alt: string;
  className?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ path, alt, className = '' }) => {
  const { content, updateContent, isEditMode } = useContent();
  
  const getValue = (obj: any, pathStr: string) => {
    return pathStr.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const src = getValue(content, path);

  const handlePrompt = () => {
    if (!isEditMode) return;
    const newUrl = prompt("Enter new image URL:", src);
    if (newUrl && newUrl !== src) {
      updateContent(path, newUrl);
    }
  };

  return (
    <div className={`relative group ${className} ${isEditMode ? 'cursor-pointer hover:opacity-80' : ''}`} onClick={handlePrompt}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {isEditMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-gunmetal p-2 rounded-full border border-cyan text-cyan">
             <ImageIcon className="w-6 h-6" />
          </div>
        </div>
      )}
    </div>
  );
};
