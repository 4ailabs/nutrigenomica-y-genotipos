import React from 'react';
import { Target, Apple, Utensils, ChefHat, LucideIcon } from 'lucide-react';

interface SidebarTab {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  hoverColor: string;
}

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  genotypeGradient: string;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ activeTab, onTabChange, genotypeGradient }) => {
  const tabs: SidebarTab[] = [
    {
      id: 'genotype',
      label: 'Características',
      icon: Target,
      gradient: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:bg-blue-50'
    },
    {
      id: 'foods',
      label: 'Alimentos',
      icon: Apple,
      gradient: 'from-teal-500 to-teal-600',
      hoverColor: 'hover:bg-teal-50'
    },
    {
      id: 'menus',
      label: 'Menús',
      icon: Utensils,
      gradient: 'from-indigo-500 to-indigo-600',
      hoverColor: 'hover:bg-indigo-50'
    },
    {
      id: 'recipes',
      label: 'Recetas',
      icon: ChefHat,
      gradient: 'from-slate-500 to-slate-600',
      hoverColor: 'hover:bg-slate-50'
    }
  ];

  return (
    <aside className="hidden lg:block lg:fixed lg:left-8 lg:top-40 lg:w-64 xl:w-72 space-y-3 z-10">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 sticky top-24">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
          Navegación
        </h3>
        <nav className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold
                  transition-all duration-300 text-left group relative overflow-hidden
                  ${isActive 
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg transform scale-105` 
                    : `bg-gray-50 text-gray-700 ${tab.hoverColor} hover:shadow-md`
                  }
                `}
              >
                {/* Efecto de hover animado */}
                {!isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                        style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }} />
                )}
                
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'} transition-colors`} />
                <span className="flex-1">{tab.label}</span>
                
                {/* Indicador activo */}
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Indicador de progreso */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Sección actual: <span className="font-semibold text-gray-700">{tabs.find(t => t.id === activeTab)?.label}</span>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;

