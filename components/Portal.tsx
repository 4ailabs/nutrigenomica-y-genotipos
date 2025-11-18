import React, { useState } from 'react';
import GenotypeBox from './GenotypeBox';
import { 
    MedicalButton, 
    MedicalCard, 
    MedicalBadge, 
    MedicalHeading, 
    MedicalText, 
    MedicalSection,
    GenotypeCard,
    MedicalAlertCard
} from './MedicalComponents';
import { Target, Calculator, Users, Award, Clock, ArrowRight, CheckCircle, Home, ArrowLeft, Bot, Atom, FileSearch } from 'lucide-react';

interface PortalProps {
    onNavigateToCalculator: () => void;
    onNavigateToGenotype: (id: number) => void;
    onNavigateToBiometrics: () => void;
    onNavigateToStrengthMeter: () => void;
    onNavigateToMain?: () => void;
    onNavigateToChat?: () => void;
    onNavigateToNutrigenomics?: () => void;
    onNavigateToResearchPrompt?: () => void;
}

interface ToolCardProps {
    type: string;
    title: string;
    description: string;
    features: string[];
    onClick: () => void;
    style?: React.CSSProperties;
    category: 'evaluation' | 'consultation';
}

const ToolCard: React.FC<ToolCardProps> = ({ type, title, description, features, onClick, style, category }) => {
    // Colores diferenciados por herramienta específica
    const getToolColors = () => {
        switch(type) {
            case 'biometrics':
                return {
                    header: "bg-emerald-50 border-emerald-200",
                    badge: "bg-emerald-100 text-emerald-700",
                    icon: "bg-emerald-100 text-emerald-600",
                    button: "bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white"
                };
            case 'calculator':
                return {
                    header: "bg-cyan-50 border-cyan-200",
                    badge: "bg-cyan-100 text-cyan-700",
                    icon: "bg-cyan-100 text-cyan-600",
                    button: "bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 text-white"
                };
            case 'strength':
                return {
                    header: "bg-amber-50 border-amber-200",
                    badge: "bg-amber-100 text-amber-700",
                    icon: "bg-amber-100 text-amber-600",
                    button: "bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white"
                };
            case 'chat':
                return {
                    header: "bg-violet-50 border-violet-200", 
                    badge: "bg-violet-100 text-violet-700",
                    icon: "bg-violet-100 text-violet-600",
                    button: "bg-violet-500 hover:bg-violet-600 active:bg-violet-700 text-white"
                };
            case 'nutrigenomics':
                return {
                    header: "bg-purple-50 border-purple-200",
                    badge: "bg-purple-100 text-purple-700",
                    icon: "bg-purple-100 text-purple-600",
                    button: "bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white"
                };
            case 'research':
                return {
                    header: "bg-indigo-50 border-indigo-200",
                    badge: "bg-indigo-100 text-indigo-700",
                    icon: "bg-indigo-100 text-indigo-600",
                    button: "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white"
                };

            default:
                return {
                    header: "bg-slate-50 border-slate-200",
                    badge: "bg-slate-100 text-slate-700",
                    icon: "bg-slate-100 text-slate-600",
                    button: "bg-slate-500 hover:bg-slate-600 active:bg-slate-700 text-white"
                };
        }
    };

    const colors = getToolColors();

    // Iconos por tipo de herramienta
    const getIcon = () => {
        switch(type) {
            case 'biometrics': return <Target className="w-8 h-8" />;
            case 'calculator': return <Calculator className="w-8 h-8" />;
            case 'strength': return <Award className="w-8 h-8" />;
            case 'chat': return <Bot className="w-8 h-8" />;
            case 'nutrigenomics': return <Atom className="w-8 h-8" />;
            case 'research': return <FileSearch className="w-8 h-8" />;

            default: return <Target className="w-8 h-8" />;
        }
    };

    return (
        <button
            onClick={onClick}
            className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 p-6 text-left w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 ${colors.icon} rounded-lg flex items-center justify-center`}>
                    {getIcon()}
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {title}
                    </h3>
                    <div className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${colors.badge} mt-1`}>
                        {category === 'evaluation' ? 'Evaluación' : 'Consulta'}
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-200" />
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{description}</p>
            
            {features && (
                <div className="flex gap-2 flex-wrap">
                    {features.map((feature, index) => (
                        <span key={index} className="inline-flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feature}
                        </span>
                    ))}
                </div>
            )}
        </button>
    );
};

const Portal: React.FC<PortalProps> = ({ onNavigateToCalculator, onNavigateToGenotype, onNavigateToBiometrics, onNavigateToStrengthMeter, onNavigateToMain, onNavigateToChat, onNavigateToNutrigenomics, onNavigateToResearchPrompt }) => {
    const genotypes = [1, 2, 3, 4, 5, 6];
    
    // Colores médicos para cada genotipo
    const genotypeColors = [
        "from-blue-500 to-blue-600",      // Genotipo 1
        "from-emerald-500 to-emerald-600", // Genotipo 2
        "from-purple-500 to-purple-600",   // Genotipo 3
        "from-orange-500 to-orange-600",   // Genotipo 4
        "from-pink-500 to-pink-600",       // Genotipo 5
        "from-indigo-500 to-indigo-600"    // Genotipo 6
    ];
    
    // Herramientas de evaluación (proceso secuencial)
    const evaluationTools = [
        {
            type: "biometrics",
            title: "Biomediciones",
            description: "Captura y exporta medidas corporales precisas",
            features: [
                "Captura de datos",
                "Exportación a PDF/JSON"
            ],
            onClick: onNavigateToBiometrics,
            category: 'evaluation' as const
        },
        {
            type: "calculator",
            title: "Calculadora Avanzada",
            description: "Calcula el GenoTipo del paciente",
            features: [
                "Resultado inmediato",
                "Algoritmo validado"
            ],
            onClick: onNavigateToCalculator,
            category: 'evaluation' as const
        },
        {
            type: "strength",
            title: "Medidor de Fuerza del Genotipo",
            description: "Evalúa la fuerza del genotipo basado en biomediciones",
            features: [
                "Evaluación biométrica",
                "Historial de resultados"
            ],
            onClick: onNavigateToStrengthMeter,
            category: 'evaluation' as const
        }
    ];

    // Herramientas de consulta (independientes)
    const consultationTools = [
        ...(onNavigateToChat ? [{
            type: "chat",
            title: "Asistente IA Nutrigenómico",
            description: "Consultas rápidas sobre genotipos y nutrición",
            features: [
                "Respuestas inmediatas",
                "Disponible 24/7"
            ],
            onClick: onNavigateToChat,
            category: 'consultation' as const
        }] : []),
        ...(onNavigateToNutrigenomics ? [{
            type: "nutrigenomics",
            title: "Nutrigenómica",
            description: "Ciencia genética aplicada a la nutrición personalizada",
            features: [
                "Fundamentos científicos",
                "Educación especializada"
            ],
            onClick: onNavigateToNutrigenomics,
            category: 'consultation' as const
        }] : []),
        ...(onNavigateToResearchPrompt ? [{
            type: "research",
            title: "Generador de Prompts de Investigación",
            description: "Crea prompts profesionales para investigación nutrigenómica profunda",
            features: [
                "Optimizado para IA",
                "Historial de casos"
            ],
            onClick: onNavigateToResearchPrompt,
            category: 'consultation' as const
        }] : [])
    ];

    // Combinar todas las herramientas
    const allTools = [...evaluationTools, ...consultationTools];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">
            {/* Botón de Regreso al Inicio */}
            {onNavigateToMain && (
                <div className="absolute top-6 left-6 z-20">
                    <MedicalButton
                        variant="secondary"
                        size="sm"
                        onClick={onNavigateToMain}
                        className="bg-white hover:bg-gray-50 shadow-md border border-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Regresar al Inicio
                    </MedicalButton>
                </div>
            )}
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Profesional Mejorado */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                        <Target className="w-4 h-4" />
                        Portal de Evaluación GenoTipo
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Portal GenoTipo
                    </h1>
                    
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                        Sistema profesional para evaluación nutrigenómica.
                    </p>
                    
                    {/* Información médica mejorada */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-lg p-5 md:p-6 max-w-2xl mx-auto shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-base md:text-lg text-blue-900 font-medium">
                                <strong>Uso profesional:</strong> Herramientas para evaluación rápida y consultas nutrigenómicas.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Sección de GenoTipos - Mejorada */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Exploración de GenoTipos
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Consulta información detallada de cada GenoTipo.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
                        {genotypes.map((num) => (
                            <button
                                key={num}
                                onClick={() => onNavigateToGenotype(num)}
                                className="group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl transition-all duration-300 hover:scale-105"
                            >
                                <GenotypeBox number={num} />
                            </button>
                        ))}
                    </div>
                </section>
                
                {/* Sección de Herramientas - Mejorada */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
                            <Users className="w-4 h-4" />
                            Herramientas Profesionales
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Evaluación y Consulta
                        </h2>
                        
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Evaluación de genotipos y consultas con IA.
                        </p>
                    </div>
                    
                    {/* Herramientas de Evaluación */}
                    {evaluationTools.length > 0 && (
                        <div className="mb-12">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Proceso de Evaluación
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Sigue estos pasos para evaluar el genotipo de un paciente
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {evaluationTools.map((tool, index) => (
                                    <div key={tool.title} className="relative">
                                        {index < evaluationTools.length - 1 && (
                                            <div className="hidden lg:block absolute top-1/2 right-0 w-6 h-0.5 bg-gray-300 transform -translate-y-1/2 translate-x-3 z-0">
                                                <ArrowRight className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                        <ToolCard {...tool} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Herramientas de Consulta */}
                    {consultationTools.length > 0 && (
                        <div>
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    Herramientas de Consulta
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Recursos adicionales para consultas y educación
                                </p>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                {consultationTools.map((tool) => (
                                    <ToolCard 
                                        key={tool.title} 
                                        {...tool}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </section>


                {/* Footer Profesional Mejorado */}
                <footer className="text-center mt-24 py-12 border-t border-gray-200 bg-white rounded-t-3xl">
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                        <div className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                            Ciencia Basada en Evidencia
                        </div>
                        <div className="inline-flex items-center px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                            Validado Científicamente
                        </div>
                        <div className="inline-flex items-center px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                            Medicina Personalizada
                        </div>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Dr. Miguel Ojeda Rios. Todos los derechos reservados.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Portal;