import React, { useState } from 'react';
import {
    MetabolicRegulationIcon, EpigeneticRegulationIcon, DnaDamageIcon,
    PersonalizedPreventionIcon, WeightControlIcon, DigestionIcon,
    VitalityIcon, PlansIcon, MetabolicOptimizationIcon,
    CheckmarkIcon, MinusIcon, PlusIcon, CrossIcon,
    GenoTipoLogo, PlanTradicionalLogo, PlanGenericoLogo,
    BodyMeasurementsIcon, LabTestsIcon, AlgorithmsIcon, NutrigenomicEvalIcon,
    EnergyIcon, ChartIcon, RecommendationsIcon, SparklesIcon,
} from './LandingIcons';
import { ChevronDown, Leaf, Shield, Zap, Target, Users, Award, Clock } from 'lucide-react';
import { MedicalButton, MedicalCard, MedicalBadge, MedicalAlert } from './MedicalComponents';

interface LandingPageProps {
    onNavigateToCalculators: () => void;
    onNavigateToPatientView: () => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    </section>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode, style?: React.CSSProperties }> = ({ icon, title, children, style }) => (
    <MedicalCard 
        className="p-8 text-center hover:scale-105 transition-transform duration-300" 
        animation="slideUp"
        style={style}
    >
                                <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
            {icon}
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </MedicalCard>
);

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode, iconBgColor: string, style?: React.CSSProperties }> = ({ icon, title, children, iconBgColor, style }) => (
    <MedicalCard 
                                className="p-6 transition-colors duration-300" 
        animation="slideUp"
        style={style}
    >
        <div className="flex justify-end mb-4">
            <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center ${iconBgColor} shadow-lg`}>
                {icon}
            </div>
        </div>
        <h3 className="font-bold text-lg mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{children}</p>
    </MedicalCard>
);

const FocusCard: React.FC<{ number: string; title: string; items: string[], style?: React.CSSProperties }> = ({ number, title, items, style }) => (
     <MedicalCard 
        className="p-8 h-full" 
        animation="slideUp"
        style={style}
    >
        <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg flex items-center justify-center mr-4">
                {number}
            </div>
            <h3 className="font-bold text-xl text-gray-900">{title}</h3>
        </div>
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600">
                    <span className="text-green-500 mr-3 mt-1 text-lg">•</span>
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    </MedicalCard>
);

const FaqItem: React.FC<{ q: string; a: string; isOpen: boolean; onClick: () => void }> = ({ q, a, isOpen, onClick }) => (
    <div className="border-b border-gray-200 last:border-b-0">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left py-5 px-6 hover:bg-gray-50 transition-colors duration-200 rounded-lg">
            <h3 className="font-semibold text-gray-800 text-lg">{q}</h3>
            <div className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
                 <ChevronDown className="w-6 h-6" />
            </div>
        </button>
        <div style={{
            display: 'grid',
            gridTemplateRows: isOpen ? '1fr' : '0fr',
            transition: 'grid-template-rows 0.3s ease-out'
        }}>
            <div className="overflow-hidden">
                 <div className="pb-5 px-6 text-gray-600 text-sm space-y-3 leading-relaxed">
                    {a}
                </div>
            </div>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToCalculators, onNavigateToPatientView }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    
    const faqData = [
        { q: "¿Qué es un Genotipo y por qué es importante en la nutrición?", a: "El genotipo es tu huella genética única. Nos indica cómo responde tu cuerpo a ciertos alimentos, nutrientes y hábitos, permitiendo diseñar una alimentación que se adapte a ti desde el origen: tu ADN." },
        { q: "¿Cómo se determina mi GenoTipo?", a: "Se determina a través de una combinación de mediciones corporales, análisis de huellas digitales, y pruebas de laboratorio como tu grupo sanguíneo y estado secretor. Estos datos se procesan con algoritmos avanzados para identificar tu perfil." },
        { q: "¿Es necesario un análisis de ADN o laboratorio?", a: "Si bien un análisis de ADN completo ofrece la máxima precisión, nuestro sistema utiliza mediciones antropométricas y datos de laboratorio accesibles (como grupo sanguíneo) para determinar tu GenoTipo con alta fiabilidad, sin necesidad de un test genético costoso." },
        { q: "¿Qué beneficios tiene adaptar la dieta a mi perfil genético?", a: "Adaptar tu dieta a tu GenoTipo puede mejorar tu digestión, optimizar tu peso, aumentar tus niveles de energía, reducir la inflamación y disminuir el riesgo de enfermedades crónicas, todo al alinear tu nutrición con tu biología única." },
        { q: "¿Qué son los superalimentos y las toxinas del GenoTipo?", a: "Los superalimentos son alimentos que son especialmente beneficiosos para tu perfil genético, mientras que las toxinas son alimentos que pueden causar inflamación o desequilibrios en tu cuerpo. Identificar ambos es clave para tu plan nutricional." },
    ];

    const benefitCards = [
        { icon: <Shield className="w-6 h-6 text-white" />, title: "Prevención Personalizada", bgColor: "bg-gradient-to-br from-pink-500 to-pink-600", content: "Reduce el riesgo de enfermedades crónicas mediante estrategias basadas en tus genes. Anticipate a posibles desequilibrios con un enfoque preventivo." },
        { icon: <Target className="w-6 h-6 text-white" />, title: "Control de Peso Eficiente", bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-600", content: "Descubre qué tipo de dieta realmente funciona para ti. Evita el efecto rebote y mantén tu peso ideal con un plan alineado a tu cuerpo." },
        { icon: <Zap className="w-6 h-6 text-white" />, title: "Mejor Digestión y Bienestar", bgColor: "bg-gradient-to-br from-green-500 to-green-600", content: "Alivia malestares digestivos al evitar alimentos incompatibles con tu biología. Reduce inflamación, intolerancias y mejora tu salud intestinal y digestiva." },
        { icon: <EnergyIcon />, title: "Vitalidad y Energía", bgColor: "bg-gradient-to-br from-fuchsia-500 to-fuchsia-600", content: "Aliméntate según tus necesidades reales y mejora tu rendimiento diario. Más energía, mejor concentración y mayor claridad mental." },
        { icon: <Users className="w-6 h-6 text-white" />, title: "Planes y Acompañamiento Personalizado", bgColor: "bg-gradient-to-br from-orange-500 to-orange-600", content: "Recibe un plan adaptado a tu perfil y asesoría profesional continua. Tu biología es única, tu alimentación también debería serlo." },
        { icon: <Award className="w-6 h-6 text-white" />, title: "Optimización Metabólica", bgColor: "bg-gradient-to-br from-blue-500 to-blue-600", content: "Ajustes nutricionales según tu genética para mejorar el uso de energía y nutrientes. Maximiza el rendimiento de tu metabolismo al consumir los alimentos que mejor se adaptan a tu perfil genético." },
    ];

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-white">
            <main>
                {/* Hero Section Profesional para Médicos */}
                <section className="relative text-center py-20 md:py-28 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Badge de Programa Médico */}
                        <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium mb-6">
                            <Shield className="w-4 h-4 mr-2" />
                            Programa Médico de Nutrigenómica
                        </div>
                        
                        {/* Título Principal */}
                        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Nutrigenómica y <span className="text-blue-600">GenoTipos</span>
                        </h1>
                        
                        {/* Descripción Profesional */}
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Sistema de evaluación nutrigenómica basado en evidencia científica para personalización nutricional en práctica clínica.
                        </p>
                        
                        {/* Información Científica */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                        Evidencia Científica
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Metodología validada que integra mediciones antropométricas, análisis de laboratorio y algoritmos computacionales para determinar perfiles genotípicos nutricionales.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Botones de Acción */}
                        <div className="flex justify-center gap-4 flex-wrap">
                           <MedicalButton 
                                variant="primary" 
                                size="lg" 
                                onClick={onNavigateToCalculators}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <Target className="w-5 h-5 mr-2" />
                                Acceder al Sistema
                            </MedicalButton>
                             
                             <MedicalButton 
                                variant="secondary" 
                                size="lg"
                                onClick={onNavigateToPatientView}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                Ver mi Genotipo
                            </MedicalButton>
                             
                             <MedicalButton 
                                variant="outline" 
                                size="lg"
                                className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <a 
                                    href="https://wa.me/5211234567890?text=Hola,%20soy%20médico%20y%20me%20gustaría%20conocer%20más%20sobre%20el%20sistema%20GenoTipo."
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    Consulta Médica
                                </a>
                            </MedicalButton>
                        </div>
                        
                        {/* Indicador de Scroll */}
                        <div className="mt-12">
                            <a href="#nutricion" className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors">
                                <span className="text-sm mr-2">Ver más información</span>
                                <ChevronDown className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Nutrition Section Profesional */}
                <Section id="nutricion">
                     <div className="text-center max-w-3xl mx-auto mb-16">
                         <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
                            Sistema de Evaluación Nutrigenómica
                         </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Metodología Clínica Validada</h2>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">Protocolo estandarizado de evaluación nutrigenómica para implementación en práctica clínica con evidencia científica.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <FeatureCard icon={<MetabolicRegulationIcon />} title="Regulación Metabólica" delay={100}>
                            Optimización de rutas metabólicas mediante nutrición personalizada basada en perfil genotípico, con mejoras documentadas en parámetros bioquímicos.
                        </FeatureCard>
                        <FeatureCard icon={<EpigeneticRegulationIcon />} title="Regulación Epigenética" delay={200}>
                            Modulación de expresión génica a través de nutrientes específicos, con enfoque en prevención de enfermedades crónicas y cardiovasculares.
                        </FeatureCard>
                        <FeatureCard icon={<DnaDamageIcon />} title="Protección del ADN" delay={300}>
                            Estrategias nutricionales para reducción de daño oxidativo en ADN mitocondrial y nuclear, disminuyendo riesgo de patologías degenerativas.
                        </FeatureCard>
                    </div>
                </Section>

                {/* Why Choose Section Profesional */}
                <Section className="bg-gray-50" id="mas-informacion">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                         <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                            Beneficios Clínicos Documentados
                         </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ventajas del Sistema GenoTipo</h2>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">Implementación clínica con resultados medibles y protocolos estandarizados para práctica médica.</p>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {benefitCards.map((card, index) => (
                             <BenefitCard 
                                key={card.title} 
                                icon={card.icon} 
                                title={card.title} 
                                iconBgColor={card.bgColor} 
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                {card.content}
                            </BenefitCard>
                        ))}
                    </div>
                </Section>
                
                 {/* Our Focus Section Mejorado */}
                <Section>
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
                         <MedicalBadge variant="success" size="lg" className="mb-4">
                            Metodología Científica
                         </MedicalBadge>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">NUESTRO ENFOQUE</h2>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">En lugar de aplicar dietas genéricas, analizamos la expresión de tu ADN para construir un plan nutricional adaptado a tu biología única.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-children">
                       <FocusCard number="01" title="Mediciones corporales" items={["Medición de segmentos corporales y rasgos", "Análisis de huellas digitales", "8 biomediciones precisas"]} style={{animationDelay: '100ms'}} />
                       <FocusCard number="02" title="Pruebas de laboratorio" items={["Determinación del grupo sanguíneo y Rh", "Test PROP para sensibilidad gustativa", "Fenotipo Lewis"]} style={{animationDelay: '200ms'}} />
                       <FocusCard number="03" title="Algoritmos de cálculo del GenoTipo" items={["Calculadoras avanzados del GenoTipo", "Tests avanzados de riesgo metabólico", "Análisis odontológico"]} style={{animationDelay: '300ms'}} />
                       <FocusCard number="04" title="Evaluación nutrigenómica" items={["Planes de alimentación avanzados", "Análisis de toxinas alimentarias", "Asesoría personalizada con IA"]} style={{animationDelay: '400ms'}} />
                    </div>
                </Section>
                
                {/* Diagnostics & Results Section Profesional */}
                <Section className="bg-gray-50">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                             <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                <Leaf className="w-4 h-4 mr-2" />
                                Nutrición GenoTipo
                             </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Diagnóstico nutrigenómico personalizado</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">A través de un estudio de tus genes, identificamos cómo metabolizas grasas, carbohidratos y proteínas, qué vitaminas necesitas más y tu sensibilidad a ciertos alimentos.</p>
                        </div>
                        <div>
                           <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Leaf className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Evaluación Integral</h3>
                                    <p className="text-gray-600 text-sm">Análisis completo de perfil genotípico para optimización nutricional</p>
                                </div>
                           </div>
                        </div>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
                         <div>
                            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ChartIcon />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Seguimiento Clínico</h3>
                                    <p className="text-gray-600 text-sm">Monitoreo de parámetros y resultados medibles</p>
                                </div>
                            </div>
                        </div>
                        <div>
                           <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                                <ChartIcon />
                                Resultados Medibles
                             </div>
                             <h2 className="text-3xl font-bold text-gray-900 mb-4">Resultados en tiempo real</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">Visualiza el impacto real de la intervención nutricional: menos peso, más energía, y menor inflamación. Logra resultados y avances sostenibles y visibles.</p>
                        </div>
                    </div>
                </Section>

                {/* Comparison Section Mejorado */}
                <Section>
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-slideUp">
                         <MedicalBadge variant="warning" size="lg" className="mb-4">
                            Análisis Comparativo
                         </MedicalBadge>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">GenoTipo vs Planes tradicionales</h2>
                        <p className="text-gray-600 mt-4 text-lg leading-relaxed">Comparación del programa de nutrición por GenoTipo con otros programas nutricionales del mercado.</p>
                    </div>
                     
                     <MedicalCard className="max-w-4xl mx-auto p-2 animate-scaleIn" style={{animationDelay: '150ms'}}>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50">
                                        <th className="p-4 text-sm font-semibold text-gray-600">Características</th>
                                        <th className="p-4 text-center"><GenoTipoLogo /></th>
                                        <th className="p-4 text-center"><PlanTradicionalLogo /></th>
                                        <th className="p-4 text-center"><PlanGenericoLogo /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        "Determinación del GenoTipo", "Recomendaciones Personalizadas según tu GenoTipo", "Lista de Superalimentos y Toxinas específicas",
                                        "Análisis de Huellas Digitales y Permeabilidad", "Menú adaptado a tu biología", "Recomendación de Suplementos Personalizada", "Chatbot de IA para seguimiento (3 meses)"
                                    ].map((feature, i) => (
                                         <tr key={i} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                                            <td className="p-4 text-sm text-gray-700">{feature}</td>
                                            <td className="p-4 text-center"><CheckmarkIcon /></td>
                                            <td className="p-4 text-center"><MinusIcon className="text-gray-400" /></td>
                                            <td className="p-4 text-center"><MinusIcon className="text-gray-400" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </MedicalCard>
                </Section>
                
                 {/* FAQ Section Mejorado */}
                <Section className="bg-gradient-to-r from-gray-50 to-blue-50">
                    <div className="max-w-4xl mx-auto animate-slideUp">
                        <div className="text-center mb-12">
                             <MedicalBadge variant="info" size="lg" className="mb-4">
                                Preguntas Frecuentes
                             </MedicalBadge>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">¿Tienes alguna pregunta?</h2>
                            <p className="text-gray-600 mt-4 text-lg leading-relaxed">Nosotros estamos para resolver tus dudas y guiarte en tu bienestar.</p>
                        </div>
                        
                        <MedicalCard className="p-8">
                            {faqData.map((item, index) => (
                                <FaqItem key={index} q={item.q} a={item.a} isOpen={openFaq === index} onClick={() => toggleFaq(index)} />
                            ))}
                        </MedicalCard>
                    </div>
                </Section>

                {/* Transform Section Mejorado */}
                <Section>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slideIn">
                             <MedicalBadge variant="success" size="lg" className="mb-4">
                                Beneficios Clave
                             </MedicalBadge>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Transforma tu salud desde tu código biológico</h2>
                            <p className="text-gray-600 text-lg leading-relaxed">Adapta tu alimentación, mejora tu bienestar y alcanza tus objetivos con un plan diseñado para ti desde el ADN.</p>
                        </div>
                        
                        <div className="space-y-4 stagger-children">
                                                    <MedicalCard className="p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300" delay={100}>
                            <span className="font-semibold text-gray-700">Mejora tu energía y enfoque diario</span>
                            <EnergyIcon />
                        </MedicalCard>
                        
                        <MedicalCard className="p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300" delay={200}>
                            <span className="font-semibold text-gray-700">Planes flexibles con seguimiento inteligente</span>
                            <ChartIcon />
                        </MedicalCard>
                         
                         <MedicalCard className="p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300" delay={300}>
                            <span className="font-semibold text-gray-700">Recibe recomendaciones personalizadas</span>
                            <RecommendationsIcon />
                        </MedicalCard>
                         
                         <MedicalCard className="p-6 flex justify-between items-center hover:scale-105 transition-transform duration-300" delay={400}>
                            <span className="font-semibold text-gray-700">Planes flexibles con seguimiento inteligente</span>
                            <SparklesIcon />
                        </MedicalCard>
                        </div>
                    </div>
                </Section>

            </main>
            
            {/* Footer Mejorado */}
            <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 text-center py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="text-left">
                            <h3 className="text-white font-semibold mb-4">Dr. Miguel Ojeda Rios</h3>
                            <p className="text-sm leading-relaxed">Especialista en nutrigenómica y medicina personalizada</p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-white font-semibold mb-4">Programa GenoTipo</h3>
                            <p className="text-sm leading-relaxed">Nutrición basada en tu perfil genético único</p>
                        </div>
                        <div className="text-right">
                            <h3 className="text-white font-semibold mb-4">Contacto</h3>
                            <p className="text-sm leading-relaxed">Consulta personalizada disponible</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8">
                        <p>© {new Date().getFullYear()} Dr. Miguel Ojeda Rios. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;