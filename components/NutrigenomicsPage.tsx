import React from 'react';
import { Atom } from 'lucide-react';
import NutrigenomicsResearchAgent from './NutrigenomicsResearchAgent';
import NavigationHeader from './NavigationHeader';

interface NutrigenomicsPageProps {
  onBackToPortal: () => void;
  onNavigateToMain: () => void;
}

const NutrigenomicsPage: React.FC<NutrigenomicsPageProps> = ({ onBackToPortal, onNavigateToMain }) => {

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
        <NutrigenomicsResearchAgent
          genotypeId={undefined}
          genotypeColor="#9333EA"
        />

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