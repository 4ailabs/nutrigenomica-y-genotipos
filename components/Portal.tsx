import React, { useState } from 'react';
import GenotypeBox from './GenotypeBox';
import { MedicalButton, MedicalCard, MedicalBadge, MedicalProgress } from './MedicalComponents';
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
            className="overflow-hidden flex flex-col h-full hover:scale-105 transition-transform duration-300" 
            animation="slideUp"
        >
            <div className={`h-32 relative overflow-hidden ${colors.header} border-b`}>
                {/* Número del paso con estilo médico */}
                <div className={`absolute top-4 right-4 ${colors.badge} text-xs font-bold px-3 py-1 rounded-full`}>
                    Paso {step}
                </div>
                
                {/* Icono médico centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-16 h-16 ${colors.icon} rounded-full flex items-center justify-center`}>
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
                    <div className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center mr-3 ${colors.number}`}>
                        {step}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm flex-grow leading-relaxed">{description}</p>
                
                {features && (
                    <ul className="space-y-2 mb-6">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">{feature}</span>
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
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header Profesional */}
                <header className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <Target className="w-4 h-4 mr-2" />
                        Portal de Evaluación GenoTipo
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-gray-900">
                        Portal GenoTipo
                    </h1>
                    
                    <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Sistema de evaluación nutrigenómica basado en evidencia científica para determinar tu perfil genotípico nutricional.
                    </p>
                    
                    {/* Barra de progreso */}
                    <div className="mt-8 max-w-md mx-auto">
                        <MedicalProgress 
                            value={0} 
                            max={2} 
                            label="Progreso del análisis" 
                            variant="primary"
                        />
                    </div>
                </header>

                {/* Sección de GenoTipos Profesional */}
                <section className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Explora los GenoTipos</h2>
                        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Haz clic en cada GenoTipo para aprender sobre sus características únicas, su constitución física y metabólica, 
                            y las recomendaciones de alimentación para optimizar tu salud y bienestar.
                        </p>
                    </div>
                    
                    <div className="flex justify-center items-center flex-wrap gap-8 max-w-6xl mx-auto">
                        {genotypes.map((num, index) => (
                            <div key={num} onClick={() => onNavigateToGenotype(num)} className="cursor-pointer group">
                                <div className="group-hover:scale-105 transition-transform duration-300">
                                    <GenotypeBox number={num} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                
                 {/* Sección de Calculadoras Profesional */}
                <section className="text-center mb-16">
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                        <Calculator className="w-4 h-4 mr-2" />
                        Proceso de Evaluación
                    </div>
                    
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Calcula tu GenoTipo</h2>
                     <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg leading-relaxed">
                        Utiliza nuestras herramientas científicas para descubrir qué GenoTipo te corresponde. 
                        Comienza con las Biomediciones para obtener los datos necesarios.
                    </p>
                </section>

                {/* Cards de Calculadoras Mejoradas */}
                <section className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {calculatorCards.map((card, index) => (
                         <CalculatorCard 
                            key={card.title} 
                            {...card}
                        />
                    ))}
                </section>

                {/* Chat Integrado */}
                <section className="mt-20">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                            <Users className="w-4 h-4 mr-2" />
                            Asistente IA Integrado
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Consulta con tu Asistente IA</h2>
                        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Pregunta sobre GenoTipos, nutrición personalizada, planes alimenticios o cualquier duda que tengas. 
                            Tu asistente está aquí para ayudarte.
                        </p>
                    </div>
                    
                    <div className="max-w-4xl mx-auto">
                        <div className="h-96"> {/* Altura fija para el chat */}
                            <Chatbot
                                isOpen={isChatOpen}
                                onClose={() => setIsChatOpen(false)}
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