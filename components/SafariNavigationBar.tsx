import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface SafariNavigationBarProps {
    onBack: () => void;
    onForward: () => void;
    onRefresh: () => void;
    canGoBack: boolean;
    canGoForward: boolean;
    className?: string;
}

const SafariNavigationBar: React.FC<SafariNavigationBarProps> = ({
    onBack,
    onForward,
    onRefresh,
    canGoBack,
    canGoForward,
    className = ''
}) => {
    // Detectar si estamos en Safari
    const isSafari = () => {
        const userAgent = navigator.userAgent;
        return /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
    };

    // Solo mostrar en Safari o cuando se solicite explícitamente
    if (!isSafari() && !className.includes('force-show')) {
        return null;
    }

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm ${className}`}>
            <div className="flex items-center justify-between px-4 py-2">
                {/* Botón Atrás */}
                <button
                    onClick={onBack}
                    disabled={!canGoBack}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        canGoBack
                            ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                            : 'text-gray-400 cursor-not-allowed'
                    }`}
                    aria-label="Ir hacia atrás"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Atrás</span>
                </button>

                {/* Título de la página */}
                <div className="flex-1 text-center">
                    <h1 className="text-sm font-semibold text-gray-800">
                        Medidor de Fuerza del Genotipo
                    </h1>
                </div>

                {/* Botones de Navegación */}
                <div className="flex items-center space-x-2">
                    {/* Botón Siguiente */}
                    <button
                        onClick={onForward}
                        disabled={!canGoForward}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                            canGoForward
                                ? 'text-blue-600 hover:bg-blue-50 hover:text-blue-700'
                                : 'text-gray-400 cursor-not-allowed'
                        }`}
                        aria-label="Ir hacia adelante"
                    >
                        <span className="text-sm font-medium">Siguiente</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Botón Refrescar */}
                    <button
                        onClick={onRefresh}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200"
                        aria-label="Refrescar página"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-sm font-medium">Refrescar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SafariNavigationBar;
