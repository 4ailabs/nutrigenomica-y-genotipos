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

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; delay?: number }> = ({ icon, title, children }) => (
    <MedicalCard
        className="p-8 text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
        animation="slideUp"
    >
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="text-white scale-75">
                {icon}
            </div>
        </div>
        <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </MedicalCard>
);

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; iconBgColor: string; style?: React.CSSProperties }> = ({ icon, title, children, iconBgColor }) => (
    <MedicalCard
        className="p-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
        animation="slideUp"
    >
        {/* Línea decorativa superior */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${iconBgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        
        <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center ${iconBgColor} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                {icon}
            </div>
        </div>
        <h3 className="font-bold text-lg mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">{children}</p>
    </MedicalCard>
);

const FocusCard: React.FC<{ number: string; title: string; items: string[]; style?: React.CSSProperties }> = ({ number, title, items }) => (
     <MedicalCard
        className="p-8 h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
        animation="slideUp"
    >
        {/* Número grande decorativo de fondo */}
        <div className="absolute top-4 right-4 text-8xl font-black text-green-50 opacity-50 group-hover:opacity-70 transition-opacity">
            {number}
        </div>
        
        <div className="flex items-center mb-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-black text-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                {number}
            </div>
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-green-600 transition-colors">{title}</h3>
        </div>
        <ul className="space-y-3 relative z-10">
            {items.map((item, i) => (
                <li key={i} className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                    <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-green-600 text-xs">✓</span>
                    </div>
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
                {/* Hero Section Profesional Mejorado */}
                <section className="relative py-20 md:py-28 lg:py-36 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/20 overflow-hidden">
                    {/* Decoración de fondo */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    {/* Elementos decorativos sutiles */}
                    <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
                    
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        {/* Badge de Programa - Más Prominente */}
                        <div className="text-center mb-8 animate-fadeIn">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-bold shadow-lg shadow-blue-500/30 border-2 border-blue-400/30">
                                <Shield className="w-5 h-5" />
                                Programa de Salud Basado en GenoTipos
                            </div>
                        </div>
                        
                        {/* Título Principal - Mejorado con Mejor Jerarquía */}
                        <div className="text-center max-w-5xl mx-auto mb-10">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-none tracking-tight">
                                Nutrigenomics
                            </h1>
                            <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 mb-8">
                                GenoType Algorithm
                            </div>
                        </div>
                        
                        {/* Descripción - Más Clara y Legible */}
                        <p className="text-center text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Sistema de evaluación nutrigenómica basado en 
                            <span className="font-semibold text-gray-900"> evidencia científica</span> para 
                            <span className="font-semibold text-gray-900"> personalización nutricional</span> en práctica clínica profesional.
                        </p>
                        
                        {/* Stats Rápidos - Más Visual */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="text-4xl font-black text-blue-600 mb-2">6</div>
                                    <div className="text-sm font-semibold text-gray-900">Genotipos</div>
                                    <div className="text-xs text-gray-500 mt-1">Perfiles únicos</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="text-4xl font-black text-green-600 mb-2">100%</div>
                                    <div className="text-sm font-semibold text-gray-900">Personalizado</div>
                                    <div className="text-xs text-gray-500 mt-1">Basado en tu biología</div>
                                </div>
                                <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
                                    <div className="text-4xl font-black text-indigo-600 mb-2">+500</div>
                                    <div className="text-sm font-semibold text-gray-900">Alimentos</div>
                                    <div className="text-xs text-gray-500 mt-1">Clasificados por genotipo</div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Botones de Acción - Diseño Moderno y Compacto */}
                        <div className="max-w-3xl mx-auto mb-12">
                            {/* Botones Principales */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                                {/* Botón Principal */}
                                <button
                                    onClick={onNavigateToCalculators}
                                    className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative flex items-center justify-center gap-3">
                                        <Target className="w-6 h-6" />
                                        <span>Acceder al Sistema</span>
                                    </div>
                                </button>

                                {/* Botón Secundario */}
                                <button
                                    onClick={onNavigateToPatientView}
                                    className="px-10 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-2xl font-bold text-lg hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center gap-3">
                                        <Users className="w-6 h-6" />
                                        <span>Mi Genotipo</span>
                                    </div>
                                </button>
                            </div>

                            {/* Link de WhatsApp - Secundario */}
                            <div className="text-center">
                                <p className="text-sm text-gray-600 mb-3">¿Necesitas asesoría médica?</p>
                                <a 
                                    href="https://wa.me/5211234567890?text=Hola,%20soy%20médico%20y%20me%20gustaría%20conocer%20más%20sobre%20el%20sistema%20GenoTipo."
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 text-green-700 rounded-xl font-semibold hover:bg-green-100 transition-all duration-200 border border-green-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                    <span>Contactar vía WhatsApp</span>
                                </a>
                            </div>
                        </div>
                        
                        {/* Indicador de Scroll Mejorado con animación */}
                        <div className="mt-16 animate-bounce">
                            <a href="#nutricion" className="inline-flex flex-col items-center gap-3 text-gray-500 hover:text-blue-600 transition-all duration-300 group">
                                <span className="text-sm font-semibold uppercase tracking-wider">Descubre más</span>
                                <div className="w-8 h-12 rounded-full border-2 border-gray-300 group-hover:border-blue-600 flex items-start justify-center p-2 transition-colors">
                                    <div className="w-1 h-3 bg-gray-400 group-hover:bg-blue-600 rounded-full transition-colors"></div>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                {/* Nutrition Section Profesional Mejorada */}
                <Section id="nutricion" className="bg-gradient-to-b from-white via-indigo-50/20 to-white">
                     <div className="text-center max-w-4xl mx-auto mb-20">
                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
                            Sistema de Evaluación Nutrigenómica
                         </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Metodología Clínica Validada</h2>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">Protocolo estandarizado de evaluación nutrigenómica para implementación en práctica clínica con evidencia científica.</p>
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

                {/* Why Choose Section Profesional Mejorada */}
                <Section className="bg-gradient-to-b from-blue-50/30 via-cyan-50/20 to-blue-50/30" id="mas-informacion">
                    <div className="text-center max-w-4xl mx-auto mb-20">
                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            Beneficios Clínicos Documentados
                         </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Ventajas del Sistema GenoTipo</h2>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">Implementación clínica con resultados medibles y protocolos estandarizados para práctica médica.</p>
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
                <Section className="bg-gradient-to-b from-white via-emerald-50/15 to-white">
                    <div className="text-center max-w-4xl mx-auto mb-20 animate-slideUp">
                         <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                            Metodología Científica
                         </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nuestro Enfoque</h2>
                        <p className="text-gray-600 text-lg md:text-xl leading-relaxed">En lugar de aplicar dietas genéricas, analizamos la expresión de tu ADN para construir un plan nutricional adaptado a tu biología única.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto stagger-children">
                       <FocusCard number="01" title="Mediciones corporales" items={["Medición de segmentos corporales y rasgos", "Análisis de huellas digitales", "8 biomediciones precisas"]} style={{animationDelay: '100ms'}} />
                       <FocusCard number="02" title="Pruebas de laboratorio" items={["Determinación del grupo sanguíneo y Rh", "Test PROP para sensibilidad gustativa", "Fenotipo Lewis"]} style={{animationDelay: '200ms'}} />
                       <FocusCard number="03" title="Algoritmos de cálculo del GenoTipo" items={["Calculadoras avanzados del GenoTipo", "Tests avanzados de riesgo metabólico", "Análisis odontológico"]} style={{animationDelay: '300ms'}} />
                       <FocusCard number="04" title="Evaluación nutrigenómica" items={["Planes de alimentación avanzados", "Análisis de toxinas alimentarias", "Asesoría personalizada con IA"]} style={{animationDelay: '400ms'}} />
                    </div>
                </Section>
                
                {/* Diagnostics & Results Section - Rediseñada */}
                <Section className="bg-gradient-to-b from-blue-50/40 via-indigo-50/25 to-purple-50/20">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
                            <Leaf className="w-4 h-4" />
                            Proceso de Evaluación
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Del Diagnóstico a los Resultados</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">Sistema completo de evaluación y seguimiento nutrigenómico con resultados medibles</p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Card 1 - Diagnóstico */}
                            <MedicalCard variant="elevated" className="p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Leaf className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Diagnóstico Nutrigenómico</h3>
                                        <p className="text-sm text-blue-600 font-semibold">Análisis de perfil genético</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Clock className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Identificación de cómo metabolizas <span className="font-semibold text-gray-900">grasas, carbohidratos y proteínas</span>
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Target className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Determinación de necesidades de <span className="font-semibold text-gray-900">vitaminas y minerales</span> específicas
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Shield className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Detección de <span className="font-semibold text-gray-900">sensibilidades alimentarias</span> y toxinas genéticas
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>

                            {/* Card 2 - Resultados */}
                            <MedicalCard variant="elevated" className="p-8 hover:shadow-xl transition-all duration-300 group">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <Zap className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Resultados Medibles</h3>
                                        <p className="text-sm text-green-600 font-semibold">Seguimiento en tiempo real</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Award className="w-4 h-4 text-green-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Mejoras en <span className="font-semibold text-gray-900">composición corporal</span> y control de peso sostenible
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Zap className="w-4 h-4 text-green-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Aumento de <span className="font-semibold text-gray-900">energía y vitalidad</span> diaria documentado
                                        </p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Target className="w-4 h-4 text-green-600" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            Reducción de <span className="font-semibold text-gray-900">inflamación y biomarcadores</span> de riesgo
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>
                        </div>
                    </div>
                </Section>

                {/* Transform Section - Rediseñado */}
                <Section className="bg-gradient-to-b from-teal-50/20 via-emerald-50/15 to-cyan-50/20">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                                <Zap className="w-4 h-4" />
                                Transforma Tu Salud
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                De tu código biológico a resultados reales
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                                Adapta tu alimentación, mejora tu bienestar y alcanza tus objetivos con un plan diseñado para ti desde el ADN
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Card 1 */}
                            <MedicalCard variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Energía y Enfoque Diario</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Mejora tu rendimiento mental y físico con nutrición optimizada para tu metabolismo único
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>

                            {/* Card 2 */}
                            <MedicalCard variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Seguimiento Inteligente</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Planes flexibles que se adaptan a tus resultados y necesidades en tiempo real
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>

                            {/* Card 3 */}
                            <MedicalCard variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Recomendaciones Personalizadas</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Asesoría con IA y expertos basada en tu perfil genético y objetivos de salud
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>

                            {/* Card 4 */}
                            <MedicalCard variant="elevated" className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Optimización Metabólica</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Maximiza tu metabolismo y alcanza tu peso ideal con estrategias basadas en tu ADN
                                        </p>
                                    </div>
                                </div>
                            </MedicalCard>
                        </div>

                        {/* CTA Final */}
                        <div className="mt-12 text-center">
                            <MedicalButton
                                variant="primary"
                                size="lg"
                                onClick={onNavigateToCalculators}
                                className="shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40"
                            >
                                <Target className="w-5 h-5 mr-2" />
                                Comienza Tu Evaluación
                            </MedicalButton>
                        </div>
                    </div>
                </Section>

            </main>
            
            {/* Footer Profesional Mejorado */}
            <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Footer Content */}
                    <div className="py-16 border-b border-gray-800">
                        <div className="grid md:grid-cols-4 gap-12">
                            {/* Column 1 - Brand */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <Shield className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white text-xl font-bold">GenoType Algorithm</h3>
                                        <p className="text-gray-400 text-xs">Nutrigenómica Personalizada</p>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Sistema profesional de evaluación nutrigenómica para optimización de salud basado en perfil genético único. 
                                    Desarrollado con evidencia científica para práctica clínica.
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-sm text-gray-400">Sistema Activo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2 - Programa */}
                            <div>
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Leaf className="w-4 h-4 text-blue-400" />
                                    Programa
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#nutricion" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                            Metodología
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#mas-informacion" className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                            Beneficios
                                        </a>
                                    </li>
                                    <li>
                                        <button onClick={onNavigateToCalculators} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                            Calculadoras
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={onNavigateToPatientView} className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group">
                                            <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                                            Genotipos
                                        </button>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3 - Profesional */}
                            <div>
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    Profesional
                                </h4>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-white font-semibold text-sm mb-1">Dr. Miguel Ojeda Rios</p>
                                        <p className="text-gray-400 text-xs leading-relaxed">
                                            Especialista en nutrigenómica y medicina personalizada
                                        </p>
                                    </div>
                                    <div className="pt-3">
                                        <a 
                                            href="https://wa.me/5211234567890"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                            Contactar
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="py-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} Dr. Miguel Ojeda Rios. Todos los derechos reservados.
                            </p>
                            <div className="flex items-center gap-6 text-xs text-gray-500">
                                <span className="flex items-center gap-2">
                                    <Shield className="w-3 h-3" />
                                    Sistema Seguro
                                </span>
                                <span className="flex items-center gap-2">
                                    <Award className="w-3 h-3" />
                                    Evidencia Científica
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;