import React from 'react';
import { MessageSquare, Lightbulb } from 'lucide-react';
import { MedicalCard, MedicalHeading, MedicalText } from '../MedicalComponents';
import GenotypeSelector from './GenotypeSelector';

const USAGE_TIPS = [
    'Pregunta sobre alimentos específicos',
    'Solicita menús personalizados',
    'Compara genotipos',
    'Obtén explicaciones científicas'
] as const;

interface ChatSidebarProps {
    selectedGenotype: number | null;
    onSelectGenotype: (id: number | null) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = React.memo(({ 
    selectedGenotype, 
    onSelectGenotype 
}) => {
    return (
        <MedicalCard variant="elevated" className="p-5 h-fit sticky top-24">
            <div className="mb-4 pb-4 border-b border-gray-200">
                <MedicalHeading level={5} variant="secondary" className="mb-1 text-gray-900">
                    <MessageSquare className="w-5 h-5 inline mr-2" />
                    Contexto
                </MedicalHeading>
                <p className="text-xs text-gray-600 mt-1">
                    Selecciona un genotipo
                </p>
            </div>
            
            <GenotypeSelector
                selectedGenotype={selectedGenotype}
                onSelectGenotype={onSelectGenotype}
            />

            {/* Tips de uso */}
            <div className="mt-5 p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <MedicalText variant="label" size="sm" className="text-amber-900 mb-2 font-bold">
                            Sugerencias
                        </MedicalText>
                        <div className="space-y-2">
                            {USAGE_TIPS.map((tip, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <MedicalText variant="caption" size="xs" className="text-amber-800 leading-relaxed">
                                        {tip}
                                    </MedicalText>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MedicalCard>
    );
});

ChatSidebar.displayName = 'ChatSidebar';

export default ChatSidebar;

