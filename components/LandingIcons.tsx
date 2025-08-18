import React from 'react';
import {
    Recycle as MetabolicRegulationIcon,
    BarChartBig as EpigeneticRegulationIcon,
    Clock as DnaDamageIcon,
    ZoomIn as PersonalizedPreventionIcon,
    Heart as WeightControlIcon,
    Zap as DigestionIcon,
    MapPin as VitalityIcon,
    Image as PlansIcon,
    Shield as MetabolicOptimizationIcon,
    Check as CheckmarkIcon,
    Minus,
    Plus,
    X as CrossIcon,
    FileText,
    AlignJustify,
    ChevronsRight as EnergyIcon,
    TrendingUp as ChartIcon,
    ClipboardCheck as RecommendationsIcon,
    Sparkles,
} from 'lucide-react';

const MinusIcon: React.FC<{className?: string}> = ({className}) => (
    <Minus className={`w-6 h-6 mx-auto ${className}`} strokeWidth={2} />
);

const PlusIcon: React.FC = () => (
    <Plus className="w-6 h-6" strokeWidth={2} />
);

export const GenoTipoLogo: React.FC = () => (
    <div className="flex items-center justify-center gap-2">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500"></span>
        <span className="font-bold text-gray-800">GenoTipo</span>
    </div>
);

export const PlanTradicionalLogo: React.FC = () => (
    <div className="flex items-center justify-center gap-2 text-gray-500">
        <FileText className="w-6 h-6" />
        <span className="font-semibold text-sm">Plan Tradicional</span>
    </div>
);

export const PlanGenericoLogo: React.FC = () => (
    <div className="flex items-center justify-center gap-2 text-gray-500">
        <AlignJustify className="w-6 h-6" />
        <span className="font-semibold text-sm">Plan Genérico</span>
    </div>
);

// Focus Icons (placeholders)
export const BodyMeasurementsIcon: React.FC = () => (<div />);
export const LabTestsIcon: React.FC = () => (<div />);
export const AlgorithmsIcon: React.FC = () => (<div />);
export const NutrigenomicEvalIcon: React.FC = () => (<div />);


export {
    MetabolicRegulationIcon,
    EpigeneticRegulationIcon,
    DnaDamageIcon,
    PersonalizedPreventionIcon,
    WeightControlIcon,
    DigestionIcon,
    VitalityIcon,
    PlansIcon,
    MetabolicOptimizationIcon,
    CheckmarkIcon,
    MinusIcon,
    PlusIcon,
    CrossIcon,
    EnergyIcon,
    ChartIcon,
    RecommendationsIcon,
    Sparkles as SparklesIcon
};
