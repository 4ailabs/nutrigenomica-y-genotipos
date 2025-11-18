import React from 'react';
import { Dna, Target, Wheat, Scale, Microscope, Sword, Mountain, LucideIcon } from 'lucide-react';

export interface GenotypeOption {
    id: number | null;
    name: string;
    shortName: string;
    icon: LucideIcon;
}

export const GENOTYPE_OPTIONS: readonly GenotypeOption[] = [
    { id: null, name: "Consulta General", shortName: "General", icon: Dna },
    { id: 1, name: "Hunter (Cazador)", shortName: "Hunter", icon: Target },
    { id: 2, name: "Gatherer (Recolector)", shortName: "Gatherer", icon: Wheat },
    { id: 3, name: "Master (Maestro)", shortName: "Master", icon: Scale },
    { id: 4, name: "Explorer (Explorador)", shortName: "Explorer", icon: Microscope },
    { id: 5, name: "Warrior (Guerrero)", shortName: "Warrior", icon: Sword },
    { id: 6, name: "Nomad (Nómada)", shortName: "Nomad", icon: Mountain }
] as const;

interface GenotypeButtonProps {
    option: GenotypeOption;
    isSelected: boolean;
    onClick: () => void;
}

const GenotypeButton: React.FC<GenotypeButtonProps> = React.memo(({ option, isSelected, onClick }) => {
    const Icon = option.icon;
    
    return (
        <button
            onClick={onClick}
            className={`w-full p-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm'
            }`}
        >
            <div className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${
                    isSelected ? 'text-blue-900' : 'text-gray-700'
                }`}>
                    {option.shortName}
                </span>
            </div>
        </button>
    );
});

GenotypeButton.displayName = 'GenotypeButton';

interface GenotypeSelectorProps {
    selectedGenotype: number | null;
    onSelectGenotype: (id: number | null) => void;
    compact?: boolean;
}

const GenotypeSelector: React.FC<GenotypeSelectorProps> = React.memo(({ 
    selectedGenotype, 
    onSelectGenotype,
    compact = false 
}) => {
    if (compact) {
        // Modo móvil/compacto: Dropdown
        return (
            <select
                value={selectedGenotype ?? ''}
                onChange={(e) => onSelectGenotype(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {GENOTYPE_OPTIONS.map((option) => (
                    <option key={option.id ?? 'general'} value={option.id ?? ''}>
                        {option.name}
                    </option>
                ))}
            </select>
        );
    }

    // Modo desktop: Grid de botones
    return (
        <div className="grid grid-cols-2 gap-2">
            {GENOTYPE_OPTIONS.map((option) => (
                <GenotypeButton
                    key={option.id ?? 'general'}
                    option={option}
                    isSelected={selectedGenotype === option.id}
                    onClick={() => onSelectGenotype(option.id)}
                />
            ))}
        </div>
    );
});

GenotypeSelector.displayName = 'GenotypeSelector';

export default GenotypeSelector;

