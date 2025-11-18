import React, { useState } from 'react';
import { Home, Menu, X, Users, Bot, Atom, Target, FileSearch } from 'lucide-react';

interface TopBarProps {
    currentPage: string;
    onNavigateToMain: () => void;
    onNavigateToPortal: () => void;
    onNavigateToCalculator?: () => void;
    onNavigateToPatientView?: () => void;
    onNavigateToChat?: () => void;
    onNavigateToNutrigenomics?: () => void;
    onNavigateToStrengthMeter?: () => void;
    onNavigateToResearchPrompt?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
    currentPage,
    onNavigateToMain,
    onNavigateToPortal,
    onNavigateToCalculator,
    onNavigateToPatientView,
    onNavigateToChat,
    onNavigateToNutrigenomics,
    onNavigateToStrengthMeter,
    onNavigateToResearchPrompt
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Inicio', icon: Home, onClick: onNavigateToMain, show: true },
        { label: 'Portal', icon: Target, onClick: onNavigateToPortal, show: currentPage !== 'landing' },
        { label: 'Mi Genotipo', icon: Users, onClick: onNavigateToPatientView, show: !!onNavigateToPatientView },
        { label: 'Asistente IA', icon: Bot, onClick: onNavigateToChat, show: !!onNavigateToChat },
        { label: 'Nutrigenómica', icon: Atom, onClick: onNavigateToNutrigenomics, show: !!onNavigateToNutrigenomics },
        { label: 'Investigación', icon: FileSearch, onClick: onNavigateToResearchPrompt, show: !!onNavigateToResearchPrompt }
    ].filter(item => item.show);

    return (
        <header 
            className="sticky top-0 z-50 bg-white border-b border-gray-200"
            role="banner"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Simplificado */}
                    <button
                        onClick={onNavigateToMain}
                        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        aria-label="Ir al inicio"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Target className="w-5 h-5" />
                        </div>
                        <span className="hidden sm:block text-lg font-semibold text-gray-900">Nutrigenómica</span>
                    </button>

                    {/* Navegación Desktop Simplificada */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.label.toLowerCase().replace(' ', '') || 
                                           (item.label === 'Portal' && currentPage !== 'landing');
                            
                            return (
                                <button
                                    key={index}
                                    onClick={item.onClick}
                                    className={`
                                        flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                                        transition-colors duration-200
                                        ${isActive 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                    `}
                                    aria-label={item.label}
                                    aria-current={isActive ? 'page' : undefined}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="hidden lg:inline">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Botón Menú Móvil */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        aria-label="Abrir menú de navegación"
                        aria-expanded={isMenuOpen}
                    >
                        {isMenuOpen ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Menú Móvil Simplificado */}
                {isMenuOpen && (
                    <nav 
                        className="md:hidden border-t border-gray-200 py-3 animate-slideDown"
                        aria-label="Menú de navegación móvil"
                    >
                        <div className="flex flex-col gap-1">
                            {menuItems.map((item, index) => {
                                const Icon = item.icon;
                                const isActive = currentPage === item.label.toLowerCase().replace(' ', '') || 
                                               (item.label === 'Portal' && currentPage !== 'landing');
                                
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            item.onClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className={`
                                            flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium
                                            transition-colors duration-200
                                            ${isActive 
                                                ? 'bg-blue-50 text-blue-700' 
                                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                            }
                                        `}
                                        aria-label={item.label}
                                        aria-current={isActive ? 'page' : undefined}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default TopBar;

