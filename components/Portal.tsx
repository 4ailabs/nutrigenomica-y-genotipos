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
import { Target, Calculator, Users, Award, Clock, ArrowRight, CheckCircle, Home, ArrowLeft, Bot, Atom } from 'lucide-react';

interface PortalProps {
    onNavigateToCalculator: () => void;
    onNavigateToGenotype: (id: number) => void;
    onNavigateToBiometrics: () => void;
    onNavigateToStrengthMeter: () => void;
    onNavigateToMain?: () => void;
    onNavigateToChat?: () => void;
    onNavigateToNutrigenomics?: () => void;
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

const Portal: React.FC<PortalProps> = ({ onNavigateToCalculator, onNavigateToGenotype, onNavigateToBiometrics, onNavigateToStrengthMeter, onNavigateToMain, onNavigateToChat, onNavigateToNutrigenomics }) => {
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
        }] : [])
    ];

    // Combinar todas las herramientas
    const allTools = [...evaluationTools, ...consultationTools];

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Botón de Regreso al Inicio */}
            {onNavigateToMain && (
                <div className="absolute top-6 left-6 z-20">
                    <MedicalButton
                        variant="secondary"
                        size="sm"
                        onClick={onNavigateToMain}
                        className="bg-white hover:bg-gray-50 shadow-sm border border-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Regresar al Inicio
                    </MedicalButton>
                </div>
            )}
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Profesional */}
                <header className="text-center mb-12">
                    <MedicalBadge variant="info" size="md" className="mb-4">
                        <Target className="w-4 h-4 mr-2" />
                        Portal de Evaluación GenoTipo
                    </MedicalBadge>
                    
                    <MedicalHeading level={3} variant="primary" align="center" className="mb-4">
                        Portal GenoTipo
                    </MedicalHeading>
                    
                    <MedicalText variant="body" size="base" className="max-w-2xl mx-auto mb-6 text-gray-700">
                        Sistema profesional para evaluación nutrigenómica.
                    </MedicalText>
                    
                    {/* Información médica */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-xl mx-auto">
                        <p className="text-sm text-blue-800">
                            <strong>Uso profesional:</strong> Herramientas para evaluación rápida y consultas nutrigenómicas.
                        </p>
                    </div>
                </header>

                {/* Sección de GenoTipos - Reorganizada */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <MedicalHeading level={4} variant="secondary" align="center" className="mb-3">
                            Exploración de GenoTipos
                        </MedicalHeading>
                        <MedicalText variant="body" size="sm" className="max-w-2xl mx-auto text-gray-600">
                            Consulta información detallada de cada GenoTipo.
                        </MedicalText>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {genotypes.map((num, index) => (
                            <button
                                key={num}
                                onClick={() => onNavigateToGenotype(num)}
                                className="group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-2xl"
                            >
                                <div className="transform transition-all duration-200 group-hover:scale-105">
                                    <GenotypeBox number={num} />
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
                
                {/* Sección de Herramientas - Reorganizada */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <MedicalBadge variant="success" size="md" className="mb-3">
                            <Users className="w-4 h-4 mr-2" />
                            Herramientas Profesionales
                        </MedicalBadge>
                        
                        <MedicalHeading level={4} variant="secondary" align="center" className="mb-3">
                            Evaluación y Consulta
                        </MedicalHeading>
                        
                        <MedicalText variant="body" size="sm" className="max-w-2xl mx-auto text-gray-600">
                            Evaluación de genotipos y consultas con IA.
                        </MedicalText>
                    </div>
                    
                    {/* Herramientas de Evaluación */}
                    {evaluationTools.length > 0 && (
                        <div className="mb-8">
                            <MedicalHeading level={5} variant="muted" align="center" className="mb-4">
                                Proceso de Evaluación
                            </MedicalHeading>
                            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                {evaluationTools.map((tool) => (
                                    <ToolCard 
                                        key={tool.title} 
                                        {...tool}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Herramientas de Consulta */}
                    {consultationTools.length > 0 && (
                        <div>
                            <MedicalHeading level={5} variant="muted" align="center" className="mb-4">
                                Herramientas de Consulta
                            </MedicalHeading>
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


                {/* Footer Profesional */}
                <footer className="text-center text-gray-500 text-sm mt-20 py-8 border-t border-gray-200">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                        <div className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">Ciencia Basada en Evidencia</div>
                        <div className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">Validado Científicamente</div>
                        <div className="inline-flex items-center px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs font-medium">Medicina Personalizada</div>
                    </div>
                    <p>© {new Date().getFullYear()} Dr. Miguel Ojeda Rios. Todos los derechos reservados.</p>
                </footer>
            </div>
        </div>
    );
};

export default Portal;