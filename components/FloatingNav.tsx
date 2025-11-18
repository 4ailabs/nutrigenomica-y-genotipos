import React, { useState, useEffect } from 'react';
import { ArrowUp, Home, ArrowLeft, Menu, X } from 'lucide-react';

interface FloatingNavProps {
  onBack?: () => void;
  onHome?: () => void;
  showBackButton?: boolean;
  showHomeButton?: boolean;
}

const FloatingNav: React.FC<FloatingNavProps> = ({ 
  onBack, 
  onHome, 
  showBackButton = true, 
  showHomeButton = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible && !showBackButton && !showHomeButton) return null;

  return (
    <>
      {/* Botón Principal Flotante */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Menu desplegable */}
        {isMenuOpen && (
          <div className="flex flex-col gap-2 animate-fadeInUp">
            {showBackButton && onBack && (
              <button
                onClick={() => {
                  onBack();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                title="Volver"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Volver</span>
              </button>
            )}
            
            {showHomeButton && onHome && (
              <button
                onClick={() => {
                  onHome();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                title="Ir al Inicio"
              >
                <Home className="w-5 h-5" />
                <span className="text-sm">Inicio</span>
              </button>
            )}
            
            {isVisible && (
              <button
                onClick={() => {
                  scrollToTop();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-4 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
                title="Ir arriba"
              >
                <ArrowUp className="w-5 h-5" />
                <span className="text-sm">Arriba</span>
              </button>
            )}
          </div>
        )}

        {/* Botón de toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 transform hover:scale-110 ${
            isMenuOpen 
              ? 'bg-red-500 hover:bg-red-600 text-white rotate-90' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
          title="Menú de navegación"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Overlay para cerrar el menú */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingNav;

