import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCSection {
  id: string;
  title: string;
  isOpen: boolean;
}

interface TableOfContentsProps {
  sections: TOCSection[];
  onSectionClick: (sectionId: string) => void;
  activeTab: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ sections, onSectionClick, activeTab }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Mostrar solo en pestaña de características (genotype)
  useEffect(() => {
    setIsVisible(activeTab === 'genotype');
  }, [activeTab]);

  if (!isVisible || sections.length === 0) return null;

  return (
    <div className="hidden xl:block fixed right-8 top-40 w-72 z-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden sticky top-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-bold text-gray-700">Índice Rápido</h3>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isMinimized ? '' : 'rotate-90'}`} />
          </button>
        </div>

        {/* Content */}
        {!isMinimized && (
          <div className="p-4 max-h-96 overflow-y-auto">
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionClick(section.id)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm
                    transition-all duration-200 flex items-start gap-2 group
                    ${section.isOpen 
                      ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-500' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
                    }
                  `}
                >
                  <span className={`
                    w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0
                    ${section.isOpen ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-gray-400'}
                  `} />
                  <span className="flex-1 leading-tight">{section.title}</span>
                </button>
              ))}
            </nav>

            {/* Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <span className="font-semibold text-gray-700">{sections.filter(s => s.isOpen).length}</span> de{' '}
                  <span className="font-semibold text-gray-700">{sections.length}</span> abiertas
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableOfContents;

