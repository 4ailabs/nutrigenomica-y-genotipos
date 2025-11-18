import React, { useState } from 'react';
import { Atom, BookOpen, Target, TrendingUp, Lightbulb, ChevronRight, ChevronDown, Microscope } from 'lucide-react';
import NutrigenomicsResearchAgent from './NutrigenomicsResearchAgent';
import NavigationHeader from './NavigationHeader';

interface NutrigenomicsPageProps {
  onBackToPortal: () => void;
  onNavigateToMain: () => void;
}

const NutrigenomicsPage: React.FC<NutrigenomicsPageProps> = ({ onBackToPortal, onNavigateToMain }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const geneticInsights = [
    {
      id: 'polimorfismos',
      title: 'Polimorfismos Genéticos',
      icon: Microscope,
      content: 'Los polimorfismos de nucleótido único (SNPs) son variaciones en el ADN que afectan cómo tu cuerpo procesa los nutrientes.',
      details: [
        'MTHFR: Afecta el metabolismo del folato',
        'APOE: Influye en el metabolismo de las grasas',
        'FTO: Relacionado con la regulación del apetito',
        'COMT: Afecta el metabolismo de la dopamina'
      ]
    },
    {
      id: 'metabolismo',
      title: 'Metabolismo de Macronutrientes',
      icon: TrendingUp,
      content: 'Tu genotipo determina la eficiencia con la que metabolizas carbohidratos, proteínas y grasas.',
      details: [
        'Sensibilidad a la insulina variable',
        'Capacidad de oxidación de grasas específica',
        'Requerimientos proteicos personalizados',
        'Tolerancia a carbohidratos individual'
      ]
    },
    {
      id: 'detoxificacion',
      title: 'Sistemas de Detoxificación',
      icon: Target,
      content: 'Las enzimas hepáticas varían según el genotipo, afectando la capacidad de eliminar toxinas.',
      details: [
        'Fase I: Enzimas CYP450',
        'Fase II: Conjugación hepática',
        'Capacidad antioxidante endógena',
        'Eliminación de xenobióticos'
      ]
    },
    {
      id: 'inflamacion',
      title: 'Respuesta Inflamatoria',
      icon: Lightbulb,
      content: 'Ciertos genes regulan la respuesta inflamatoria a diferentes alimentos y nutrientes.',
      details: [
        'Producción de citoquinas',
        'Sensibilidad a omega-6/omega-3',
        'Respuesta a antioxidantes',
        'Tolerancia a lectinas y antinutrientes'
      ]
    }
  ];

  const nutritionalScience = [
    {
      title: 'Expresión Génica',
      description: 'Los nutrientes actúan como señales que pueden activar o silenciar genes específicos.',
      example: 'Los ácidos grasos omega-3 pueden activar genes antiinflamatorios.'
    },
    {
      title: 'Biodisponibilidad',
      description: 'La capacidad de absorber y utilizar nutrientes varía según el genotipo.',
      example: 'Algunas personas absorben mejor el hierro hemo que el hierro no hemo.'
    },
    {
      title: 'Epigenética',
      description: 'El ambiente nutricional puede modificar la expresión génica sin cambiar el ADN.',
      example: 'Una dieta rica en metilo puede influir en la metilación del ADN.'
    },
    {
      title: 'Cronobiología',
      description: 'Los ritmos circadianos afectan el metabolismo de nutrientes.',
      example: 'La sensibilidad a la insulina varía a lo largo del día según el genotipo.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header con navegación consistente */}
      <NavigationHeader
        title="Nutrigenómica"
        subtitle="Descubre la ciencia detrás de la nutrición personalizada basada en tu perfil genético"
        onBack={onBackToPortal}
        onNavigateToMain={onNavigateToMain}
        breadcrumbs={['Inicio', 'Portal', 'Nutrigenómica']}
        variant="gradient"
        className="py-12"
      />
      
      {/* Icono del átomo centrado */}
      <div className="flex items-center justify-center mb-8">
        <Atom className="w-16 h-16 text-purple-600" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Fundamentos de la Nutrigenómica */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h3 className="text-3xl font-bold text-gray-800">Fundamentos Científicos</h3>
          </div>

          <div className="space-y-6">
            {geneticInsights.map((insight) => (
              <div key={insight.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(insight.id)}
                  className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <insight.icon className="w-6 h-6 text-purple-600" />
                    <span className="font-semibold text-gray-800 text-lg">{insight.title}</span>
                  </div>
                  {expandedSection === insight.id ? 
                    <ChevronDown className="w-5 h-5 text-gray-500" /> : 
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  }
                </button>
                
                {expandedSection === insight.id && (
                  <div className="px-6 py-6 bg-white">
                    <p className="text-gray-700 mb-4 text-lg leading-relaxed">{insight.content}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {insight.details.map((detail, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                          <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conceptos Clave */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">Conceptos Clave en Nutrigenómica</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {nutritionalScience.map((concept, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <h4 className="text-xl font-semibold text-purple-800 mb-3">{concept.title}</h4>
                <p className="text-gray-700 mb-4 leading-relaxed">{concept.description}</p>
                <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
                  <p className="text-sm text-purple-700">
                    <strong>Ejemplo:</strong> {concept.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agente de Investigación */}
        <div className="space-y-4">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Agente de Investigación Especializada</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Realiza consultas científicas profundas sobre nutrigenómica con nuestro agente de investigación especializado
            </p>
          </div>
          
          <NutrigenomicsResearchAgent
            genotypeId={undefined}
            genotypeColor="#9333EA"
          />
        </div>

        {/* Footer Profesional */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-500 text-center md:text-left">
                © {new Date().getFullYear()} Dr. Miguel Ojeda Rios
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                  Ciencia Basada en Evidencia
                </span>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default NutrigenomicsPage;