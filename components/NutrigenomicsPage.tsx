import React, { useState } from 'react';
import { Atom, BookOpen, Users, Target, TrendingUp, Lightbulb, ChevronRight, ChevronDown, Microscope, ArrowRight } from 'lucide-react';
import { FOOD_GUIDE_DATA } from '../foodData';
import { GENOTYPE_NAMES } from '../constants';
import NutrigenomicsResearchAgent from './NutrigenomicsResearchAgent';
import NavigationHeader from './NavigationHeader';

interface NutrigenomicsPageProps {
  onBackToPortal: () => void;
  onNavigateToMain: () => void;
}

const NutrigenomicsPage: React.FC<NutrigenomicsPageProps> = ({ onBackToPortal, onNavigateToMain }) => {
  const [selectedGenotype, setSelectedGenotype] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const genotypeOptions = [1, 2, 3, 4, 5, 6].map(id => ({
    id,
    name: GENOTYPE_NAMES[id] || `Genotipo ${id}`,
    available: !!FOOD_GUIDE_DATA[id]
  }));

  const foodData = selectedGenotype ? FOOD_GUIDE_DATA[selectedGenotype] : null;

  // Contar alimentos por categoría si hay datos
  const foodCounts = foodData ? {
    superfoods: 0,
    toxins: 0,
    neutral: 0
  } : null;

  if (foodData && foodCounts) {
    Object.values(foodData.categorias_alimentos).forEach(category => {
      category.forEach(food => {
        if (food.estado === 'Superalimento') foodCounts.superfoods++;
        else if (food.estado === 'Toxina') foodCounts.toxins++;
        else foodCounts.neutral++;
      });
    });
  }

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
        {/* Selector de Genotipo */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Selecciona tu Genotipo</h2>
            <p className="text-gray-600 text-lg">
              Elige tu genotipo para ver información nutrigenómica personalizada
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genotypeOptions.map((genotype) => (
              <button
                key={genotype.id}
                onClick={() => setSelectedGenotype(genotype.id)}
                disabled={!genotype.available}
                className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedGenotype === genotype.id
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : genotype.available
                    ? 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                    : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                  selectedGenotype === genotype.id ? 'bg-purple-500' : 'bg-gray-400'
                }`}>
                  {genotype.id}
                </div>
                <div className="text-sm font-medium text-gray-800">{genotype.name}</div>
                {!genotype.available && (
                  <div className="text-xs text-gray-500 mt-1">Próximamente</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Información específica del genotipo seleccionado */}
        {selectedGenotype && foodData && foodCounts && (
          <>
            {/* Estadísticas del genotipo */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">
                Perfil Nutrigenómico: {foodData.genotipo_info.nombre}
              </h3>
              <p className="text-purple-100 mb-6 text-lg leading-relaxed">
                {foodData.genotipo_info.descripcion}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{foodCounts.superfoods}</div>
                  <div className="text-purple-100">Superalimentos</div>
                  <div className="text-sm text-purple-200 mt-2">Optimizan tu expresión génica</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{foodCounts.toxins}</div>
                  <div className="text-purple-100">Alimentos a Evitar</div>
                  <div className="text-sm text-purple-200 mt-2">Pueden generar respuestas adversas</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold mb-2">{foodCounts.neutral}</div>
                  <div className="text-purple-100">Alimentos Neutros</div>
                  <div className="text-sm text-purple-200 mt-2">Consumo moderado recomendado</div>
                </div>
              </div>
            </div>
          </>
        )}

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
            genotypeId={selectedGenotype || undefined}
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