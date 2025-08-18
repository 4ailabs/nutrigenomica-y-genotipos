import React, { useState } from 'react';
import Portal from './components/Portal';
import AdvancedCalculator from './components/AdvancedCalculator';
import GenotypeDetail from './components/GenotypeDetail';
import LandingPage from './components/LandingPage';
import BiometricsPage from './components/BiometricsPage';
import ChatPage from './components/ChatPage';
import PatientView from './components/PatientView';
import GenotypeStrengthMeter from './components/GenotypeStrengthMeter';

type Page = 'landing' | 'portal' | 'calculator' | 'biometrics' | 'chat' | 'patientView' | 'strengthMeter';

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
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} onNavigateToPatientView={() => navigateTo('patientView')} />;
            case 'portal':
                return <Portal 
                    onNavigateToCalculator={() => navigateTo('calculator')} 
                    onNavigateToGenotype={handleViewGenotype} 
                    onNavigateToBiometrics={() => navigateTo('biometrics')} 
                    onNavigateToStrengthMeter={() => navigateTo('strengthMeter')}
                    onNavigateToMain={() => navigateTo('landing')}
                    onNavigateToChat={() => navigateTo('chat')}
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
            case 'chat':
                return <ChatPage 
                    onBackToPortal={() => navigateTo('portal')} 
                    onNavigateToMain={() => navigateTo('landing')}
                    contextGenotypeId={viewingGenotype}
                />;
            case 'strengthMeter':
                return <GenotypeStrengthMeter 
                    onResultChange={(result) => {
                        console.log('Resultado del medidor de fuerza:', result);
                    }}
                    onBackToPortal={() => navigateTo('portal')}
                />;
            case 'patientView':
                return <PatientView 
                    onBackToMain={() => navigateTo('landing')}
                />;
            default:
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} onNavigateToPatientView={() => navigateTo('patientView')} />;
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