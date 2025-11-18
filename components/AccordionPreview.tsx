import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface AccordionPreviewProps {
  content: string;
  title: string;
  show: boolean;
}

const AccordionPreview: React.FC<AccordionPreviewProps> = ({ content, title, show }) => {
  if (!show) return null;

  // Extraer primeras líneas del contenido
  const previewText = content.length > 150 ? content.substring(0, 150) + '...' : content;

  return (
    <div className="absolute left-full ml-4 top-0 w-80 z-50 pointer-events-none hidden lg:block">
      <div className="bg-white rounded-xl shadow-2xl border-2 border-blue-200 p-4 animate-in fade-in slide-in-from-left-2 duration-200">
        {/* Arrow */}
        <div className="absolute left-0 top-6 -translate-x-2 w-4 h-4 bg-white border-l-2 border-t-2 border-blue-200 rotate-45" />
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-200">
            <Eye className="w-4 h-4 text-blue-500" />
            <h4 className="text-sm font-bold text-gray-900">Vista Previa</h4>
          </div>
          
          <p className="text-xs text-gray-600 leading-relaxed mb-2">
            {previewText}
          </p>
          
          <p className="text-xs text-blue-600 font-semibold">
            Click para ver completo →
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccordionPreview;

