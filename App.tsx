import React, { useState } from 'react';
import Portal from './components/Portal';
import AdvancedCalculator from './components/AdvancedCalculator';
import GenotypeDetail from './components/GenotypeDetail';
import LandingPage from './components/LandingPage';
import BiometricsPage from './components/BiometricsPage';

type Page = 'landing' | 'portal' | 'calculator' | 'biometrics';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [viewingGenotype, setViewingGenotype] = useState<number | null>(null);

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        setViewingGenotype(null);
    };
    
    const handleViewGenotype = (id: number) => {
        setViewingGenotype(id);
    };
    
    const handleBackFromDetail = () => {
        setViewingGenotype(null);
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
        </div>
    );
};

export default App;