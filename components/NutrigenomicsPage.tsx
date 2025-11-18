import React from 'react';
import { Atom } from 'lucide-react';
import NutrigenomicsResearchAgent from './NutrigenomicsResearchAgent';
import NavigationHeader from './NavigationHeader';
import FloatingNav from './FloatingNav';

interface NutrigenomicsPageProps {
  onBackToPortal: () => void;
  onNavigateToMain: () => void;
}

const NutrigenomicsPage: React.FC<NutrigenomicsPageProps> = ({ onBackToPortal, onNavigateToMain }) => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 via-indigo-50/20 to-blue-50/25">
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
      
      {/* Icono del átomo centrado con efecto visual */}
      <div className="flex items-center justify-center mb-12 animate-fadeIn">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-2xl"></div>
          <div className="relative bg-gradient-to-br from-purple-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Atom className="w-14 h-14 text-white" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <NutrigenomicsResearchAgent
          genotypeId={undefined}
          genotypeColor="#9333EA"
        />

        {/* Footer Profesional */}
        <footer className="bg-white/60 backdrop-blur-sm border-t border-gray-200 mt-16 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 text-center md:text-left font-medium">
                © {new Date().getFullYear()} Dr. Miguel Ojeda Rios
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200/50">
                  Ciencia Basada en Evidencia
                </span>
              </div>
            </div>
          </div>
        </footer>

      </div>
      
      {/* Navegación Flotante */}
      <FloatingNav 
        onBack={onBackToPortal}
        onHome={onNavigateToMain}
        showBackButton={true}
        showHomeButton={true}
      />
    </div>
  );
};

export default NutrigenomicsPage;