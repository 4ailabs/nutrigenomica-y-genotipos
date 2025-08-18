import React, { useState } from 'react';
import Portal from './components/Portal';
import AdvancedCalculator from './components/AdvancedCalculator';
import GenotypeDetail from './components/GenotypeDetail';
import LandingPage from './components/LandingPage';
import BiometricsPage from './components/BiometricsPage';
import ChatbotFAB from './components/ChatbotFAB';
import Chatbot from './components/Chatbot';

type Page = 'landing' | 'portal' | 'calculator' | 'biometrics';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [viewingGenotype, setViewingGenotype] = useState<number | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatContextGenotypeId, setChatContextGenotypeId] = useState<number | null>(null);

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        setViewingGenotype(null);
        setChatContextGenotypeId(null); // Reset chat context on main navigation
    };
    
    const handleViewGenotype = (id: number) => {
        setViewingGenotype(id);
        setChatContextGenotypeId(id); // Set chat context to the viewed genotype
    };
    
    const handleBackFromDetail = () => {
        setViewingGenotype(null);
        setChatContextGenotypeId(null); // Clear chat context when leaving detail view
    };

    const renderPage = () => {
        if (viewingGenotype) {
            return <GenotypeDetail genotypeId={viewingGenotype} onBack={handleBackFromDetail} />;
        }

        switch(currentPage) {
            case 'landing':
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} />;
            case 'portal':
                return <Portal 
                            onNavigateToCalculator={() => navigateTo('calculator')} 
                            onNavigateToGenotype={handleViewGenotype} 
                            onNavigateToBiometrics={() => navigateTo('biometrics')} 
                            onNavigateToMain={() => navigateTo('landing')}
                        />;
            case 'calculator':
                return <AdvancedCalculator 
                            onBackToPortal={() => navigateTo('portal')} 
                            onNavigateToMain={() => navigateTo('landing')}
                        />;
            case 'biometrics':
                return <BiometricsPage 
                            onBackToPortal={() => navigateTo('portal')} 
                            onNavigateToMain={() => navigateTo('landing')}
                        />;
            default:
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} />;
        }
    }

    return (
        <div className="bg-white min-h-screen font-sans text-gray-800 antialiased">
            <div key={currentPage + (viewingGenotype || '')} className="animate-fadeIn">
                 {renderPage()}
            </div>
             {/* Chat flotante solo en calculadora y biometrías */}
             {(currentPage === 'calculator' || currentPage === 'biometrics') && (
                <>
                    <Chatbot
                        isOpen={isChatOpen}
                        onClose={() => setIsChatOpen(false)}
                        contextGenotypeId={chatContextGenotypeId}
                    />
                    <ChatbotFAB isOpen={isChatOpen} onClick={() => setIsChatOpen(prev => !prev)} />
                </>
             )}
             {/* Debug siempre visible */}
             <div className="fixed top-4 left-4 bg-black text-white px-2 py-1 text-xs rounded z-50">
                Página: {currentPage} | Genotipo: {viewingGenotype || 'ninguno'}
             </div>
        </div>
    );
};

export default App;