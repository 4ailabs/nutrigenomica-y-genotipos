import React from 'react';
import { ArrowLeft, Home, ChevronRight } from 'lucide-react';

interface NavigationHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onNavigateToMain?: () => void;
  breadcrumbs?: string[];
  showBackButton?: boolean;
  showHomeButton?: boolean;
  variant?: 'default' | 'gradient' | 'simple';
  className?: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  subtitle,
  onBack,
  onNavigateToMain,
  breadcrumbs = [],
  showBackButton = true,
  showHomeButton = true,
  variant = 'default',
  className = ''
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white';
      case 'simple':
        return 'bg-white border-b border-gray-200 text-gray-800';
      default:
        return 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800';
    }
  };

  const getButtonClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-white/20 hover:bg-white/30 text-white';
      case 'simple':
        return 'bg-gray-100 hover:bg-gray-200 text-gray-700';
      default:
        return 'bg-white/80 hover:bg-white text-gray-700 hover:text-gray-900';
    }
  };

  return (
    <header className={`${getVariantClasses()} py-6 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Navegación superior */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {showBackButton && onBack && (
              <button
                onClick={onBack}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getButtonClasses()}`}
                title="Volver"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Volver</span>
              </button>
            )}
            
            {showHomeButton && onNavigateToMain && (
              <button
                onClick={onNavigateToMain}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${getButtonClasses()}`}
                title="Ir al Inicio"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Inicio</span>
              </button>
            )}
          </div>
        </div>

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 mx-2 opacity-50" />}
                  <span className={index === breadcrumbs.length - 1 ? 'font-semibold' : 'opacity-75'}>
                    {crumb}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Título principal */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          {subtitle && (
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
