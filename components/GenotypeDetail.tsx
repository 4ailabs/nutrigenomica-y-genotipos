import React from 'react';
import { GENOTYPE_DATA } from '../genotypeData';
import { GENOTYPE_COLORS, GENOTYPE_NAMES } from '../constants';
import { ChevronLeft, Download } from 'lucide-react';
import { FOOD_GUIDE_DATA } from '../foodData';
import FoodGuide from './FoodGuide';
import AIAssistant from './AIAssistant';
import GenotypeMenus from './GenotypeMenus';
import GenotypeRecipes from './GenotypeRecipes';
import { generateGenotypePDF, type GenotypePDFData } from '../utils/pdfGenerator';

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
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
            {/* Header Moderno para Pacientes */}
            <header className="relative bg-gradient-to-br from-white to-gray-50 py-20 overflow-hidden">
                {/* Decoración de fondo sutil */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{backgroundColor: theme.mainColor}}></div>
                    <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full" style={{backgroundColor: theme.mainColor}}></div>
                    <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full" style={{backgroundColor: theme.mainColor}}></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <button 
                        onClick={onBack} 
                        className="absolute top-0 left-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 transition-all duration-200 p-3 rounded-full shadow-md hover:shadow-lg"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    
                    <button 
                        onClick={() => {
                            const pdfData: GenotypePDFData = {
                                id: data.id,
                                name: data.name,
                                title: data.title,
                                tagline: data.tagline,
                                essence: data.essence,
                                characteristics1: data.characteristics1,
                                characteristics2: data.characteristics2,
                                physicalAndMetabolic: data.physicalAndMetabolic,
                                foodPlan: data.foodPlan,
                                foodsToAvoid: data.foodsToAvoid
                            };
                            generateGenotypePDF(pdfData);
                        }}
                        className="absolute top-0 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 transition-all duration-200 p-3 rounded-full shadow-md hover:shadow-lg"
                        title="Descargar Plan Nutricional en PDF"
                    >
                        <Download className="h-5 w-5" />
                    </button>
                    
                    <div className="text-center max-w-4xl mx-auto">
                        {/* Badge del genotipo */}
                        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-md mb-6">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: theme.mainColor}}>
                                {genotypeId}
                            </div>
                            <span className="text-gray-700 font-semibold">Tu GenoTipo</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                            {data.title}
                        </h1>
                        
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl md:max-w-3xl mx-auto px-4">
                            {data.tagline}
                        </p>


                    </div>
                </div>
            </header>

            <main className="py-12">
                {/* Sección de Esencia - Optimizada para pacientes */}
                <Section title="Tu Esencia Genotípica">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-white shadow-md flex items-center justify-center">
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full" style={{backgroundColor: theme.mainColor}}></div>
                            </div>
                            
                            <blockquote className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 mb-6 md:mb-8 leading-relaxed px-4">
                                "{data.essence.quote}"
                            </blockquote>
                            
                            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto px-4">
                                {data.essence.description}
                            </p>
                        </div>
                    </div>
                </Section>
                
                {/* Características Principales - Mejoradas para pacientes */}
                <Section title="Tus Fortalezas Naturales" subtitle={`Lo que te caracteriza como ${data.title}`} subtitleColor={theme.textColor}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto px-4">
                        {data.characteristics1.map((char, index) => (
                            <div key={index} className="group bg-white p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center">
                                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl mx-auto mb-4 md:mb-6 flex items-center justify-center ${char.iconBgColor} group-hover:scale-110 transition-transform duration-300`}>
                                    <char.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </div>
                                <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-gray-800 group-hover:text-gray-900">{char.title}</h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{char.description}</p>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Características Secundarias - Mejoradas */}
                <Section title="Tu Perfil Personal" subtitle="Aspectos que te hacen único" className="bg-gradient-to-b from-gray-50 to-white" subtitleColor={theme.textColor}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4">
                         {data.characteristics2.map((char, index) => (
                            <div key={index} className="group bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex-shrink-0 flex items-center justify-center ${char.iconBgColor} group-hover:scale-105 transition-transform duration-300`}>
                                        <char.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-base md:text-lg mb-2 text-gray-800 group-hover:text-gray-900">{char.title}</h3>
                                        <p className="text-gray-600 text-xs md:text-sm leading-relaxed">{char.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Constitución Física - Mejorada para pacientes */}
                <Section title="Tu Perfil Físico y Metabólico" subtitle="Cómo funciona tu cuerpo" subtitleColor={theme.textColor}>
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
                        {data.physicalAndMetabolic.map((item, index) => (
                             <div key={index} className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <span className="font-bold text-gray-700 text-base md:text-lg">{index + 1}</span>
                                    </div>
                                    <h3 className="font-bold text-lg md:text-xl text-gray-800">{item.title}</h3>
                                </div>
                                <ul className="space-y-2 md:space-y-3">
                                    {item.points.map((point, pIndex) => (
                                        <li key={pIndex} className="flex items-start text-gray-700">
                                            <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{backgroundColor: theme.mainColor}}></div>
                                            <span className="leading-relaxed text-sm md:text-base">{point}</span>
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
                
                {/* Menús Personalizados */}
                {foodData && (
                    <Section title="Menús Personalizados" subtitle="Planes de comidas basados en tus alimentos específicos" subtitleColor={theme.textColor} className="bg-gray-50">
                        <GenotypeMenus 
                            genotypeId={genotypeId} 
                            genotypeColor={theme.mainColor} 
                            genotypeGradient={`${theme.fromColor} ${theme.viaColor} ${theme.toColor}`} 
                        />
                    </Section>
                )}

                {/* Recetas Especializadas */}
                {foodData && (
                    <Section title="Recetas Especializadas" subtitle="Recetas curadas con tus superalimentos" subtitleColor={theme.textColor} className="bg-white">
                        <GenotypeRecipes 
                            genotypeId={genotypeId} 
                            genotypeColor={theme.mainColor} 
                            genotypeGradient={`${theme.fromColor} ${theme.viaColor} ${theme.toColor}`} 
                        />
                    </Section>
                )}

                {/* Guía de Alimentos Mejorada */}
                {foodData && (
                     <Section title={foodData.genotipo_info.nombre} subtitle="Guía de Alimentos Detallada" subtitleColor={theme.textColor}>
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                                <div className="text-center">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Guía Nutricional Completa</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
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
                    <Section title="Asistente IA" className="bg-white">
                        <AIAssistant foodData={foodData} />
                    </Section>
                )}

            </main>
            
            {/* Footer mejorado para pacientes */}
            <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 py-12">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Tienes preguntas sobre tu GenoTipo?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Esta información es personalizada según tu perfil genético. Consulta con tu médico para obtener recomendaciones específicas adaptadas a tu situación individual.
                        </p>
                    </div>
                    
                    <button 
                        onClick={onBack} 
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-semibold px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Volver al Portal
                    </button>
                    
                    <div className="mt-8 pt-8 border-t border-gray-300">
                        <p className="text-sm text-gray-500">
                            © Dr. Miguel Ojeda Rios • Sistema GenoTipo • Nutrigenómica Personalizada
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default GenotypeDetail;