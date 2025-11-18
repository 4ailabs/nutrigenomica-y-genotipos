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
            className={`w-full p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                isSelected
                    ? 'border-blue-600 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-700'}`} />
                </div>
                <span className={`text-sm font-bold ${
                    isSelected ? 'text-white' : 'text-gray-900'
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

    // Modo desktop: Lista vertical de botones
    return (
        <div className="space-y-2">
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

