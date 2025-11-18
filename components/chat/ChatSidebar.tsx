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
        <MedicalCard variant="elevated" className="p-4 h-fit sticky top-24">
            <MedicalHeading level={6} variant="secondary" className="mb-3">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Contexto
            </MedicalHeading>
            
            <GenotypeSelector
                selectedGenotype={selectedGenotype}
                onSelectGenotype={onSelectGenotype}
            />

            {/* Tips de uso */}
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <MedicalText variant="label" size="xs" className="text-amber-800 mb-2">
                            Sugerencias:
                        </MedicalText>
                        <div className="space-y-1.5">
                            {USAGE_TIPS.map((tip, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <MedicalText variant="caption" size="xs" className="text-amber-700">
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

