import React, { useState } from 'react';
import Chatbot from './Chatbot';
import { 
    MedicalHeading, 
    MedicalText, 
    MedicalBadge, 
    MedicalButton, 
    MedicalCard,
    MedicalSection 
} from './MedicalComponents';
import { Bot, ArrowLeft, Home, MessageSquare, Brain, Lightbulb, Dna, Target, Wheat, Scale, Microscope, Sword, Mountain, Save, History } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';

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
        createSession, 
        addMessage, 
        setActiveSession,
        exportConversations,
        importConversations
    } = useChat();

    const genotypeOptions = [
        { id: null, name: "Consulta General", description: "Información sobre todos los genotipos", icon: Dna },
        { id: 1, name: "Hunter (Cazador)", description: "Genotipo 1 - Perfil ancestral de cazadores", icon: Target },
        { id: 2, name: "Gatherer (Recolector)", description: "Genotipo 2 - Perfil ancestral de recolectores", icon: Wheat },
        { id: 3, name: "Master (Maestro)", description: "Genotipo 3 - Perfil equilibrado y adaptable", icon: Scale },
        { id: 4, name: "Explorer (Explorador)", description: "Genotipo 4 - Perfil adaptativo e innovador", icon: Microscope },
        { id: 5, name: "Warrior (Guerrero)", description: "Genotipo 5 - Perfil de fortaleza y determinación", icon: Sword },
        { id: 6, name: "Nomad (Nómada)", description: "Genotipo 6 - Perfil resiliente y sensible", icon: Mountain }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
            {/* Header con navegación */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <MedicalHeading level={5} variant="primary" className="mb-0">
                                        Asistente Nutrigenómico IA
                                    </MedicalHeading>
                                    <MedicalText variant="caption" size="xs" className="text-gray-500">
                                        Consulta Médica Profesional
                                    </MedicalText>
                                </div>
                            </div>
                        </div>

                        {/* Botones de navegación */}
                        <div className="flex items-center gap-2">
                            <MedicalButton
                                variant="secondary"
                                size="sm"
                                onClick={onBackToPortal}
                                className="hidden sm:flex"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Volver al Portal
                            </MedicalButton>
                            
                            {onNavigateToMain && (
                                <MedicalButton
                                    variant="outline"
                                    size="sm"
                                    onClick={onNavigateToMain}
                                    className="hidden sm:flex"
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Inicio
                                </MedicalButton>
                            )}
                            
                            {/* Botón para sistema de storage */}
                            <MedicalButton
                                variant="primary"
                                size="sm"
                                onClick={() => setShowStoragePanel(!showStoragePanel)}
                                className="hidden sm:flex"
                            >
                                <History className="w-4 h-4 mr-2" />
                                Historial
                            </MedicalButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Sidebar con selección de contexto */}
                        <div className="lg:col-span-1">
                            <MedicalCard variant="elevated" className="p-6 sticky top-28">
                                <MedicalHeading level={5} variant="secondary" className="mb-4">
                                    <MessageSquare className="w-5 h-5 inline mr-2" />
                                    Contexto de Consulta
                                </MedicalHeading>
                                
                                <MedicalText variant="caption" size="sm" className="mb-4 text-gray-600">
                                    Selecciona el genotipo específico o mantén consulta general:
                                </MedicalText>

                                <div className="space-y-2">
                                    {genotypeOptions.map((option) => (
                                        <button
                                            key={option.id || 'general'}
                                            onClick={() => setSelectedGenotype(option.id)}
                                            className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                                                selectedGenotype === option.id
                                                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                                                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-6 h-6 text-gray-600 flex items-center justify-center">
                                                    <option.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <MedicalText 
                                                        variant="label" 
                                                        size="sm" 
                                                        className={`${selectedGenotype === option.id ? 'text-blue-900' : 'text-gray-900'} mb-1`}
                                                    >
                                                        {option.name}
                                                    </MedicalText>
                                                    <MedicalText 
                                                        variant="caption" 
                                                        size="xs" 
                                                        className={selectedGenotype === option.id ? 'text-blue-700' : 'text-gray-600'}
                                                    >
                                                        {option.description}
                                                    </MedicalText>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Información de ayuda */}
                                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5" />
                                        <div>
                                            <MedicalText variant="label" size="xs" className="text-amber-800 mb-1">
                                                Sugerencias de Uso:
                                            </MedicalText>
                                            <MedicalText variant="caption" size="xs" className="text-amber-700">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        <span>Pregunta sobre alimentos específicos</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        <span>Solicita menús personalizados</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        <span>Compara genotipos</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                                        <span>Obtén explicaciones científicas</span>
                                                    </div>
                                                </div>
                                            </MedicalText>
                                        </div>
                                    </div>
                                </div>
                            </MedicalCard>
                        </div>

                        {/* Área principal del chat */}
                        <div className="lg:col-span-3">
                            <MedicalCard variant="elevated" className="h-[calc(100vh-12rem)] flex flex-col">
                                {/* Header del chat */}
                                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <MedicalHeading level={4} variant="primary" className="mb-1">
                                                Consulta Nutrigenómica
                                            </MedicalHeading>
                                            <div className="flex items-center gap-2">
                                                <MedicalBadge 
                                                    variant={selectedGenotype ? "primary" : "secondary"} 
                                                    size="sm"
                                                >
                                                    {selectedGenotype 
                                                        ? `Genotipo ${selectedGenotype}` 
                                                        : "Consulta General"
                                                    }
                                                </MedicalBadge>
                                                <MedicalText variant="caption" size="xs" className="text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span>Activo</span>
                                                    </div>
                                                </MedicalText>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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

                    {/* Botones de navegación móvil */}
                    <div className="mt-8 flex flex-col sm:hidden gap-3">
                        <MedicalButton
                            variant="secondary"
                            size="md"
                            onClick={onBackToPortal}
                            className="w-full"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Volver al Portal
                        </MedicalButton>
                        
                        {onNavigateToMain && (
                            <MedicalButton
                                variant="outline"
                                size="md"
                                onClick={onNavigateToMain}
                                className="w-full"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Ir al Inicio
                            </MedicalButton>
                        )}
                    </div>
                </div>
                
                {/* Panel de Storage para Chat */}
                {showStoragePanel && (
                    <div className="mt-8">
                        <MedicalSection>
                            <MedicalHeading level={4} variant="primary" className="mb-4">
                                <Save className="w-5 h-5 inline mr-2" />
                                Sistema de Almacenamiento de Conversaciones
                            </MedicalHeading>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Estadísticas */}
                                <MedicalCard variant="elevated" className="p-4">
                                    <MedicalHeading level={6} variant="secondary" className="mb-2">
                                        Estadísticas del Chat
                                    </MedicalHeading>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Sesiones activas:</span>
                                            <MedicalBadge variant="success">{sessions.length}</MedicalBadge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Sesión actual:</span>
                                            <MedicalBadge variant={activeSessionId ? "primary" : "warning"}>
                                                {activeSessionId ? "Activa" : "Ninguna"}
                                            </MedicalBadge>
                                        </div>
                                    </div>
                                </MedicalCard>
                                
                                {/* Acciones */}
                                <MedicalCard variant="elevated" className="p-4">
                                    <MedicalHeading level={6} variant="secondary" className="mb-2">
                                        Acciones
                                    </MedicalHeading>
                                    <div className="space-y-2">
                                        <MedicalButton
                                            variant="outline"
                                            size="sm"
                                            onClick={exportConversations}
                                            className="w-full"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Exportar Conversaciones
                                        </MedicalButton>
                                        
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) importConversations(file);
                                            }}
                                            className="hidden"
                                            id="import-chat"
                                        />
                                        <label htmlFor="import-chat">
                                            <MedicalButton
                                                variant="outline"
                                                size="sm"
                                                className="w-full cursor-pointer"
                                            >
                                                <History className="w-4 h-4 mr-2" />
                                                Importar Conversaciones
                                            </MedicalButton>
                                        </label>
                                    </div>
                                </MedicalCard>
                            </div>
                            
                            {/* Lista de sesiones recientes */}
                            {sessions.length > 0 && (
                                <div className="mt-6">
                                    <MedicalHeading level={6} variant="secondary" className="mb-3">
                                        Sesiones Recientes
                                    </MedicalHeading>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {sessions.slice(0, 6).map((session) => (
                                            <MedicalCard 
                                                key={session.id} 
                                                variant="elevated"
                                                className={`p-3 cursor-pointer transition-all ${
                                                    activeSessionId === session.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                                }`}
                                                onClick={() => setActiveSession(session.id)}
                                            >
                                                <div className="text-sm">
                                                    <div className="font-medium mb-1 truncate">
                                                        {session.title}
                                                    </div>
                                                    <div className="text-gray-500 text-xs">
                                                        {session.messages.length} mensajes
                                                    </div>
                                                    <div className="text-gray-400 text-xs">
                                                        {new Date(session.updatedAt).toLocaleDateString('es-ES')}
                                                    </div>
                                                </div>
                                            </MedicalCard>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </MedicalSection>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;