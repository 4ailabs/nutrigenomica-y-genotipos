import React, { useState, useEffect, Suspense, lazy } from 'react';
import Portal from './components/Portal';
import AdvancedCalculator from './components/AdvancedCalculator';
import GenotypeDetail from './components/GenotypeDetail';
import LandingPage from './components/LandingPage';
import BiometricsPage from './components/BiometricsPage';
import ErrorBoundary from './components/ErrorBoundary';
import TopBar from './components/TopBar';
import { useNavigation } from './hooks/useNavigation';
import { ChatProvider } from './contexts/ChatContext';

// Lazy loading de componentes grandes
const ChatPage = lazy(() => import('./components/ChatPage'));
const PatientView = lazy(() => import('./components/PatientView'));
const GenotypeStrengthMeter = lazy(() => import('./components/GenotypeStrengthMeter'));
const NutrigenomicsPage = lazy(() => import('./components/NutrigenomicsPage'));
const ResearchPromptGenerator = lazy(() => import('./components/ResearchPromptGenerator'));

// Componente de carga para Suspense
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

type Page = 'landing' | 'portal' | 'calculator' | 'biometrics' | 'chat' | 'patientView' | 'strengthMeter' | 'nutrigenomics' | 'researchPrompt';

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
                    onNavigateToResearchPrompt={() => navigateTo('researchPrompt')}
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
                return (
                    <Suspense fallback={<LoadingFallback />}>
                        <ChatPage 
                            onBackToPortal={() => navigateTo('portal')} 
                            onNavigateToMain={() => navigateTo('landing')}
                            contextGenotypeId={viewingGenotype}
                        />
                    </Suspense>
                );
            case 'strengthMeter':
                return (
                    <Suspense fallback={<LoadingFallback />}>
                        <GenotypeStrengthMeter 
                            onResultChange={(result) => {
                                console.log('Resultado del medidor de fuerza:', result);
                            }}
                            onBackToPortal={() => navigateTo('portal')}
                        />
                    </Suspense>
                );
            case 'patientView':
                return (
                    <Suspense fallback={<LoadingFallback />}>
                        <PatientView 
                            onBackToMain={() => navigateTo('landing')}
                        />
                    </Suspense>
                );
            case 'nutrigenomics':
                return (
                    <Suspense fallback={<LoadingFallback />}>
                        <NutrigenomicsPage 
                            onBackToPortal={() => navigateTo('portal')}
                            onNavigateToMain={() => navigateTo('landing')}
                        />
                    </Suspense>
                );
            case 'researchPrompt':
                return (
                    <Suspense fallback={<LoadingFallback />}>
                        <ResearchPromptGenerator 
                            onBackToPortal={() => navigateTo('portal')}
                            onNavigateToMain={() => navigateTo('landing')}
                        />
                    </Suspense>
                );
            default:
                return <LandingPage onNavigateToCalculators={() => navigateTo('portal')} onNavigateToPatientView={() => navigateTo('patientView')} />;
        }
    }

    return (
        <ErrorBoundary>
            <ChatProvider>
                <div className="bg-white min-h-screen font-sans text-gray-800 antialiased">
                    <TopBar
                        currentPage={currentPage}
                        onNavigateToMain={() => navigateTo('landing')}
                        onNavigateToPortal={() => navigateTo('portal')}
                        onNavigateToCalculator={() => navigateTo('calculator')}
                        onNavigateToPatientView={() => navigateTo('patientView')}
                        onNavigateToChat={() => navigateTo('chat')}
                        onNavigateToNutrigenomics={() => navigateTo('nutrigenomics')}
                        onNavigateToStrengthMeter={() => navigateTo('strengthMeter')}
                        onNavigateToResearchPrompt={() => navigateTo('researchPrompt')}
                    />
                    <div key={currentPage + (viewingGenotype || '')} className="animate-fadeIn">
                         {renderPage()}
                    </div>
                </div>
            </ChatProvider>
        </ErrorBoundary>
    );
};

export default App;