import React, { useState, lazy, Suspense } from 'react';
import { History } from 'lucide-react';
import Chatbot from './Chatbot';
import { MedicalCard, MedicalButton } from './MedicalComponents';
import { useChat } from '../contexts/ChatContext';
import ChatHeader from './chat/ChatHeader';
import ChatSidebar from './chat/ChatSidebar';
import GenotypeSelector from './chat/GenotypeSelector';
import FloatingNav from './FloatingNav';

// Lazy load del panel de historial (solo cuando se necesita)
const ChatStoragePanel = lazy(() => import('./chat/ChatStoragePanel'));

interface ChatPageProps {
    onBackToPortal: () => void;
    onNavigateToMain?: () => void;
    contextGenotypeId?: number | null;
}

const ChatPage: React.FC<ChatPageProps> = ({ 
    onBackToPortal, 
    onNavigateToMain, 
    contextGenotypeId = null 
}) => {
    const [selectedGenotype, setSelectedGenotype] = useState<number | null>(contextGenotypeId);
    const [showStoragePanel, setShowStoragePanel] = useState(false);
    
    // Hook para el sistema de storage
    const { 
        sessions, 
        activeSessionId, 
        setActiveSession,
        exportConversations,
        importConversations
    } = useChat();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto">
                    {/* Botón de historial */}
                    <div className="flex justify-end mb-4">
                        <MedicalButton
                            variant="primary"
                            size="sm"
                            onClick={() => setShowStoragePanel(!showStoragePanel)}
                        >
                            <History className="w-4 h-4 mr-2" />
                            {showStoragePanel ? 'Ocultar' : 'Historial'}
                        </MedicalButton>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6">
                        {/* Selector de contexto móvil */}
                        <div className="lg:hidden mb-4 col-span-full">
                            <GenotypeSelector
                                selectedGenotype={selectedGenotype}
                                onSelectGenotype={setSelectedGenotype}
                                compact={true}
                            />
                        </div>

                        {/* Sidebar - Desktop only - 3 columnas */}
                        <div className="hidden lg:block lg:col-span-3">
                            <ChatSidebar
                                selectedGenotype={selectedGenotype}
                                onSelectGenotype={setSelectedGenotype}
                            />
                        </div>

                        {/* Área principal del chat - 9 columnas */}
                        <div className="col-span-full lg:col-span-9">
                            <MedicalCard variant="elevated" className="h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
                                <ChatHeader selectedGenotype={selectedGenotype} />
                                
                                {/* Chat integrado */}
                                <div className="flex-1 overflow-hidden">
                                    <Chatbot
                                        isOpen={true}
                                        onClose={() => {}}
                                        contextGenotypeId={selectedGenotype}
                                        isIntegrated={true}
                                    />
                                </div>
                            </MedicalCard>
                        </div>
                    </div>

                    {/* Panel de Storage - Lazy loaded */}
                    {showStoragePanel && (
                        <div className="mt-8">
                            <Suspense fallback={
                                <div className="flex items-center justify-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                                </div>
                            }>
                                <ChatStoragePanel
                                    sessions={sessions}
                                    activeSessionId={activeSessionId}
                                    onSetActiveSession={setActiveSession}
                                    onExportConversations={exportConversations}
                                    onImportConversations={importConversations}
                                />
                            </Suspense>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Navegación Flotante */}
            <FloatingNav 
                onBack={onBackToPortal}
                onHome={onNavigateToMain}
                showBackButton={true}
                showHomeButton={true}
            />
        </div>
    );
};

export default ChatPage;

