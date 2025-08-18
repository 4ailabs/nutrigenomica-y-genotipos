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
import { Target, Calculator, Users, Award, Clock, ArrowRight, CheckCircle, Home, ArrowLeft } from 'lucide-react';
import Chatbot from './Chatbot';

interface PortalProps {
    onNavigateToCalculator: () => void;
    onNavigateToGenotype: (id: number) => void;
    onNavigateToBiometrics: () => void;
    onNavigateToMain?: () => void; // Nueva prop para navegar al inicio
}

interface CalculatorCardProps {
    type: string;
    title: string;
    description: string;
    features: string[];
    onClick: () => void;
    style?: React.CSSProperties;
    step: number;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ type, title, description, features, onClick, style, step }) => {
    // Colores diferenciados para cada paso
    const stepColors = {
        1: {
            header: "bg-blue-50 border-blue-200",
            badge: "bg-blue-100 text-blue-700",
            icon: "bg-blue-100 text-blue-600",
            number: "bg-blue-100 text-blue-600"
        },
        2: {
            header: "bg-green-50 border-green-200",
            badge: "bg-green-100 text-green-700",
            icon: "bg-green-100 text-green-600",
            number: "bg-green-100 text-green-600"
        }
    };

    const colors = stepColors[step as keyof typeof stepColors];

    return (
        <MedicalCard 
            variant="interactive"
            className="overflow-hidden flex flex-col h-full" 
            animation="slideUp"
            onClick={onClick}
        >
            <div className={`h-32 relative overflow-hidden ${colors.header} border-b`}>
                {/* Número del paso con estilo médico */}
                <MedicalBadge 
                    variant={step === 1 ? "info" : "success"}
                    className="absolute top-4 right-4"
                >
                    Paso {step}
                </MedicalBadge>
                
                {/* Icono médico centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center shadow-md`}>
                        {step === 1 ? (
                            <Target className="w-8 h-8" />
                        ) : (
                            <Calculator className="w-8 h-8" />
                        )}
                    </div>
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center mr-3 ${colors.number} shadow-sm`}>
                        {step}
                    </div>
                    <MedicalHeading level={4} variant="default" className="mb-0">{title}</MedicalHeading>
                </div>
                
                <MedicalText variant="body" size="sm" className="mb-4 flex-grow">{description}</MedicalText>
                
                {features && (
                    <ul className="space-y-2 mb-6">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <MedicalText variant="caption" size="sm" as="span">{feature}</MedicalText>
                            </li>
                        ))}
                    </ul>
                )}
                
                <MedicalButton
                    variant="primary"
                    onClick={onClick}
                    className="mt-auto w-full group"
                >
                    <span>Continuar</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </MedicalButton>
            </div>
        </MedicalCard>
    );
};

const Portal: React.FC<PortalProps> = ({ onNavigateToCalculator, onNavigateToGenotype, onNavigateToBiometrics, onNavigateToMain }) => {
    const genotypes = [1, 2, 3, 4, 5, 6];
    const [isChatOpen, setIsChatOpen] = useState(true); // Chat siempre abierto en modo integrado
    
    // Colores médicos para cada genotipo
    const genotypeColors = [
        "from-blue-500 to-blue-600",      // Genotipo 1
        "from-emerald-500 to-emerald-600", // Genotipo 2
        "from-purple-500 to-purple-600",   // Genotipo 3
        "from-orange-500 to-orange-600",   // Genotipo 4
        "from-pink-500 to-pink-600",       // Genotipo 5
        "from-indigo-500 to-indigo-600"    // Genotipo 6
    ];
    
    const calculatorCards = [
        {
            type: "biometrics",
            title: "Biomediciones",
            description: "Mediciones corporales precisas para determinar proporciones físicas y características metabólicas.",
            features: [
                "8 mediciones biométricas clave",
                "Análisis de proporciones corporales",
                "Evaluación de características físicas",
                "Datos para cálculo preciso"
            ],
            onClick: onNavigateToBiometrics,
            step: 1
        },
        {
            type: "calculator",
            title: "Calculadora Avanzada",
            description: "Algoritmo científico para determinar tu GenoTipo basado en biomediciones y factores genéticos.",
            features: [
                "Algoritmo basado en evidencia científica",
                "Análisis de múltiples factores",
                "Resultado preciso del GenoTipo",
                "Recomendaciones personalizadas"
            ],
            onClick: onNavigateToCalculator,
            step: 2
        }
    ];

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
                        Sistema de evaluación nutrigenómica basado en evidencia científica para determinar tu perfil genotípico nutricional.
                    </MedicalText>
                    
                    {/* Información médica */}
                    <MedicalAlertCard type="info" className="max-w-xl mx-auto p-4">
                        <MedicalText variant="caption" size="sm">
                            <strong>Proceso médico profesional:</strong> Sigue los pasos en secuencia para obtener un análisis nutrigenómico completo y preciso.
                        </MedicalText>
                    </MedicalAlertCard>
                </header>

                {/* Sección de GenoTipos - Reorganizada */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <MedicalHeading level={4} variant="secondary" align="center" className="mb-3">
                            Exploración de GenoTipos
                        </MedicalHeading>
                        <MedicalText variant="body" size="sm" className="max-w-2xl mx-auto text-gray-600">
                            Haz clic en cada GenoTipo para aprender sobre sus características únicas, constitución física y metabólica, 
                            y recomendaciones de alimentación para optimizar tu salud.
                        </MedicalText>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
                        {genotypes.map((num, index) => (
                            <GenotypeCard 
                                key={num}
                                onClick={() => onNavigateToGenotype(num)}
                                genotypeColor={['blue', 'green', 'purple', 'orange', 'red', 'indigo'][index]}
                                className="transform transition-all duration-300 hover:scale-105"
                            >
                                <GenotypeBox number={num} />
                            </GenotypeCard>
                        ))}
                    </div>
                </section>
                
                {/* Sección de Evaluación - Reorganizada */}
                <section className="mb-16">
                    <div className="text-center mb-8">
                        <MedicalBadge variant="success" size="md" className="mb-3">
                            <Calculator className="w-4 h-4 mr-2" />
                            Proceso de Evaluación
                        </MedicalBadge>
                        
                        <MedicalHeading level={4} variant="secondary" align="center" className="mb-3">
                            Calcula tu GenoTipo
                        </MedicalHeading>
                        
                        <MedicalText variant="body" size="sm" className="max-w-2xl mx-auto text-gray-600">
                            Utiliza nuestras herramientas científicas para descubrir qué GenoTipo te corresponde. 
                            Comienza con las Biomediciones para obtener los datos necesarios.
                        </MedicalText>
                    </div>
                    
                    {/* Cards de Calculadoras en Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {calculatorCards.map((card, index) => (
                             <CalculatorCard 
                                key={card.title} 
                                {...card}
                            />
                        ))}
                    </div>
                </section>

                {/* Chat Integrado - Reorganizado */}
                <section className="mb-8">
                    <div className="text-center mb-6">
                        <MedicalBadge variant="info" size="sm" className="mb-3">
                            <Users className="w-4 h-4 mr-2" />
                            Asistente IA Integrado
                        </MedicalBadge>
                        <MedicalHeading level={4} variant="secondary" align="center" className="mb-2">
                            Consulta con tu Asistente IA
                        </MedicalHeading>
                        <MedicalText variant="body" size="sm" className="max-w-2xl mx-auto text-gray-600">
                            Pregunta sobre GenoTipos, nutrición personalizada, planes alimenticios o cualquier duda que tengas.
                        </MedicalText>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <div className="h-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                            <Chatbot
                                isOpen={true}
                                onClose={() => {}}
                                contextGenotypeId={null}
                                isIntegrated={true}
                            />
                        </div>
                    </div>
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