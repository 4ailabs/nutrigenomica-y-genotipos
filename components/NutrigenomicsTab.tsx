import React, { useState } from 'react';
import { Atom, BookOpen, Target, TrendingUp, Lightbulb, ChevronRight, ChevronDown } from 'lucide-react';
import type { FoodGuideData } from '../types';

interface NutrigenomicsTabProps {
  genotypeId: number;
  foodData: FoodGuideData;
  genotypeColor: string;
  genotypeGradient: string;
}

const NutrigenomicsTab: React.FC<NutrigenomicsTabProps> = ({ 
  genotypeId, 
  foodData, 
  genotypeColor, 
  genotypeGradient 
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Contar alimentos por categoría
  const foodCounts = {
    superfoods: 0,
    toxins: 0,
    neutral: 0
  };

  Object.values(foodData.categorias_alimentos).forEach(category => {
    category.forEach(food => {
      if (food.estado === 'Superalimento') foodCounts.superfoods++;
      else if (food.estado === 'Toxina') foodCounts.toxins++;
      else foodCounts.neutral++;
    });
  });

  const geneticInsights = [
    {
      id: 'metabolismo',
      title: 'Metabolismo de Nutrientes',
      icon: TrendingUp,
      content: `Tu genotipo ${foodData.genotipo_info.nombre} tiene características específicas en el metabolismo de macronutrientes. Esto determina cómo tu cuerpo procesa carbohidratos, proteínas y grasas.`,
      details: [
        'Velocidad metabólica personalizada',
        'Respuesta insulínica específica',
        'Capacidad de oxidación de grasas',
        'Procesamiento de carbohidratos complejos'
      ]
    },
    {
      id: 'detoxificacion',
      title: 'Capacidad de Detoxificación',
      icon: Target,
      content: 'Tu perfil genético influye en la capacidad de tu hígado para procesar y eliminar toxinas alimentarias.',
      details: [
        'Eficiencia de enzimas hepáticas',
        'Procesamiento de xenobióticos',
        'Capacidad antioxidante endógena',
        'Eliminación de metabolitos'
      ]
    },
    {
      id: 'inflamacion',
      title: 'Respuesta Inflamatoria',
      icon: Lightbulb,
      content: 'Ciertos alimentos pueden provocar respuestas inflamatorias específicas según tu genotipo.',
      details: [
        'Sensibilidad a omega-6',
        'Respuesta a antioxidantes',
        'Modulación de citoquinas',
        'Tolerancia a lectinas'
      ]
    }
  ];

  const personalizedRecommendations = [
    {
      title: 'Optimización Nutricional',
      recommendations: [
        `Prioriza los ${foodCounts.superfoods} superalimentos identificados para tu genotipo`,
        'Consume alimentos ricos en nutrientes que potencien tu expresión génica',
        'Mantén horarios regulares de alimentación según tu cronobiología',
        'Incluye alimentos que mejoren tu microbiota intestinal específica'
      ]
    },
    {
      title: 'Prevención Personalizada',
      recommendations: [
        `Evita completamente los ${foodCounts.toxins} alimentos identificados como toxinas`,
        'Limita la exposición a compuestos que tu genotipo no procesa eficientemente',
        'Modera el consumo de alimentos pro-inflamatorios específicos',
        'Considera la suplementación dirigida según tus variantes genéticas'
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Nutrigenómica */}
      <div className={`bg-gradient-to-r ${genotypeGradient} rounded-2xl p-8 text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white"></div>
        </div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
                                    <Atom className="w-10 h-10" />
            <h2 className="text-3xl md:text-4xl font-bold">Nutrigenómica Personalizada</h2>
          </div>
          <p className="text-xl opacity-90 mb-6">
            Descubre cómo tu genotipo {foodData.genotipo_info.nombre} influye en tu nutrición óptima
          </p>
          
          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{foodCounts.superfoods}</div>
              <div className="text-sm opacity-90">Superalimentos</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{foodCounts.toxins}</div>
              <div className="text-sm opacity-90">Toxinas a Evitar</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">{foodCounts.neutral}</div>
              <div className="text-sm opacity-90">Alimentos Neutros</div>
            </div>
          </div>
        </div>
      </div>

      {/* Perfil Genético */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-gray-800">Tu Perfil Genético</h3>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">{foodData.genotipo_info.nombre}</h4>
          <p className="text-blue-700 leading-relaxed mb-4">{foodData.genotipo_info.descripcion}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-2">Características Principales</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Metabolismo específico de macronutrientes</li>
                <li>• Sensibilidades alimentarias particulares</li>
                <li>• Respuesta única a micronutrientes</li>
                <li>• Patrones de detoxificación personalizados</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-2">Implicaciones Nutricionales</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Requerimientos calóricos ajustados</li>
                <li>• Timing nutricional optimizado</li>
                <li>• Combinaciones alimentarias específicas</li>
                <li>• Suplementación dirigida</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Genéticos */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Insights Genéticos</h3>
        
        <div className="space-y-4">
          {geneticInsights.map((insight) => (
            <div key={insight.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(insight.id)}
                className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <insight.icon className="w-5 h-5" style={{ color: genotypeColor }} />
                  <span className="font-semibold text-gray-800">{insight.title}</span>
                </div>
                {expandedSection === insight.id ? 
                  <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                }
              </button>
              
              {expandedSection === insight.id && (
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-700 mb-4">{insight.content}</p>
                  <ul className="space-y-2">
                    {insight.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: genotypeColor }}></div>
                        <span className="text-sm text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones Personalizadas */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Recomendaciones Nutrigenómicas</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {personalizedRecommendations.map((section, index) => (
            <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.recommendations.map((rec, recIndex) => (
                  <li key={recIndex} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Educación Científica */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Atom className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-purple-800 mb-3">Ciencia detrás de tu Nutrición</h4>
            <p className="text-purple-700 mb-4 leading-relaxed">
              La nutrigenómica estudia la interacción entre tus genes y los nutrientes. Tu genotipo {foodData.genotipo_info.nombre} 
              tiene variantes genéticas específicas que influyen en cómo tu cuerpo responde a diferentes alimentos.
            </p>
            <div className="bg-white rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-2">Conceptos Clave:</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Polimorfismos:</strong> Variaciones genéticas que afectan el metabolismo
                </div>
                <div>
                  <strong>Expresión Génica:</strong> Cómo los nutrientes activan o desactivan genes
                </div>
                <div>
                  <strong>Biodisponibilidad:</strong> Capacidad de absorber y utilizar nutrientes
                </div>
                <div>
                  <strong>Epigenética:</strong> Influencia del ambiente nutricional en los genes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutrigenomicsTab;