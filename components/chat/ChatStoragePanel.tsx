import React from 'react';
import { Save, History } from 'lucide-react';
import { 
    MedicalSection, 
    MedicalHeading, 
    MedicalCard, 
    MedicalBadge, 
    MedicalButton 
} from '../MedicalComponents';

interface ChatSession {
    id: string;
    title: string;
    messages: any[];
    updatedAt: string;
}

interface ChatStoragePanelProps {
    sessions: ChatSession[];
    activeSessionId: string | null;
    onSetActiveSession: (sessionId: string) => void;
    onExportConversations: () => void;
    onImportConversations: (file: File) => void;
}

const ChatStoragePanel: React.FC<ChatStoragePanelProps> = ({
    sessions,
    activeSessionId,
    onSetActiveSession,
    onExportConversations,
    onImportConversations
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImportConversations(file);
        }
    };

    return (
        <MedicalSection>
            <MedicalHeading level={4} variant="primary" className="mb-4">
                <Save className="w-5 h-5 inline mr-2" />
                Gestión de Conversaciones
            </MedicalHeading>
            
            <div className="grid md:grid-cols-2 gap-6">
                {/* Estadísticas */}
                <MedicalCard variant="elevated" className="p-4">
                    <MedicalHeading level={6} variant="secondary" className="mb-3">
                        Estadísticas
                    </MedicalHeading>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Sesiones totales:</span>
                            <MedicalBadge variant="success" size="sm">
                                {sessions.length}
                            </MedicalBadge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Sesión actual:</span>
                            <MedicalBadge 
                                variant={activeSessionId ? "primary" : "warning"} 
                                size="sm"
                            >
                                {activeSessionId ? "Activa" : "Ninguna"}
                            </MedicalBadge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total mensajes:</span>
                            <MedicalBadge variant="secondary" size="sm">
                                {sessions.reduce((acc, s) => acc + s.messages.length, 0)}
                            </MedicalBadge>
                        </div>
                    </div>
                </MedicalCard>
                
                {/* Acciones */}
                <MedicalCard variant="elevated" className="p-4">
                    <MedicalHeading level={6} variant="secondary" className="mb-3">
                        Acciones
                    </MedicalHeading>
                    <div className="space-y-3">
                        <MedicalButton
                            variant="outline"
                            size="sm"
                            onClick={onExportConversations}
                            className="w-full justify-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Exportar Conversaciones
                        </MedicalButton>
                        
                        <input
                            type="file"
                            accept=".json"
                            onChange={handleFileChange}
                            className="hidden"
                            id="import-chat-storage"
                        />
                        <label htmlFor="import-chat-storage" className="block">
                            <MedicalButton
                                variant="outline"
                                size="sm"
                                className="w-full cursor-pointer justify-center"
                                as="span"
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
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {sessions.slice(0, 9).map((session) => (
                            <MedicalCard 
                                key={session.id} 
                                variant="elevated"
                                className={`p-3 cursor-pointer transition-all hover:shadow-md ${
                                    activeSessionId === session.id 
                                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                                        : 'hover:border-blue-300'
                                }`}
                                onClick={() => onSetActiveSession(session.id)}
                            >
                                <div className="space-y-1">
                                    <div className="font-medium text-sm truncate text-gray-900">
                                        {session.title}
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-500">
                                            {session.messages.length} mensajes
                                        </span>
                                        <span className="text-gray-400">
                                            {new Date(session.updatedAt).toLocaleDateString('es-ES', {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </MedicalCard>
                        ))}
                    </div>
                    {sessions.length > 9 && (
                        <p className="text-sm text-gray-500 text-center mt-3">
                            Y {sessions.length - 9} sesiones más...
                        </p>
                    )}
                </div>
            )}
        </MedicalSection>
    );
};

export default ChatStoragePanel;

