import React from 'react';
import { Brain } from 'lucide-react';
import { MedicalHeading, MedicalBadge, MedicalText } from '../MedicalComponents';

interface ChatHeaderProps {
    selectedGenotype: number | null;
}

const ChatHeader: React.FC<ChatHeaderProps> = React.memo(({ selectedGenotype }) => {
    return (
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
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
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Activo</span>
                            </div>
                        </MedicalText>
                    </div>
                </div>
            </div>
        </div>
    );
});

ChatHeader.displayName = 'ChatHeader';

export default ChatHeader;

