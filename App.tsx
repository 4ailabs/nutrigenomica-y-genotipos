import React, { useState, useEffect } from 'react';
import Portal from './components/Portal';
import AdvancedCalculator from './components/AdvancedCalculator';
import GenotypeDetail from './components/GenotypeDetail';
import LandingPage from './components/LandingPage';
import BiometricsPage from './components/BiometricsPage';
import ChatPage from './components/ChatPage';
import PatientView from './components/PatientView';
import GenotypeStrengthMeter from './components/GenotypeStrengthMeter';
import NutrigenomicsPage from './components/NutrigenomicsPage';
import { useNavigation } from './hooks/useNavigation';
import { ChatProvider } from './contexts/ChatContext';

type Page = 'landing' | 'portal' | 'calculator' | 'biometrics' | 'chat' | 'patientView' | 'strengthMeter' | 'nutrigenomics';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [viewingGenotype, setViewingGenotype] = useState<number | null>(null);

    // Hook para manejar la navegación de manera eficiente
    const navigation = useNavigation();

    // Configurar el historial del navegador al cargar la app
    useEffect(() => {
        // Configurar la página inicial
        navigation.navigateTo('landing');
    }, [navigation]);

    // Manejar eventos de popstate (botones atrás/siguiente del navegador)
    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (event.state?.page) {
                const targetPage = event.state.page as Page;
                if (targetPage !== currentPage) {
                    setCurrentPage(targetPage);
                    setViewingGenotype(null);
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [currentPage]);

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        setViewingGenotype(null);
        
        // Actualizar el historial del navegador
        navigation.navigateTo(page);
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
                    onNavigateToNutrigenomics={() => navigateTo('nutrigenomics')}
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
            case 'nutrigenomics':
                return <NutrigenomicsPage 
                    onBackToPortal={() => navigateTo('portal')}
                    onNavigateToMain={() => navigateTo('landing')}
                />;
            default:
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} onNavigateToPatientView={() => navigateTo('patientView')} />;
        }
    }

    return (
        <ChatProvider>
            <div className="bg-white min-h-screen font-sans text-gray-800 antialiased">
                <div key={currentPage + (viewingGenotype || '')} className="animate-fadeIn">
                     {renderPage()}
                </div>
            </div>
        </ChatProvider>
    );
};

export default App;