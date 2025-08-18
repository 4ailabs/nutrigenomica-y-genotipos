import React from 'react';
import { GENOTYPE_DATA } from '../genotypeData';
import { GENOTYPE_COLORS, GENOTYPE_NAMES } from '../constants';
import { ChevronLeft } from 'lucide-react';
import { FOOD_GUIDE_DATA } from '../foodData';
import FoodGuide from './FoodGuide';
import AIAssistant from './AIAssistant';

interface GenotypeDetailProps {
    genotypeId: number;
    onBack: () => void;
}

const GENOTYPE_THEMES = {
    1: { name: 'pink', textColor: 'text-pink-500', mainColor: '#EC4899', fromColor: 'from-pink-50', viaColor: 'via-pink-100', toColor: 'to-white', borderColor: 'border-pink-200' },
    2: { name: 'lime', textColor: 'text-lime-500', mainColor: '#84CC16', fromColor: 'from-lime-50', viaColor: 'via-lime-100', toColor: 'to-white', borderColor: 'border-lime-200' },
    3: { name: 'purple', textColor: 'text-purple-600', mainColor: '#9333EA', fromColor: 'from-purple-50', viaColor: 'via-purple-100', toColor: 'to-white', borderColor: 'border-purple-200' },
    4: { name: 'blue', textColor: 'text-blue-500', mainColor: '#3B82F6', fromColor: 'from-blue-50', viaColor: 'via-blue-100', toColor: 'to-white', borderColor: 'border-blue-200' },
    5: { name: 'red', textColor: 'text-red-500', mainColor: '#EF4444', fromColor: 'from-red-50', viaColor: 'via-red-100', toColor: 'to-white', borderColor: 'border-red-200' },
    6: { name: 'orange', textColor: 'text-orange-500', mainColor: '#F97316', fromColor: 'from-orange-50', viaColor: 'via-orange-100', toColor: 'to-white', borderColor: 'border-orange-200' },
};

const Section: React.FC<{ title: string; subtitle?: string; children: React.ReactNode; className?: string, titleClassName?: string, subtitleColor?: string }> = ({ title, subtitle, children, className = '', titleClassName = '', subtitleColor = 'text-pink-600' }) => (
    <section className={`py-12 md:py-16 ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 animate-fadeInUp">
                {subtitle && <p className={`text-sm font-bold tracking-widest uppercase ${subtitleColor} mb-2`}>{subtitle}</p>}
                <h2 className={`text-3xl md:text-4xl font-extrabold text-gray-800 ${titleClassName}`}>{title}</h2>
            </div>
            {children}
        </div>
    </section>
);


const GenotypeDetail: React.FC<GenotypeDetailProps> = ({ genotypeId, onBack }) => {
    const data = GENOTYPE_DATA[genotypeId];
    const foodData = FOOD_GUIDE_DATA[genotypeId];
    const name = GENOTYPE_NAMES[genotypeId] || 'Desconocido';
    const theme = GENOTYPE_THEMES[genotypeId] || GENOTYPE_THEMES[1];

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">Información Próximamente</h2>
                    <p className="text-gray-600 mb-8">Los detalles para el Genotipo {genotypeId} ({name}) estarán disponibles pronto.</p>
                    <button onClick={onBack} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                        Volver
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header Simple */}
            <header className={`py-16 text-center text-white`} style={{ backgroundColor: theme.mainColor }}>
                <div className="container mx-auto px-4">
                    <button onClick={onBack} className="absolute top-6 left-6 text-white hover:text-gray-200 transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {data.title}
                    </h1>
                    
                    <p className="text-xl text-white/90 max-w-3xl mx-auto">
                        {data.tagline}
                    </p>
                </div>
            </header>

            <main className="py-12">
                {/* Sección de Esencia */}
                <Section title={data.essence.title}>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-xl italic text-gray-700 mb-6">
                            "{data.essence.quote}"
                        </p>
                        <p className="text-gray-600 text-lg">{data.essence.description}</p>
                    </div>
                </Section>
                
                {/* Características Principales */}
                <Section title="Características Principales" subtitle={`Recursos del Genotipo ${data.id}`} subtitleColor={theme.textColor}>
                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {data.characteristics1.map((char, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center border border-gray-200">
                                <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${char.iconBgColor}`}>
                                    <char.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-lg mb-2 text-gray-800">{char.title}</h3>
                                <p className="text-gray-600 text-sm">{char.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Características Secundarias */}
                <Section title="Características que te Definen" subtitle="Perfil Personal" className="bg-gray-50" subtitleColor={theme.textColor}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                         {data.characteristics2.map((char, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                                <div className={`w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center ${char.iconBgColor}`}>
                                    <char.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-bold text-lg mb-2 text-gray-800">{char.title}</h3>
                                    <p className="text-gray-600">{char.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Constitución Física */}
                <Section title="Constitución Física y Metabólica" subtitle="Análisis Biomédico" subtitleColor={theme.textColor}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {data.physicalAndMetabolic.map((item, index) => (
                             <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="font-bold text-lg mb-4 text-gray-800">
                                    {String(index + 1).padStart(2, '0')}. {item.title}
                                </h3>
                                <ul className="space-y-2">
                                    {item.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start text-gray-600">
                                            <span className="text-blue-500 mr-2 mt-1">•</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </Section>

                 {/* Plan Alimenticio Mejorado */}
                 <Section title={data.foodPlan.title} subtitle="Nutrición Personalizada" subtitleColor={theme.textColor}>
                      <div className="max-w-6xl mx-auto">
                          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-8 mb-8">
                              <div className="text-center">
                                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                      <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                      </svg>
                                  </div>
                                  <h3 className="text-2xl font-bold text-teal-800 mb-3">Plan Nutricional Personalizado</h3>
                                  <p className="text-teal-700 text-lg leading-relaxed max-w-3xl mx-auto">{data.foodPlan.description}</p>
                              </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {data.foodPlan.sections.map((section, index) => (
                                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-teal-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                      <div className="p-6">
                                          <div className="flex items-center mb-4">
                                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                                                  <span className="text-teal-600 font-bold text-lg">{index + 1}</span>
                                              </div>
                                              <h4 className="text-xl font-bold text-gray-800">{section.title}</h4>
                                          </div>
                                          <ul className="space-y-3">
                                              {section.points.map((point, pIndex) => (
                                                  <li key={pIndex} className="flex items-start text-gray-700">
                                                      <span className="text-teal-500 mr-3 mt-1 flex-shrink-0">
                                                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                          </svg>
                                                      </span>
                                                      <span className="leading-relaxed">{point}</span>
                                                  </li>
                                              ))}
                                          </ul>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  </Section>

                {/* Alimentos a Evitar Mejorado */}
                <Section title={data.foodsToAvoid.title} subtitle="Precauciones Nutricionales" subtitleColor={theme.textColor} className="bg-gray-50">
                    <div className="max-w-6xl mx-auto">
                         <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-8 mb-8">
                             <div className="text-center">
                                 <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                     <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                                     </svg>
                                 </div>
                                 <h3 className="text-2xl font-bold text-amber-800 mb-3">Alimentos a Evitar</h3>
                                 <p className="text-amber-700 text-lg leading-relaxed max-w-3xl mx-auto">{data.foodsToAvoid.description}</p>
                             </div>
                         </div>
                         
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.foodsToAvoid.sections.map((section, index) => (
                                 <div key={index} className="bg-white rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                     <div className="p-6">
                                         <div className="flex items-center mb-4">
                                             <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                                                 <span className="text-amber-600 font-bold text-lg">{index + 1}</span>
                                             </div>
                                             <h4 className="text-xl font-bold text-gray-800">{section.title}</h4>
                                         </div>
                                         <ul className="space-y-3">
                                             {section.points.map((point, pIndex) => (
                                                 <li key={pIndex} className="flex items-start text-gray-700">
                                                     <span className="text-amber-500 mr-3 mt-1 flex-shrink-0">
                                                         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                             <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                         </svg>
                                                     </span>
                                                     <span className="leading-relaxed">{point}</span>
                                                 </li>
                                             ))}
                                         </ul>
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                 </Section>
                
                {/* Guía de Alimentos Mejorada */}
                {foodData && (
                     <Section title={foodData.genotipo_info.nombre} subtitle="Guía de Alimentos Detallada" subtitleColor={theme.textColor}>
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-8 mb-8">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-indigo-800 mb-3">Guía Nutricional Completa</h3>
                                    <p className="text-indigo-700 text-lg leading-relaxed max-w-3xl mx-auto">
                                        Descubre qué alimentos son mejores para tu genotipo y cuáles debes consumir con moderación.
                                    </p>
                                </div>
                            </div>
                            <FoodGuide data={foodData} />
                        </div>
                    </Section>
                )}

                {/* Asistente IA */}
                {foodData && (
                    <Section title="Asistente IA" className="bg-gray-50">
                        <AIAssistant foodData={foodData} />
                    </Section>
                )}

            </main>
            
            {/* Footer Simple */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8">
                <div className="container mx-auto px-4 text-center">
                    <button onClick={onBack} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                        ← Volver al Portal
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default GenotypeDetail;